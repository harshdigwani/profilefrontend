import { API } from '../../Backend';

// getting all Blogs
export const getAllBlogs = function () {
    fetch(`${API}/blogs/all`, {

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

// Get Blog by id
export const getBlogById = function (blogId) {
    fetch(`${API}/blogs/${blogId}`, {

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


// Get blogs of a user
export const getBlogsOfUser = function (userId) {
    fetch(`${API}/blogs/user/${userId}`, {

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



// Add blog or post blog
export const addBlog = function (blog) {
    fetch(`${API}/blogs`, {

        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(blog)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.error(err));
}


// Update Blog
export const updateBlog = function (blogId, blog) {
    fetch(`${API}/blogs/${blogId}`, {

        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(blog)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.error(err));
}



// delete Blog
export const deleteBlog = function (blogId) {
    fetch(`${API}/blogs/${blogId}`, {

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
