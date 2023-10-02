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
import { fetchBookings } from '../../../Api/UserApi';
import Swal from 'sweetalert2';
import PasswordIcon from '@mui/icons-material/Password';
import PermMediaIcon from '@mui/icons-material/PermMedia';
const EditProfileModal = lazy(() => import('../../Modal/EditProfileModal'))
import { Jelly } from '@uiball/loaders'


function Profile() {
  const dispatch = useDispatch()
  const [bookings, setbookings] = useState([])
  const { user } = useSelector((state) => state)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    (async () => {
      const { data } = await fetchBookings(user.details._id)
      console.log(data.bookings, 'booking data')
      setbookings(data.bookings)
    })()
  }, [])
  function handleClose() {

  }
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

  return (
    <div>
      <Header />

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

      <section style={{ backgroundColor: '#eee' }}>
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
                    <p className="text-muted mb-4">{user.details.email}</p>
                  </div>
                  <div className="d-flex justify-content-center gap-3 mb-3">
                    <MDBBtn className='btn-warning' onClick={() => setOpen(!open)}>Edit</MDBBtn>
                    <MDBBtn onClick={handleLogut} className='btn-danger'>Logout</MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCard>
              <MDBCard className=" mb-4 mb-lg-0">
                <MDBCardBody className="p-0">
                  <MDBListGroup flush className="rounded-3">
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <PasswordIcon />
                      <MDBCardText>Reset Password</MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <PermMediaIcon />
                      <MDBCardText>Add Proof</MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBIcon fab icon="twitter fa-lg" style={{ color: '#55acee' }} />
                      <MDBCardText>@mdbootstrap</MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBIcon fab icon="instagram fa-lg" style={{ color: '#ac2bac' }} />
                      <MDBCardText>mdbootstrap</MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBIcon fab icon="facebook fa-lg" style={{ color: '#3b5998' }} />
                      <MDBCardText>mdbootstrap</MDBCardText>
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

                  {bookings.map((booking) => (
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
                          <MDBBtn className="" >Cancel</MDBBtn>
                        ) : (
                          <MDBBtn className="" disabled>Cancel</MDBBtn>
                        )
                        }
                      </MDBCol>
                    </MDBRow>
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