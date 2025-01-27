function addUser(id, name, username, password) {
    console.log("Opening database...");
    const request = indexedDB.open("db", 1);

    request.onsuccess = function (event) {
        console.log("Database opened successfully");
        const db = event.target.result;
        const transaction = db.transaction("users", "readwrite");
        const objectStore = transaction.objectStore("users");

        console.log("Checking if username exists...");
        const usernameIndex = objectStore.index("username");
        const checkRequest = usernameIndex.get(username);

        checkRequest.onsuccess = function () {
            if (checkRequest.result) {
                console.error("Error: Username already exists");
            } else {
                console.log("Username does not exist. Adding user...");
                const user = { id, name, username, password };
                const addRequest = objectStore.add(user);

                addRequest.onsuccess = function () {
                    console.log("User added successfully:", user);
                };

                addRequest.onerror = function (event) {
                    console.error("Error adding user:", event.target.errorCode);
                };
            }
        };

        checkRequest.onerror = function (event) {
            console.error("Error checking username:", event.target.errorCode);
        };
    };

    request.onerror = function (event) {
        console.error("Error opening database:", event.target.errorCode);
    };
}

function getUser(id) {
    console.log("id:", id)
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("db", 1);

        request.onsuccess = function (event) {
            const db = event.target.result;
            const transaction = db.transaction("users", "readonly");
            const objectStore = transaction.objectStore("users");

            const getRequest = objectStore.get(id);

            getRequest.onsuccess = function () {
                if (getRequest.result) {
                    resolve(getRequest.result);
                } else {
                    reject("User not found");
                }
            };

            getRequest.onerror = function (event) {
                reject("Error retrieving user: " + event.target.errorCode);
            };
        };
    });
}

function getAllUsers() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("db", 1);

        request.onsuccess = function (event) {
            const db = event.target.result;
            const transaction = db.transaction("users", "readonly");
            const objectStore = transaction.objectStore("users");

            const users = [];
            const getAllRequest = objectStore.openCursor();

            getAllRequest.onsuccess = function (event) {
                const cursor = event.target.result;
                if (cursor) {
                    users.push(cursor.value);
                    cursor.continue();
                } else {
                    resolve(users);
                }
            };

            getAllRequest.onerror = function (event) {
                console.error("Error retrieving all users:", event.target.errorCode);
                reject(event.target.errorCode);
            };
        };

        request.onerror = function (event) {
            console.error("Error opening indexedDB:", event.target.errorCode);
            reject(event.target.errorCode);
        };
    });
}

function updateUser(id, updatedData) {
    const request = indexedDB.open("db", 1);

    request.onsuccess = function (event) {
        const db = event.target.result;
        const transaction = db.transaction("users", "readwrite");
        const objectStore = transaction.objectStore("users");

        const putRequest = objectStore.put({ ...updatedData, id });

        putRequest.onsuccess = function () {
            console.log("User updated:", { ...updatedData, id });
        };

        putRequest.onerror = function (event) {
            console.error("Error updating user:", event.target.errorCode);
        };
    };
}

function deleteUser(id) {
    const request = indexedDB.open("db", 1);

    request.onsuccess = function (event) {
        const db = event.target.result;
        const transaction = db.transaction("users", "readwrite");
        const objectStore = transaction.objectStore("users");

        const deleteRequest = objectStore.delete(id);

        deleteRequest.onsuccess = function () {
            console.log("User deleted with ID:", id);
            window.location.reload();
        };

        deleteRequest.onerror = function (event) {
            console.error("Error deleting user:", event.target.errorCode);
        };
    };
}