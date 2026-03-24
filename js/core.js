const pageId = (window.location.href + '').replace('.html', '').replace(window.location.origin, 'https://knowlet.in');
const pageTitle = document.querySelector('h1').textContent;
let user = JSON.parse(localStorage.getItem("knowletUser"));

// Create UI on load
renderNavBar();
renderFeedbackSection();

const likeIcon = document.getElementById("like-icon");
const totalLikesD = document.getElementById("total-likes");
const favBtn = document.getElementById("fav-btn");
const topBar = document.getElementsByClassName("unit-top-bar")[0];
const ratingsBox = document.getElementById("ratings-box");
const ratingMsgInput = document.getElementById("rating-message");
const commentsBox = document.getElementById("comments-box");
const btnPostComment = document.getElementById("btn-post-comment");
const btnSubmitRating = document.getElementById("btn-submit-rating");
const btnClearRating = document.getElementById("clear-rating");

let selectedRating = 0;

let ratingValue = 0;
let ratingMessage = '';

let pageLiked = false;
let pageRated = false;
let pageFaved = false;

let commentsHidden = true;
let ratingsHidden = true;
let recentComments = {};

let totalLikes = 0;
let totalRatingsCount = 0;
let totalRatingsValue = 0;

const STAR_SVG = `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 .587l3.668 7.431L23.5 9.75l-5.75 5.6L19.336 24 12 20.013 4.664 24l1.585-8.65L.5 9.75l7.832-1.732L12 .587z"/>
    </svg>`;

let likesAndRatings, comments;
let pageState;

btnSubmitRating.addEventListener("click", submitRating);

btnClearRating.addEventListener("click", () => {
    updateStarVis(0);
});

function isLogged() {
    if (!user) {
        setTimeout(() => {
            window.location.href = "../../../../login_signup";
        }, 60000);
    } 
}

// Load page state
async function loadPageState() {
    try {
        if (!user) throw new Error('Not logged in.');
        const res = await fetch('https://knowlet.in/.netlify/functions/get-interactions', {
            method: 'POST',
            header: { 'content-type': 'application/json' },
            body: JSON.stringify({
                user_id: user.id,
                page_id: pageId
            })
        });
        
        if (!res.ok) throw new Error(`Error status: ${res.status}`);
        
        const { data, error } = await res.json();

        if (!data.length) return;

        pageState = data[0];
        renderPageState();
    } catch(error) {
        console.error(error);
    }
}

// render likes (liked or not), ratings, ratings message and fav state
function renderPageState() {
    pageLiked = pageState.is_liked;
    pageFaved = pageState.is_faved;

    ratingMessage = pageState.ratings_message;
    ratingValue = pageState.ratings_score;

    pageRated = (ratingValue || ratingMessage) ? true : false;

    likeIcon.textContent = pageLiked ? "👍" : "👍🏼";

    favBtn.classList.toggle("favourited", pageFaved);
    favBtn.title = pageFaved ? "Remove from Favourites" : "Add to Favourites";

    ratingMsgInput.value = ratingMessage;
    btnSubmitRating.textContent = pageRated ? 'Update' : 'Submit';

    if (ratingValue) updateStarVis(ratingValue);
}

// Average star visual (fractional filling)

function renderAverageStars(avg) {
    const count = 5;
    const wrapper = document.getElementById("avg-stars");
    // create back and front groups of 5 stars
    const back = document.createElement("div");
    back.className = "back";
    const front = document.createElement("div");
    front.className = "front";

    for (let i=0;i<count;i++){
        const s1 = document.createElement("div");
        s1.innerHTML = STAR_SVG;
        back.appendChild(s1);
        const s2 = document.createElement("div");
        s2.innerHTML = STAR_SVG;
        front.appendChild(s2);
    }

    wrapper.innerHTML = "";
    wrapper.appendChild(back);
    wrapper.appendChild(front);

    // set width of front to match avg fraction (0..100%)
    const pct = Math.max(0, Math.min(1, avg / 5));
    wrapper.querySelector(".front").style.width = (pct * 100) + "%";
    wrapper.setAttribute("aria-label", `Average rating ${avg.toFixed(2)} out of 5`);
    wrapper.innerHTML = getRenderedStars(avg + 0.5);
}

