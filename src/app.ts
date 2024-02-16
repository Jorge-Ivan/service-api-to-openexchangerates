import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import rateRoutes from './routes/rateRoutes';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/rates', rateRoutes);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
