import React, { useState } from "react";
import { useInput } from "../components/hooks/input-hook"
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

function AddMove(props) {
    const { value:name, bind:bindName, reset:resetName} = useInput('');
    const { value: notes, bind: bindNotes, reset: resetNotes } = useInput('');
    const [ entrances, setEntrances ] = useState([]);

    const handleSubmit = async e => {
        e.preventDefault();

        const entranceIds = entrances.map(entrance => entrance.id);

        const { id } = props.match.params;
        try {
            const res = await axios.post("/move", {
                name, notes, category: id, entranceIds
            })
        } catch (e) {
            console.error(e)
        }
        resetName();
        resetNotes();
    }
    const addEntrance = entrance => {
        setEntrances(entrances => [...entrances, entrance]);
    }
    return (
        <AddWrapper onSubmit={handleSubmit} autoComplete="off">
            <label>
                Move Name:    
                <input
                    type="text"
                    autoComplete="off"
                    {...bindName}
                />
            </label>
            <label htmlFor="autocomplete">Enter from:</label>
            {entrances.length > 0 && entrances.map(suggestion => {
                return  (
                    <li key={suggestion.id}>
                        {suggestion.name}
                    </li>
                )
            })}
            <Autocomplete
                suggestions={props.location.state.moves}
                addEntrance={addEntrance}
            />
            <label>
                Notes:   
                <textarea
                    {...bindNotes}
                />
            </label>
            <input type="submit" value="Add Move" />
        </AddWrapper>
    )
}

export default AddMove;