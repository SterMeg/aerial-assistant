import React, { useState, useEffect } from "react";
import { useInput } from "./hooks/input-hook";
import axios from "axios";
import { getToken } from "../services/tokenService";
import { Link } from 'react-router-dom';
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

function Dashboard() {
    const [ categories, setCategories ] = useState([]);
    const { value, bind, reset } = useInput('');
  
    useEffect(() => {
        getCategories(categories);
    }, [categories])    

    const getCategories = async () => {
        const token = getToken();
        try {
            const res = await axios.get('/categories', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setCategories(res.data.payload)
        } catch(e) {
            console.log(e)
        }
    }
    const removeItem = async itemId => {
        try {
            await axios.delete(`/categories/${itemId}`)
        } catch(e) {
            console.log(e)
        }
        getCategories()
    }
 
    const handleSubmit = async e => {
        e.preventDefault();
        const token = getToken();

        try {
            const res = await axios.post('/categories', { name: value }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            getCategories();
        } catch (e) {
            console.error(e)
        }
        reset();
    }
    return (
        <div>
            <p>A digital journal for keeping track of your moves and progress.</p>
            <CardGrid>
                {categories.map(category => {
                    return <li key={category._id}>
                    <Link to={`/moves/${category._id}`}>
                        {category.name}
                    </Link>
                    <button onClick={() => removeItem(category._id)}>Remove</button>
                    </li>

                })}
            </CardGrid>
            <form onSubmit={handleSubmit}>
                <input name="category" type="text" {...bind} />
                <input type="submit" value="Add sport" />
            </form>
        </div>
    )
}

export default Dashboard;