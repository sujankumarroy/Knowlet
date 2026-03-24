class Navigator {
    constructor() {
        this.params = new URLSearchParams(window.location.search);
        this.root = this.params.get("root") || "notes";
        
        this.currentTitle = ["Semesters", "Subjects", "Papers", "Units"]
        
        this.data = null;
        this.prevClicks = [this.root];
        
        fetch(`assets/${this.root}.json`)
            .then(res => res.json())
            .then(d => {
                this.data = d;
                try {
                    this.initiateSetup();
                } catch(error) {
                    console.error(error);
                }
            })
            .catch(err => {console.error("Failed to load notes.json:", err);});
        this.initEvents();
    }

    initEvents() {
        document.getElementById("back-btn").addEventListener("click", () => this.goBack());
        document.getElementById("notes-btn").addEventListener("click", () => this.loadJson("notes"));
        document.getElementById("pyq-btn").addEventListener("click", () => this.loadJson("pyq"));
        
        document.getElementById("contents").addEventListener("click", (e) => {
            const card = e.target.closest(".subject-card");
            if (!card) return;
            const level = card.dataset.level;
            this.navigateTo(level);
        
        });
        
        document.getElementById("path").addEventListener("click", (e) => {
            const btn = e.target.closest(".path-btn");
            if (!btn) return;
            const level = btn.dataset.level;
            this.navigateBackTo(level);
        
        });
        
        window.addEventListener("popstate", (event) => {
            if (!event.state || !event.state.prevClicks) return;
        
            this.prevClicks = [...event.state.prevClicks];
            this.createPage();
        });
    }

    loadJson(name) {
        this.root = name;
        this.prevClicks = [this.root];
    
        history.replaceState(
            { prevClicks: [this.root] },
            "",
            `/navigator?root=${this.root}`
        );
    
        fetch(`assets/${this.root}.json`)
            .then(res => res.json())
            .then(d => {
                this.data = d;
                try {
                    this.initiateSetup();
                } catch(error) {
                    console.error(error);
                }
            });
    }

    initiateSetup() {
        this.syncStateFromURL();
        this.setupHistoryStack();
        history.replaceState(
            this.getState(),
            "",
            this.buildURL()
        );
    
        this.createPage();
    }

    syncStateFromURL() {
        const params = new URLSearchParams(window.location.search);
        const keys = ["sem", "sub", "ppr", "unit"];
    
        this.prevClicks = [this.root];
    
        for (let i = 0; i < keys.length; i++) {
            const value = params.get(keys[i]);
            if (value) {
                this.prevClicks.push(value);
            }
        }
    }

    setupHistoryStack() {
        const keys = ["root", "sem", "sub", "ppr", "unit"];
        const params = new URLSearchParams(window.location.search);
    
        let baseClicks = [];
        history.replaceState({ prevClicks: baseClicks }, "", `/navigator?root=${this.root}`);
    
        for (let i = 0; i < keys.length; i++) {
            const value = params.get(keys[i]);
            if (value) {
                baseClicks = [...baseClicks, value];
    
                const tempParams = new URLSearchParams();
                for (let j = 0; j <= i; j++) {
                    tempParams.set(keys[j], baseClicks[j]);
                }
    
                if (value !== this.prevClicks[this.prevClicks.length - 1]) {
                    history.pushState(
                        { prevClicks: [...baseClicks] },
                        "",
                        "/navigator?" + tempParams.toString()
                    );
                }
            }
        }
    
        this.prevClicks = baseClicks.length ? [...baseClicks] : [this.root];
    }

    generateItems() {
        const notesArr = this.data;
    
        let target = this.prevClicks.filter(Boolean).join("/") + "/";
        let items = "";
        let temp = "";
    
        for (let i in notesArr) {
            const item = notesArr[i];
            const parts = item.path.split("/");
            if (item.path.includes(target)) {
    
                let current = parts[this.prevClicks.length];
    
                if (current !== temp) {
    
                    temp = current;
    
                    let tagName = (this.prevClicks.length === 3)
                            ? current.replace("_", " ").toUpperCase()
                            : current.replace("_", " ").replace(/\b\w/g, char => char.toUpperCase());
    
                    items += `<div class="subject-card" data-level="${current}"><h4>${tagName}</h4></div>`;
                }
            }
        }
        if (items) {
            return items;
        } else {
            window.location.href = this.prevClicks.join("/");
        }
    }

    createPage() {
    
        const contents = this.generateItems();
        if (!contents) return;
    
        const depth = this.prevClicks.length;
        const title = (depth === 4)
                ? this.prevClicks[depth - 1].replace("_", " ").toUpperCase()
                : this.prevClicks[depth - 1].replace("_", " ").replace(/\b\w/g, char => char.toUpperCase());
    
        const subTitle = this.currentTitle[depth - 1];
        const path = this.prevClicks.filter(Boolean).map(click => `<button class="path-btn" data-level="${click}">${click.replace("null/", "")}</button>`).join("/");
    
        this.renderContent(title, subTitle, path, contents);
    }

    renderContent(title, subTitle, path, contents) {
        document.getElementById("title").textContent = title;
        document.getElementById("sub-title").textContent = subTitle;
        document.getElementById("path").innerHTML = path;
        document.getElementById("contents").innerHTML = contents;
    }

    navigateTo(level) {
        this.prevClicks.push(level);
    
        history.pushState(
            this.getState(),
            "",
            this.buildURL()
        );
    
        this.createPage();
    }

    buildURL() {
        const keys = ["root", "sem", "sub", "ppr", "unit"];
        const params = new URLSearchParams();
    
        for (let i = 0; i < this.prevClicks.length; i++) {
            if (this.prevClicks[i]) {
                params.set(keys[i], this.prevClicks[i]);
            }
        }
    
        return "/navigator?" + params.toString();
    }

    navigateBackTo(level) {
    
        const index = this.prevClicks.indexOf(level);
    
        if (index !== -1) this.prevClicks.length = index + 1;
    
        history.pushState(
            this.getState(),
            "",
            this.buildURL()
        );
    
        this.createPage();
    }

    getState() {
        return {
            prevClicks: [...this.prevClicks]
        };
    }

    goBack() {
        if (this.prevClicks.length === 1) {
            window.location.href = "/";
            return;
        }
    
        history.back();
    }
}

new Navigator();