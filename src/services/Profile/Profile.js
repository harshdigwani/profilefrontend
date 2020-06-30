import { API } from '../../Backend';

// getting all Profiles
export const getAllProfiles = function () {
    fetch(`${API}/profile/all`, {

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

// get my profile
export const getMyProfile = function () {
    fetch(`${API}/profile/me`, {

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


// Get Profile by id
export const getProfileById = function (profileId) {
    fetch(`${API}/profile/${profileId}`, {

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



// Update My Profile
export const updateProfile = function (profile) {
    fetch(`${API}/profile/me`, {

        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(profile)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.error(err));
}

