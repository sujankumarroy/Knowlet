async function sendRequest() {
    const text = document.getElementById("inputText").value.trim();
    const difficulty = document.getElementById("difficulty").value;
    const output = document.getElementById("output");
    const loader = document.getElementById("loader");

    if (!text) {
        output.innerHTML = "Please enter something.";
        return;
    }

    output.innerHTML = "";
    loader.style.display = "block";

    try {
        const res = await fetch("http://localhost:8888/.netlify/functions/gemini", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text, difficulty })
        });

        const data = await res.json();

        loader.style.display = "none";

        if (!data.success) {
            output.innerHTML = "Error: " + data.error;
            return;
        }

        // 🧠 CHAT RESPONSE
        if (data.type === "chat") {
            output.innerHTML = data.message;
            return;
        }

        // 📘 QUIZ RESPONSE
        if (data.type === "quiz") {
            renderQuiz(data.quiz);
        }

        // 👤 IDENTITY
        if (data.type === "identity") {
            output.innerHTML = data.message;
        }

    } catch (err) {
        loader.style.display = "none";
        output.innerHTML = "Request failed.";
    }
}

function renderQuiz(quiz) {
    const output = document.getElementById("output");

    output.innerHTML = "";

    quiz.forEach((q, index) => {
        const div = document.createElement("div");
        div.className = "question";

        let html = `<strong>Q${index + 1}. ${q.question}</strong><br>`;

        q.options.forEach(opt => {
            html += `<div class="option">${opt}</div>`;
        });

        html += `<div class="answer">Answer: ${q.answer}</div>`;

        div.innerHTML = html;
        output.appendChild(div);
    });
}
