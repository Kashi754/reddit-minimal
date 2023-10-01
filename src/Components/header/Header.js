import React, { useState } from "react";
import { Link, createSearchParams, useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import './Header.css';
import { determineParams } from "../../utilities/determineParams";
import { determinePath } from "../../utilities/determinePath";
import { resetCount } from "../../Pages/searchPage/searchPageSlice";
import { useDispatch } from "react-redux";

export function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const pathArray = location.pathname.split('/');
    const subPath = pathArray[2]? `/${pathArray[2]}` : '';
    const path = pathArray[1] + subPath.slice(0, 11);
    const [search, setSearch] = useState('');
    const [show, setShow] = useState(false);

    window.onclick = function(event) {
        if (!event.target.parentNode.matches('.nav-button')) {
            if(event.target.matches('#search')) {
                return;
            }
            setShow(false);
        }
    }

    function handleSearch(event, searchQuery) {
        event.preventDefault();
        dispatch(resetCount());
        const params = determineParams(pathArray, searchQuery);
        const route = determinePath(location, params);
        console.log(route);
        navigate({
            pathname: route,
            search: `?${createSearchParams(params)}`
        });
        setSearch('');
    }

    function toggleDropdown() {
        setShow(!show);
    }

    return (
        <header className='header'>
            <nav className='nav'>
                <button onClick={toggleDropdown} className="nav-button">
                    <h2 className='dropbtn'>{path || 'Home'}</h2>
                    <h2 className='drop-arrow'>&gt;</h2>        
                </button>
                <div id="myDropdown" className={`dropdown-content  ${show && 'show'}`}>
                    <SearchBar className='search-bar' search={search} setSearch={setSearch} handleSubmit={handleSearch} />
                    <Link className="link" to={''}>Home</Link>
                    <Link className="link" to={'subreddits'}>Subreddits</Link>
                    <Link className="link" to={'users'}>Users</Link>
                </div>
            </nav>
            <div className="banner">
                <div className="logo-container">
                    <img className='logo' src='/images/reddit-logo.png' alt='reddit logo' />
                <div className="header-text">
                    <h1>reddit</h1><h1 className="span">Minimal</h1>
                </div>
                </div>
            </div>
        </header>
    )
}