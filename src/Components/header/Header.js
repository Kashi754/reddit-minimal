import { useState } from "react"
import React from "react";
import { useNavigate } from "react-router-dom";
import './Header.css';
import SearchBar from "../SearchBar/SearchBar";

export function Header() {
    const url = window.location.href.split('/')[3];
    const [search, setSearch] = useState();
    const navigate = useNavigate();

    function handleSearch(event) {
        setSearch(event.target.value);
    }

    function handleOption(event) {
        navigate(`/${event.target.value}`);
    }

    return (
        <header className='header'>
            <nav className='nav'>
                <select className='nav' value={url} onChange={handleOption}>
                    <option value=''>Home</option>
                    <option value='subreddits'>Subreddits</option>
                    <option value='users'>Users</option>
                </select>
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