function renderInteractiveStars() {
    const container = document.getElementById("star-input");
    container.innerHTML = "";
    for (let i = 1; i <= 5; i++) {
        const span = document.createElement("span");
        span.className = "star empty";
        span.setAttribute("role", "radio");
        span.setAttribute("aria-checked", "false");
        span.setAttribute("data-value", i);
        span.innerHTML = STAR_SVG;
        // events
        span.addEventListener("click", () => {
            updateStarVis(i);
        });
        container.appendChild(span);
    }
    updateStarVis(0);
}

function updateStarVis(val = 0) {
    selectedRating = val;
    const stars = document.querySelectorAll("#star-input .star");
    stars.forEach((el, idx) => {
        const v = idx + 1;
        el.classList.remove("filled", "half", "empty");
        if (v <= selectedRating) el.classList.add("filled");
        else el.classList.add("empty");
        el.setAttribute("aria-checked", (v === selectedRating).toString());
    });

    // Enable/disable submit button based on selection
    document.getElementById("btn-submit-rating").disabled = selectedRating === 0;
}

//render all stars
function getRenderedStars(val) {
    let starsHTML = "";

    for (let i = 1; i <= 5; i++) {
        // Determine the class based on the value
        const stateClass = (i <= val) ? "filled" : "empty";
        const isChecked = (i === val);

        // Build the string for each star
        starsHTML += `
            <span class="star-f ${stateClass}"
                  role="radio"
                  aria-checked="${isChecked}"
                  data-value="${i}">
                ${STAR_SVG}
            </span>`;
    }

    return starsHTML;
}

// Is Liked Or Rated

async function loadLikesAndRatings(){
    try {
        const res = await fetch('https://knowlet.in/.netlify/functions/get-interactions', {
            method: 'POST',
            header: { 'content-type': 'application/json' },
            body: JSON.stringify({ page_id: pageId })
        });
        
        if (!res.ok) throw new Error(`Error status: ${res.status}`);
        
        const { data, error } = await res.json();

        const box = document.getElementById("ratings-box");
        const userBox = document.getElementById("user-ratings-box");
        box.innerHTML = "";
        userBox.innerHTML = "";

        if (error) {
            box.innerHTML = `<div class="muted">Error loading ratings</div>`;
            console.error(error);
            return;
        }

        if (!data.length) {
            box.innerHTML = `<div class="muted">No ratings yet</div>`;
            return;
        }

        totalRatingsCount = 0;
        totalRatingsValue = 0;
        totalLikes = 0;
        
        likesAndRatings = data;  // store likes and ratings for feature use

        data.forEach(r => {
            totalLikes += r.is_liked ? 1 : 0;

            if (!r.ratings_score) return;

            totalRatingsCount += 1;
            totalRatingsValue += r.ratings_score;

            const div = generateRatingItem(r.users.picture, r.users.name, r.interactions_time?.rated_at || r.created_at, r.ratings_score, r.ratings_message)

            if (r.users.id === (user ? user.id : null)) {
                userBox.appendChild(div);
            } else {
                box.appendChild(div);
            }
        });
        
        if (!totalRatingsCount) {
            box.innerHTML = `<div class="muted">No ratings yet</div>`;
            return;
        }

        const avg = totalRatingsCount ? (totalRatingsValue / totalRatingsCount) : 0;
        
        // update average UI
        document.getElementById("avg-number").textContent = totalRatingsCount ? avg.toFixed(2) + " / 5" : "—";
        document.getElementById("total-count").textContent = `${totalRatingsCount} rating${totalRatingsCount !== 1 ? "s" : ""}`;
        renderAverageStars(avg);
        totalLikesD.textContent = totalLikes;
    } catch (e) {
        console.error(e);
    }
}

