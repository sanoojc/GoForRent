import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import { useSelector } from 'react-redux'
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


function Profile() {
  const [bookings, setbookings] = useState([])
  const { user } = useSelector((state) => state)
  useEffect(() => {
    (async () => {
      const { data } = await fetchBookings(user.details._id)
      console.log(data.bookings, 'booking data')
      setbookings(data.bookings)
    })()
  }, [])
  const editProfile = () => {
      
  }

  return (
    <div>
      <Header />
      <section style={{ backgroundColor: '#eee' }}>
        <MDBContainer className="py-5">
          <MDBRow>
            <MDBCol lg="4">
              <h3 className='text-center pb-4' >PROFILE</h3>
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                  <div className="flex justify-center pb-3">
                    <MDBCardImage
                      src={user.details.profile}
                      alt="avatar"
                      className="rounded-circle"
                      style={{ width: '150px' }}
                      fluid />
                  </div>
                  <h4 className="text-muted mb-1">{user.details.name}</h4>
                  <p className="text-muted mb-4">{user.details.email}</p>
                  <div className="d-flex justify-content-center gap-3 mb-2">
                    <MDBBtn className='btn-warning' onClick={editProfile}>Edit</MDBBtn>
                    <MDBBtn className='btn-danger'>Logout</MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCard>
              <MDBCard className="mb-4 mb-lg-0">
                <MDBCardBody className="p-0">
                  <MDBListGroup flush className="rounded-3">
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBIcon fas icon="globe fa-lg text-warning" />
                      <MDBCardText>https://mdbootstrap.com</MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBIcon fab icon="github fa-lg" style={{ color: '#333333' }} />
                      <MDBCardText>mdbootstrap</MDBCardText>
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
            <MDBCol lg="8">
              <h3 className='text-center pb-4'>BOOKINGS</h3>
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Image</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="3">
                      <MDBCardText>Vehicle</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="3">
                      <MDBCardText className="text-muted">Date</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="3">
                      <MDBCardText className="text-muted">Days</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  {
                    bookings.map((booking) => (
                      <>
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText className='w-20 h-10' >
                              <img src={booking?.vehicle?.images[0]} alt="" />
                            </MDBCardText>
                          </MDBCol>
                          <MDBCol sm="3">
                            <MDBCardText>{new Date(booking?.fromDate).toISOString().split('T')[0]}</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="3">
                            <MDBCardText>{booking?.vehicle?.vehicleName}</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="3">
                            <MDBCardText className="text-muted">{booking.noOfDays}</MDBCardText>
                          </MDBCol>
                        </MDBRow>
                        <hr />
                      </>
                    ))
                  }
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