import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import cloudinary from 'cloudinary';
import multer from 'multer';
import pg from 'pg';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cors from 'cors';

const db = new pg.Client({
  user: "",
  host: "",
  database: "",
  password:"",
  port: 5432,
});

db.connect();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

cloudinary.v2.config({
  cloud_name: '',
  api_key: '',
  api_secret: '',
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'uploads',
    format: async (req, file) => 'png',
    public_id: (req, file) => file.filename,
  },
});
const upload = multer({ storage });

async function registerUser(username, password) {
  await db.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, password]);
}

async function check(username, password) {
  try {
    const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      console.log(`Stored password: ${user.password}`);
      return user.password === password;
    }
    console.log('No user found');
    return false;
  } catch (err) {
    console.error('Database query error:', err);
    return false;
  }
}

app.get('/welcome', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'welcome.html'));
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(`Received login request: username=${username}, password=${password}`);
  const isValidUser = await check(username, password);

  if (isValidUser) {
    res.json({ message: 'Login successful!' });
  } else {
    res.status(401).json({ message: 'Invalid username or password!' });
  }
});

app.post('/upload', upload.single('file'), (req, res) => {
  try {
    const fileUrl = req.file.path;
    res.status(200).json({ url: fileUrl });
    console.log("Image uploaded successfully:", fileUrl);
  } catch (error) {
    console.error('Failed to upload image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// Serve static files (like the login page)
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
