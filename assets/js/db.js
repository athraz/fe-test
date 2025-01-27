const dbName = "db";
const dbVersion = 1;

const request = indexedDB.open(dbName, dbVersion);

request.onupgradeneeded = function (event) {
    const db = event.target.result;

    if (!db.objectStoreNames.contains("users")) {
        const userStore = db.createObjectStore("users", { keyPath: "id" });
        userStore.createIndex("username", "username", { unique: true });
    }

    addUser(1, "Super Admin", "admin", "password");
    addUser(2, "John Doe", "john", "password");
    addUser(3, "Jane Smith", "jane", "password");
    addUser(4, "User 1", "user1", "password");
    addUser(5, "User 2", "user2", "password");
    addUser(6, "User 3", "user3", "password");
    addUser(7, "User 4", "user4", "password");
    addUser(8, "User 5", "user5", "password");
    addUser(9, "User 6", "user6", "password");
    addUser(10, "User 7", "user7", "password");

    console.log("Database setup complete");
};


request.onsuccess = function (event) {
    const db = event.target.result;
    console.log("Database opened successfully");
};

request.onerror = function (event) {
    console.error("Error opening database:", event.target.errorCode);
};