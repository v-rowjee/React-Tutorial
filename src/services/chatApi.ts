export async function sendChatMessage(message: string) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error('Unable to reach the AI Tutor right now.');
  }

  const data = await response.json();

  return data;
}
