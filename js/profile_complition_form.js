class ProfileCPManager {
    constructor() {
        this.imgInput = document.getElementById("input-image");
        this.input = document.getElementsByClassName("user-input");
        this.inputEdu = document.getElementById("sltEdu")
        this.profilePic = document.getElementById("profile-pic");
        this.imgPreview = document.getElementById("img-preview");
        this.editPopup = document.getElementById("edit-popup");
        this.loginPopup = document.getElementById("login-popup");
        this.loader = document.getElementById("loader");
        
        this.userId;
        
        if (!localStorage.getItem("knowletUser")) {
            this.loginPopup.style.display = "flex";
        } else {
            this.userId = JSON.parse(localStorage.getItem("knowletUser")).id;
        }
        
        this.initEvents();
    }

    initEvents() {
        this.imgInput.addEventListener("change", () => {
            const file = this.imgInput.files[0];
            if (!file) return;
        
            this.imgPreview.src = URL.createObjectURL(file);
            this.imgPreview.style.display = "";
        });
        
        this.profilePic.addEventListener("click", () => {
            this.editPopup.style.display = "flex";
            this.imgPreview.src = this.profilePic.src;
        });
        
        document.getElementById("edit").addEventListener("click", () => this.imgInput.click());
        document.getElementById("save").addEventListener("click", () => this.uploadAvatar());
        document.getElementById("cancel").addEventListener("click", () => this.editPopup.style.display = "none");
        
        document.getElementById("redirect-to-login-btn").addEventListener("click", () => {
            this.loginPopup.style.display = "none";
            window.location.href = "/login_signup";
        });
        
        document.getElementById("submit-btn").addEventListener("click", async () => {
            
            const name = this.input[0].value;
            const email = this.input[1].value;
            const age = this.input[2].value ? Number(this.input[2].value) : 0;
            const fvSubject = this.input[3].value;
            const stream = this.input[4].value;
        
            const standered = this.inputEdu.value;
            const picture = this.profilePic.src;
            
            if (!name) {
                alert("Must enter Name");
                return;
            }
            
            if (!email) {
                alert("Must enter Email");
                return;
            }
            
            const user = {
                id: this.userId,
                name: name,
                email: email,
                age: age,
                fv_subject: fvSubject,
                stream: stream,
                standered: standered,
                picture: picture,
                password: JSON.parse(localStorage.getItem("knowletUser")).password
            }
        
            localStorage.setItem("knowletUser", JSON.stringify(user))
        
            await this.sync()
        });
    }

    renderValues() {
        const user = JSON.parse(localStorage.getItem("knowletUser"));
        
        document.getElementById("user-id").textContent = "Your User ID: " + this.userId;
        
        this.input[0].value = user.name;
        this.input[1].value = user.email;
        this.input[2].value = user.age ? user.age : null;
        this.input[3].value = user.fv_subject ? user.fv_subject : null;
        this.input[4].value = user.stream ? user.stream : null;
        this.inputEdu.value = user.standered ? user.standered : "";
        this.profilePic.src = user.picture || "assets/images/demo_pp.jpg";
    }

    async sync() {
        
        const user = JSON.parse(localStorage.getItem("knowletUser"));
        
        try {
            //new code
            this.loader.style.display = "flex";
            
            const res = await fetch('https://knowlet.in/.netlify/functions/update-data', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(user)
            });
            
            this.loader.style.display = "none";
            
            if (!res.ok) {
                console.error(`Error code: ${res.status}`);
            }
            
            const result = await res.json();
            
            if (!result.success) {
                console.error(`Database error: ${result.error}`);
                alert(result.error);
            } else {
                alert('Successfully Submitted.');
                window.location.href = 'profile.html';
            }
            
        } catch(e) {
            console.log(e)
        }
    }

    async uploadAvatar() {
        const originalFile = this.imgInput.files[0];
    
        if (!originalFile) {
            alert("Select an image first");
            return;
        }
        
        if (!originalFile.type.startsWith("image/jpeg")) {
            alert("Only jpg allowed");
            return;
        }
        
        if (originalFile.size > 5 * 1024 * 1024) {
            alert("Image too large");
            return;
        }
        
        this.loader.style.display = "flex";
        
        const compressedFile = await this.compressWithCanvas(
            originalFile,
            0.7,   // quality
            512    // max width/height
        );
        
        const fileExt = "jpg" // compressedFile.name.split('.').pop();
        const fileName = `${this.userId.replaceAll("@", "").toLowerCase()}.${fileExt}`;
        const filePath = `users/${fileName}`;
    
        const formData = new FormData();
        formData.append("image", compressedFile); // <input type="file">
        formData.append("filePath", filePath);
    
        const res = await fetch("https://knowlet.in/.netlify/functions/upload-image", {
            method: "POST",
            body: formData
        });
    
        if (!res.ok) {
            this.loader.style.display = "none";
            console.error(`Error code ${res.status}`);
            return;
        }
    
        const result = await res.json();
    
        if (!result.success) {
            console.log(result.error);
            alert(result.error.message);
            return;
        };
    
        this.loader.style.display = "none";
        this.editPopup.style.display = "none";
        this.profilePic.src = result.publicUrl + "?t=" + Date.now();
    }

    compressWithCanvas(file, quality = 0.7, maxSize = 512) {
        return new Promise((resolve) => {
            const img = new Image();
            const reader = new FileReader();
    
            reader.onload = e => {
                img.src = e.target.result;
            };
    
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const scale = Math.min(maxSize / img.width, maxSize / img.height, 1);
    
                canvas.width = img.width * scale;
                canvas.height = img.height * scale;
    
                canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
    
                canvas.toBlob(blob => {
                    resolve(new File([blob], file.name, { type: "image/jpeg" }));
                }, "image/jpeg", quality);
            };
    
            reader.readAsDataURL(file);
        });
    }
}

new ProfileCPManager().renderValues();
