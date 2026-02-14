document.addEventListener('DOMContentLoaded', () => {
    // Utility Functions
    const playConfetti = () => {
        try {
            if (typeof confetti !== 'undefined') {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#ff69b4', '#ff0000', '#dda0dd']
                });
            } else {
                console.warn('Confetti script not loaded; skipping effect.');
            }
        } catch (error) {
            console.error('Confetti failed:', error);
        }
    };

    const playAudio = (audioEl, volume = 1) => {
        try {
            audioEl.volume = volume;
            audioEl.play().catch(e => console.warn('Audio play failed:', e));
        } catch (error) {
            console.error('Audio error:', error);
        }
    };

    const addSparkles = (x, y) => {
        for (let i = 0; i < 5; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = `${x + (Math.random() - 0.5) * 50}px`;
            sparkle.style.top = `${y + (Math.random() - 0.5) * 50}px`;
            document.body.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1000);
        }
    };

    // Page 1: Home Page
    if (document.body.classList.contains('page1')) {
        const currentYear = new Date().getFullYear();
        const startYear = 2023;
        const nth = currentYear - startYear;
        const ordinal = nth === 1 ? '1st' : nth === 2 ? '2nd' : nth === 3 ? '3rd' : `${nth}th`;
        document.getElementById('nth-day').textContent = ordinal;

        const dotsContainer = document.getElementById('timeline-dots');
        for (let i = 0; i <= nth; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dotsContainer.appendChild(dot);
        }

        document.getElementById('yes-btn').addEventListener('click', () => {
            playConfetti();
            setTimeout(() => window.location.href = 'page2.html', 2000);
        });
    }

    // Page 2: 50 Kisses Page
    if (document.body.classList.contains('page2')) {
        let kissCount = 0;
        const maxKisses = 50;
        const counterEl = document.getElementById('kiss-counter');
        const progressFill = document.getElementById('progress-fill');
        const messageEl = document.getElementById('message');
        const treatsEl = document.getElementById('treats');
        const unlockTextEl = document.getElementById('unlock-text');
        const nextBtn = document.getElementById('next-btn');
        const bgMusic = document.getElementById('bg-music');
        const kissSound = document.getElementById('kiss-sound');

        const messages = {
            10: "Okayyy that’s cute 👀",
            25: "Halfway there, don’t stop 😌",
            40: "You’re obsessed and I love it 😭"
        };

        const handleKiss = (e) => {
            if (kissCount >= maxKisses) return;
            kissCount++;
            counterEl.textContent = `Kisses: ${kissCount} / ${maxKisses}`;
            progressFill.style.width = `${(kissCount / maxKisses) * 100}%`;

            if (messages[kissCount]) {
                messageEl.textContent = messages[kissCount];
                setTimeout(() => messageEl.textContent = '', 3000);
            }

            const kiss = document.createElement('div');
            kiss.className = 'floating-kiss';
            kiss.textContent = '💋';
            kiss.style.left = `${e.clientX}px`;
            kiss.style.top = `${e.clientY}px`;
            document.body.appendChild(kiss);
            setTimeout(() => kiss.remove(), 2000);

            addSparkles(e.clientX, e.clientY);
            playAudio(kissSound, 0.5);

            if (kissCount === maxKisses) {
                playConfetti();
                treatsEl.classList.remove('hidden');
                treatsEl.classList.add('visible');
                unlockTextEl.classList.remove('hidden');
                nextBtn.classList.remove('hidden');
                playAudio(bgMusic, 0);
                let volume = 0;
                const fadeIn = setInterval(() => {
                    if (volume < 0.3) {
                        volume += 0.01;
                        bgMusic.volume = volume;
                    } else {
                        clearInterval(fadeIn);
                    }
                }, 100);
            }
        };

        document.body.addEventListener('click', handleKiss);
        document.getElementById('kiss-btn').addEventListener('click', handleKiss);
        nextBtn.addEventListener('click', () => window.location.href = 'page3.html');
    }

    // Page 3: Mini Game Page
    if (document.body.classList.contains('page3')) {
        let score = 0;
        let streak = 0;
        const scoreEl = document.getElementById('score');
        const streakEl = document.getElementById('streak');
        const winMessage = document.getElementById('win-message');
        const nextBtn = document.getElementById('next-btn');
        const heartSound = document.getElementById('heart-sound');

        const heartTypes = [
            { emoji: '❤️', points: 1 }, // Red: 1 point
            { emoji: '💛', points: 2 }, // Yellow: 2 points
            { emoji: '💙', points: 3 }  // Blue: 3 points
        ];

        const createHeart = () => {
            const type = heartTypes[Math.floor(Math.random() * heartTypes.length)];
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = type.emoji;
            heart.dataset.points = type.points; // Store points for click
            heart.style.left = `${Math.random() * 80}%`; // Avoid edges
            heart.addEventListener('click', (e) => {
                const points = parseInt(heart.dataset.points);
                score += points;
                streak++;
                scoreEl.textContent = `Love Points: ${score} (+${points})`;
                streakEl.textContent = `Streak: ${streak}`;
                heart.classList.add('clicked'); // Visual feedback
                addSparkles(e.clientX, e.clientY); // Sparkle effect
                playAudio(heartSound, 0.5); // Sound feedback
                setTimeout(() => heart.remove(), 500); // Remove after click
                if (score >= 20) {
                    playConfetti();
                    winMessage.classList.remove('hidden');
                    nextBtn.classList.remove('hidden');
                }
            });
            document.body.appendChild(heart);
            setTimeout(() => {
                if (heart.parentNode) heart.remove(); // Auto-remove if not clicked
            }, 15000); // Matches animation
        };

        // Spawn 2-5 hearts at a time for increased intensity
        const spawnHearts = () => {
            const numHearts = Math.floor(Math.random() * 4) + 2; // 2-5 hearts
            for (let i = 0; i < numHearts; i++) {
                setTimeout(createHeart, i * 300); // Stagger spawn slightly
            }
        };

        setInterval(spawnHearts, 3000); // Faster spawn for intensity
        nextBtn.addEventListener('click', () => window.location.href = 'page4.html');
    }

    // Page 4: Beautiful Message Page
    if (document.body.classList.contains('page4')) {
        document.querySelector('.next-btn').addEventListener('click', () => window.location.href = 'page5.html');
    }

    // Page 5: Secret Message Page
    if (document.body.classList.contains('page5')) {
        const passwordInput = document.getElementById('password-input');
        const okBtn = document.getElementById('ok-btn');
        const errorMessage = document.getElementById('error-message');
        const secretMessage = document.getElementById('secret-message');
        const nextBtn = document.getElementById('next-btn');

        passwordInput.addEventListener('input', () => {
            if (passwordInput.value.length > 0) {
                okBtn.classList.remove('hidden'); // Show OK button when input has text
            } else {
                okBtn.classList.add('hidden');
            }
        });

        okBtn.addEventListener('click', () => {
            if (passwordInput.value === '1403') {
                secretMessage.classList.remove('hidden');
                nextBtn.classList.remove('hidden');
                errorMessage.classList.add('hidden');
            } else {
                errorMessage.classList.remove('hidden');
                secretMessage.classList.add('hidden');
                nextBtn.classList.add('hidden');
            }
        });

        nextBtn.addEventListener('click', () => window.location.href = 'page6.html');
    }

    // Page 6: Our Journey Timeline
    if (document.body.classList.contains('page6')) {
        const memoryText = document.getElementById('memory-text');
        const bubbles = document.querySelectorAll('.year-bubble');

        bubbles.forEach(bubble => {
            bubble.addEventListener('click', () => {
                const year = bubble.dataset.year;
                const texts = {
                    2023: "First Valentine: The start of our beautiful journey.",
                    2024: "Growth Year: We became stronger together.",
                    2025: "Stronger Together: Facing challenges hand in hand.",
                    2026: "Still Choosing Each Other: Every day is a new adventure."
                };
                memoryText.textContent = texts[year] || '';
            });
        });

        document.querySelector('.next-btn').addEventListener('click', () => window.location.href = 'page7.html');
    }

    // Page 7: Why I Love You Page
    if (document.body.classList.contains('page7')) {
        window.flipCard = (card) => {
            card.classList.toggle('flipped');
        };

        document.querySelector('.next-btn').addEventListener('click', () => window.location.href = 'page8.html');
    }

    // Page 8: Future Loading Page
    if (document.body.classList.contains('page8')) {
        const loadingFill = document.getElementById('loading-fill');
        const loadingText = document.getElementById('loading-text');
        const finalMessage = document.getElementById('final-message');
        const nextBtn = document.getElementById('next-btn');

        const stages = [
            { width: 25, text: "Building dreams..." },
            { width: 50, text: "Making memories..." },
            { width: 75, text: "Planning forever..." },
            { width: 100, text: "Forever starts now." }
        ];

        let stageIndex = 0;
        const interval = setInterval(() => {
            if (stageIndex < stages.length) {
                loadingFill.style.width = `${stages[stageIndex].width}%`;
                loadingText.textContent = stages[stageIndex].text;
                stageIndex++;
            } else {
                clearInterval(interval);
                finalMessage.classList.remove('hidden');
                nextBtn.classList.remove('hidden');
            }
        }, 2000);

        nextBtn.addEventListener('click', () => window.location.href = 'page9.html');
    }

    // Page 9: Final Surprise Page
    if (document.body.classList.contains('page9')) {
        const giftBox = document.getElementById('gift-box');
        const surpriseMessage = document.getElementById('surprise-message');
        const backBtn = document.getElementById('back-btn');

        giftBox.addEventListener('click', () => {
            playConfetti();
            giftBox.style.display = 'none';
            surpriseMessage.classList.remove('hidden');
            backBtn.classList.remove('hidden');
        });

        backBtn.addEventListener('click', () => window.location.href = 'index.html');
    }
});
