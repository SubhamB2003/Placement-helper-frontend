import { Box } from '@mui/material'
import React from 'react'

function UserImage({ image, size }) {
    return (
        <Box width={size} height={size}>
            <img style={{ objectFit: "cover", borderRadius: "50%" }}
                width={size} height={size}
                src={`${process.env.REACT_APP_URL}/assets/${image}`} alt="user" />
        </Box>
    )
}

export default UserImage