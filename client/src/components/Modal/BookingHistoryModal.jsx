import { MDBCard, MDBCardBody, MDBCardText, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit'
import React, { useState } from 'react'
import { AnimatePresence, motion } from "framer-motion"
import BackdropLoader from '../Backdrop/Backdrop'

export default function BookingHistoryModal({ bookings, close }) {
    const [open, setOpen] = useState(false)
    return (
        <AnimatePresence>
            <BackdropLoader openLoader={open} />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 2 }}
                exit={{ opacity: 2 }}
                className='fixed w-full min-h-screen z-10 insert-0  flex justify-center backdrop-blur-sm bg-opacity-50 items-center'>
                <div className='bg-slate-500 rounded-md shadow-md w-3/4 min-h-3/4 mb-5 p-5'>
                    <div className=" flex justify-end">
                        <h2 className="hover:cursor-pointer border-2 rounded-full px-2 text-white" onClick={close} >X</h2>
                    </div>
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol sm="12" md="12" lg="12" >
                                <h3 className='text-center text-white pb-5'>BOOKING HISTORY</h3>
                                <MDBCard className="mb-4">
                                    <MDBCardBody>
                                        <MDBRow>
                                            <MDBCol sm="3" md="3" lg='3'>
                                                <MDBCardText>Image</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="3" md="3" lg="3">
                                                <MDBCardText>Vehicle</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="2" md="2">
                                                <MDBCardText className="text-muted">Date</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="2" md="2">
                                                <MDBCardText className="text-muted">Days</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="2" md="2">
                                                <MDBCardText className="text-muted">Status</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        <hr />
                                        {bookings.map((booking) => (
                                            <>
                                                <MDBRow key={booking._id} className="align-items-center">
                                                    <MDBCol sm="3" md="3" lg="3">
                                                        <MDBCardText className="w-20 h-10">
                                                            <img src={booking?.vehicle?.images[0]} alt="" className="img-fluid" />
                                                        </MDBCardText>
                                                    </MDBCol>
                                                    <MDBCol sm="3" md="3" lg="3">
                                                        <MDBCardText>{booking.vehicle.vehicleName}</MDBCardText>
                                                    </MDBCol>
                                                    <MDBCol sm="2" md="2">
                                                        <MDBCardText>{new Date(booking?.fromDate).toISOString().split('T')[0]}</MDBCardText>
                                                    </MDBCol>
                                                    <MDBCol sm="2" md="2">
                                                        <MDBCardText className="">{booking.noOfDays}</MDBCardText>
                                                    </MDBCol>
                                                    <MDBCol sm="2" md="2">
                                                        <MDBCardText className="">{booking.paymentStatus}</MDBCardText>
                                                    </MDBCol>
                                                </MDBRow>
                                                <hr />
                                            </>
                                        ))}
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </div >
            </motion.div>
        </AnimatePresence>
    )
}
