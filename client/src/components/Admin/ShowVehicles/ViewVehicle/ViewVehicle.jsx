import React from 'react'
import './ViewVehicle.css'
import { useLocation } from 'react-router-dom'
import Sidebar from '../../Sidebar/Sidebar'
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import TaxiAlertIcon from '@mui/icons-material/TaxiAlert';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PinDropIcon from '@mui/icons-material/PinDrop';
import CategoryIcon from '@mui/icons-material/Category';

function ViewVehicle() {
    const location = useLocation()
    console.log(location.state)
    return (
        <div>
            <Sidebar />
            <div className="details-container flex flex-col sm:flex-row justify-center sm:justify-around gap-5 sm:px-16 mt-10 ml-8 sm:ml-10 pl-10">
                <div className="flex justify-center pr-4">
                    <div className="image-container w-auto ">
                        <img className='rounded-md border shadow-md' src={location.state.images} alt="" />
                    </div>


                </div>
                <div className="specifications w-auto pr-4 pb-5">
                    <div className=" text-gray-600 pb-4">
                        <h2 className='text-3xl'>{location.state.brand}</h2>
                        <h3>{location.state.vehicleName}</h3>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="border rounded-md p-4">
                            <h6 className="flex items-center text-red-400">
                                <CalendarMonthIcon className="mr-2" />
                                Year
                            </h6>
                            <p className="mt-2 text-lg">{location.state.year}</p>
                        </div>

                        <div className="gridDiv">
                            <h6 className="flex items-center text-red-400">
                                <AirlineSeatReclineNormalIcon className="mr-2" />
                                Capacity
                            </h6>
                            <p className="mt-2 text-lg">{location.state.noOfSeats}</p>
                        </div>

                        <div className="gridDiv">
                            <h6 className="flex items-center text-red-400">
                                <LocalGasStationIcon className="mr-2" />
                                Fuel type
                            </h6>
                            <p className="mt-2 text-lg">{location.state.fuelType}</p>
                        </div>

                        <div className="gridDiv">
                            <h6 className="flex items-center text-red-400">
                                <PinDropIcon className="mr-2" />
                                Hub ID
                            </h6>
                            <p className="mt-2 text-lg">{location.state.hubId}</p>
                        </div>

                        <div className="gridDiv">
                            <h6 className="flex items-center text-red-400">
                                <TaxiAlertIcon className="mr-2" />
                                Body type
                            </h6>
                            <p className="mt-2 text-lg">{location.state.bodyType}</p>
                        </div>

                        <div className="gridDiv">
                            <h6 className="flex items-center text-red-400">
                                <CategoryIcon className="mr-2" />
                                Class
                            </h6>
                            <p className="mt-2 text-lg">{location.state.classOfVehicle}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ViewVehicle