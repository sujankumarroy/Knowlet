let ADMIN_PASSWORD = "";
const inputIds = ["title", "body", "image", "url"];
const defaultPreview = {
  title: "⚡ Stop Scrolling. Start Revising.",
  body: "Important topics, quick notes & exam-focused questions ready for you.",
  image:
    "https://res.cloudinary.com/db975putk/image/upload/q_auto/f_auto/v1778231354/ChatGPT_Image_May_8_2026_02_16_27_PM_y2cunt.png",
  url: "https://knowlet.in",
};

const deleteIcon = `<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M3 6h18" />
  <path d="M8 6V4h8v2" />
  <path d="M19 6l-1 14H6L5 6" />
  <path d="M10 11v6" />
  <path d="M14 11v6" />
</svg>`;

function initEventListener() {
  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    ADMIN_PASSWORD = document.getElementById("password").value + "";
    document.getElementById("login").style.display = "none";
    document.getElementById("dashboard").classList.remove("hidden");
  });

  inputIds.forEach((inputId) => {
    document
      .getElementById(inputId)
      .addEventListener("input", () => updatePreview(inputId));
  });
}

async function sendNow(to) {
  const payload = {
    title: document.getElementById("title").value || defaultPreview.title,
    body: document.getElementById("body").value || defaultPreview.body,
    // icon: "/assets/icons/knowlet/android-chrome-192x192.png",
    // badge: "/assets/icons/owlet/favicon-32x32.png",
    image: document.getElementById("image").value || defaultPreview.image,
    // tag: "profile",
    url: document.getElementById("url").value || defaultPreview.url,
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

  delete payload.ADMIN_PASSWORD;
  let history = JSON.parse(localStorage.getItem("history") || "[]");
  history.push({ id: crypto.randomUUID(), to: to ? to : "public", ...payload });

  localStorage.setItem("history", JSON.stringify(history));

  let sent = Number(localStorage.getItem("sent") || 0);
  localStorage.setItem("sent", sent + 1);

  loadHistory();
  loadStats();

  alert("Notification Sent!");
}

function updatePreview(item) {
  if (item === "image") {
    document.getElementById("preview" + "-" + item).src =
      document.getElementById(item).value || defaultPreview[item];
  } else if (item === "url") {
    document
      .getElementById("previewBox")
      .addEventListener("click", redirectPreview);
  } else if (item) {
    document.getElementById("preview" + "-" + item).textContent =
      document.getElementById(item).value || defaultPreview[item];
  }

  function redirectPreview() {
    const url = document.getElementById("url").value || defaultPreview[item];

    if (url) {
      window.location.href = url;
    }
  }
}

function saveDraft() {
  const draft = {
    id: crypto.randomUUID(),
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

  document.getElementById("drafts").innerHTML =
    drafts
      .map(
        (d) =>
          `<li onclick='loadInput(${JSON.stringify(d)})'>${d.title}<span id='delete' onclick='trash("${d.id}", "drafts")'>${deleteIcon}</span></li>`,
      )
      .join("") || "<p class='empty-message'>Empty Draft</p>";
}

function loadHistory() {
  const history = JSON.parse(localStorage.getItem("history") || "[]");

  document.getElementById("history").innerHTML =
    history
      .map(
        (h) =>
          `<li onclick='loadInput(${JSON.stringify(h)})'>${h.title}<span id='visible-to'>${h.to}</span></li>`,
      )
      .join("") || "<p class='empty-message'>Empty notificaiton history</p>";
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

function trash(id, from) {
  const data = JSON.parse(localStorage.getItem(from) || "[]");
  const index = data.findIndex((i) => i.id === id);
  data.splice(index, 1);
  localStorage.setItem(from, JSON.stringify(data));
  if (from === "drafts") loadDrafts();
  else if (from === "history") loadHistory();
  return data;
}

document.getElementById("password").focus();
loadDrafts();
loadHistory();
loadStats();
initEventListener();
