/* eslint-disable prettier/prettier */
import { useState } from 'react';
import { Button, Container, Text } from '@chakra-ui/react';

const Email = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>('');

  const handleEmailSend = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'jason.ling199@gmail.com',
          subject: 'Hello World',
          text: 'It works!',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || 'Failed to send email');
      }

      const data = await response.json();
      setMessage(data.message);
    } catch (error: any) {
      setMessage(`Error sending email: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Button
        onClick={handleEmailSend}
        isLoading={loading}
        loadingText="Sending"
        colorScheme="blue"
      >
        Send Email
      </Button>
      {message && (
        <Text
          mt={4}
          color={message.startsWith('Error') ? 'red.500' : 'green.500'}
        >
          {message}
        </Text>
      )}
    </Container>
  );
};

export default Email;
