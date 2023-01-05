import React, { useState } from 'react';
import axios from 'axios';
import { RWebShare } from "react-web-share";
import { ChatBubbleOutlineRounded, FavoriteBorderOutlined, FavoriteOutlined, ShareOutlined } from '@mui/icons-material';
import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Flexbetween from '../components/Flexbetween';
import Friend from '../components/Friend';
import WidgetWrapper from '../components/WidgetWrapper';
import { setPost } from '../state';
import CommentWidget from './CommentWidget';
import MyCommentWidget from './MyCommentWidget';
import ModelPopup from '../components/ModelPopup';



function PostWidget({ post }) {

    const dispatch = useDispatch();
    const [isComments, setIsComments] = useState(false);
    const [postId, setPostId] = useState("");
    const [desc, setDesc] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const userId = useSelector((state) => state.user._id);
    const curPostId = post._id;
    const isLiked = Boolean(post.likes[userId]);
    const likeCount = Object.keys(post.likes).length;

    const { palette } = useTheme();
    const main = palette.neutral.main;


    const AddRemoveLike = async () => {
        const res = await axios.patch(`${process.env.REACT_APP_URL}/posts/${curPostId}/likes`, { userId });
        const Data = res.data;
        dispatch(setPost({ post: Data }));
    }

    const updatePostData = (postId, description) => {
        setPostId(postId);
        setDesc(description);
        setOpenModal(true);
    }

    return (
        <WidgetWrapper m="0 0 2rem 0">
            <ModelPopup setOpenModal={setOpenModal} openModal={openModal} postId={postId} desc={desc} setDesc={setDesc} />
            <Friend
                postId={curPostId}
                description={post.description}
                updatePostData={updatePostData}
                postUserId={post.userId}
                name={post.userName}
                createdAt={post.createdAt}
                userPicturePath={post.userPicturePath}
            />
            <Typography sx={{ mt: "1rem", padding: "4px" }} fontFamily='serif'
                fontSize={17} color={main}>{post.description}</Typography>
            {post.picturePath && (
                <img width="100%" style={{
                    borderRadius: "0.75rem",
                    marginTop: "0.75rem"
                }} src={`${process.env.REACT_APP_URL}/assets/${post.picturePath}`}
                    alt="postImage" />
            )}

            <Flexbetween>
                <Typography marginLeft={1} fontFamily="serif" sx={{ color: "skyblue" }}>{likeCount} {likeCount > 1 ? "Likes" : "Like"}</Typography>
                <Typography sx={{ color: "skyblue" }} fontFamily="serif">{post.comments.length} {post.comments.length > 1 ? "comments" : "comment"}</Typography>
            </Flexbetween>

            {/* <Divider /> */}
            <Flexbetween gap="1rem">
                <Flexbetween gap="0.3rem" onClick={AddRemoveLike} sx={{ cursor: "pointer" }}>
                    <IconButton>
                        {isLiked ? (
                            <FavoriteOutlined sx={{ color: "red" }} />
                        ) : (
                            <FavoriteBorderOutlined />
                        )}
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
                        url: `http://localhost:3220/sharepost/${curPostId}`,
                        title: "Post Data",
                    }}>
                    <Flexbetween gap="0.3rem" sx={{ cursor: "pointer" }}>
                        <IconButton>
                            <ShareOutlined />
                        </IconButton>
                        <Typography fontFamily="serif" fontSize={15} color={main}>Share</Typography>
                    </Flexbetween>
                </RWebShare>
            </Flexbetween>

            <Divider />
            <MyCommentWidget postId={post._id} />

            {isComments && (
                <Box>
                    <Divider />
                    {post.comments.map((commentData) => (
                        <CommentWidget commentData={commentData} key={commentData._id} curPostId={curPostId} />
                    ))}
                </Box>
            )}
        </WidgetWrapper>
    )
}

export default PostWidget;