const ADMIN_PASSWORD = "1234";

function checkPassword() {
    const input = document.getElementById("password").value;

    if (input === ADMIN_PASSWORD) {
        document.getElementById("login").style.display = "none";
        document.getElementById("dashboard").classList.remove("hidden");
    } else {
        alert("Wrong password");
    }
}

function preview() {
    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;
    const image = document.getElementById("image").value;

    document.getElementById("previewBox").innerHTML = `
        <strong>${title}</strong><br>
        ${body}<br>
        ${image ? `<img src="${image}">` : ""}
    `;
}

function saveDraft() {
    const draft = {
        title: document.getElementById("title").value,
        body: document.getElementById("body").value
    };

    let drafts = JSON.parse(localStorage.getItem("drafts") || "[]");
    drafts.push(draft);

    localStorage.setItem("drafts", JSON.stringify(drafts));
    loadDrafts();
}

function loadDrafts() {
    const drafts = JSON.parse(localStorage.getItem("drafts") || "[]");

    document.getElementById("drafts").innerHTML =
        drafts.map(d => `<li>${d.title}</li>`).join("");
}

async function sendNow() {
    const payload = {
        title: document.getElementById("title").value,
        body: document.getElementById("body").value,
        image: document.getElementById("image").value,
        url: document.getElementById("url").value
    };

    await fetch("/.netlify/functions/send-notification", {
        method: "POST",
        body: JSON.stringify(payload)
    });

    let history = JSON.parse(localStorage.getItem("history") || "[]");
    history.push(payload);

    localStorage.setItem("history", JSON.stringify(history));

    let sent = Number(localStorage.getItem("sent") || 0);
    localStorage.setItem("sent", sent + 1);

    loadHistory();
    loadStats();

    alert("Notification Sent!");
}

function loadHistory() {
    const history = JSON.parse(localStorage.getItem("history") || "[]");

    document.getElementById("history").innerHTML =
        history.map(h => `<li>${h.title}</li>`).join("");
}

function loadStats() {
    document.getElementById("sentCount").innerText =
        localStorage.getItem("sent") || 0;

    document.getElementById("clickCount").innerText =
        localStorage.getItem("clicks") || 0;
}

function schedule() {
    const time = new Date(document.getElementById("scheduleTime").value).getTime();
    const now = Date.now();

    const delay = time - now;

    if (delay > 0) {
        setTimeout(sendNow, delay);
        alert("Scheduled!");
    }
}

loadDrafts();
loadHistory();
loadStats();
