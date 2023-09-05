import React from 'react'
import './ViewVehicle.css'
import { useLocation } from 'react-router-dom'

function ViewVehicle() {
    const location=useLocation()
    console.log(location.state)
  return (
    <div>
        <div className="details-container">
            <div className="image-container">
                <img src={location.state.images} alt="" />
            </div>
            <div className="specifications">
                <table>
                    <tr>
                        <td>Vehicle name : </td>
                        <td>{location.state.vehicleName}</td>
                    </tr>
                    <tr>
                        <td>Brand : </td>
                        <td>{location.state.brand}</td>
                    </tr>
                    <tr>
                        <td>Year : </td>
                        <td>{location.state.year}</td>
                    </tr>
                    <tr>
                        <td>Seat capacity : </td>
                        <td>{location.state.noOfSeats}</td>
                    </tr>
                    <tr>
                        <td>Fuel type : </td>
                        <td>{location.state.fuelType}</td>
                    </tr>
                    <tr>
                        <td>Hub Id : </td>
                        <td>{location.state.hubId}</td>
                    </tr>
                    <tr>
                        <td>Body type : </td>
                        <td>{location.state.bodyType}</td>
                    </tr>
                    <tr>
                        <td>class : </td>
                        <td>{location.state.class}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
  )
}

export default ViewVehicle