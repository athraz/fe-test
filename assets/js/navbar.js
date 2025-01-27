document.addEventListener("DOMContentLoaded", function () {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    document.getElementById("navbarUsername").textContent = loggedInUser?.name || "Guest";

    document.getElementById("logoutButton").addEventListener("click", () => {
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("loggedInUser");
        window.location.href = "login.html";
    });
})