import { API } from '../../Backend';
import { getToken } from '../Auth/Auth';

// getting all Categories
export const getAllCategories = async function () {
    let response = await fetch(`${API}/category/all`, {

        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })

    response = await response.json();
    return response;
}

// Getting category by id
export const getCategoryById = async function (categoryId) {
    let response = await fetch(`${API}/category/${categoryId}`, {

        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    });
    response = await response.json();
    return response;
}


// Add category
export const addCategory = async function (categoryName) {
    let response = await fetch(`${API}/category`, {

        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-auth-token": getToken()
        },
        body: JSON.stringify({ "name": categoryName })
    });
    response = await response.json();
    console.log(getToken());
    return response;
}


// Update Category
export const updateCategory = async function (categoryId, categoryName) {
    let response = await fetch(`${API}/category/${categoryId}`, {

        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-auth-token": getToken()
        },
        body: JSON.stringify({ "name": categoryName })
    });
    response = await response.json();
    return response;
}


// delete category
export const deleteCategory = async function (categoryId) {
    let response = await fetch(`${API}/category/${categoryId}`, {

        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-auth-token": getToken()
        }
    });
    response = await response.json();
    return response;
}
