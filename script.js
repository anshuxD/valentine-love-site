document.addEventListener("DOMContentLoaded", function () {

    /* -------------------------------- */
    /* Utility Functions */
    /* -------------------------------- */

    function safeConfetti() {
        if (typeof confetti === "function") {
            confetti({
                particleCount: 120,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    }

    function createSparkle(x, y) {
        const sparkle = document.createElement("div");
        sparkle.className = "sparkle";
        sparkle.style.left = x + "px";
        sparkle.style.top = y + "px";
        document.body.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 1000);
    }

    function goNext(page) {
        window.location.href = page;
    }

    /* -------------------------------- */
    /* PAGE 1 – HOME */
    /* -------------------------------- */

    if (document.body.classList.contains("page1")) {

        const yesBtn = document.getElementById("yes-btn");
        const noBtn = document.getElementById("no-btn");
        const nthSpan = document.getElementById("nth-day");
        const dotsContainer = document.getElementById("timeline-dots");

        // Timeline calculation
        const firstYear = 2023;
        const currentYear = new Date().getFullYear();
        const nth = currentYear - firstYear + 1;

        if (nthSpan) nthSpan.textContent = nth;

        if (dotsContainer) {
            for (let i = 0; i < nth; i++) {
                const dot = document.createElement("div");
                dot.className = "dot";
                dotsContainer.appendChild(dot);
            }
        }

        if (yesBtn) {
            yesBtn.addEventListener("click", function (e) {
                createSparkle(e.clientX, e.clientY);
                safeConfetti();

                setTimeout(() => {
                    goNext("page2.html");
                }, 900);
            });
        }

        if (noBtn) {
            noBtn.addEventListener("mouseover", function () {
                const x = Math.random() * 300 - 150;
                const y = Math.random() * 200 - 100;
                noBtn.style.transform = `translate(${x}px, ${y}px)`;
            });
        }
    }

    /* -------------------------------- */
    /* PAGE 2 – 50 KISSES */
    /* -------------------------------- */

    if (document.body.classList.contains("page2")) {

        let kisses = 0;
        const target = 50;

        const counter = document.getElementById("kiss-counter");
        const progress = document.getElementById("progress-fill");
        const message = document.getElementById("message");
        const kissBtn = document.getElementById("kiss-btn");
        const treats = document.getElementById("treats");
        const unlockText = document.getElementById("unlock-text");
        const nextBtn = document.getElementById("next-btn");
        const bgMusic = document.getElementById("bg-music");
        const kissSound = document.getElementById("kiss-sound");

        function updateUI() {
            counter.textContent = `Kisses: ${kisses} / 50`;
            progress.style.width = (kisses / target) * 100 + "%";

            if (kisses === 10) message.textContent = "Okayyy that’s cute 👀";
            if (kisses === 25) message.textContent = "Halfway there, don’t stop 😌";
            if (kisses === 40) message.textContent = "You’re obsessed and I love it 😭";

            if (kisses >= target) unlock();
        }

        function unlock() {
            safeConfetti();

            treats.classList.remove("hidden");
            treats.classList.add("visible");

            unlockText.classList.remove("hidden");
            nextBtn.classList.remove("hidden");

            if (bgMusic) {
                bgMusic.volume = 0;
                bgMusic.play().catch(() => {});
                let fade = setInterval(() => {
                    if (bgMusic.volume < 0.9) {
                        bgMusic.volume += 0.05;
                    } else {
                        clearInterval(fade);
                    }
                }, 200);
            }
        }

        function addKiss(e) {
            if (kisses >= target) return;

            kisses++;
            updateUI();

            const x = e.clientX || window.innerWidth / 2;
            const y = e.clientY || window.innerHeight / 2;

            const kiss = document.createElement("div");
            kiss.className = "floating-kiss";
            kiss.textContent = "💋";
            kiss.style.left = x + "px";
            kiss.style.top = y + "px";
            document.body.appendChild(kiss);
            setTimeout(() => kiss.remove(), 2000);

            createSparkle(x, y);

            if (kissSound) kissSound.play().catch(() => {});
        }

        if (kissBtn) kissBtn.addEventListener("click", addKiss);
        document.addEventListener("click", function (e) {
            if (e.target !== kissBtn) addKiss(e);
        });

        if (nextBtn) nextBtn.addEventListener("click", () => goNext("page3.html"));
    }

    /* -------------------------------- */
    /* PAGE 3 – GAME */
    /* -------------------------------- */

    if (document.body.classList.contains("page3")) {

        let score = 0;
        const goal = 20;

        const scoreDisplay = document.getElementById("score");
        const winMessage = document.getElementById("win-message");
        const nextBtn = document.getElementById("next-btn");

        function spawnHeart() {
            const heart = document.createElement("div");
            heart.className = "heart";
            heart.textContent = "💖";
            heart.style.left = Math.random() * window.innerWidth + "px";

            heart.addEventListener("click", function () {
                score++;
                scoreDisplay.textContent = `Love Points: ${score}`;
                heart.remove();
                safeConfetti();

                if (score >= goal) {
                    winMessage.classList.remove("hidden");
                    nextBtn.classList.remove("hidden");
                }
            });

            document.body.appendChild(heart);

            setTimeout(() => heart.remove(), 15000);
        }

        setInterval(spawnHeart, 1200);

        if (nextBtn) nextBtn.addEventListener("click", () => goNext("page4.html"));
    }

    /* -------------------------------- */
    /* PAGE 5 – SECRET PAGE */
    /* -------------------------------- */

    if (document.body.classList.contains("page5")) {

        const input = document.getElementById("password-input");
        const error = document.getElementById("error-message");
        const secret = document.getElementById("secret-message");
        const nextBtn = document.getElementById("next-btn");

        input.addEventListener("keyup", function (e) {
            if (e.key === "Enter") {
                if (input.value === "1403") {
                    secret.classList.remove("hidden");
                    nextBtn.classList.remove("hidden");
                } else {
                    error.classList.remove("hidden");
                    input.classList.add("shake");
                }
            }
        });

        if (nextBtn) nextBtn.addEventListener("click", () => goNext("page6.html"));
    }

    /* -------------------------------- */
    /* PAGE 6 – JOURNEY */
    /* -------------------------------- */

    if (document.body.classList.contains("page6")) {

        const bubbles = document.querySelectorAll(".year-bubble");
        const memoryText = document.getElementById("memory-text");
        const nextBtn = document.querySelector(".next-btn");

        const memories = {
            2023: "The beginning of something beautiful.",
            2024: "We grew stronger together.",
            2025: "More memories, more love.",
            2026: "Still choosing each other every day."
        };

        bubbles.forEach(bubble => {
            bubble.addEventListener("click", function () {
                const year = bubble.getAttribute("data-year");
                memoryText.textContent = memories[year];
            });
        });

        if (nextBtn) nextBtn.addEventListener("click", () => goNext("page7.html"));
    }

    /* -------------------------------- */
    /* PAGE 7 – FLIP CARDS */
    /* -------------------------------- */

    if (document.body.classList.contains("page7")) {

        window.flipCard = function (card) {
            card.classList.toggle("flipped");
        };

        const nextBtn = document.querySelector(".next-btn");
        if (nextBtn) nextBtn.addEventListener("click", () => goNext("page8.html"));
    }

    /* -------------------------------- */
    /* PAGE 8 – FUTURE LOADING */
    /* -------------------------------- */

    if (document.body.classList.contains("page8")) {

        const fill = document.getElementById("loading-fill");
        const text = document.getElementById("loading-text");
        const finalMessage = document.getElementById("final-message");
        const nextBtn = document.getElementById("next-btn");

        let progress = 0;

        const interval = setInterval(() => {
            progress += 5;
            fill.style.width = progress + "%";

            if (progress === 25) text.textContent = "Building dreams...";
            if (progress === 50) text.textContent = "Making memories...";
            if (progress === 75) text.textContent = "Planning forever...";
            if (progress >= 100) {
                clearInterval(interval);
                text.textContent = "Forever starts now.";
                finalMessage.classList.remove("hidden");
                nextBtn.classList.remove("hidden");
            }
        }, 200);

        if (nextBtn) nextBtn.addEventListener("click", () => goNext("page9.html"));
    }

    /* -------------------------------- */
    /* PAGE 9 – FINAL */
    /* -------------------------------- */

    if (document.body.classList.contains("page9")) {

        const gift = document.getElementById("gift-box");
        const message = document.getElementById("surprise-message");
        const backBtn = document.getElementById("back-btn");

        if (gift) {
            gift.addEventListener("click", function () {
                safeConfetti();
                message.classList.remove("hidden");
                backBtn.classList.remove("hidden");
            });
        }

        if (backBtn) backBtn.addEventListener("click", () => goNext("index.html"));
    }

});
