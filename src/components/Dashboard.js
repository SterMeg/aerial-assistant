import React from "react";
import axios from "axios";
import { getToken } from "../services/tokenService";
import { Link } from 'react-router-dom';
import Logout from "./Logout"
import styled from 'styled-components';

const CardGrid = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-auto-rows: minmax(200px, auto);
    grid-gap: 20px;
    list-style-type: none;
    padding: 0;
    li {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background: #E8F1F2;
        border-radius: 10px;
        padding: 30px;
        text-align: center;
    }
`

class Dashboard extends React.Component {
    state = {
        category: '',
        categories: []
    };
    componentDidMount() {
        this.getCategories();
    }
    getCategories = async () => {
        const token = getToken();
        try {
            const res = await axios.get('/categories', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            this.setState({ categories: res.data.payload })
        } catch(e) {
            console.log(e)
        }
    }
    removeItem = async itemId => {
        try {
            await axios.delete(`/categories/${itemId}`)
        } catch(e) {
            console.log(e)
        }
        this.getCategories()
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    } 
    handleSubmit = async e => {
        e.preventDefault();
        const token = getToken();
        const { category } = this.state;
        console.log(category);
        try {
            const res = await axios.post('/categories', { name: category }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            this.getCategories();
        } catch (e) {
            console.error(e)
        }
    }
    render() {
        return (
            <div>
                <p>A digital journal for keeping track of your moves and progress.</p>
                <CardGrid>
                    {this.state.categories.map(category => {
                        return <li key={category._id}>
                        <Link to={`/moves/${category._id}`}>
                            {category.name}
                        </Link>
                        <button onClick={() => this.removeItem(category._id)}>Remove</button>
                        </li>

                    })}
                </CardGrid>
                <form onSubmit={this.handleSubmit}>
                    <input name="category" type="text" onChange={this.handleChange} />
                    <input type="submit" value="Add sport" />
                </form>
            </div>
        )
    };
}

export default Dashboard;