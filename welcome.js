function enterChat() {
    const welcomeScreen = document.getElementById('welcome-screen');
    const chatContainer = document.getElementById('chat-container');
    const canvas = document.getElementById('bg-canvas');

    if (!welcomeScreen || !chatContainer || !canvas) {
        console.error('Error: Elements not found');
        return;
    }

    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded, using fallback transition');
        welcomeScreen.style.display = 'none';
        canvas.style.display = 'none';
        chatContainer.style.display = 'flex';
        return;
    }

    canvas.style.display = 'none'; // Hide canvas immediately

    gsap.to(welcomeScreen, {
        opacity: 0,
        scale: 0.8,
        rotateX: 10,
        duration: 1.2,
        ease: 'power4.out',
        onUpdate: function() {
            welcomeScreen.style.filter = `blur(${5 * this.ratio}px)`;
        },
        onComplete: () => {
            welcomeScreen.style.display = 'none';
            welcomeScreen.style.filter = 'none';
            chatContainer.style.display = 'flex';
            gsap.fromTo(
                chatContainer,
                { opacity: 0, y: 50, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.2,
                    ease: 'power3.out'
                }
            );
        }
    });
}

window.enterChat = enterChat;

window.addEventListener('load', () => {
    const welcomeBlackTitle = document.querySelector('.welcome-title-black');
    const welcomeWhiteTitle = document.querySelector('.welcome-title-white');
    const welcomeContent = document.querySelector('.welcome-content');

    if (!welcomeBlackTitle || !welcomeWhiteTitle || !welcomeContent) {
        console.warn('One or more welcome elements not found');
        return;
    }

    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded, skipping welcome animations');
        welcomeBlackTitle.style.opacity = '1';
        welcomeWhiteTitle.style.opacity = '1';
        welcomeContent.style.opacity = '1';
        return;
    }

    gsap.fromTo(
        welcomeBlackTitle,
        { opacity: 0, x: -100 },
        { opacity: 1, x: 0, duration: 1.2, ease: 'power4.out', delay: 0.4 }
    );
    gsap.fromTo(
        welcomeWhiteTitle,
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 1.2, ease: 'power4.out', delay: 0.6 }
    );
    gsap.fromTo(
        welcomeContent,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out', delay: 0.8 }
    );
});