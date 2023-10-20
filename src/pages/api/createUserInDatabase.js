export default async function handler(req, res) {
  const { userId, email } = req.body;

  try {
    const query = 'INSERT INTO users (user_id, email) VALUES ($1, $2)';
    const values = [userId, email];

    const result = await pool.query(query, values);
    console.log('User added to database:', result.rows[0]);
    res.status(200).json({ message: 'User added to database' });
  } catch (error) {
    console.error('Error adding user to database:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

/*
import { pool } from './db';

export default async function createUserInDatabase(req, res) {
  const { userId, email } = req.body;

  try {
    const query = 'INSERT INTO users (user_id, email) VALUES ($1, $2)';
    const values = [userId, email];

    const result = await pool.query(query, values);
    console.log('User added to database:', result.rows[0]);
    res.status(200).json({ message: 'User added to database' });
  } catch (error) {
    console.error('Error adding user to database:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
*/