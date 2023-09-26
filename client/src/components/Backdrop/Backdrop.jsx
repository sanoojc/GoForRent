import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'

function BackdropLoader({openLoader}) {
    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 100 }}
                open={openLoader}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default BackdropLoader