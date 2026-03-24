class FavouriteManager {
    constructor() {
        this.user = JSON.parse(localStorage.getItem("knowletUser"));
        this.favouritesList = document.getElementById('favourites-list');
    }

    showError(message) {
        this.favouritesList.innerHTML =
            `<li class="empty-message">${message}</li>`;
    }

    async render() {
        if (!this.user) {
            this.showError('You are not Logged In, Try to login or Signup and start exploring the unit pages!');
            return;
        }

        try {
            const res = await fetch('https://knowlet.in/.netlify/functions/get-interactions?action=favs', {
                method: 'POST',
                header: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: this.user.id
                })
            });

            if(!res.ok) {
                console.error(`Failed to fetch, status code: ${res.status}`);
                this.showError('Failed to fetch history.');
            }

            const { data: favs, error } = await res.json();

            if (error) {
                console.error(error);
                this.showError('Failed to fetch data, try to refresh the page!');
                return;
            }

            favs.sort((a, b) => {
                const dateA = a.interactions_time.faved_at ?? "";
                const dateB = b.interactions_time.faved_at ?? "";
                return dateB.localeCompare(dateA);
            });

            this.favouritesList.innerHTML = '';

            if (favs.length === 0) {
                this.showError('You have no pages marked as favourite yet. Go to a unit page and click "Add to Favourites"!');
                return;
            }

            favs.forEach(item => {
                const title = item.page_title ? item.page_title : Utils.generateTitleFromURL(item.page_id);
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <a href="${item.page_id}" title="Go to ${title}">${title}</a>
                `;
                this.favouritesList.appendChild(listItem);
            });
        } catch(err) {
            console.error(err);
            this.showError('Failed to fetch data');
        }
    }
};

new FavouriteManager().render();
