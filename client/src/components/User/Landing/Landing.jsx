import React from 'react'
import './Landing.css'
import { Link } from 'react-router-dom'

function Landing() {
    return (
        <>
            <div className="navbar">
                <>
                    <Link to='/'>logo</Link>
                    <Link to='/'>GoForRent</Link>
                </>
                <>
                    <Link to='/chat'>chat</Link>
                    <Link to='/login'>login</Link>
                </>
            </div>
            <div className="banner">
                <div className='banner-img'>
                    <h1>Dream it Rent it Ride it.</h1>
                    <h5>find the right one</h5>
                    <div style={{ display: 'flex' }}>
                        <p>hub name</p>
                        <p>userlocation</p>
                        <input className='search-box' type="search" placeholder='search..' />
                        <button style={{ border: '0', borderRadius: '8px' }}>search</button>
                    </div>
                </div>
            </div>
            <div className="category">
                <h2>premium cars</h2>
                <h2>vintage cars</h2>
                <h2>premium bikes</h2>
            </div>
            <>
                <h3 style={{ color: 'black' }}>view all</h3>
            </>
            <div className="vehicles">
                <div className="vehicle-card">
                    <div className="vehicle-img"></div>
                    <div className="vehicle-details"></div>
                </div>
            </div>
            <div className="footer"></div>
        </>
    )
}

export default Landing