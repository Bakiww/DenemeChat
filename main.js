const socket = io();
const PASSWORD = 'gizli123';

let authenticated = false;

const loginForm = document.getElementById('login-form');
const passwordInput = document.getElementById('password');
const chatRoom = document.getElementById('chat-room');
const messages = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (passwordInput.value === PASSWORD) {
    authenticated = true;
    loginForm.style.display = 'none';
    chatRoom.style.display = 'block';
  } else {
    alert('Şifre yanlış');
  }
});

sendButton.addEventListener('click', () => {
  if (!authenticated) return;
  const msg = messageInput.value.trim();
  if (msg) {
    socket.emit('chat message', msg);
    messageInput.value = '';
  }
});

socket.on('chat message', (msg) => {
  const messageEl = document.createElement('div');
  messageEl.textContent = msg;
  messages.appendChild(messageEl);
  setTimeout(() => messageEl.remove(), 5000);
});
