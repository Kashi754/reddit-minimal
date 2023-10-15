import React from 'react';
import './SearchBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function SearchBar(props) {
    
    function clickHandler(e) {
        props.handleSubmit(e, props.search);
    }
    
    return (
        <form className='form' onSubmit={clickHandler}>
            <button role='button' className='search-button' data-testid='search-button' type='submit'><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
            <input 
                id='search'
                name='search'
                type='text'
                value={props.search}
                onChange={e => props.setSearch(e.target.value)}
                placeholder='Search...'
                spellCheck='false'
            />
        </form>
    );
}

export default SearchBar;