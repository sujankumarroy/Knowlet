class ProfileManager {
    constructor() {
        this.loginBtn = document.getElementById("login-btn");
        this.SignupBtn = document.getElementById("signup-btn");
        this.logoutBtn = document.getElementById("logout-btn");
        
        this.userName = document.getElementById("username");
        this.email = document.getElementById("email");
        this.userId = document.getElementById("userid");
        this.profilePic = document.getElementById("profile-pic");
        this.loader = document.getElementById("loader");
        this.recentActivityView = document.getElementById("recent-activity-view");
        
        this.isExist = false;
        this.user = localStorage.getItem("knowletUser");
        
        this.initEvent();
        this.sync();
    }

    initEvent() {
        this.profilePic.addEventListener("click", () => {
            if (this.isExist) {
                window.location.href = '/profile_complition_form';
            } else {
                window.location.href = '/login_signup';
            }
        });
        
        this.logoutBtn.addEventListener("click", () => {
            if (confirm("Logout?")) {
                this.logout();
            }
        });
    }

    logout() {
        localStorage.removeItem("knowletUser");
    
        this.user = null;
        this.isExist = false;
    
        try {
            document.getElementById("profile-btn").src = "assets/images/demo_pp.jpg";
        } catch(err) {
            console.error(err);
        }
    
        this.recentActivityView.innerHTML = `<p class="empty-message">You are Logged Out, Try to login again</p>`;
    
        this.userName.textContent = "Your Name";
        this.email.textContent = "yourname@example.com";
        this.userId.textContent = "User ID";
        this.profilePic.src = "assets/images/demo_pp.jpg";
    
        // Reset Stats Numbers
        document.getElementById("stat-comments").textContent = "0";
        document.getElementById("stat-likes").textContent = "0";
        document.getElementById("stat-ratings").textContent = "0";
        document.getElementById("stat-favs").textContent = "0";
        
        // Reset Streak
        document.getElementById("streak-text").textContent = "🔥 0 Day Streak";
        document.getElementById("freeze-text").textContent = "";
        document.getElementById("streak-row").innerHTML = "";
        
        // Reset Level
        document.getElementById("level-text").textContent = "Level: Beginner Explorer";
        document.getElementById("next-level-text").textContent = "";
        document.getElementById("level-fill").style.width = "0%";
        document.getElementById("xp-text").textContent = "";
        
        // Reset Profile Completion Ring
        const progressElement = document.getElementById("profile-progress");
        progressElement.style.background =
            "conic-gradient(#e5e7eb 0% 100%)";
        progressElement.classList.remove("complete");
        progressElement.setAttribute("data-progress", "0% Complete");
    
        this.loginBtn.style.display = "inline-block";
        this.SignupBtn.style.display = "inline-block";
        this.logoutBtn.style.display = "none";
    }

    async sync() {
        if (!this.user) {
            this.recentActivityView.innerHTML = `<p class="empty-message">You are not Logged In, Try to login or Signup and start exploring the unit pages!</p>`;
            return;
        }
    
        this.user = JSON.parse(this.user);
        this.fetchActivity();
    
        try {
            this.loader.style.display = "flex";
            
            const res = await fetch(
                'https://knowlet.in/.netlify/functions/get-data',
                {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ email: this.user.email, password: this.user.password })
                }
            );
            
            this.loader.style.display = "none";
            
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
        
            const { data, error } = await res.json();
        
            if (!data && !error) {
                alert("Your account has been deleted");
            }
            
            if (!error && data) {
                this.user = data[0];
            }
            
            this.renderUserInfo();
        } catch(e) {
            console.error(e);
            this.renderUserInfo();
            this.loader.style.display = "none";
        }
    }

    renderUserInfo() {
        if (!this.user) return;
        localStorage.setItem("knowletUser", JSON.stringify(this.user));
    
        this.userName.textContent = this.user.name;
        this.email.textContent = '' + this.user.email;
        this.userId.textContent = this.user.id;
        this.profilePic.src = this.user.picture || "assets/images/demo_pp.jpg";
    
        this.isExist = true;
        this.loginBtn.style.display = "none";
        this.SignupBtn.style.display = "none";
        this.logoutBtn.style.display = "block";
    }

    async fetchActivity() {
        try {
            const [res1, res2] = await Promise.all([
                fetch('https://knowlet.in/.netlify/functions/get-comments', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ userId: this.user.id })
                }),
                fetch('https://knowlet.in/.netlify/functions/get-interactions', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ user_id: this.user.id })
                })
            ]);
            
            if (!res1.ok || !res2.ok) {
                console.error(`Fetch failed: res1: ${res1.status}, res2: ${res2.status}`);
                return;
            }
            
            const [{ data: comments }, { data: interactions }] = await Promise.all([
                res1.json(),
                res2.json()
            ]);
            
            this.renderRecentActivity(comments, interactions);
            this.renderStats(comments, interactions);
        } catch(err) {
            console.error(err);
            this.recentActivityView.innerHTML = `<p class="empty-message">Failed to fetch recent activity</p>`;
        }
    }

    renderRecentActivity(comments = [], interactions = []) {
        comments = comments.map(c => {
            return {
                state: 'Commented',
                url: c.page_id,
                timeMs: new Date(c.created_at).getTime()
            };
        });
    
        let likes = [];
        let ratings = [];
        let favs = [];
    
        interactions.forEach((i) => {
            if (i.is_liked) {
                likes.push({
                    state: 'Liked',
                    url: i.page_id,
                    timeMs: new Date(i.interactions_time.liked_at).getTime()
                })
            }
            if (i.ratings_score) {
                ratings.push({
                    state: 'Rated',
                    url: i.page_id,
                    timeMs: new Date(i.interactions_time.rated_at).getTime()
                })
            }
            if (i.is_faved) {
                favs.push({
                    state: 'Faved',
                    url: i.page_id,
                    timeMs: new Date(i.interactions_time.faved_at).getTime()
                })
            }
        });
    
        const recentActivities = [...comments, ...likes, ...ratings, ...favs].sort((a, b) => b.timeMs - a.timeMs);
        
        let recentActivityItems = '';
    
        recentActivities.forEach((item) => {
            recentActivityItems += item.state ? `
                    <li>
                        ${item.state || 'Visited'} : <span class="example-title">${item.title || Utils.generateTitleFromURL(item.url)}</span> - ${item.timeMs ? Utils.timeAgo(item.timeMs) : 'Unknown'}<br>
                        <span class="example-heading">${item.heading ? item.heading : ''}</span> <a href="${item.url}">View</a>
                    </li>
                ` : '' ;
        });
    
        this.recentActivityView.innerHTML = recentActivityItems || `<p class="empty-message">No recent activity, visit notes, like, rate or comment </p>`;
    }

    renderStats(comments = [], interactions = []) {
    
        const totalComments = comments.length;
        const totalLikes = interactions.filter(i => i.is_liked).length;
        const totalRatings = interactions.filter(i => i.ratings_score).length;
        const totalFavs = interactions.filter(i => i.is_faved).length;
    
        const totalInteractions = totalComments + totalLikes + totalRatings + totalFavs;
    
        // Update UI
        document.getElementById("stat-comments").textContent = totalComments;
        document.getElementById("stat-likes").textContent = totalLikes;
        document.getElementById("stat-ratings").textContent = totalRatings;
        document.getElementById("stat-favs").textContent = totalFavs;
    
        // 🔥 STREAK SYSTEM (7 Day Visual + Freeze)
    
        const timestamps = [];
    
        comments.forEach(c => timestamps.push(new Date(c.created_at).getTime()));
    
        interactions.forEach(i => {
            if (i.ratings_score) timestamps.push(new Date(i.interactions_time.rated_at).getTime());
            if (i.is_faved) timestamps.push(new Date(i.interactions_time.faved_at).getTime());
            if (i.is_liked) timestamps.push(new Date(i.interactions_time.faved_at).getTime());
            });
    
        // ❗ Only count meaningful actions (no likes)
        const streakData = this.calculate7DayStreak(timestamps);
        
        document.getElementById("streak-text").textContent =
            streakData.currentStreak > 0
                ? `🔥 ${streakData.currentStreak} Day Streak (Best: ${streakData.longest})`
                : "Start your learning streak";
    
        document.getElementById("freeze-text").textContent =
            streakData.freezeUsed
                ? "❄ Freeze used"
                : "No freeze used";
    
        this.renderStreakCircles(streakData.days);
    
        // 🏆 LEVEL
    
        const levelData = this.getLevelData(
            totalComments,
            totalRatings,
            totalFavs,
            totalLikes
        );
        
        document.getElementById("level-text").textContent =
            `Level ${levelData.level}: ${levelData.levelName}`;
        
        document.getElementById("next-level-text").textContent =
            `${Math.max(levelData.required - levelData.xp, 0)} XP to next level`;
        
        document.getElementById("level-fill").style.width =
            levelData.progressPercent + "%";
        
        document.getElementById("xp-text").textContent =
            `${levelData.xp} XP`;
    
        // 📊 PROFILE COMPLETION (Advanced)
        
        let score = 0;
        
        if (this.user.name) score += 20;
        if (this.user.picture && !this.user.picture.includes("demo_pp")) score += 20;
        if (this.user.stream) score += 20;
        if (this.user.fv_subject) score += 20;
        if (totalInteractions > 0) score += 20;
        
        const progressElement = document.getElementById("profile-progress");
        
        // 🎨 Determine color based on score
        const getProgressColor = (s) => s < 50 ? "#ef4444" : s < 80 ? "#facc15" : "#22c55e";
        
        const color = getProgressColor(score);
        
        // Apply gradient
        progressElement.style.background =
            `conic-gradient(${color} ${score}%, #e5e7eb ${score}% 100%)`;
        
        // Tooltip
        progressElement.setAttribute("data-progress", score + "% Complete");
        
        // ✨ Glow when 100%
        if (score === 100) {
            progressElement.classList.add("complete");
        } else {
            progressElement.classList.remove("complete");
        }
    
    }

    calculate7DayStreak(timestamps) {
    
        const today = new Date();
        today.setHours(0, 0, 0, 0);
    
        const activeDays = new Set(
            timestamps.map(t => {
                const d = new Date(t);
                d.setHours(0, 0, 0, 0);
                return d.getTime();
            })
        );
    
        const days = [];
        let freezeUsed = false;
        let currentStreak = 0;
    
        // Build last 7 days (oldest → newest)
        for (let i = 6; i >= 0; i--) {
    
            const date = new Date(today);
            date.setDate(today.getDate() - i);
    
            const time = date.getTime();
            const active = activeDays.has(time);
    
            days.push({
                date: new Date(date),
                active,
                freeze: false
            });
        }
    
        // Calculate streak from today backwards
        for (let i = days.length - 1; i >= 0; i--) {
    
            if (days[i].active) {
                currentStreak++;
            }
            else if (!freezeUsed && days[i].date.getTime() !== today.getTime()) {
                freezeUsed = true;
                days[i].freeze = true;
                currentStreak++;
            }
            else {
                break;
            }
        }
    
        return {
            days,
            currentStreak,
            freezeUsed,
            longest: this.calculateLongestStreak(activeDays)
        };
    }

    renderStreakCircles(days) {
    
        const row = document.getElementById("streak-row");
        row.innerHTML = "";
    
        const todayString = new Date().toDateString();
    
        days.forEach((day, index) => {
    
            const item = document.createElement("div");
            item.classList.add("streak-item");
    
            const circle = document.createElement("div");
            circle.classList.add("streak-circle");
    
            const fill = document.createElement("div");
            fill.classList.add("streak-fill");
    
            if (day.freeze) {
                circle.classList.add("freeze");
            }
    
            // Highlight today
            if (day.date.toDateString() === todayString) {
                circle.classList.add("today");
    
                if (day.active) {
                    circle.classList.add("pulse");
                }
            }
    
            circle.appendChild(fill);
    
            const dateText = document.createElement("div");
            dateText.classList.add("streak-date");
    
            const dateObj = day.date;
            dateText.textContent =
                dateObj.getDate() + "/" + (dateObj.getMonth() + 1);
    
            // Tooltip full date
            item.setAttribute(
                "data-full-date",
                dateObj.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                })
            );
    
            item.appendChild(circle);
            item.appendChild(dateText);
            row.appendChild(item);
    
            // Animate fill
            if (day.active || day.freeze) {
                setTimeout(() => {
                    fill.style.height = "100%";
                }, index * 120);
            }
        });
    }

    calculateLongestStreak(activeDaysSet) {
    
        const days = Array.from(activeDaysSet).sort((a, b) => a - b);
    
        let longest = 0;
        let temp = 0;
    
        for (let i = 0; i < days.length; i++) {
    
            if (i === 0) {
                temp = 1;
            } else {
                const diff = (days[i] - days[i - 1]) / 86400000;
    
                if (diff === 1) temp++;
                else temp = 1;
            }
    
            if (temp > longest) longest = temp;
        }
    
        return longest;
    }

    getLevelData(totalComments, totalRatings, totalFavs, totalLikes) {
    
        // XP weights
        const xp =
            totalComments * 5 +
            totalRatings * 4 +
            totalFavs * 3 +
            totalLikes * 1;
    
        let level = 1;
        let required = 20;          // XP required for level 1 → 2
        let previousRequired = 0;
    
        while (xp >= required) {
            previousRequired = required;
            level++;
            required = Math.floor(required * 1.6); // scaling
        }
    
        const progressPercent =
            ((xp - previousRequired) / (required - previousRequired)) * 100;
    
        const levelNames = [
            "Reader",
            "Explorer",
            "Scholar",
            "Analyst",
            "Researcher",
            "Specialist",
            "Authority",
            "Master"
        ];
    
        const levelName = levelNames[level - 1] || "Legend";
    
        return {
            level,
            levelName,
            xp,
            required,
            progressPercent: Math.min(progressPercent, 100)
        };
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new ProfileManager();
});
