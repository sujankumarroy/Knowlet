class Assistant {
    constructor() {
        this.cooldown = false;
        this.mode = "normal";

        this.input = document.getElementById("inputText");
        this.modes = document.querySelectorAll(".mode");

        this.API_URL = "https://knowlet.in/.netlify/functions/gemini";
    }

    initEvents() {
        /* ENTER TO SEND */
        this.input.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                this.sendRequest();
            }
        });

        document.getElementById("clear-all").addEventListener("click", () => {
            clearAll();
            this.mode = "normal";
            this.modes.forEach(b => b.classList.remove("active"));
        });

        document.getElementById("btnSend").addEventListener("click", () => this.sendRequest());

        this.modes.forEach(btn => {
            btn.addEventListener("click", () => {
                const selectedMode = btn.dataset.mode;

                this.modes.forEach(b => b.classList.remove("active"));

                if (this.mode === selectedMode) {
                    this.mode = "normal";
                    this.addMessage(`Mode: ${this.mode}`, "ai");
                } else {
                    this.mode = selectedMode;
                    btn.classList.add("active");
                    this.addMessage(`Mode: ${this.mode}`, "ai");
                }
            });
        });
    }

    /* ADD MESSAGE */
    addMessage(text, sender) {
        const chatBox = document.getElementById("chatBox");
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const div = document.createElement("div");
        div.className = `message ${sender}`;
        div.innerHTML = `${text} <span class="time">${time}</span>`;

        chatBox.appendChild(div);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    /* LOADER */
    addLoader() {
        const chatBox = document.getElementById("chatBox");

        const div = document.createElement("div");
        div.className = "message ai loader";
        div.id = "loader";
        div.innerText = "Typing...";

        chatBox.appendChild(div);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    removeLoader() {
        const loader = document.getElementById("loader");
        if (loader) loader.remove();
    }

    /* SEND REQUEST */
    async sendRequest() {
        if (this.cooldown) {
            this.addMessage("⏳ Please wait before sending another message.", "ai");
            return;
        }

        const text = this.input.value.trim();

        if (!text) return;

        this.addMessage(text, "user");
        this.input.value = "";

        this.addLoader();

        try {
            const res = await fetch(this.API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ text, mode: this.mode })
            });

            const data = await res.json();
            this.removeLoader();

            if (!data.success) {
                // 🚨 Rate limit handling
                if (data.type === "rate_limit") {
                    this.addMessage(data.message, "ai");
                    this.startCountdown(data.retryAfter);
                    return;
                }

                this.addMessage("⚠️ " + (data.error || "Something went wrong"), "ai");
                return;
            }

            /* CHAT */
            if (data.type === "chat" || data.type === "identity") {
                this.addMessage(data.message, "ai");
            }

            /* QUIZ */
            if (data.type === "quiz") {
                this.renderQuiz(data.quiz);
            }

        } catch (err) {
            this.removeLoader();
            this.addMessage("Request failed.", "ai");
        }
    }

    /* QUIZ RENDER */
    renderQuiz(quiz) {
        quiz.forEach((q, index) => {
            const chatBox = document.getElementById("chatBox");

            const div = document.createElement("div");
            div.className = "message ai";

            let html = `<strong>Q${index + 1}. ${q.question}</strong>`;

            q.options.forEach(opt => {
                html += `
                    <label>
                        <input type="radio" name="q${index}" value="${opt}">
                        ${opt}
                    </label>
                `;
            });

            html += `<div class="result"></div>`;

            div.innerHTML = html;
            chatBox.appendChild(div);

            /* ADD EVENT LISTENER */
            const inputs = div.querySelectorAll("input");
            inputs.forEach(input => {
                input.addEventListener("change", () => {
                    checkAnswer(input, q.answer);
                });
            });

            chatBox.scrollTop = chatBox.scrollHeight;
        });
    }

    /* CHECK ANSWER */
    checkAnswer(input, correct) {
        const parent = input.closest(".message");
        const result = parent.querySelector(".result");

        if (input.value === correct) {
            result.innerHTML = "✅ Correct";
            result.style.color = "#22c55e";
        } else {
            result.innerHTML = `❌ Wrong (Correct: ${correct})`;
            result.style.color = "red";
        }
    }

    /* COUNTDOWN */
    startCountdown(seconds) {
        const button = document.getElementById("btnSend");
        this.cooldown = true;
        button.disabled = true;

        let timeLeft = seconds;

        const interval = setInterval(() => {
            button.innerText = `⏳ ${timeLeft}s`;

            timeLeft--;

            if (timeLeft < 0) {
                clearInterval(interval);
                button.innerText = "➤";
                button.disabled = false;
                this.cooldown = false;
            }
        }, 1000);
    }

    /* TOOLS */
    clearAll() {
        const chatBox = document.getElementById("chatBox");
        chatBox.innerHTML = "";
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const assistant = new Assistant();
    assistant.initEvents();
});
