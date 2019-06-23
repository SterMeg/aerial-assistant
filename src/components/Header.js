import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logout from "./Logout";

const Navbar = styled.nav`
    background: #A1E8CC;
    display: flex;
    align-items: center;
    justify-content: space-between;
    h1 {
        padding: 20px 50px;
        font-family: 'Shadows Into Light', cursive;
        margin: 0;
        color: #495159;
    }
    button {
        margin: 0 50px;
        background: #fff;
        color: #495159;
        font-family: 'Lato', sans-serif;
        padding: 10px 25px;
        border: 2px solid #FAC9B8;
    }
`;

const Header = ({setUser}) => (
    <Navbar>
        <Link to={'/'}>
            <h1>Aerial Assistant</h1>
        </Link>
        <Logout setUser={setUser} />
    </Navbar>
);

export default Header;