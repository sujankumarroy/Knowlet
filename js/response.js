const setPasswordForm = document.getElementById("setPasswordForm");
const input = document.getElementsByClassName("user-input");
const container = document.getElementById("container");
const loader = document.getElementById("loading");
const submitBtn = document.getElementById("signup-btn");

const params = new URLSearchParams(window.location.search);
let isNewUser = true;

if (params.get('error')) {
    alert('Try to login or signup in manual way.\n\nError: ' + params.get('error'));
    console.error(params.get('error'));
}

let user;
if (params.get("user")) {
    try {
        user = JSON.parse(params.get("user"));
    } catch(e) {
        console.error(e);
    }
}

if (!user) {
    loader.style.display = "none";
    const appContainer = document.getElementById("msg-error");

    appContainer.innerHTML = `
        <div class="error-container">
            <div class="error-card">
                <div class="icon">👤</div>
                <h2>User not Found</h2>
                <p>Please log in to access your dashboard.</p>
                <button id="btn-login" class="primary-btn">Go to Login Page</button>
            </div>
        </div>
    `;

    document.getElementById("btn-login").addEventListener("click", () => {
        window.location.href = "/login_signup";
    });
} else {
    sync(user.name, user.email, user.picture)
}

setPasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    let name = input[0].value;
    let email = input[1].value;
    let password = input[2].value;
    
    if (password !== input[3].value) {
        alert("Unmatched Password");
        return;
    }
    
    if (!name || !email || !password) {
        alert("All fields are required");
        return;
    }
    
    user = {
        name: name,
        email: email,
        picture: user.picture,
        password: password
    }
    
    if (isNewUser) {
        // set data
        let userId = name.split(' ')[0] + "@" + parseInt(Math.random() * 9000 + 1000);
        
        user = { id: userId, ...user }
        
        try {
            const res = await fetch('https://knowlet.in/.netlify/functions/set-data', {
                method: 'POST',
                header: {'content-type': 'application/json'},
                body: JSON.stringify(user)
            });
            
            if (!res.ok) console.error(`Error code ${res.status}`);
            
            const result = await res.json();
            
            if (!result.success) {
                console.error(`Database error: ${result.error}`);
                alert(result.error);
                return;
            }
            
            localStorage.setItem("knowletUser", JSON.stringify(user));
            document.getElementById("loading").style.display = "none";
            alert("Successfully Signed Up\n" + "Note your user ID: " + userId);
            redirect();
        
        } catch(e) {
            console.log(e);
        }

    } else {
        // reset password
        try {
            const res = await fetch('https://knowlet.in/.netlify/functions/reset-password', {
                method: 'POST',
                header: { 'content-type': 'application/json' },
                body: JSON.stringify(user)
            });

            if (!res.ok) console.error(`Error status: ${res.status}`);

            const result = await res.json();
            
            if (!result.success) {
                console.error(`Database error: ${result.error}`);
                alert(result.error);
                return;
            }

            localStorage.setItem("knowletUser", JSON.stringify(user));
            document.getElementById("loading").style.display = "none";
            alert("Password Updated");
            redirect();
        
        } catch(e) {
            console.log(e);
        }
    }

});

async function sync(name, email, picture) {
    
    try {
        // login if exist
        const res = await fetch('https://knowlet.in/.netlify/functions/get-data', {
            method: 'POST',
            header: { 'content-type': 'application/json' },
            body: JSON.stringify({email: email})
        })

        if (!res.ok) console.error(`Error status: ${res.status}`);

        const result = await res.json();
        
        if (!result.success) {
            console.error(`Database error: ${result.error}`);
            alert(result.error);
            return;
        }
        
        const data = result.data;

        if (!data[0]) {
            input[0].value = user.name;
            input[1].value = user.email;
            loader.style.display = "none";
            container.style.display = "flex";
            isNewUser = true;
            submitBtn.textContent = "Signup";
            return;
        }
        
        if (data[0] && data[0].password) {
            localStorage.setItem("knowletUser", JSON.stringify(data[0]));
            document.getElementById("loading").style.display = "none";
            alert("You Alredy Have An Account, Successfully Logged In");
            redirect();
            return;
        } else {
            input[0].value = data[0].name;
            input[1].value = data[0].email;
            loader.style.display = "none";
            container.style.display = "flex";
            isNewUser = false;
            submitBtn.textContent = "Update Password";
            return;
        }
        
    } catch(e) {
        console.log(e);
    }
}

function redirect() {
    const history = JSON.parse(localStorage.getItem("unit_page_history") || '[]');
    
    if (history.length === 0) {
        window.location.href = "/../profile";
        return;
    } else {
        if (diffFromNow(history[0].timestamp) < 60) {
            window.location.href = history[0].url;
        } else {
            window.location.href = "/../profile";
        }
    }
}

function diffFromNow(time) {
    const target = new Date(time);
    const now = new Date();
    
    const diffMs = Math.abs(target - now);
    return Math.floor(diffMs / 1000); 
}