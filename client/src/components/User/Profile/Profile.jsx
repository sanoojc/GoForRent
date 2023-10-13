import React, { Suspense, lazy, useEffect, useState } from 'react'
import Header from '../Header/Header'
import { useDispatch, useSelector } from 'react-redux'
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import { cancelBooking, fetchBookings } from '../../../Api/UserApi';
import Swal from 'sweetalert2';
import PasswordIcon from '@mui/icons-material/Password';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import HistoryIcon from '@mui/icons-material/History';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
const EditProfileModal = lazy(() => import('../../Modal/EditProfileModal'))
import { Jelly } from '@uiball/loaders'
import ResetPassword from '../../Modal/ResetPassword';
import BookingHistoryModal from '../../Modal/BookingHistoryModal';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AddProof from '../../Modal/AddProof';
import toast, { Toaster } from 'react-hot-toast';


function Profile() {
  const dispatch = useDispatch()
  const [bookings, setbookings] = useState([])
  const { user } = useSelector((state) => state)
  const [open, setOpen] = useState(false)
  const [fetch, setfetch] = useState(false)
  const [openResetPassword, setOpenResetPassword] = useState(false)
  const [openBookings, setOpenBookings] = useState(false)
  const [openProof, setOpenProof] = useState(false)

  useEffect(() => {
    (async () => {
      const { data } = await fetchBookings(user.details._id)
      setbookings(data.bookings)
    })()
  }, [fetch])
  const bookingHistory = bookings.filter((booking) => booking.paymentStatus !== "Paid")
  function handleLogut(e) {
    e.preventDefault()
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('userToken')
        dispatch({ type: 'refresh' })
      }
    })
  }

  const handleCancel = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await cancelBooking(id)
        if (data.error) {
          toast.error(data.message)
        } else {
          toast.success(data.message)
        }
       
      }
      setfetch(!fetch)
    })
  }

  return (
    <div>
      <Header />
      <Toaster />
      {/* Modal */}
      <div className="flex justify-center bg-red-500">
        <Suspense fallback={
          <Jelly
            size={80}
            speed={0.9}
            color="black"
          />
        }>
          {open && <EditProfileModal user={user} close={() => setOpen(false)} />}
        </Suspense>
      </div>
      {/* Modal  */}

      {/* reset password */}
      <div className="flex justify-center bg-red-500">
        <Suspense fallback={
          <Jelly
            size={80}
            speed={0.9}
            color="black"
          />
        }>
          {openResetPassword && <ResetPassword openModal={openResetPassword} close={() => setOpenResetPassword(false)} />}
        </Suspense>
      </div>
      {/* reset password */}
      {/* booking history */}
      <div className="flex justify-center bg-red-500">
        <Suspense fallback={
          <Jelly
            size={80}
            speed={0.9}
            color="black"
          />
        }>
          {
            openBookings && <BookingHistoryModal bookings={bookingHistory} close={() => setOpenBookings(false)} />
          }
        </Suspense>
      </div>
      {/* booking history */}
      {/* Add Proof */}
      <div className="flex justify-center bg-red-500">
        <Suspense fallback={
          <Jelly
            size={80}
            speed={0.9}
            color="black"
          />
        }>
          {
            openProof && <AddProof close={() => setOpenProof(false)} />
          }
        </Suspense>
      </div>
      {/* Add Proof */}

      <section style={{ backgroundColor: '#eee', height: 'auto' }}>
        <MDBContainer className="py-5">
          <MDBRow>
            <MDBCol lg="4">
              <h3 className='text-center pb-4' >PROFILE</h3>
              <MDBCard className="mb-4">
                <MDBCardBody className="">
                  <div className="flex  justify-center mb-3">
                    <MDBCardImage
                      src={user.details.profile}
                      alt="avatar"
                      className="rounded-circle object-fit-contain mx-auto"
                      style={{ width: '100px', height: 'auto' }}
                      fluid
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="text-muted mb-2">{user.details.name}</h4>
                    <p className="text-muted mb-2">{user.details.email}</p>
                    <p className="text-muted mb-4">{`+91 ${user.details.number}`}</p>
                  </div>
                  <div className="d-flex justify-content-center gap-3 mb-3">
                    <MDBBtn className='btn-warning' onClick={() => setOpen(!open)}>Edit</MDBBtn>
                    <MDBBtn onClick={handleLogut} className='btn-danger'>Logout</MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCard>
              <MDBCard className="cursor-custom hover:cursor-pointer mb-4 mb-lg-0">
                <MDBCardBody className="p-0 ">
                  <MDBListGroup flush className="rounded-3">
                    <MDBListGroupItem onClick={() => setOpenResetPassword(true)} className=" hover:bg-slate-100 d-flex justify-content-between align-items-center p-3">
                      <PasswordIcon />
                      <MDBCardText>Change Password</MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem onClick={() => setOpenProof(true)} className="d-flex justify-content-between align-items-center p-3 hover:bg-slate-100">
                      <PermMediaIcon />
                      <MDBCardText>Add Proof</MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem onClick={() => setOpenBookings(true)} className="d-flex justify-content-between align-items-center p-3 hover:bg-slate-100">
                      <HistoryIcon />
                      <MDBCardText>Booking History</MDBCardText>
                    </MDBListGroupItem>
                  </MDBListGroup>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol sm="12" lg="8">
              <h3 className='text-center pb-4'>BOOKINGS</h3>
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="2" md="2">
                      <MDBCardText>Image</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="2" md="2">
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

                  {bookings.filter((booking) => booking.paymentStatus === 'Paid').map((booking) => (
                    <>
                      <MDBRow key={booking._id} className="align-items-center">
                        <MDBCol sm="2" md="2">
                          <MDBCardText className="w-20 h-10">
                            <img src={booking?.vehicle?.images[0]} alt="" className="img-fluid" />
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol sm="2" md="2">
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
                        <MDBCol sm="2" md="2">
                          {booking.paymentStatus === "Paid" ? (
                            <MDBBtn onClick={() => handleCancel(booking._id)} className="" >Cancel</MDBBtn>
                          ) : (
                            <MDBBtn className="" disabled>Cancel</MDBBtn>
                          )
                          }
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

      </section>


    </div>
  )
}

export default Profile