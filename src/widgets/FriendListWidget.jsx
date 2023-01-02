/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Typography, useTheme } from '@mui/material';
import { PeopleAltOutlined } from '@mui/icons-material';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Friend from '../components/Friend';
import WidgetWrapper from '../components/WidgetWrapper';
import { setFriends } from '../state';


function FriendListWidget({ userId }) {

    const dispatch = useDispatch();
    const { palette } = useTheme();
    const friends = useSelector((state) => state.user.friends);

    const getFriends = async () => {
        const res = await axios.get(`http://localhost:3030/users/${userId}/friends`);
        dispatch(setFriends({ friends: res.data }));
    };

    useEffect(() => {
        getFriends();
    }, []);

    return (
        <WidgetWrapper>
            <Box display="flex" gap="0.5rem">
                <PeopleAltOutlined />
                <Typography color={palette.neutral.dark} fontFamily="serif"
                    variant="h4"
                    fontWeight="600"
                    sx={{ mb: "1.5rem" }}>
                    Friend List
                </Typography>
            </Box>
            <Box display="flex" flexDirection="column"
                gap="1.5rem">
                {friends.map((friend) => (
                    <Friend
                        key={friend._id}
                        friendId={friend._id}
                        name={friend.userName}
                        profession={friend.profession}
                        userPicturePath={friend.picturePath}
                    />
                )
                )}
            </Box>
        </WidgetWrapper>
    )
}

export default FriendListWidget;