class PWAHandler {
    constructor(installBtnId, downloadBtnId) {
        this.installBtn = document.getElementById(installBtnId);
        this.downloadBtn = document.getElementById(downloadBtnId);
        this.deferredPrompt = null;
        this.init();
    }

    async init() {
        if ('serviceWorker' in navigator) {
            const registration = await navigator.serviceWorker.register('/sw.js');
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                const existing = await registration.pushManager.getSubscription();
                if (existing) {
                    console.log("Already subscribed");
                    return;
                }
                const subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: this.urlBase64ToUint8Array("BPIVLOVmpkKigNRdGMvLHkb-N_0sZWHspIEN4XzafxESg7M5sO9KAgto8OdCUqU3Jl-F-Cq2TKdAibbCK64U1cg")
                });
                await fetch("https://knowlet.in/.netlify/functions/save-subscription", {
                    method: "POST",
                    body: JSON.stringify(subscription),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            }
        }

        window.addEventListener("beforeinstallprompt", (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            if (this.installBtn) this.installBtn.style.display = "";
            if (this.downloadBtn) this.downloadBtn.style.display = "none";
        });

        if (this.installBtn) {
            this.installBtn.addEventListener("click", () => this.handleInstall());
        }
    }

    async handleInstall() {
        if (!this.deferredPrompt) return;
        this.deferredPrompt.prompt();
        const { outcome } = await this.deferredPrompt.userChoice;
        console.log(`User response to install: ${outcome}`);
        this.deferredPrompt = null;
    }

    urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/-/g, '+')
            .replace(/_/g, '/');
        const rawData = atob(base64);
        return new Uint8Array([...rawData].map(char => char.charCodeAt(0)));
    }
}

class HistoryManager {
    constructor(apiEndpoint, userData) {
        this.apiEndpoint = apiEndpoint;
        this.user = userData;
    }

    async fetchHistory() {
        if (!this.user) throw new Error("USER_NOT_LOGGED_IN");

        const res = await fetch(this.apiEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: this.user.id })
        });

        const { data, error } = await res.json();
        if (error) throw new Error("FETCH_ERROR");

        return this.processData(data);
    }

    processData(data) {
        let history = [];
        data.forEach((item) => {
            const visitTimes = JSON.parse(item.visit_time);
            visitTimes.forEach((ts) => {
                if (ts) {
                    history.push({
                        url: item.page_id,
                        title: item.page_title,
                        timestamp: ts
                    });
                }
            });
        });
        return history.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
    }
}

class HistoryUI {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    getRandomColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    }

    formatTime(timestamp) {
        if (!timestamp) return '';
        return new Date(timestamp).toLocaleString('en-US', { 
            month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' 
        });
    }

    showError(message) {
        this.container.innerHTML = `<div class="empty-message-scroll">${message}</div>`;
    }

    render(historyItems) {
        if (historyItems.length === 0) {
            this.showError("Your history is empty. Visit some unit pages!");
            return;
        }

        this.container.innerHTML = '';
        historyItems.forEach((item, index) => {
            const color = this.getRandomColor();
            const div = document.createElement('div');
            div.className = 'history-scroll-item';
            div.style.cssText = `
                background-color: rgba(255, 255, 255, 0.95);
                border-left-color: ${color};
                box-shadow: 0 2px 5px ${color}33;
                animation-delay: ${index * 0.08}s;
            `;

            div.innerHTML = `
                <a href="${item.url}" title="${item.title}" style="color: ${color};">${item.title}</a>
                <span class="timestamp">${this.formatTime(item.timestamp)}</span>
            `;
            this.container.appendChild(div);
        });

        this.applyMarquee(historyItems.length);
    }

    applyMarquee(count) {
        const itemWidth = 215;
        const totalWidth = count * itemWidth;
        this.container.style.width = `${totalWidth}px`;
        this.container.style.animationDuration = `${count * 3}s`;

        const style = document.createElement('style');
        style.textContent = `
            @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-${totalWidth}px); }
            }
        `;
        document.head.appendChild(style);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const pwa = new PWAHandler("installBtn", "download-btn");
    const ui = new HistoryUI("scroll-content");
    const user = JSON.parse(localStorage.getItem("knowletUser"));

    const manager = new HistoryManager(
        'https://knowlet.in/.netlify/functions/get-history', 
        user
    );

    try {
        const historyData = await manager.fetchHistory();
        ui.render(historyData);
    } catch (err) {
        if (err.message === "USER_NOT_LOGGED_IN") {
            ui.showError("You are not Logged In.");
        } else {
            ui.showError("Failed to fetch history, try refreshing!");
        }
    }
});
