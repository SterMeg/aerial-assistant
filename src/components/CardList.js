import React, { Component, Fragment } from "react";
import axios from "axios";
import styled from 'styled-components';
import Autocomplete from './Autocomplete'

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

class CardList extends Component {
    state = {
        moves: [],
        name: '',
        notes: ''
    }
    componentDidMount() {
        this.getMoves();
    }
    getMoves = async () => {
        const { id } = this.props.match.params;
        try {
            const res = await axios.get('/move', {
                params: {
                    category: id
                }
            })
            this.setState({ moves: res.data.payload })
        } catch(e) {
            console.log(e)
        }
    }
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleSubmit = async e => {
        e.preventDefault();
        const { name, notes } = this.state;
        const { id } = this.props.match.params;
        try {
            const res = await axios.post("/move", {
                name, notes, category: id, entrance: ["5d0d90583177383423750a2d", "5d0d910d3177383423750a2f"] 
            })
            this.getMoves();
        } catch (e) {
            console.error(e)
        }
        this.setState({ 
            name: '' ,
            notes: ''
        });
    }
    render() {
        const { name, notes } = this.state;
        return (
            <Fragment>
                <CardGrid>
                    {this.state.moves.map(move => {
                        return <li key={move._id}>
                            <h2>{move.name}</h2>
                            <p>{move.notes}</p>
                        </li>
                    })}
                </CardGrid>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input 
                        type="text"
                        onChange={this.handleChange}
                        name="name"
                        id="name"
                        placeholder="name"
                        value={name}
                    />
                    <Autocomplete suggestions={['Gemini', 'Helicopter Invert', 'Scorpio']}/>
                    <label htmlFor="notes">Notes:</label>
                    <textarea
                        onChange={this.handleChange}
                        name="notes"
                        id="notes"
                        placeholder="notes"
                        value={notes}
                    />
                    <input type="submit" value="Add Move"/>
                </form>
            </Fragment>
        )
    }
}

export default CardList;