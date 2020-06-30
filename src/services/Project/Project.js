import { API } from '../../Backend';

// getting all projects
export const getAllProjects = function () {
    fetch(`${API}/projects/all`, {

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

// Get Project by id
export const getProjectById = function (projectId) {
    fetch(`${API}/projects/${projectId}`, {

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


// Get projects of a user
export const getprojectsOfUser = function (userId) {
    fetch(`${API}/projects/user/${userId}`, {

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



// Add project
export const addProject = function (project) {
    fetch(`${API}/projects`, {

        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(project)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.error(err));
}


// Update project
export const updateProject = function (projectId, project) {
    fetch(`${API}/projects/${projectId}`, {

        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(project)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.error(err));
}



// delete Project
export const deleteProject = function (projectId) {
    fetch(`${API}/projects/${projectId}`, {

        method: "DELETE",
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
