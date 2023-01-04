/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { ChatBubbleOutlineRounded, FavoriteBorderOutlined, ShareOutlined } from '@mui/icons-material';
import { Box, Divider, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import { RWebShare } from 'react-web-share';
import axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import WidgetWrapper from '../../components/WidgetWrapper';
import Flexbetween from '../../components/Flexbetween';
import UserImage from '../../components/UserImage';


function SharePost() {

    const { postId } = useParams();
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;
    const [post, setPost] = useState({});
    const [curState, setCurState] = useState(false);
    const [isComments, setIsComments] = useState(false);
    const isNonMobile = useMediaQuery("(min-width: 1000px)");

    const handleSharePost = async () => {
        const res = await axios.get(`http://localhost:3030/posts/${postId}`);
        console.log(res.data);
        setPost(res.data);
        setCurState(true);
    }

    useEffect(() => {
        handleSharePost();
    }, []);

    return (
        <Box>
            {curState && (
                <>
                    <Box p="1rem 6%" textAlign="center" backgroundColor={palette.background.alt}>
                        <Typography fontFamily="serif" fontWeight="bold" fontSize={32} color="deepskyblue">
                            Placement Helper
                        </Typography>
                    </Box>
                    <Box width={isNonMobile ? "35%" : "90%"}
                        backgroundColor={palette.background.alt}
                        m="2rem auto" borderRadius="1.5rem">
                        <WidgetWrapper m="0 0 2rem 0">
                            <Box display="flex" gap="1rem" sx={{ cursor: "pointer" }}>
                                <UserImage image={post.userPicturePath} size={55} />
                                <Box>
                                    <Typography color={main} fontFamily="serif" variant="h4">{post.userName}</Typography>
                                    <Typography color={medium} fontFamily="serif" fontSize="0.85rem">{new Date(post.createdAt).toLocaleString()}</Typography>
                                </Box>
                            </Box>
                            <Typography sx={{ mt: "1rem", padding: "4px" }} fontFamily='serif'
                                fontSize={17} color={main}>{post.description}</Typography>
                            {post.picturePath && (
                                <img width="100%" style={{
                                    borderRadius: "0.75rem",
                                    marginTop: "0.75rem"
                                }} src={`http://localhost:3030/assets/${post.picturePath}`}
                                    alt="postImage" />
                            )}

                            <Flexbetween>
                                <Typography marginLeft={1} fontFamily="serif" sx={{ color: "skyblue" }}>{Object.keys(post.likes).length} {Object.keys(post.likes).length > 1 ? "Likes" : "Like"}</Typography>
                                <Typography sx={{ color: "skyblue" }} fontFamily="serif">{post.comments.length} {post.comments.length > 1 ? "comments" : "comment"}</Typography>
                            </Flexbetween>

                            {/* <Divider /> */}
                            <Flexbetween gap="1rem">
                                <Flexbetween gap="0.3rem" sx={{ cursor: "pointer" }}>
                                    <IconButton>
                                        <FavoriteBorderOutlined />
                                    </IconButton>
                                    <Typography fontFamily="serif" fontSize={15} color={main}>Like</Typography>
                                </Flexbetween>

                                <Flexbetween gap="0.3rem" onClick={() => setIsComments((cmt) => !cmt)} sx={{ cursor: "pointer" }}>
                                    <IconButton>
                                        <ChatBubbleOutlineRounded />
                                    </IconButton>
                                    <Typography fontFamily="serif" fontSize={15} color={main}>Comment</Typography>
                                </Flexbetween>

                                <RWebShare
                                    data={{
                                        text: "Web Share",
                                        url: `http://localhost:3220/sharepost/${post._id}`,
                                        title: "Alumini Post Data",
                                    }}>
                                    <Flexbetween gap="0.3rem" sx={{ cursor: "pointer" }}>
                                        <IconButton>
                                            <ShareOutlined />
                                        </IconButton>
                                        <Typography fontFamily="serif" fontSize={15} color={main}>Share</Typography>
                                    </Flexbetween>
                                </RWebShare>
                            </Flexbetween>

                            {isComments && (
                                <Box>
                                    <Divider />
                                    {post.comments.map((commentData) => (
                                        <Box padding="0 1rem" key={commentData._id}>
                                            <Box>
                                                <Flexbetween padding={1} display="flex" >
                                                    <Box display="flex" alignItems="center" gap={2}>
                                                        <UserImage image={commentData.userPicturePath} size={isNonMobile ? 50 : 45} />
                                                        <Box>
                                                            <Typography fontFamily="serif" color={main} fontSize={isNonMobile ? 18 : 16}>{commentData.userName}</Typography>
                                                            <Typography fontFamily="serif" color={medium} fontSize={10}>{new Date(commentData.updatedAt).toLocaleString()}</Typography>
                                                        </Box>
                                                    </Box>
                                                </Flexbetween>
                                                <Box sx={{ padding: "0 0 5px 0" }}>
                                                    <Typography fontFamily="serif" fontSize={isNonMobile ? 18 : 16} color={main}>{commentData.comment}</Typography>
                                                </Box>
                                            </Box>
                                            <Divider />
                                        </Box>
                                    ))}
                                </Box>
                            )}
                        </WidgetWrapper>
                    </Box>
                </>
            )}
        </Box>
    )
}

export default SharePost;