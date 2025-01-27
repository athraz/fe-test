document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const request = indexedDB.open("db", 1);

    request.onsuccess = function (event) {
        const db = event.target.result;
        const transaction = db.transaction("users", "readonly");
        const objectStore = transaction.objectStore("users");

        const usernameIndex = objectStore.index("username");
        const getRequest = usernameIndex.get(username);

        getRequest.onsuccess = function () {
            const user = getRequest.result;
            if (user && user.password === password) {
                localStorage.setItem("loggedIn", "true");
                localStorage.setItem("loggedInUser", JSON.stringify(user))
                window.location.href = "index.html";
            } else {
                alert("Invalid username or password");
            }
        };

        getRequest.onerror = function () {
            alert("Error while fetching user");
        };
    };
});

document.getElementById("logoutButton").addEventListener("click", function () {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
});
