import api from '../config';

export async function sendChatMessage({ content, conversationId }) {
  const { data } = await api.post('/chat/message', {
    content,
    conversationId,
  });

  return data;
}

export async function getConversations() {
  const { data } = await api.get('/chat/conversations');

  return data;
}
