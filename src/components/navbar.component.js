import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

export default () => {
    return (
        <nav className="navbar navbar-expand-lg">
            <Link to="/" className="navbar-brand">My Watch</Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                        <Link to="/stats" className="nav-link">Statistics</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/futurewatches" className="nav-link">Future Watches</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/watchlist" className="nav-link">Watch List</Link>
                    </li>
                </ul>
            </div>
            <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Find a show or movie" aria-label="Search" />
                <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
            </form>
        </nav>
    )
};