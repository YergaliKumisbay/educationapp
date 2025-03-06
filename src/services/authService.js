export const authService = {
    getUsers: () => JSON.parse(localStorage.getItem("users")) || [],
    setUsers: (users) => localStorage.setItem("users", JSON.stringify(users)),
    getCurrentUser: () => JSON.parse(localStorage.getItem("currentUser")),
    setCurrentUser: (user) => localStorage.setItem("currentUser", JSON.stringify(user)),
    logout: () => {
        localStorage.removeItem("currentUser");
        window.location.reload();
    },
    isAdmin: () => {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        return user?.role === 'admin';
    }
};