function generateRatingItem(pic, name, date, ratings, message) {
    const div = document.createElement("div");
    div.className = "rating-item";
    div.innerHTML = `
        <div class="rating-row">
            <!-- User info -->
            <div class="user-info">
                <img
                    src="${pic || '/assets/images/demo_pp.png'}"
                    alt="${escapeHtml(name)}"
                    class="avatar"
                />
                <div>
                    <div class="user-name">${escapeHtml(name)}</div>
                    <div class="meta">${new Date(date).toLocaleString()}</div>
                </div>
            </div>

            <!-- Rating + message -->
            <div class="rating-content">
                ${getRenderedStars(ratings)}
                <!--<strong class="rating-score">${ratings} / 5</strong>-->
                <div class="rating-message">
                    ${escapeHtml(message || "")}
                </div>
            </div>
        </div>
    `;
    return div;
}

async function submitRating() {
    if (!ensureAuthenticated()) return;
    if (!selectedRating || selectedRating < 1 || selectedRating > 5) {
        alert("Choose 1–5 stars first.");
        return;
    }
    
    ratingMessage = ratingMsgInput.value.trim();
    try {
        btnSubmitRating.textContent = pageRated ? "Updating..." : "Submitting...";

        const res = await fetch('https://knowlet.in/.netlify/functions/update-interactions?action=ratings', {
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: user.id,
                page_id: pageId,
                page_title: pageTitle,
                ratings_score: selectedRating,
                ratings_message: ratingMessage
            })
        });

        const { data, error } = await res.json();

        if (error) throw new Error('Error fetching ratings');

        btnSubmitRating.textContent = pageRated ? "Updated" : "Submitted";
        if (!totalRatingsValue) ratingsBox.innerHTML = "";

        totalRatingsValue = totalRatingsValue - (pageRated ? ratingValue : 0) + selectedRating;
        totalRatingsCount = totalRatingsCount + (pageRated ? 0 : 1);
        ratingValue = selectedRating;

        pageRated = (data[0].ratings_score || data[0].ratings_message) ? true : false;

        const avg = totalRatingsValue / totalRatingsCount;

        document.getElementById("avg-number").textContent = totalRatingsCount ? avg.toFixed(2) + " / 5" : "—";
        document.getElementById("total-count").textContent = `${totalRatingsCount} rating${totalRatingsCount !== 1 ? "s" : ""}`;
        renderAverageStars(avg);

        const div = generateRatingItem(user.picture, user.name, data[0].interactions_time.rated_at, ratingValue, ratingMessage);
        document.getElementById("user-ratings-box").innerHTML = '';
        document.getElementById("user-ratings-box").appendChild(div);
    } catch (e) {
        console.error(e);
        btnSubmitRating.textContent = pageRated ? "Update" : "Submit";
    }
}

async function likePage(){
    if (!ensureAuthenticated()) return;
    try {
        likeIcon.textContent =  pageLiked ? "👍🏼" : "👍";

        const res = await fetch('https://knowlet.in/.netlify/functions/update-interactions?action=likes', {
            method: 'POST',
            header: { 'content-type': 'application/json' },
            body: JSON.stringify({
                page_id: pageId,
                user_id: user.id,
                page_title: pageTitle
            })
        });

        const { data, error } = await res.json();

        if (error) throw new Error('Error fetching likes');

        pageLiked = data[0].is_liked;
        totalLikes = pageLiked ? totalLikes + 1 : totalLikes - 1;
        totalLikesD.textContent = totalLikes;
    } catch(e){
        console.error(e);
        likeIcon.textContent =  !pageLiked ? "👍🏼" : "👍";
    }
}

// Comments functions

