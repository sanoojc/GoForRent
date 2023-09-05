import React, { useEffect, useState } from 'react'
import './Landing.css'
import Header from '../Header/Header'
import { getVehicles } from '../../../Api/UserApi'
import { toast } from 'react-hot-toast'
import { Button, TextField,} from '@mui/material'
import { Link } from 'react-router-dom'

function Landing() {

    const [vehicles, setVehicles] = useState([])
    const [name, setName] = useState('')
    useEffect(() => {

        getVehicles(name).then((res) => {
            if (!res.data.error) {
                console.log(res.data.vehicles,'vehicles')
                setVehicles(res.data.vehicles)
            }
        }).catch((err) => {
            toast.error('error', err)
        })


    }, [name])
    return (
        <>
            <Header />

            <div className="banner" style={{ color: 'white' }}>
                <div className='banner-img'>
                    <h1>Dream it Rent it Ride it.</h1>
                    <h5>find the right one</h5>
                    <div style={{ display: 'flex' }}>
                        <p>hub name</p>
                        <p>userlocation</p>
                        <div className="landing-search-container" style={{  display: 'flex', alignItems: 'center' ,background:'#e8edea', display:'flex',alignItems:'center',borderRadius:'8px' }}>
                            <TextField  color='primary' size='small' value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                            <Button color='inherit' variant='outlined' size='medium' onClick={(e) => getVehicles}>Search</Button>
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
                <h3 style={{ color: 'black', paddingLeft: '30px', marginTop: '40px', paddingBottom: '20px' }}>view all</h3>
            </>
            <div className="vehicles">
                {
                  
                    vehicles.map((item, i) => (
                        <Link to={'/'} >
                         <div className="vehicle-card">
                            <div className="vehicle-img">
                                <img src={item.images} />
                            </div>
                            <div className="vehicle-details">
                                <h6>{item.brand}</h6>
                                <h5>{item.vehicleName}</h5>
                                <h6>RS :{item.rent}</h6>

                            </div>
                        </div>
                        </Link>
                       
                    ))
                }
            </div>
            <div className="footer">

            </div>
        </>
    )
}

export default Landing