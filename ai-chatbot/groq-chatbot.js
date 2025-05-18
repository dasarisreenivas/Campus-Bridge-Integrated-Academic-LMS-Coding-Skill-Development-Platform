const apiKey = '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';  // Replace with your key

const chatbox = document.getElementById('chatbox');
const input = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', async () => {
  const userMessage = input.value;
  if (!userMessage) return;

  addMessage(userMessage, 'user');
  input.value = '';

  const reply = await getGroqReply(userMessage);
  addMessage(reply, 'bot');
});

function addMessage(text, sender) {
  const div = document.createElement('div');
  div.className = `message ${sender}`;
  div.textContent = text;
  chatbox.appendChild(div);
  chatbox.scrollTop = chatbox.scrollHeight;
}

async function getGroqReply(prompt) {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7
      })
    });

    const data = await response.json();
    console.log('Groq response:', data);

    if (data && data.choices && data.choices.length > 0) {
      return data.choices[0].message.content;
    } else {
      return 'No response from Groq.';
    }

  } catch (error) {
    console.error(error);
    return 'Error communicating with Groq.';
  }
}
