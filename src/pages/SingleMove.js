import React, { useState, useEffect } from "react";
import axios from "axios";
import qs from 'qs';

function SingleMove(props) {
  const [ move, setMove ] = useState({});
  const [ entrances, setEntraces ] = useState([]);

  useEffect(() => {
    getMove(move);
  }, []);

  const getMove = async () => {
    const { id } = props.match.params;
    console.log(id)
    try {
      const res = await axios.get(`/move/${id}`);
      console.log(res);
      const data = res.data.data[0]
      setMove(data);
      if (data.entranceIds.length > 0) {
        getEntrances(data.entranceIds)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const getEntrances = async (entrances) => {

    try {
      const res = await axios.get('/move/entrances', {
        params: {
          entrances
        },
        paramsSerializer: params => {
          return qs.stringify(params)
        }
      })
      console.log(res)
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <h1>Hi</h1>
  )
}

export default SingleMove;
