let cooldown = false;
let mode = "normal";

const input = document.getElementById("inputText");

const API_URL = "http://localhost:8888/.netlify/functions/gemini";

document.getElementById("quiz-mode").addEventListener("click", (e) => activateMode(e.target, "quiz"));

document.getElementById("clear-all").addEventListener("click", clearAll);

/* ADD MESSAGE */
function addMessage(text, sender) {
    const chatBox = document.getElementById("chatBox");

    const div = document.createElement("div");
    div.className = `message ${sender}`;
    div.innerHTML = text;

    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

/* LOADER */
function addLoader() {
    const chatBox = document.getElementById("chatBox");

    const div = document.createElement("div");
    div.className = "message ai loader";
    div.id = "loader";
    div.innerText = "Typing...";

    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function removeLoader() {
    const loader = document.getElementById("loader");
    if (loader) loader.remove();
}

/* SEND REQUEST */
async function sendRequest() {
    if (cooldown) {
        addMessage("⏳ Please wait before sending another message.", "ai");
        return;
    }

    const input = document.getElementById("inputText");
    const text = input.value.trim();

    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    addLoader();

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text, mode })
        });

        const data = await res.json();
        removeLoader();

        if (!data.success) {
            // 🚨 Rate limit handling
            if (data.type === "rate_limit") {
                addMessage(data.message, "ai");
                startCountdown(data.retryAfter);
                return;
            }

            addMessage("⚠️ " + (data.error || "Something went wrong"), "ai");
            return;
        }

        /* CHAT */
        if (data.type === "chat" || data.type === "identity") {
            addMessage(data.message, "ai");
        }

        /* QUIZ */
        if (data.type === "quiz") {
            renderQuiz(data.quiz);
        }

    } catch (err) {
        removeLoader();
        addMessage("Request failed.", "ai");
    }
}

/* ENTER TO SEND */
document.getElementById("inputText").addEventListener("keydown", function(e) {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendRequest();
    }
});

/* QUIZ RENDER */
function renderQuiz(quiz) {
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
function checkAnswer(input, correct) {
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

function startCountdown(seconds) {
    const button = document.getElementById("btnSend");
    cooldown = true;
    button.disabled = true;

    let timeLeft = seconds;

    const interval = setInterval(() => {
        button.innerText = `⏳ ${timeLeft}s`;

        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(interval);
            button.innerText = "➤";
            button.disabled = false;
            cooldown = false;
        }
    }, 1000);
}

/* TOOLS */
function clearAll() {
    const chatBox = document.getElementById("chatBox");
    chatBox.innerHTML = "";
}

function activateMode(btnQuiz, m) {
    if (mode !== m) {
        btnQuiz.classList.add("active");
        mode = m;
    } else {
        btnQuiz.classList.remove("active");
        mode = "normal";
    }
}
