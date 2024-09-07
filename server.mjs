import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './src/express/authr.js';
import uploadRoutes from './src/express/load.js';
import galleryRoutes from './src/express/gallery.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


app.use('/', authRoutes);
app.use('/upload', uploadRoutes);
app.use('/gallery',galleryRoutes);


app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


