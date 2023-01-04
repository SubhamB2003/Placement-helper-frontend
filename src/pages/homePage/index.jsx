import { Box, useMediaQuery } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';
import Navbar from '../Navbar';
import UserWidget from "../../widgets/UserWidget";
import MyPostWidget from "../../widgets/MyPostWidget";
import PostsWidget from "../../widgets/PostsWidget";
// import FriendListWidget from "../../widgets/FriendListWidget";


function HomePage() {

    const user = useSelector((state) => state.user);
    const userId = user._id;
    const isNonMobile = useMediaQuery("(min-width: 1000px)");
    const date = new Date();
    let year = date.getFullYear();

    return (
        <Box>
            <Navbar />
            <Box width="100%" padding={isNonMobile ? "2rem 8%" : "2rem 6%"}
                display={isNonMobile ? "flex" : "block"}
                justifyContent="space-between">
                <Box flexBasis={isNonMobile && "26%"}>
                    <UserWidget user={user} />
                </Box>
                <Box flexBasis={isNonMobile && "40%"}
                    mt={!isNonMobile && "2rem"}>
                    {year - user.graduateYear > 0 &&
                        <>
                            <MyPostWidget />
                            <Box m="2rem 0" />
                        </>
                    }
                    <PostsWidget userId={userId} />
                </Box>
                {isNonMobile && (
                    <Box flexBasis={isNonMobile && "28%"}>
                        {/* <FriendListWidget userId={user._id} /> */}
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default HomePage;