async function loadComments() {
    try {
        // new api copy
        const res = await fetch('https://knowlet.in/.netlify/functions/get-comments', {
            method: 'POST',
            header: { 'content-type': 'application/json' },
            body: JSON.stringify({ pageId: pageId })
        });
        
        if (!res.ok) throw new Error(`Error status: ${res.status}`);
        
        const { data, error } = await res.json();

        const box = document.getElementById("comments-box");
        const userBox = document.getElementById("user-comments-box");
        box.innerHTML = "";
        userBox.innerHTML = "";

        if (error) {
            box.innerHTML = `<div class="muted">Error loading comments</div>`;
            console.error(error);
            return;
        }

        if (!data.length) {
            box.innerHTML = `<div class="muted">No comments yet</div>`;
            return;
        }
        
        comments = data; // store comments for feature use

        data.forEach(c => {
            let totalCLikes = "";
            if (true) {
                if (recentComments[c.id] === "Liked") {
                    totalCLikes = `👍 ${c.likes || 0}`;
                } else {
                    totalCLikes = `👍🏼 ${c.likes || 0}`;
                }
            }
            const d = generateCommentsItems(c.users.picture, c.users.name, c.created_at, c.comment_text, c.id, c.likes, totalCLikes);
            if (c.users.id === (user ? user.id : null)) {
                userBox.appendChild(d);
            } else {
                box.appendChild(d);
            }
        });

    } catch(e){
        console.error(e);
    }
}

function generateCommentsItems(pic, name, time, msg, id, likes, totalCLikes) {
    const d = document.createElement("div");
        d.className = "comment-item";
        d.innerHTML = `
            <div class="comment-row">
                <!-- User info -->
                <div class="user-info">
                    <img
                        src="${pic || '/assets/images/demo_pp.png'}"
                        alt="${escapeHtml(name)}"
                        class="avatar"
                    />
                    <div>
                        <div class="user-name">${escapeHtml(name)}</div>
                        <div class="meta">${new Date(time).toLocaleString()}</div>
                    </div>
                </div>

                <!-- Comment content -->
                <div class="comment-content">
                    <div class="comment-text">
                        ${escapeHtml(msg)}
                    </div>

                    <div class="comment-actions">
                        <button
                            class="btn ghost"
                            onclick="likeComment(${id}, ${likes})">
                            ${totalCLikes}
                        </button>
                    </div>
                </div>
            </div>
        `;
    return d
}

async function submitComment(){
    if (!ensureAuthenticated()) return;
    const text = document.getElementById("comment-input").value;
    if (!text.trim()) return;
    try {
        const res = await fetch('https://knowlet.in/.netlify/functions/set-comments', {
            method: 'POST',
            header: { 'content-type': 'application/json' },
            body: JSON.stringify({
                pageId,
                userId: user.id,
                action: 'comment',
                commentMessage: text
            })
        });
        const { error } = await res.json();
        if (error) {
            console.error(error);
            return;
        }
        btnPostComment.textContent = "Posted"
        document.getElementById("comment-input").value = "";
        await loadComments();
    } catch(e){ console.error(e) }
}

async function likeComment(id, oldLikes){
    if (!ensureAuthenticated()) return;
    let newLikes;
    if (recentComments[id] === "Liked" && Number(oldLikes) >= 1) {
        newLikes = (Number(oldLikes)||0)-1;
        recentComments[id] = "Unliked";
    }
    else {
        newLikes = (Number(oldLikes)||0)+1;
        recentComments[id] = "Liked";
    }

    try {
        const res = await fetch('https://knowlet.in/.netlify/functions/update-comments', {
            method: 'POST',
            header: { 'content-type': 'application/json' },
            body: JSON.stringify({
                commentId: id,
                action: 'like',
                commentLike: newLikes
            })
        });

        const { error } = await res.json();

        await loadComments();
    } catch(e){ console.error(e) }
}

//favs function

