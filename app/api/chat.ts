// Dex-Take-Home-Assessment/api/chat.ts

import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    if (req.body.file) {
      // Handle file upload logic here
      const file = req.body.file;
      // Process the file, save it, etc.
      return res.status(200).json({ message: 'File uploaded successfully' });
    }

    const { message } = req.body;

    try {
      const response = await openai.createChatCompletion({
        model: 'gpt-4',
        messages: [{ role: 'user', content: message }],
      });

      res.status(200).json({ response: response.data.choices[0].message.content });
    } catch (error) {
      res.status(500).json({ error: 'Failed to get response from GPT API' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
