import { API } from '../../Backend';
import { getToken } from '../Auth/Auth';

// getting all projects
export const getAllProjects = async function () {
    let response = await fetch(`${API}/projects/all`, {

        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
    response = await response.json();
    return response;
}

// Get Project by id
export const getProjectById = async function (projectId) {
    let response = await fetch(`${API}/projects/${projectId}`, {

        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
    response = await response.json();
    return response;
}


// Get projects of a user
export const getProjectsOfUser = async function (userId) {
    let response = await fetch(`${API}/projects/user/${userId}`, {

        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
    response = await response.json();
    return response;
}


// Add project
export const createProject = async function (project) {
    let response = await fetch(`${API}/projects`, {

        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-auth-token": getToken()
        },
        body: JSON.stringify(project)
    })
    response = await response.json();
    return response;
}


// Update project
export const updateProject = async function (projectId, project) {
    let response = await fetch(`${API}/projects/${projectId}`, {

        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-auth-token": getToken()
        },
        body: JSON.stringify(project)
    })
    response = await response.json();
    return response;
}


// delete Project
export const deleteProject = async function (projectId) {
    let response = await fetch(`${API}/projects/${projectId}`, {

        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-auth-token": getToken()
        }
    })
    response = await response.json();
    return response;
}
