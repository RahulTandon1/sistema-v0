/* eslint-disable prettier/prettier */
import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend('re_FZFKPxRF_C2ofgnaSYXxPdfHUY3Mkv9kG');

type Data = {
  message?: string;
  error?: string;
  details?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { to, subject, text } = req.body;

    try {
      await resend.emails.send({
        from: 'jason.ling199@gmail.com',
        to: [to],
        subject: subject,
        text: text,
      });

      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error: any) {
      res.status(500).json({ error: 'Error sending email', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}