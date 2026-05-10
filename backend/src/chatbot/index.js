import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Groq from 'groq-sdk';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const systemPrompt = fs.readFileSync(
  path.join(__dirname, './prompts/systems.txt'),
  'utf-8',
);

const app = express();

app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.post('/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',

      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },

        ...messages.map((msg) => ({
          role: msg.role === 'assistant' ? 'assistant' : 'user',

          content:
            typeof msg.content === 'string'
              ? msg.content
              : Array.isArray(msg.content)
                ? msg.content.map((c) => c.text || '').join('')
                : '',
        })),
      ],
    });

    const text = completion.choices[0]?.message?.content ?? 'Sem resposta';

    res.json({
      content: text,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: error?.message ?? 'Erro interno do servidor',
    });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando');
});
