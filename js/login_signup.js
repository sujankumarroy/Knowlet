const input = document.getElementsByClassName("user-input");
const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const googleLoginBtn = document.getElementById("google-login-btn");
const googleSignupBtn = document.getElementById("google-signup-btn");
const forgotPassword = document.getElementById("forgotPassword");
const loginBox = document.getElementById('loginBox');
const signupBox = document.getElementById('signupBox');
const loader = document.getElementById('loader');

const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");

const clientId = "439522989172-180003nlibg69snhaq9kcvpskq5088d8.apps.googleusercontent.com";
const redirectUri = "https://knowlet.in/.netlify/functions/google-callback";

const scope = encodeURIComponent("openid email profile");

const authUrl =
    `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${clientId}` +
    `&redirect_uri=${redirectUri}` +
    `&response_type=code` +
    `&scope=${scope}`;

const params = new URLSearchParams(window.location.search);

const popup = params.get("popup");

if (popup === "login") {
    showLogin();
} else if (popup === "signup") {
    showSignup();
}

loginForm.addEventListener("submit", e => {
    e.preventDefault();
    
    let email = input[0].value;
    let password = input[1].value;
    
    if (!email || !password) {
        alert("All fields are required");
        return;
    }
    
    login(email, password);
});

signupForm.addEventListener("submit", e => {
    e.preventDefault();
    
    let name = input[2].value;
    let email = input[3].value;
    let password = input[4].value;
    
    if (password !== input[5].value) {
        alert("Unmatched Password");
        return;
    }
    
    if (!name || !email || !password) {
        alert("All fields are required");
        return;
    }
    
    signup(name, email, password);
});

[ googleLoginBtn, googleSignupBtn, forgotPassword ].forEach(btn => {
    btn.addEventListener("click", () => {
        window.location.href = authUrl;
    });
});

function showSignup() {
    loginBox.style.display = 'none';
    signupBox.style.display = 'block';
}

function showLogin() {
    loginBox.style.display = 'block';
    signupBox.style.display = 'none';
}

async function login(email, password) {
    try {
        loader.style.display = "flex";
        
        const res = await fetch(
            'https://knowlet.in/.netlify/functions/get-data',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ email: email, password: password })
            }
        );
        
        loader.style.display = "none";
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const result = await res.json();

        if (!result.success) {
            throw new Error(result.error || "Unknown error occurred");
        }
        const data = result.data;
        
        // console.log("Data received:", data);
        
        if (!data[0]) {
            alert("No account found with your User Id and Email");
        } else {
            const user = JSON.stringify(data[0]);
            localStorage.setItem("knowletUser", user);
            alert("Successfully Loged In");
            redirect();
        }
        
    } catch(e) {
        console.log(e);
    }
}

async function signup(name, email, password) {
    
    let userId = name.split(' ')[0] + "@" + parseInt(Math.random() * 9000 + 1000);
    
    let user = {
        id: userId,
        name: name,
        email: email,
        password: password
    }
    
    try {
        // new
        loader.style.display = "flex";
        const res = await fetch(
            'https://knowlet.in/.netlify/functions/set-data',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(user)
            }
        );
        loader.style.display = "none";
        
        if (!res.ok) {
            console.log(`HTTP error! status: ${res.status}`);
        }

        const result = await res.json();

        if (!result.success) {
            throw new Error(result.error || "Unknown error occurred");
        }

        localStorage.setItem("knowletUser", JSON.stringify(user));
        alert("Successfully Signed Up\n" + "Note your user ID: " + userId);
        redirect();
        
    } catch(e) {
        console.log(e);
    }
}

function redirect() {
    const history = JSON.parse(localStorage.getItem("unit_page_history") || '[]');
    
    if (history.length === 0) {
        window.location.href = "profile";
        return;
    } else {
        if (diffFromNow(history[0].timestamp) < 60) {
            window.location.href = history[0].url;
        } else {
            window.location.href = "profile";
        }
    }
}

function diffFromNow(time) {
    const target = new Date(time);
    const now = new Date();

    const diffMs = Math.abs(target - now);
    return Math.floor(diffMs / 1000); 
}

