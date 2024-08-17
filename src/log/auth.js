import db from '../config/db.js';

export const registerUser = async (username, password) => {
  await db.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, password]);
};

export const checkUserCredentials = async (username, password) => {
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
};
