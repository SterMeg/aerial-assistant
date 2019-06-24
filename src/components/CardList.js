import React, { Component, Fragment } from "react";
import axios from "axios";
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
        moves: []
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
                    <li>
                    <Link
                        to={{
                            pathname: `/moves/${this.props.match.params.id}/add`,
                            state: {
                                moves: this.state.moves.map(move => {
                                    return {
                                        name: move.name,
                                        id: move._id
                                    }
                                })
                            }
                        }}
                    >
                        Add new move
                    </Link></li>
                </CardGrid>
            </Fragment>
        )
    }
}

export default CardList;