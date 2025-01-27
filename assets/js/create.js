document.addEventListener("DOMContentLoaded", function () {
    const backButton = document.getElementById("backButton");
    const saveButton = document.getElementById("saveButton");

    backButton.addEventListener("click", function () {
        window.history.back();
    });

    saveButton.addEventListener("click", function () {
        const name = document.getElementById("name").value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (name && username && password) {
            getAllUsers().then(users => {
                let maxId = 0;
                if (users.length > 0) {
                    maxId = Math.max(...users.map(user => user.id));
                }
                const userId = maxId + 1;
    
                addUser(userId, name, username, password);

                window.location.href = "index.html";
            })
        } else {
            alert("Please fill out all fields");
        }
    })
})