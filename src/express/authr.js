import express from 'express';
import { checkUserCredentials } from '../log/auth.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(`Received login request: username=${username}, password=${password}`);
  const isValidUser = await checkUserCredentials(username, password);

  if (isValidUser) {
    res.json({ message: 'Login successful!' });
  } else {
    res.status(401).json({ message: 'Invalid username or password!' });
  }
});

export default router;
