class HistoryManager {
    constructor() {
        this.user = JSON.parse(localStorage.getItem("knowletUser"));
        this.historyList = document.getElementById('history-list');
    }

    showError(message) {
        this.historyList.innerHTML =
            `<li class="empty-message">${message}</li>`;
    }

    async render() {
        if (!this.user) {
            this.showError('You are not Logged In, Try to login or Signup and start exploring the unit pages!');
            return;
        }

        try {
            const res = await fetch('https://knowlet.in/.netlify/functions/get-history', {
                method: 'POST',
                header: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: this.user.id
                })
            });

            if(!res.status) {
                console.error(`Failed to fetch, status code ${res.status}`);
                this.showError('Failed to fetch history');
            }

            const { data, error } = await res.json();

            if (error) {
                console.error(error);
                this.showError('Failed to fetch history, try to refresh the page!');
                return;
            }

            let history = [];
            data.forEach((item) => {
                JSON.parse(item.visit_time).forEach((ts) => {
                    if (ts) {
                        history.push({
                            url: item.page_id,
                            title: item.page_title,
                            timestamp: ts
                        })
                    }
                });
            });

            history.sort((a, b) => {
                const dateA = a.timestamp ?? "";
                const dateB = b.timestamp ?? "";
                return dateB.localeCompare(dateA);
            });

            this.historyList.innerHTML = ''; // Clear loading message

            if (history.length === 0) {
                this.showError('Your visit history is empty. Start exploring the unit pages!');
                return;
            }

            let tempUrl, tempTa;
            history.forEach(item => {
                const time = Utils.timeAgo(new Date(item.timestamp).getTime());
                if (!(tempUrl === item.url && tempTa === time)) {
                    const listItem = document.createElement('li');
                    const title = item.title || Utils.generateTitleFromURL(item.url)
                    listItem.innerHTML = `
    <a href="${item.url}" title="Go to ${title}">${title}</a>
    <span class="timestamp">${time}</span>
                    `;
                    this.historyList.appendChild(listItem);
                }
                tempUrl = item.url;
                tempTa = time;
            });
        } catch(err) {
            console.error(err);
            this.showError('Failed to fetch data');
        }
    }
};

new HistoryManager().render();
