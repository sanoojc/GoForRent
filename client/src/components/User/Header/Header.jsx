import React from 'react'
import './Header.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import TextsmsRoundedIcon from '@mui/icons-material/TextsmsRounded';
import Swal from 'sweetalert2'
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
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
    <div className=''>
          <div className="navbar flex justify-center sm:justify-between px-5">
                <div className='flex items-center'>
                    <Link to='/'>
                      <div className="site-logo"></div>
                    </Link>
                    <Link to='/'><h4 className='pt-2 hidden sm:block'>GoForRent</h4></Link>
                </div>
                <div className='flex gap-5'>
                    <Link to='/chat'><TextsmsRoundedIcon/></Link>
                    {
                        user.login?
                       ( <>
                        <Link to='/profile'><PersonIcon/></Link>
                              <button onClick={handleLogut} style={{color:'blue'}}><LogoutIcon/></button>
                       </>)
                      :
                        <Link to='/login'>login</Link>
                    }
                </div>
            </div>
    </div>
  )
}

export default Header