async function toggleFavourite() {
    pageFaved = !pageFaved;
    
    favBtn.classList.toggle("favourited", pageFaved);
    favBtn.title = pageFaved ? "Remove from Favourites" : "Add to Favourites";
    
    const res = await fetch('https://knowlet.in/.netlify/functions/update-interactions?action=favs', {
        method: 'POST',
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: user.id,
            page_id: pageId,
            page_title: pageTitle
        })
    });

    const { data, error } = await res.json();
    pageFaved = data[0].is_faved;
    
    favBtn.classList.toggle("favourited", pageFaved);
    favBtn.title = pageFaved ? "Remove from Favourites" : "Add to Favourites";
}

// Small helpers

function escapeHtml(text) {
    if (!text) return "";
    return text
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function ensureAuthenticated() {
    if (!user) {
        const message = "You have to Login or Signup to download the notes or interact with them.\n\nClick OK to Login or Signup.\n\nOtherwise, you will be redirected automatically.";
        if (confirm(message)) {
            window.location.href = "../../../../login_signup";
        }
        return false;
    }
    return true;
}

async function checkUrlStatus(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok ? true : false;
    } catch (error) {
        console.error("Error: Could not reach the server. Check your connection or CORS settings.");
        return true;
    }
}

// Wire up UI and init
// build nav bar
function renderNavBar() {
    const currentUrl = window.location.href;
    const currentRootUrl = window.location.origin;
    const matchUnit = currentUrl.match(/(\/unit_)(\d+)/i);
    const matchPyq = currentUrl.match(/\/(\d{4})(_solved)/i);
    const container = document.querySelector(".container");
    const parts = currentUrl.replace(currentRootUrl, "").replace(".html", "").split("?")[0].split("/");
    
    const parms = `root=${parts[1]}&sem=${parts[2]}&sub=${parts[3]}&ppr=${parts[4]}` //`&unit=${parts[5]}`
    const backUrl = `${currentRootUrl}/navigator?${parms}`
    const topBar = document.createElement("div");
    topBar.className = "unit-top-bar";

    // --- 1. Back Button
    const backBtn = document.createElement("button");
    backBtn.id = "back-btn";
    backBtn.title = "Go Back";
    backBtn.onclick = () => {
        window.location.href = backUrl;
    };
    topBar.appendChild(backBtn);
    
    // --- 2. Previous / Next Unit Buttons (Always Visible, Disabled When Unavailable)
    const prev = document.createElement("a");
    prev.className = "unit-prev";
    const next = document.createElement("a");
    next.className = "unit-next";

    if (matchUnit || matchPyq) {
        let base, currentNum, prevUrl, nexturl;
        if (matchUnit) {
            base = matchUnit[1];
            currentNum = parseInt(matchUnit[2]);

            prevUrl = currentUrl.replace(/\/unit_\d+/i, `${base}${currentNum - 1}`);
            nextUrl = currentUrl.replace(/\/unit_\d+/i, `${base}${currentNum + 1}`);
        } else if (matchPyq) {
            currentNum = parseInt(matchPyq[1]);
            base = matchPyq[2];

            prevUrl = currentUrl.replace(/\/\d{4}_solved/i, `/${currentNum - 1}${base}`);
            nextUrl = currentUrl.replace(/\/\d{4}_solved/i, `/${currentNum + 1}${base}`);
        }

        checkUrlStatus(prevUrl).then(res => {
            if (res) {
                prev.href = prevUrl;
                prev.title = `Previous Unit (${currentNum - 1})`;
            } else {
                prev.classList.add("disabled");
                prev.title = "No Previous Unit";
            }
        });

        checkUrlStatus(nextUrl).then(res => {
            if (res) {
                next.href = nextUrl;
                next.title = `Next Unit (${currentNum + 1})`;
            } else {
                next.classList.add("disabled");
                next.title = "No Next Unit";
            }
        });
    }

    topBar.appendChild(prev);
        
    // home button
    const homeBtn = `<button id="home-btn" class="btn ghost" onclick="window.location.href='/'">🏠</button>`
    topBar.insertAdjacentHTML('beforeend', homeBtn);

    topBar.appendChild(next);
    
    // profile     
    const srcUrl = localStorage.getItem('knowletUser') ? JSON.parse(localStorage.getItem('knowletUser')).picture : '/assets/images/demo_pp.jpg';
    const btnProfilePic = `<button id='profile-btn' class="btn ghost" onclick="window.location.href='/profile'">
        <img id='profile-btn-img'
            style=''
            src='${srcUrl}'
        />
    </button>`;
    topBar.insertAdjacentHTML('beforeend', btnProfilePic);
    
    // --- 3. Favourite Button
    const FAV_KEY = "unit_page_favourites";
    const favBtn = document.createElement("button");
    favBtn.id = "fav-btn";
    favBtn.title = "Add to Favourites";
    favBtn.onclick = toggleFavourite;
    topBar.appendChild(favBtn);
    
    // trace history
    
    async function updateHistory() {
        fetch('https://knowlet.in/.netlify/functions/update-history', {
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                page_id: pageId,
                user_id: user.id,
                page_title: pageTitle
            })
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    }
    if (user) updateHistory();

    // --- 4. Keep Screen On Button
    const screenBtn = document.createElement("button");
    screenBtn.id = "keep-screen-on-btn";
    screenBtn.title = "Keep Screen On";
    topBar.appendChild(screenBtn);
    
    // --- 5. Download button
    btnDownload = `<button onclick="printDiv('container')" style="margin: 0; font-size: 1.9rem">⬇️</button>`;
    topBar.insertAdjacentHTML('beforeend', btnDownload);

    // --- 6. Like Button 
    const btnLikeHTML = `<button id="btnLike" class="btn ghost" onclick="likePage()"><span id="like-icon">👍🏼</span> <span id="total-likes">0</span></button>`
    topBar.insertAdjacentHTML('beforeend', btnLikeHTML);
    
    // --- Functions 

    let wakeLock = null;

    async function toggleWakeLock() {
        if (!("wakeLock" in navigator)) {
            alert("Wake Lock API not supported.");
            return;
        }

        if (!wakeLock) {
            try {
                wakeLock = await navigator.wakeLock.request("screen");
                screenBtn.classList.add("active");
                screenBtn.title = "Allow Screen Sleep";

                wakeLock.addEventListener("release", () => {
                    screenBtn.classList.remove("active");
                    screenBtn.title = "Keep Screen On";
                    wakeLock = null;
                });
            } catch (err) {
                console.error(err);
            }
        } else {
            await wakeLock.release();
            wakeLock = null;
            screenBtn.classList.remove("active");
            screenBtn.title = "Keep Screen On";
        }
    }

    screenBtn.onclick = toggleWakeLock;

    document.body.insertBefore(topBar, document.body.firstChild);

    let hideTimeout;

    function showTopBar() {
        topBar.classList.add("visible");
        clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => {
            topBar.classList.remove("visible");
        }, 3000); // Hide after 3s of inactivity
    }

    showTopBar();

    ["mousemove", "scroll", "touchstart", "keydown"].forEach(event => {
        document.addEventListener(event, showTopBar, { passive: true });
    });
}

