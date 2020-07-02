import { API } from '../../Backend';

// Signup api endpoint
export const signup = async function (user) {
    let response = await fetch(`${API}/users/signup`, {

        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });
    response = await response.json();
    return response;
}

// Signup api endpoint
export const signin = async function (user) {
    let response = await fetch(`${API}/auth`, {

        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });
    const status = response.status;
    response = await response.json();

    if (status === 200) {
        console.log("status 200");
        authenticate({ ...response.data, 'token': response.token });
    }
    return response;
}


// Authenticating user after logging in. 
export const authenticate = function (data) {
    if (typeof window !== "undefined") localStorage.setItem("user", JSON.stringify(data));
};


//Signout api
export const signout = function (next) {
    if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        next();

        return fetch(`${API}/auth/signout`, {
            method: "GET"
        })
            .then(response => console.log("signout success"))
            .catch(err => console.log(err));
    }
};


// checking user is loggeg in
export const isAutheticated = function () {
    if (typeof window == "undefined") {
        return false;
    }
    if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
    } else {
        return false;
    }
};


export const isAdmin = function () {
    if (typeof window == "undefined") {
        return false;
    }
    const user = localStorage.getItem("user");
    if (user) {
        return user.isAdmin;
    } else {
        return false;
    }
};


export const getToken = function () {
    const token = isAutheticated().token
    return token ? token : "";
}