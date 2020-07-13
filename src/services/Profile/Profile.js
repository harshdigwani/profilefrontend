import { API } from '../../Backend';
import { getToken } from '../Auth/Auth';

// getting all Profiles
export const getAllProfiles = async function () {
    let response = await fetch(`${API}/profile/all`, {

        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
    response = await response.json();
    return response;
}

// get my profile
export const getMyProfile = async function () {
    let response = await fetch(`${API}/profile/me`, {

        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-auth-token": getToken()
        }
    })
    response = await response.json();
    return response;
}


// Get Profile by id
export const getProfileById = async function (profileId) {
    let response = await fetch(`${API}/profile/${profileId}`, {

        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
    response = await response.json();
    return response;
}



// Update My Profile
export const updateProfile = async function (profile) {
    let response = await fetch(`${API}/profile/me`, {

        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-auth-token": getToken()
        },
        body: JSON.stringify(profile)
    })
    response = await response.json();
    return response;
}

