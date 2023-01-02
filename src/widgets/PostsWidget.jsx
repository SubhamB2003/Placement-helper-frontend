/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from '@mui/material';
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from '../state';
import PostWidget from './PostWidget';

function PostsWidget({ userId, isProfile = false }) {

    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);

    const getPosts = async () => {
        const res = await axios.get(`http://localhost:3030/posts`);
        const Data = res.data;
        dispatch(setPosts({ posts: Data }));
    };

    const getUserPosts = async () => {
        const res = await axios.get(`http://localhost:3030/posts/${userId}/posts`);
        const Data = res.data;
        dispatch(setPosts({ posts: Data }));
    }

    useEffect(() => {
        if (isProfile) {
            getUserPosts();
        } else {
            getPosts();
        }
    }, []);

    return (
        <Box>
            {posts.map((post) => (
                <PostWidget key={post._id} post={post} />
            ))}
        </Box>
    )
}

export default PostsWidget