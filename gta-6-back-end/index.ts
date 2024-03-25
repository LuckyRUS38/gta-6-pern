import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const prisma = new PrismaClient()
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

app.post('/api', async (req, res) => {
  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).json({ message: 'Email and name are required fields!' });
  }

  try {
    const createdRow = await prisma.waitList.create({
      data: {
        email, name
      },
    });
    return res.json(createdRow);
  } catch (err) {
    return res.status(400).send({ message: err || 'An error occurred while processing your request' });
  }
});

const server = app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
