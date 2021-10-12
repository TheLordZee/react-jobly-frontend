const useLocalStorage = () => {
    
    const getCurrUser = () => {
        let user = localStorage.getItem("currUser");
        return JSON.parse(user)
    }

    const getToken = () => {
        return localStorage.getItem("token");
    }

    const setToken = (token) => {
        localStorage.setItem("token", token);
    }

    const setCurrUser = (currUser) => {
        localStorage.setItem("currUser", JSON.stringify(currUser))
    }

    const logout = () => {
        console.log("logged out")
        localStorage.removeItem("currUser")
        localStorage.removeItem("token")
    }

    return {getCurrUser, setCurrUser, getToken, setToken, logout}
}

export default useLocalStorage;