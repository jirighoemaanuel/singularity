import express from 'express';
import dotenv from 'dotenv';
import db from './db.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const employees = await db.query('SELECT * FROM employees;');
    res.status(200).json({
      employees: employees.rows,
    });
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on PORT:${PORT}`);
});
