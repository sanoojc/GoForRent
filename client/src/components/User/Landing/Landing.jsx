import React, { useEffect, useRef, useState } from 'react'
import './Landing.css'
import Header from '../Header/Header'
import { getVehicles } from '../../../Api/UserApi'
import { toast } from 'react-hot-toast'
import { Button, ButtonGroup, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper, TextField, } from '@mui/material'
import TuneIcon from '@mui/icons-material/Tune';
import { useNavigate } from 'react-router-dom'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import FilterModal from '../../Modal/FilterModal'



function Landing() {
    const navigate = useNavigate()
    const [showModal,setShowModal]=useState(false)
    const [vehicles, setVehicles] = useState([])
    const [name, setName] = useState('')
    const [page, setPage] = useState(1)
    const [count, setCount] = useState(3)
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const [sort,setSort]=useState('name')
    const [selectedIndex, setSelectedIndex] = useState(1);
    const options = ['name', <><CurrencyRupeeIcon/>Low to High</>,<><CurrencyRupeeIcon/> High to Low</>];
    useEffect(() => {

        getVehicles(name, page, count,sort).then((res) => {
            if (!res.data.error) {
                console.log(res.data.vehicles, 'vehicles')
                setVehicles(res.data.vehicles)
            }
        }).catch((err) => {
            toast.error('error', err)
        })


    }, [name, page])
    function handlePage(e, value) {
        setPage(value)
    }
    
    const handleClick = () => {
        const selectedOption = options[selectedIndex];
        const text = getTextFromOption(selectedOption);
        setSort(text)
        getVehicles(name, page, count,sort).then((res) => {
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
        const text = getTextFromOption(selectedOption);
        setSort(text)
        getVehicles(name, page, count,text).then((res) => {
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

    return (
        <>{
            showModal&&
            <FilterModal value={showModal} />
        }
            <Header />
            <div className="banner" style={{ color: 'white' }}>
                <div className='banner-img'>
                    <h1>Dream it Rent it Ride it.</h1>
                    <h5>Find the right one</h5>
                    <div className='flex items-center justify-center' >
                        <div className="landing-search-container flex items-center " style={{ background: '#e8edea', borderRadius: '8px' }}>
                            <TextField color='primary' size='small' placeholder='search' value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <Button color='inherit' variant='outlined' size='medium' onClick={(e) => getVehicles}>Search</Button>
                    </div>
                </div>
            </div>
            <div className="filter pt-4 pl-4 d-flex align-center gap-5">
                <ButtonGroup variant="outlined" ref={anchorRef} aria-label="split button">
                    <Button size='small' onClick={handleClick}>{options[selectedIndex]}</Button>
                    <Button
                        size="small"
                        aria-controls={open ? 'split-button-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-label="select merge strategy"
                        aria-haspopup="menu"
                        onClick={handleToggle}
                    >
                        <ArrowDropDownIcon />
                    </Button>
                </ButtonGroup>
                <Popper
                    sx={{
                        zIndex: 1,
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
                            }}
                        >
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
                <Button onClick={()=>setShowModal(!showModal)} ><TuneIcon /> filter</Button>
            </div>
            <>
                <h1 className='pl-3'> what are you looking for</h1>
            </>
            <div className="category">
                <div className="category-card ">
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
            <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
                <div className="grid row-gap-10 mb-8 lg:grid-cols-6">
                    {
                        vehicles.map((item, i) => (
                            <div className="vehicle-card" onClick={() => navigate('/view', { state: item })}>
                                <div className="vehicle-img">
                                    <img src={item.images} />
                                </div>
                                <div className="vehicle-details">
                                    <h6>{item.brand}</h6>
                                    <h5>{item.vehicleName}</h5>
                                    <h6>RS :{item.rent}</h6>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="flex justify-center m-10">
                <Stack spacing={2}>
                    <Pagination count={vehicles.length} page={page} onChange={handlePage} />
                </Stack>
            </div>
            <div className="bg-gray-900">
                <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
                    <div className="grid row-gap-10 mb-8 lg:grid-cols-6">
                        <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4">
                            <div>
                                <p className="font-medium tracking-wide text-gray-300">
                                    Category
                                </p>
                                <ul className="mt-2 space-y-2">
                                    <li>
                                        <a
                                            href="/"
                                            className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                                        >
                                            News
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/"
                                            className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                                        >
                                            World
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/"
                                            className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                                        >
                                            Games
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/"
                                            className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                                        >
                                            References
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <p className="font-medium tracking-wide text-gray-300">Apples</p>
                                <ul className="mt-2 space-y-2">
                                    <li>
                                        <a
                                            href="/"
                                            className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                                        >
                                            Web
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/"
                                            className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                                        >
                                            eCommerce
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/"
                                            className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                                        >
                                            Business
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/"
                                            className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                                        >
                                            Entertainment
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/"
                                            className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                                        >
                                            Portfolio
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <p className="font-medium tracking-wide text-gray-300">Cherry</p>
                                <ul className="mt-2 space-y-2">
                                    <li>
                                        <a
                                            href="/"
                                            className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                                        >
                                            Media
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/"
                                            className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                                        >
                                            Brochure
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/"
                                            className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                                        >
                                            Nonprofit
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/"
                                            className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                                        >
                                            Educational
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/"
                                            className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                                        >
                                            Projects
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <p className="font-medium tracking-wide text-gray-300">
                                    Business
                                </p>
                                <ul className="mt-2 space-y-2">
                                    <li>
                                        <a
                                            href="/"
                                            className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                                        >
                                            Infopreneur
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/"
                                            className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                                        >
                                            Personal
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/"
                                            className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                                        >
                                            Wiki
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/"
                                            className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                                        >
                                            Forum
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="md:max-w-md lg:col-span-2">
                            <span className="text-base font-medium tracking-wide text-gray-300">
                                Subscribe for updates
                            </span>
                            <form className="flex flex-col mt-4 md:flex-row">
                                <input
                                    placeholder="Email"
                                    required
                                    type="text"
                                    className="flex-grow w-full h-12 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                                />
                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                                >
                                    Subscribe
                                </button>
                            </form>
                            <p className="mt-4 text-sm text-gray-500">
                                Bacon ipsum dolor amet short ribs pig sausage prosciuto chicken
                                spare ribs salami.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between pt-5 pb-10 border-t border-gray-800 sm:flex-row">
                        <p className="text-sm text-gray-500">
                            © Copyright 2020 Lorem Inc. All rights reserved.
                        </p>
                        <div className="flex items-center mt-4 space-x-4 sm:mt-0">
                            <a
                                href="/"
                                className="text-gray-500 transition-colors duration-300 hover:text-teal-accent-400"
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                                    <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z" />
                                </svg>
                            </a>
                            <a
                                href="/"
                                className="text-gray-500 transition-colors duration-300 hover:text-teal-accent-400"
                            >
                                <svg viewBox="0 0 30 30" fill="currentColor" className="h-6">
                                    <circle cx="15" cy="15" r="4" />
                                    <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10   C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1   c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z" />
                                </svg>
                            </a>
                            <a
                                href="/"
                                className="text-gray-500 transition-colors duration-300 hover:text-teal-accent-400"
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                                    <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Landing