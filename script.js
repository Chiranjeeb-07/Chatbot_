const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

const stars = [];
for (let i = 0; i < 200; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
        speed: Math.random() * 0.02 + 0.01
    });
}

function drawNightSky() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        star.opacity += star.speed;
        if (star.opacity > 0.9 || star.opacity < 0.3) star.speed *= -1;
    });
    requestAnimationFrame(drawNightSky);
}
drawNightSky();

window.addEventListener('resize', resizeCanvas);

let hasExpanded = false;

function sendMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();
    if (!message) return;

    const chatBox = document.getElementById('chat-box');
    const chatContent = chatBox.querySelector('.chat-content');
    const inputSection = document.querySelector('.input-section');
    chatContent.innerHTML += `<p class="message-bubble message-user">${message}</p>`;
    userInput.value = '';

    if (!hasExpanded) {
        chatBox.classList.add('expanded');
        inputSection.classList.add('expanded');
        hasExpanded = true;
    }

    const loadingId = 'loading-' + Date.now();
    chatContent.innerHTML += `<p id="${loadingId}" class="message-bubble message-system">Processing...</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;

    fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
    })
        .then(res => res.json())
        .then(data => {
            const loading = document.getElementById(loadingId);
            if (loading) loading.remove();

            chatContent.innerHTML += `<p class="message-bubble message-quantum">${data.reply}</p>`;
            chatBox.scrollTop = chatBox.scrollHeight;
        })
        .catch(() => {
            const loading = document.getElementById(loadingId);
            if (loading) loading.remove();
            chatContent.innerHTML += `<p class="message-bubble message-system">Error. Please retry.</p>`;
            chatBox.scrollTop = chatBox.scrollHeight;
        });
}