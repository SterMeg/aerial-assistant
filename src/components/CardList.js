import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
    background: #e8f1f2;
    border-radius: 10px;
    padding: 30px;
    text-align: center;
  }
`;

function CardList(props) {
  const [moves, setMoves] = useState([]);

  useEffect(() => {
    getMoves(moves);
  }, []);

  const getMoves = async () => {
    const { id } = props.match.params;
    try {
      const res = await axios.get("/move", {
        params: {
          category: id
        }
      });
      setMoves(res.data.payload);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <CardGrid>
      <li>
        <Link
          to={{
            pathname: `/moves/${props.match.params.id}/add`,
            state: {
              moves: moves.map(move => {
                return {
                  name: move.name,
                  id: move._id
                };
              })
            }
          }}
        >
          Add new move
        </Link>
      </li>
      {moves.map(move => {
        return (
          <li key={move._id}>
            <h2>{move.name}</h2>
            <p>{move.notes}</p>
            <Link
              to={`/move/${move._id}`}>
              Go to move
            </Link>
          </li>
        );
      })}
    </CardGrid>
  );
}

export default CardList;