// build ui
function renderFeedbackSection() {
    const app = document.getElementById("app");
    app.innerHTML = `
        <div class="supcontainer">
            <div class="supcard">
                <h1 style='font-size:20px; margin:0 0 8px;'>Comments & Ratings</h1>
                <h2 id='h3' style='font-size:16px; margin:0 0 14px; color:69707a;'>Star Rating, Average, and Clean UI</h2>
        
                <!-- Hidden page id (change value if embedding) -->
                <input type="hidden" id="page-id" value="simple_test_page">
        
                <!-- Rating row -->
                <div style="margin:14px 0;" class="supcard">
                    <div class="row" style="justify-content:space-between;">
                        
                        <div class="rating-widget" style="margin-top:8px; flex-direction:column; align-items:flex-start;">
                            <div style="display:flex; gap:6px; align-items:center;">
                                <div id="star-input" class="stars" aria-label="Rate 1 to 5 stars" role="radiogroup">
                                    <!-- stars added by JS -->
                                </div>
                                <button id="btn-submit-rating" class="btn">Submit</button>
                                <button id="clear-rating" class="btn ghost">Clear</button>
                            </div>
                        
                            <textarea id="rating-message" placeholder="Write a message (optional)..." style="margin-top:10px; width:95%; min-height:60px; padding:10px; border-radius:8px; border:1px solid var(--border); font-size:14px;"></textarea>
                        </div>
                        
                        <div style="text-align:right;">
                            <div class="muted">Average rating</div>
                            <div style="margin-top:8px;" class="rating-summary">
                                <div>
                                    <div id="avg-stars" class="avg-stars" aria-hidden="true"></div>
                                    <div style="font-weight:700; font-size:16px;" id="avg-number">—</div>
                                    <div class="muted" id="total-count">0 ratings</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        
                <!-- Add comment -->
                <div class="supcard comment-area">
                    <div class="muted">Post a comment</div>
                    <textarea id="comment-input" placeholder="Write a comment..."></textarea>
                    <div style="margin-top:10px; display:flex; gap:10px; justify-content:flex-end">
                        <button id="btn-post-comment" class="btn" onclick="submitComment()">Post</button>
                    </div>
                </div>
        
                <!-- Ratings list -->
                <div class="supcard">
                    <h2 id='h3' style="margin-bottom:8px; font-size:16px; margin:0 0 14px; color:69707a;">Ratings</h2>
                    <div class="vertical-scroll">
                        <div id="user-ratings-box"></div>
                        <div id="ratings-box"></div>
                    </div>
                </div>
        
                <!-- Comments list -->
                <div class="supcard">
                    <h2 id='h3' style="margin-bottom:8px; font-size:16px; margin:0 0 14px; color:69707a;">Comments</h2>
                    <div class="vertical-scroll">
                        <div id="user-comments-box"></div>
                        <div id="comments-box"></div>
                    </div>
                </div>
            </div>
        </div>        
    `;

    
}

