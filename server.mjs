import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import pg from 'pg';
import bcrypt from 'bcrypt'; 

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

const db=new pg.Client({
  user:"postgres",
  host:"localhost",
  database:"world",
  password:"$crucio$",
  port:5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

async function check(username, password) {
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      return bcrypt.compare(password, user.password); 
    }
    return false;
  } catch (err) {
    console.error('Database query error:', err);
    return false;
  }
}

app.post('/', async (req, res) => {
  const { username, password } = req.body;

  const isValidUser = await check(username, password);

  if (isValidUser) {
    res.json({ message: 'Login successful!' });
  } else {
    res.status(401).json({ message: 'Invalid username or password!' });
  }
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
