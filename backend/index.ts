// backend/index.ts
import express from 'express';
import cors from 'cors';
import { sendMail } from './mailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/send-email', async (req, res) => {
  const { to, subject, message } = req.body;
  try {
    await sendMail(to, subject, `<h1>${subject}</h1><p>${message}</p>`);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

app.listen(3001, () => console.log('Server running on http://localhost:3001'));
