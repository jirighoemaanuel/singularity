import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/api/v1/users', userRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to SabiLearn API' });
});

app.listen(PORT, () => {
  console.log(`Server running on PORT:${PORT}`);
});
