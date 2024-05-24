// Dex-Take-Home-Assessment/services/chatService.ts

export const getChatbotResponse = async (message: string) => {
  const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
  });

  if (!response.ok) {
      throw new Error('Failed to get response from GPT API');
  }

  const data = await response.json();
  return data.response;
};

export const getConversationThreads = async () => {
  // Fetch conversation threads from your backend or database
  return []; // Placeholder return
};

export const saveConversationThread = async (messages: string[]) => {
  // Save conversation thread to your backend or database
};
