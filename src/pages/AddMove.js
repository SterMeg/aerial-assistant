import React, { Component, Fragment } from "react";
import axios from "axios";
import styled from 'styled-components';
import Autocomplete from '../components/Autocomplete'

const AddWrapper = styled.form`
    width: 100%;
    input,
    textarea {
        display: block;
        width: 100%
    }
`

class AddMove extends Component {
    state = {
        name: '',
        notes: '',
        chosenSuggestions: []
    }
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleSubmit = async e => {
        e.preventDefault();
        const { name, notes, chosenSuggestions } = this.state;
        const entrance = chosenSuggestions.map(suggestion => suggestion.id);

        const { id } = this.props.match.params;
        try {
            const res = await axios.post("/move", {
                name, notes, category: id, entrance
            })
        } catch (e) {
            console.error(e)
        }
        this.setState({
            name: '',
            notes: ''
        });
    }
    addEntrance = entrance => {
        this.setState(state => {
            const chosenSuggestions = [...state.chosenSuggestions, entrance];

            return {
                chosenSuggestions
            }
        })
    }
    render() {
        const {
            handleChange,
            state: {
                name,
                notes,
                chosenSuggestions
            },
            props   
        } = this;
        return (
            <AddWrapper onSubmit={this.handleSubmit} autoComplete="off">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    autoComplete="off"
                    onChange={this.handleChange}
                    name="name"
                    id="name"
                    placeholder="name"
                    value={name}
                />
                <label htmlFor="autocomplete">Enter from:</label>
                {chosenSuggestions.length > 0 && chosenSuggestions.map(suggestion => {
                    return  (
                        <li key={suggestion.id}>
                            {suggestion.name}
                        </li>
                    )
                })}
                <Autocomplete
                    suggestions={props.location.state.moves}
                    addEntrance={this.addEntrance}
                />
                <label htmlFor="notes">Notes:</label>
                <textarea
                    onChange={this.handleChange}
                    name="notes"
                    id="notes"
                    placeholder="notes"
                    value={notes}
                />
                <input type="submit" value="Add Move" />
            </AddWrapper>
        )
    }
}

export default AddMove;