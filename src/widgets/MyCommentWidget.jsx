import { SendOutlined } from '@mui/icons-material';
import { Box, IconButton, InputBase, useMediaQuery } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Flexbetween from '../components/Flexbetween';
import UserImage from '../components/UserImage';
import { setPost } from '../state';



function MyCommentWidget({ postId }) {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const userId = user._id;
    const updatedAt = new Date();
    const isNonMobile = useMediaQuery("(min-width: 1000px)");
    const isLabView = useMediaQuery("(min-width: 700px)");
    const [comment, setComment] = useState("");


    const handleComment = async (postId) => {
        const res = await axios.post(`http://localhost:3030/posts/comment`, { userId, postId, comment, updatedAt });
        setComment("");
        const post = res.data;
        dispatch(setPost({ post }));
    }


    return (
        <Box display="flex" justifyContent="space-around" padding="10px 0">
            <Flexbetween gap={isLabView ? "1rem" : "0.5rem"}>
                <UserImage image={user.picturePath} size={55} />
                <InputBase
                    placeholder="Write a comment..."
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                    required
                    sx={{
                        width: `${isLabView ? "400px" : "100%"}`, padding: `${isNonMobile ? "0.6rem 1.2rem" : "0.4rem 1rem"}`,
                        border: "1px solid gray",
                        borderRadius: "2rem", input: {
                            fontSize: "16px",
                            fontFamily: "serif"
                        }
                    }}
                />
            </Flexbetween>
            <Box display="flex" justifyContent="center" alignItems="center">
                <IconButton disabled={!comment} onClick={() => handleComment(postId)}
                    sx={{
                        color: "white",
                        backgroundColor: "blueviolet",
                        ":hover": { backgroundColor: "blueviolet" }
                    }}>
                    <SendOutlined fontSize='large' />
                </IconButton>
            </Box>
        </Box>
    )
}

export default MyCommentWidget