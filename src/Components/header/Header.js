import React, { useState } from "react";
import { Link, createSearchParams, useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import './Header.css';
import { determineParams } from "../../utilities/determineParams";
import { determinePath } from "../../utilities/determinePath";

export function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const pathArray = location.pathname.split('/');
    const subPath = pathArray[2]? `/${pathArray[2]}` : '';
    const path = pathArray[1] + subPath.slice(0, 11);
    const [search, setSearch] = useState('');
    const [show, setShow] = useState(false);

    window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {
            setShow(false);
        }
    }

    function handleSearch(event, searchQuery) {
        event.preventDefault();
        const params = determineParams(pathArray, searchQuery);
        const route = determinePath(location, params);
        console.log(route);
        navigate({
            pathname: route,
            search: `?${createSearchParams(params)}`
        });
    }

    function toggleDropdown() {
        setShow(prev => !prev);
    }

    return (
        <header className='header'>
            <nav className='nav'>
                <button onClick={toggleDropdown} className='dropbtn'>{path || 'Home'}</button>
                <div id="myDropdown" className={`dropdown-content  ${show && 'show'}`}>
                    <Link className="link" to={''}>Home</Link>
                    <Link className="link" to={'subreddits'}>Subreddits</Link>
                    <Link className="link" to={'users'}>Users</Link>
                </div>
            </nav>
            <div className="banner">
                <div className="logo-container">
                    <img className='logo' src='/images/reddit-logo.png' alt='reddit logo' />
                </div>
                <h1>reddit<span>Minimal</span></h1>
            </div>
            <SearchBar search={search} setSearch={setSearch} handleSubmit={handleSearch} />
        </header>
    )
}