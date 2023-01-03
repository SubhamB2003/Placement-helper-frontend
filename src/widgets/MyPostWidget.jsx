import { AttachFileOutlined, DeleteOutline, EditOutlined, GifBoxOutlined, ImageOutlined, MicOutlined } from '@mui/icons-material';
import { Box, Button, Divider, IconButton, InputBase, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Flexbetween from '../components/Flexbetween';
import UserImage from '../components/UserImage';
import WidgetWrapper from '../components/WidgetWrapper';
import { setPosts } from '../state';
import Dropzone from "react-dropzone";


function MyPostWidget() {

    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");
    const { palette } = useTheme();
    const { _id, picturePath } = useSelector((state) => state.user);
    const isNonMobile = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;

    const handlePost = async () => {
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);
        if (image) {
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }

        const res = await axios.post(`http://localhost:3030/posts`, formData);
        const posts = res.data;
        console.log(posts);
        dispatch(setPosts({ posts }));
        setImage(null);
        setPost("");
    }


    return (
        <WidgetWrapper>
            <Flexbetween gap={isNonMobile ? "1.5rem" : "0.5rem"}>
                <UserImage image={picturePath} size={60} />
                <InputBase
                    placeholder="What's on your mood..."
                    onChange={(e) => setPost(e.target.value)}
                    value={post}
                    required
                    sx={{
                        width: "100%", padding: `${isNonMobile ? "0.8rem 2rem" : "0.4rem 1rem"}`,
                        height: "3.5rem",
                        border: "1px solid gray",
                        borderRadius: "2rem", input: {
                            fontSize: "18px",
                            fontFamily: "serif"
                        }
                    }}
                />
            </Flexbetween>
            {isImage && (
                <Box border={`1px solid ${medium}`}
                    borderRadius="5px" mt="1rem" p="1rem">
                    <Dropzone
                        acceptedFiles=".jpg, .jpeg, .png"
                        multiple={false}
                        onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <Flexbetween>
                                <Box
                                    {...getRootProps()}
                                    border={`1px dashed ${medium}`}
                                    borderRadius="5px" p="1rem"
                                    width="100%">
                                    <input {...getInputProps()} />
                                    {!image ? (
                                        <p>Add Image Here</p>
                                    ) : (
                                        <Flexbetween>
                                            <Typography>{image.name}</Typography>
                                            <EditOutlined />
                                        </Flexbetween>
                                    )}
                                </Box>
                                {image && (
                                    <IconButton onClick={() => setImage(null)}
                                        sx={{ width: "15%" }}>
                                        <DeleteOutline />
                                    </IconButton>
                                )}
                            </Flexbetween>
                        )}
                    </Dropzone>
                </Box>
            )}

            <Divider sx={{ margin: "1.25rem 0" }} />

            <Flexbetween>
                <Flexbetween gap="0.25rem" onClick={() => setIsImage((img) => !img)}>
                    <ImageOutlined sx={{ color: mediumMain }} />
                    <Typography fontFamily="serif" sx={{ cursor: "pointer" }}>Image</Typography>
                </Flexbetween>

                {isNonMobile && (
                    <>
                        <Tooltip title="Updated soon">
                            <Flexbetween gap="0.25rem">
                                <GifBoxOutlined sx={{ color: mediumMain }} />
                                <Typography fontFamily="serif" color={mediumMain}>Clip</Typography>
                            </Flexbetween>
                        </Tooltip>

                        <Tooltip title="Updated soon">
                            <Flexbetween gap="0.25rem">
                                <AttachFileOutlined sx={{ color: mediumMain }} />
                                <Typography fontFamily="serif" color={mediumMain}>Attachment</Typography>
                            </Flexbetween>
                        </Tooltip>

                        <Tooltip title="Updated soon">
                            <Flexbetween gap="0.25rem">
                                <MicOutlined sx={{ color: mediumMain }} />
                                <Typography fontFamily="serif" color={mediumMain}>Audio</Typography>
                            </Flexbetween>
                        </Tooltip>
                    </>
                )}

                <Button disabled={!post}
                    onClick={handlePost}
                    sx={{
                        color: palette.background.alt,
                        backgroundColor: "blueviolet",
                        borderRadius: "3rem",
                        ":hover": { backgroundColor: "blueviolet" }
                    }}>
                    POST
                </Button>
            </Flexbetween>
        </WidgetWrapper>
    )
}

export default MyPostWidget