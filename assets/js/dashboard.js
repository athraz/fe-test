document.addEventListener("DOMContentLoaded", function () {
    const usersPerPage = 5;
    let currentPage = parseInt(localStorage.getItem("currentPage")) || 1;
    let users = [];

    function renderTable() {
        const userTableBody = document.getElementById("userTableBody");
        userTableBody.innerHTML = "";

        const startIndex = (currentPage - 1) * usersPerPage;
        const endIndex = Math.min(startIndex + usersPerPage, users.length);

        for (let i = startIndex; i < endIndex; i++) {
            const user = users[i];
            const row = `
            <tr>
                <td class="border border-gray-300 px-4 py-2">${user.id}</td>
                <td class="border border-gray-300 px-4 py-2">${user.name}</td>
                <td class="border border-gray-300 px-4 py-2">${user.username}</td>
                <td class="border border-gray-300 px-4 py-2">
                    <button class="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600" 
                        onclick="deleteUser(${user.id})">Delete</button>
                </td>
            </tr>
        `;
            userTableBody.insertAdjacentHTML("beforeend", row);
        }

        document.getElementById("currentPage").textContent = `Page ${currentPage}`;
    }

    function updatePaginationButtons() {
        document.getElementById("prevPage").disabled = currentPage === 1;
        document.getElementById("nextPage").disabled = currentPage * usersPerPage >= users.length;
    }

    function loadUsers() {
        getAllUsers().then(fetchedUsers => {
            users = fetchedUsers;
            renderTable();
            updatePaginationButtons();
        }).catch(error => {
            console.error("Error loading users:", error);
        });
    }

    document.getElementById("prevPage").addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            localStorage.setItem("currentPage", currentPage);
            renderTable();
            updatePaginationButtons();
        }
    });

    document.getElementById("nextPage").addEventListener("click", () => {
        if (currentPage * usersPerPage < users.length) {
            currentPage++;
            localStorage.setItem("currentPage", currentPage);
            renderTable();
            updatePaginationButtons();
        }
    });
    loadUsers();
})