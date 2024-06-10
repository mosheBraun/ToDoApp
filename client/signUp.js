var newUser = {}

function toSignUpBtnCliked() {
    setTimeout(displaySignUp, 100);
};

function displaySignUp() {
    let container = document.querySelector(".Sign-up-Page");
    container.style.display = "block";

    let welcomeCtr = document.querySelector(".login-or-SignUp");
    welcomeCtr.style.display = "none";
}

function tologinBtnClicked() {
    setTimeout(displaylogin, 100);
};

function displaylogin() {
    let container = document.querySelector(".Login-Page");
    container.style.display = "block";

    let welcomeCtr = document.querySelector(".login-or-SignUp");
    welcomeCtr.style.display = "none";
}

async function SignUpBtnCliked() {
    let inputlastName = document.querySelector("#Sign-Up-Last-name");
    let lastName = inputlastName.value;
    let inputfirstName = document.querySelector("#Sign-Up-First-name");
    let firstName = inputfirstName.value;
    let inputEmail = document.querySelector("#Sign-Up-Email");
    let Email = inputEmail.value;
    let inputpassword = document.querySelector("#Sign-Up-password");
    let password = inputpassword.value;
    let inputReenterpassword = document.querySelector("#Sign-Up-Re-enter-password");
    let Reenterpassword = inputReenterpassword.value;

    if (password === Reenterpassword) {
        newUser = {
            Name: `${firstName}_${lastName}`,
            Email: Email,
            password: password,
        }
        console.log("New User:", newUser);
        await addUser(newUser)
    } else {
        document.querySelector("#Password-check").textContent = `Passwords do not match. Please re-enter`;
        return;
    }

    async function addUser(newUser) {
        try {
            const response = await fetch('http://localhost:3300/newuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Add User Result:", result);
            const UserId = await getTheUser(newUser.Email);
            if (UserId) {
                await addFirstTask({ UserId: UserId });
                displayApp(UserId);
            } else {
                console.error("Failed to retrieve UserId");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function addFirstTask(user) {
        try {
            const response = await fetch('http://localhost:3300/addFirstTask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Add First Task Result:", result);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function getTheUser(userEmail) {
        try {
            const response = await fetch(`http://localhost:3300/getuser?email=${encodeURIComponent(userEmail)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const result = await response.json();
            return result.user_id;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
    

// Assuming you have a function to display the app after user sign up
function displayApp(UserId) {
    console.log(`Displaying app for User ID: ${UserId}`);
    // Implementation for displaying the app
}
}