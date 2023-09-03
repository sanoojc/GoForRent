import React from 'react'
import './Landing.css'
import Header from '../Header/Header'

function Landing() {
    return (
        <>
            <Header />
            <div className="banner" style={{color:'white'}}>
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
            <>
            <h1>what are you looking for</h1>
            <div className="">
            <div>cars</div>
            <div>bikes</div>
            </div>
            </>
            <div className="category">
                <div className="category-card">
                    <h2>premium cars</h2>

                </div>
                <div className="category-card">
                    <h2>vintage cars</h2>

                </div>
                <div className="category-card">
                    <h2>premium bikes</h2>

                </div>
            </div>
            <>
                <h3 style={{ color: 'black',paddingLeft:'30px',marginTop:'40px',paddingBottom:'20px' }}>view all</h3>
            </>
            <div className="vehicles">
                <div className="vehicle-card">
                    <div className="vehicle-img"></div>
                    <div className="vehicle-details">
                        <h5>polo gt tsi</h5>

                    </div>
                </div>
            </div>
            <div className="footer">

            </div>
        </>
    )
}

export default Landing