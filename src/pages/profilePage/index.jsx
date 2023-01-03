/* eslint-disable react-hooks/exhaustive-deps */
import { useMediaQuery } from '@mui/material';
import { Box } from '@mui/system'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
// import FriendListWidget from '../../widgets/FriendListWidget';
import PostsWidget from '../../widgets/PostsWidget';
import UserWidget from '../../widgets/UserWidget';
import Navbar from '../Navbar';


function ProfilePage({ newUser = false }) {

    const [user, setUser] = useState(null);
    const { userId } = useParams();
    const isNonMobile = useMediaQuery("(min-width: 1000px)");

    const getUser = async () => {
        const res = await axios.get(`http://localhost:3030/users/${userId}`);
        setUser(res.data);
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <Box>
            <Navbar />
            <Box width="100%" padding="2rem 6%"
                display={isNonMobile ? "flex" : "block"}
                gap="2rem" justifyContent="center"
            >
                <Box flexBasis={isNonMobile && "26%"}>
                    <UserWidget user={user} />
                    <Box m="2rem 0" />
                </Box>

                <Box flexBasis={isNonMobile && "42%"}
                    mt={!isNonMobile && "2rem"}
                >
                    <PostsWidget userId={userId} isProfile />
                </Box>
            </Box>
        </Box>
    )
}

export default ProfilePage