// add water mark
function printDiv(divClass) {
    const noteContainer = document.getElementsByClassName(divClass)[0];
    if (!noteContainer) return;

    const printedOn = new Date().toLocaleDateString();

    const printContent = `
        <style>
            /* The Watermark Container */
            .watermark {
                position: fixed;
                top: 50%;         /* Move to vertical center */
                left: 50%;        /* Move to horizontal center */
                transform: translate(-50%, -50%); /* Offset by its own size to center perfectly */
                opacity: 0.05;     /* Keep it very light so text remains readable */
                z-index: 1000;    /* Push it far behind the content */
                width: 80%;       /* Make it big */
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .watermark h5 {
                font-size: 150px;
            }

            /* Ensure the text content stays on top and is visible */
            .content-area {
                position: relative;
                z-index: 1;
            }

            @media screen {
                .watermark { display: none; }
            }
        </style>

        <div class="content-area">
            ${noteContainer.innerHTML}
        </div>

        <div class="watermark">
            <h5>Knowlet</h5>
        </div>

        <hr style="margin-top: 50px;">
        <p style="font-size: 12px; text-align: center; position: relative; z-index: 2;">
            Visit: <a href="https://knowlet.in">https://knowlet.in</a> (Knowlet)
            <br>
            Email: <a href="mailto:knowlet.study@gmail.com">knowlet.study@gmail.com</a>
            <br>
            Printed on: ${printedOn}
        </p>
    `;

    document.body.innerHTML = printContent;
    
    window.print();
}

// Load User Info 
isLogged();

// Render interactive stars and load data
renderInteractiveStars();

// initial loads
loadPageState();
loadLikesAndRatings();
loadComments();
