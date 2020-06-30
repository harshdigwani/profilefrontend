import { API } from '../../Backend';

// getting all user
export const getAllUsers = function () {
    fetch(`${API}/users/all`, {

        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.error(err));
}

// Getting signed user details
export const getMe = function (userId) {
    fetch(`${API}/users/me`, {

        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.error(err));
}


