import { useRef, useState } from "react"
import React from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import './Header.css';
import SearchBar from "../SearchBar/SearchBar";

export function Header() {
    const location = useLocation();
    const pathArray = location.pathname.split('/');
    const subPath = pathArray[2]? `/${pathArray[2]}` : '';
    const path = pathArray[1] + subPath.slice(0, 11);
    const [search, setSearch] = useState();
    const [show, setShow] = useState(false);

    window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {
            setShow(false);
        }
    }

    function handleSearch(event) {
        return;
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