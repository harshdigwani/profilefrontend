import React, { Component } from 'react';
import { getAllCategories, addCategory } from '../../services/Category/Category';

class Categories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            category: "",
            error: {},
            loading: true
        }
    }

    async componentDidMount() {
        await this.getAllCategories();
    }

    getAllCategories = async () => {
        try {
            const categories = await getAllCategories();
            this.setState({ categories, loading: false });
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

    handleChange = (e) => {
        this.setState({
            category: e.target.value
        })
    }

    render() {
        return (
            <div>
                <input onChange={this.handleChange} value={this.state.category} />
                <button onClick={this.addCategory} >Add Category</button>
                {Object(this.state.categories).map(category => (
                    <h1 key={category._id}>{category.name}</h1>
                ))}
            </div>
        )
    }
}

export default Categories