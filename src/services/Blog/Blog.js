import { API } from '../../Backend';
import { getToken } from '../Auth/Auth';

// getting all Blogs
export const getAllBlogs = async function () {
    let response = await fetch(`${API}/blogs/all`, {

        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    });

    response = await response.json();
    return response;
}

// Get Blog by id
export const getBlogById = async function (blogId) {
    let response = await fetch(`${API}/blogs/${blogId}`, {

        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })

    response = await response.json();
    return response;
}


// Get blogs of a user
export const getBlogsOfUser = async function (userId) {
    let response = await fetch(`${API}/blogs/user/${userId}`, {

        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })

    response = await response.json();
    return response;
}


// Add blog or post blog
export const createBlog = async function (blog) {
    let response = await fetch(`${API}/blogs`, {

        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-auth-token": getToken()
        },
        body: JSON.stringify(blog)
    })

    response = await response.json();
    return response;
}


// Update Blog
export const updateBlog = async function (blogId, blog) {
    let response = await fetch(`${API}/blogs/${blogId}`, {

        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-auth-token": getToken()
        },
        body: JSON.stringify(blog)
    })

    response = await response.json();
    return response;
}



// delete Blog
export const deleteBlog = async function (blogId) {
    let response = await fetch(`${API}/blogs/${blogId}`, {

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
