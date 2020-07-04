import React, { Component } from 'react';
import { getAllCategories, addCategory, deleteCategory, updateCategory } from '../../services/Category/Category';
import Base from '../Base/Base';
class Categories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            category: "",
            categoryId: "",
            error: {},
            loading: true
        }
    }

    async componentDidMount() {
        await this.getAllCategories();
    }

    getAllCategories = async () => {
        try {
            const response = await getAllCategories();
            if (response.ok)
                this.setState({ categories: response.data, loading: false });
            console.log(response.message);
        } catch (err) {
            console.error(err);
        }
    }

    addCategory = async () => {
        try {
            const result = await addCategory(this.state.category);
            console.log(result);

        } catch (err) {
            console.error(err);
        }
    }

    updateCategory = async (categoryId, category) => {
        try {
            const result = await updateCategory(categoryId, category);
            console.log(result);

        } catch (err) {
            console.error(err);
        }
        this.setState({ categoryId: "", category: "" });
    }


    deleteCategory = async (categoryId) => {
        try {
            alert("delete category");
            const result = await deleteCategory(categoryId);
            console.log(result);

        } catch (err) {
            console.error(err)
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <Base>
                <div>
                    <input
                        type="text"
                        name="category"
                        onChange={this.handleChange}
                        value={this.state.category} />

                    <button onClick={this.addCategory} >Add Category</button>

                    {Object(this.state.categories).map(category => (
                        <div key={category._id}>

                            {(this.state.categoryId === category._id) ?
                                (<div>
                                    <input
                                        type="text"
                                        name="category"
                                        onChange={this.handleChange}
                                        value={this.state.category} />
                                    <button onClick={() => this.updateCategory(category._id, this.state.category)}>Update</button>
                                </div>) :
                                <h1 >{category.name}</h1>}
                            <button onClick={() => this.deleteCategory(category._id)}>Delete</button>
                            <button onClick={() => this.setState({ categoryId: category._id, category: category.name })}>Edit</button>
                        </div>
                    ))
                    }
                </div>
            </Base>
        )
    }
}

export default Categories