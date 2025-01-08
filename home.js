document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('.add-home-modal');
    const overlay = document.querySelector('.overlay');
    const modalBtn = document.querySelector('.modal-btn');
    const joinBtn = document.querySelector('.join-btn');

    // Create sparkle effect
    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.innerHTML = '✨';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        document.body.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1500);
    }

    // Add sparkles on button click
    joinBtn.addEventListener('click', (e) => {
        for(let i = 0; i < 5; i++) {
            const rect = joinBtn.getBoundingClientRect();
            const x = rect.left + Math.random() * rect.width;
            const y = rect.top + Math.random() * rect.height;
            setTimeout(() => createSparkle(x, y), i * 100);
        }
    });

    // Handle add to home screen
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
    });

    modalBtn.addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const result = await deferredPrompt.userChoice;
            if (result.outcome === 'accepted') {
                modal.style.display = 'none';
                overlay.style.display = 'none';
            }
            deferredPrompt = null;
        }
    });

    // Close modal on overlay click
    overlay.addEventListener('click', () => {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    });

    // Smooth scroll behavior
    document.body.style.scrollBehavior = 'smooth';

    // Add touch feedback
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('touchstart', () => {
            button.style.transform = 'scale(0.95)';
        });
        button.addEventListener('touchend', () => {
            button.style.transform = 'scale(1)';
        });
    });
});