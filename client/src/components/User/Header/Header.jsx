import React from 'react'
import './Header.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../../Api/UserApi'
import Swal from 'sweetalert2'

function Header() {
    const {user}=useSelector((state)=>state)
    const dispatch=useDispatch()
     function handleLogut(e){
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
                  dispatch({type:'refresh'})
              }
            })
    }
  return (
    <div>
          <div className="navbar">
                <>
                    <Link to='/'>
                      <div className="site-logo"></div>
                    </Link>
                    <Link to='/'><h4>GoForRent</h4></Link>
                </>
                <>
                    <Link to='/chat'>chat</Link>
                    {
                        user.login?
                       ( <>
                        <Link to='/profile'>profile</Link>
                              <button onClick={handleLogut} style={{color:'blue'}}>logout</button>
                       </>)
                      :
                        <Link to='/login'>login</Link>
                    }
                </>
            </div>
    </div>
  )
}

export default Header