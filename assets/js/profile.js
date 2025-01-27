document.addEventListener("DOMContentLoaded", function () {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedInUser?.id) {
        getUser(loggedInUser.id)
            .then((userData) => {
                document.getElementById("name").value = userData.name;
                document.getElementById("username").value = userData.username;
            })
            .catch((error) => {
                console.error(error);
            });

        document.getElementById("saveButton").addEventListener("click", function () {
            const updatedName = document.getElementById("name").value;

            if (updatedName && updatedName !== "") {
                const updatedData = {
                    id: loggedInUser.id,
                    name: updatedName,
                    username: document.getElementById("username").value,
                    password: loggedInUser.password
                };

                updateUser(updatedData);

                localStorage.setItem("loggedInUser", JSON.stringify(updatedData))

                window.location.href = "index.html";
            } else {
                alert("Please enter a valid name.");
            }
        });
    }

    document.getElementById("backButton").addEventListener("click", function () {
        window.history.back();
    });
})