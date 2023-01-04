import { Box, Typography, useTheme, IconButton, Divider, Tooltip } from '@mui/material';
import { DeleteOutline, EditOutlined, MoreHoriz, SaveOutlined } from "@mui/icons-material";
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Flexbetween from './Flexbetween';
import UserImage from './UserImage';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setPosts, setSavePosts, setUser } from '../state';



function Friend({ postUserId, name, createdAt, userPicturePath, postId, updatePostData, description }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const userId = useSelector((state) => state.user._id);
    const [open, setOpen] = useState();
    const isSave = user.savePosts.includes(postId);

    const { palette } = useTheme();
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;
    const neutralLight = palette.neutral.light;


    const handlePostRemove = async (postId) => {
        const res = await axios.delete(`http://localhost:3030/posts/${postId}/removepost`);
        const posts = res.data;
        dispatch(setPosts({ posts }));
    }

    const handleSavePost = async (postId) => {
        const res = await axios.patch(`http://localhost:3030/users/${userId}/${postId}`);
        dispatch(setSavePosts(res.data));
        dispatch(setUser({ user: res.data }));
    }


    return (
        <Flexbetween>
            <Flexbetween gap="1rem" sx={{ cursor: "pointer" }}>
                <UserImage image={userPicturePath} size={55} />
                <Box onClick={() => {
                    navigate(`/profile/${postUserId}`);
                    navigate(0);
                }}>
                    <Typography color={main} fontFamily="serif" variant="h4">{name}</Typography>
                    <Typography color={medium} fontFamily="serif" fontSize="0.85rem">{new Date(createdAt).toLocaleString()}</Typography>
                </Box>
            </Flexbetween>
            <Box marginRight={1}>
                <Tooltip title="setting" placement='left'>
                    <IconButton onClick={() => setOpen((on) => !on)}>
                        <MoreHoriz fontSize="25px" />
                    </IconButton>
                </Tooltip>
                {open && (
                    <Box
                        position="absolute"
                        backgroundColor={neutralLight}
                        borderRadius="4px"
                        sx={{
                            vertical: 'top',
                        }}
                    >
                        {postUserId === userId && (
                            <>
                                <Box display="flex" justifyItems="center" padding="0.5rem 0.6rem" sx={{ cursor: "pointer" }}
                                    onClick={() => updatePostData(postId, description)}>
                                    <EditOutlined fontSize="small" sx={{ marginRight: "10px", color: main }} />
                                    <Typography fontFamily="serif" fontWeight="500" fontSize="0.9rem" color={main}>Edit</Typography>
                                </Box>

                                <Divider />

                                <Box display="flex" justifyItems="center" padding="0.5rem 0.6rem" sx={{ cursor: "pointer" }}
                                    onClick={() => handlePostRemove(postId)}>
                                    <DeleteOutline fontSize="small" sx={{ marginRight: "10px", color: main }} />
                                    <Typography fontFamily="serif" fontWeight="500" fontSize="0.9rem" color={main}>Delete</Typography>
                                </Box>
                            </>
                        )}
                        {postUserId !== userId && (
                            <Box display="flex" justifyItems="center" padding="0.6rem 0.8rem" sx={{ cursor: "pointer" }}
                                onClick={() => handleSavePost(postId)}>
                                <SaveOutlined fontSize="small" sx={{ marginRight: "10px", color: main }} />
                                <Typography fontFamily="serif" fontWeight="500" fontSize="0.9rem" color={main}>
                                    {isSave ? "Unsave" : "Save"}
                                </Typography>
                            </Box>
                        )}
                    </Box >
                )
                }
            </Box >
        </Flexbetween >
    )
}

export default Friend