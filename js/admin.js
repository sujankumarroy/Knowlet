let ADMIN_PASSWORD = "";
const inputIds = ["title", "body", "image", "url"];

function initEventListener() {
  inputIds.forEach((inputId) => {
    document
      .getElementById(inputId)
      .addEventListener("input", () => updatePreview(inputId));
  });
}

async function sendNow(to) {
  const payload = {
    title: document.getElementById("title").value,
    body: document.getElementById("body").value,
    // icon: "/assets/icons/knowlet/android-chrome-192x192.png",
    // badge: "/assets/icons/owlet/favicon-32x32.png",
    image: document.getElementById("image").value,
    // tag: "profile",
    url: document.getElementById("url").value,
    ADMIN_PASSWORD,
  };

  const url =
    to === "sujan"
      ? "https://knowlet.in/.netlify/functions/send-notification-copy"
      : "https://knowlet.in/.netlify/functions/send-notification";

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    console.error(`failed to fetch, status code: ${res.status}`);
    alert("failed to send");
    return;
  }

  let history = JSON.parse(localStorage.getItem("history") || "[]");
  history.push(payload);

  localStorage.setItem("history", JSON.stringify(history));

  let sent = Number(localStorage.getItem("sent") || 0);
  localStorage.setItem("sent", sent + 1);

  loadHistory();
  loadStats();

  alert("Notification Sent!");
}

function checkPassword() {
  ADMIN_PASSWORD = document.getElementById("password").value + "";
  document.getElementById("login").style.display = "none";
  document.getElementById("dashboard").classList.remove("hidden");
}

function updatePreview(item) {
  if (item === "image") {
    document.getElementById("preview" + "-" + item).src =
      document.getElementById(item).value;
  } else if (item === "url") {
    document
      .getElementById("previewBox")
      .addEventListener("click", redirectPreview);
  } else if (item) {
    document.getElementById("preview" + "-" + item).textContent =
      document.getElementById(item).value;
  }

  function redirectPreview() {
    const url = document.getElementById("url").value;

    if (url) {
      window.location.href = url;
    }
  }
}

function saveDraft() {
  const draft = {
    title: document.getElementById("title").value,
    body: document.getElementById("body").value,
    image: document.getElementById("image").value,
    url: document.getElementById("url").value,
  };

  let drafts = JSON.parse(localStorage.getItem("drafts") || "[]");
  drafts.push(draft);

  localStorage.setItem("drafts", JSON.stringify(drafts));
  loadDrafts();
}

function loadInput(value) {
  inputIds.forEach((id) => {
    document.getElementById(id).value = value[id] || "";
    updatePreview(id);
  });
}

function loadDrafts() {
  const drafts = JSON.parse(localStorage.getItem("drafts") || "[]");

  document.getElementById("drafts").innerHTML = drafts
    .map((d) => `<li onclick='loadInput(${JSON.stringify(d)})'>${d.title}</li>`)
    .join("");
}

function loadHistory() {
  const history = JSON.parse(localStorage.getItem("history") || "[]");

  document.getElementById("history").innerHTML = history
    .map((h) => `<li onclick='loadInput(${JSON.stringify(h)})'>${h.title}</li>`)
    .join("");
}

function loadStats() {
  document.getElementById("sentCount").innerText =
    localStorage.getItem("sent") || 0;

  document.getElementById("clickCount").innerText =
    localStorage.getItem("clicks") || 0;
}

function schedule() {
  const time = new Date(
    document.getElementById("scheduleTime").value,
  ).getTime();
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
initEventListener();
