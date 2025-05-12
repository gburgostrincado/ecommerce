import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './models/index.js';
import routes from './routes/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const port = process.env.PORT || 5001;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1', routes())

db.sequelize.authenticate()
  .then(() => {
    console.log('✅ Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('❌ Unable to connect to the database:', err);
  });

app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});