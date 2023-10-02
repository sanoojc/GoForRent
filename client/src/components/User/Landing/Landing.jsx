import React, { useEffect, useRef, useState } from 'react'
import './Landing.css'
import Header from '../Header/Header'
import { getHub, getVehicles } from '../../../Api/UserApi'
import { toast } from 'react-hot-toast'
import { Button, ButtonGroup, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper, TextField, } from '@mui/material'
import TuneIcon from '@mui/icons-material/Tune';
import { useNavigate } from 'react-router-dom'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import FilterModal from '../../Modal/FilterModal'
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import PlaceIcon from '@mui/icons-material/Place';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SettingsIcon from '@mui/icons-material/Settings';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import Footer from '../Footer/Footer'
import BackdropLoader from '../../Backdrop/Backdrop'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Landing() {
    const inputRef = useRef(null)
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)
    const [vehicles, setVehicles] = useState([])
    const [name, setName] = useState('')
    const [page, setPage] = useState(1)
    const [count, setCount] = useState(3)
    const [open, setOpen] = useState(false);
    const [hub,setHub]=useState('calicut')
    const [hubs,setHubs]=useState([])
    const anchorRef = useRef(null);
    const [sort, setSort] = useState('name')
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [loading,setLoading]=useState(false)
    const options = ['name', <><CurrencyRupeeIcon />Low to High</>, <><CurrencyRupeeIcon />High to Low</>];

    useEffect(() => {
        inputRef.current.blur()
        setLoading(true)
        console.log(hub)
        getVehicles(name, page, count,sort,hub).then((res) => {
            if (!res.data.error) {
                console.log(res.data,'responsealsdf')
                console.log(res.data.vehicles, 'vehicles')
                console.log(res.data.hubs, 'hubs')
                setHubs(res.data.hubs)
                setVehicles(res.data.vehicles)
            }
        }).catch((err) => {
            toast.error('error', err)
        })
        setLoading(false)
    }, [name, page,hub])
    function handlePage(e, value) {
        setPage(value)
    }
    const handleClick = () => {
        const selectedOption = options[selectedIndex];
        const text = getTextFromOption(selectedOption);
        setSort(text)
        getVehicles(name, page, count, sort).then((res) => {
            if (!res.data.error) {
                console.log(res.data.vehicles, 'vehicles')
                setVehicles(res.data.vehicles)
            }
        }).catch((err) => {
            toast.error('error', err)
        })
        console.log(`You clicked ${text}`);
    };
    const getTextFromOption = (option) => {
        if (typeof option === 'string') {
            return option;
        } else if (React.isValidElement(option)) {
            const children = React.Children.toArray(option.props.children);
            return children.map(child => {
                if (typeof child === 'string') {
                    return child;
                } else {
                    return getTextFromOption(child);
                }
            }).join('');
        }
        return '';
    };
    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        const selectedOption = options[index];
        let text = getTextFromOption(selectedOption);
        text = text.trim()
        setSort(text)
        getVehicles(name, page, count, text,hub).then((res) => {
            if (!res.data.error) {
                console.log(res.data.vehicles, 'vehicles')
                setVehicles(res.data.vehicles)
            }
        }).catch((err) => {
            toast.error('error', err)
        })
        console.log(`You clicked ${text}`);
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };
    const handleHub=(e)=>{
        console.log(e.target.value)
        setHub(e.target.value)
    }
    return (
        <>{
            showModal &&
            <FilterModal value={showModal} setShowModal={setShowModal} />
        }
        <BackdropLoader openLoader={loading}/>
            <Header />
            <div className="banner mt-3">
                <div className='banner-img'>

                    <div className=" mt-96 flex flex-col sm:flex-row justify-center rounded-md shadow-md ">
                        <div className="bg-red-500 opacity-90 p-4 rounded-l-md border border-r-0 flex justify-center  text-white  font-bold">
                            <h1>Search Your Best <br /> Cars Here.</h1>
                        </div>
                        <div className='flex items-center gap-2 rounded-r-md bg-white  ' >
                            <div className="flex flex-col p-5 gap-4 ,">
                                <div className="flex flex-col sm:flex-row gap-3 ">
                                    <div className="">
                                        <div className=" flex items-center border rounded-md shadow-sm w-min">
                                            <PlaceIcon fontSize='large' />
                                            <div className="">
                                                <select value={hub} onChange={handleHub} className='bg-transparent border-none outline-none h-full mx-3 ' ref={inputRef} name="" id="">
                                                    {
                                                        hubs.map((item)=>(
                                                            <option value={item.hubName}>{item.hubName}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="landing-search-container flex items-center " style={{ background: '#e8edea', borderRadius: '8px' }}>
                                            <TextField color='primary' size='small' placeholder='search' value={name} onChange={(e) => setName(e.target.value)} />
                                        </div>
                                        <Button color='inherit' variant='outlined' size='medium' onClick={(e) => getVehicles}>Search</Button>
                                    </div>
                                </div>
                            <div  className="filter  flex gap-3 align-center  text-black">
                                <ButtonGroup ref={anchorRef} aria-label="split button">
                                    <Button sx={{color:'black', borderColor:'black'}} variant="outlined"  size='small' onClick={handleClick}>{options[selectedIndex]}</Button>
                                    <Button
                                    sx={{borderColor:'black'}}
                                        size="small"
                                        aria-controls={open ? 'split-button-menu' : undefined}
                                        aria-expanded={open ? 'true' : undefined}
                                        aria-label="select merge strategy"
                                        aria-haspopup="menu"
                                        onClick={handleToggle}
                                    >
                                        <ArrowDropDownIcon sx={{color:'black'}} />
                                    </Button>
                                </ButtonGroup>
                                <Popper
                                    sx={{
                                        zIndex: 1,
                                        color:'black',
                                        borderColor:'black'
                                    }}
                                    open={open}
                                    anchorEl={anchorRef.current}
                                    role={undefined}
                                    transition
                                    disablePortal
                                >
                                    {({ TransitionProps, placement }) => (
                                        <Grow
                                            {...TransitionProps}
                                            style={{
                                                transformOrigin:
                                                    placement === 'bottom' ? 'center top' : 'center bottom',
                                            }}>
                                            <Paper>
                                                <ClickAwayListener onClickAway={handleClose}>
                                                    <MenuList id="split-button-menu" autoFocusItem>
                                                        {options.map((option, index) => (
                                                            <MenuItem
                                                                key={option}
                                                                selected={index === selectedIndex}
                                                                onClick={(event) => handleMenuItemClick(event, index)}
                                                            >
                                                                {option}
                                                            </MenuItem>
                                                        ))}
                                                    </MenuList>
                                                </ClickAwayListener>
                                            </Paper>
                                        </Grow>
                                    )}
                                </Popper>
                                <Button variant='outlined' sx={{color:'black',borderColor:'black'}} onClick={() => setShowModal(!showModal)} ><TuneIcon /> filter</Button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="poster shadow-slate-300 text-slate-200 flex flex-col rounded-md shadow-md pt-28 gap-3 pl-5 sm:pl-60 mt-48 sm:mt-32 mx-3">
                    <h1>Explore The <br /> Best Collections <br /> From Us. </h1>

                {/* <div className="category flex pl-5 justify-center flex-col pb-5  gap-10 sm:max-h-max sm:flex-row">
                    <div className=" flex category-card shadow-md border bg-white  rounded-md sm:w-full h-max p-4">
                        <h2>Premium cars</h2>
                    </div>
                    <div className="category-card shadow-md border bg-white rounded-md sm:w-full h-max p-4">
                        <h2>Vintage cars</h2>
                    </div>
                </div> */}
                
            </div>
            {/* <>
                <h3 style={{ color: 'black', paddingLeft: '30px', marginTop: '40px', paddingBottom: '20px' }}>Explore all</h3>
            </> */}
            <div className="flex justify-around flex-col px-4 pt-16 mx-auto sm:max-w-xl gap-5 sm:flex-row  md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
                {
                    vehicles.map((item, i) => (
                        <div key={item._id} className="vehicles-card ml-3 mt-5 shadow-xl border" onClick={() => navigate('/view', { state: item })}>
                            <div className="vehicle-img  rounded-md  ">
                                <img className='' src={item.images[0]} />
                            </div>
                            <div className="vehicle-details pt-3">
                                <h5>{item.brand} {item.vehicleName}</h5>
                                <h6><CurrencyRupeeRoundedIcon /> {item.rent}/Day</h6>
                                <div className="">
                                    <p> <span className='text-red-400'><DirectionsCarIcon /></span> <span className='text-stone-600'>Model: {item.year}</span></p>
                                    <p> <span className='text-red-400'><SettingsIcon /></span> <span className='text-stone-600'>{item.transmission}</span></p>
                                    <p> <span className='text-red-400'><LocalGasStationIcon /></span> <span className='text-stone-600'>{item.fuelType}</span></p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="flex justify-center my-14">
                <Stack spacing={2}>
                    <Pagination count={vehicles.length} page={page} onChange={handlePage} />
                </Stack>
            </div>
            <Footer />

        </>
    )
}

export default Landing