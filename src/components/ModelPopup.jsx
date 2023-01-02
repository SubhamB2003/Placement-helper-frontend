import { CloseOutlined } from '@mui/icons-material';
import { Box, Button, IconButton, Modal, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setPost } from '../state';
import Flexbetween from './Flexbetween';

function ModelPopup({ setOpenModal, openModal, postId, desc, setDesc, cmtId, comment, setComment, isComment = false }) {

    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user._id);
    const updatedAt = new Date();

    const handlePostUpdate = async () => {
        const updatedPost = await axios.patch(`http://localhost:3030/posts`, { postId, desc });
        const post = updatedPost.data;
        if (updatedPost.status === 200) {
            setOpenModal(false);
        }
        dispatch(setPost({ post }))
    }

    const updatePostComment = async () => {
        const Data = { userId, postId, cmtId, comment, updatedAt };
        const res = await axios.patch(`http://localhost:3030/posts/comment`, Data, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        setOpenModal(false);
        const post = res.data;
        dispatch(setPost({ post }));
    }


    const handleUpdateData = async (e) => {
        e.preventDefault();

        if (isComment) updatePostComment();
        else handlePostUpdate();
    }



    return (
        <>
            {openModal && (
                <Modal
                    open={openModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{
                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                        width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4,
                    }}>
                        <Flexbetween>
                            <Typography id="modal-modal-title">{isComment ? "Comment Update" : "Post Update"}</Typography>
                            <IconButton onClick={() => setOpenModal(false)}>
                                <CloseOutlined />
                            </IconButton>
                        </Flexbetween>
                        <form style={{ display: "grid", padding: "2rem 0.2rem", gap: "15px" }} onSubmit={handleUpdateData}>
                            {isComment ? (
                                <TextField label="Comment" name="comment" required
                                    autoComplete='off' onChange={(e) => setComment(e.target.value)}
                                    value={comment} sx={{ gridColumn: "span 2" }} />
                            ) : (
                                <TextField label="Description" name="description" required
                                    autoComplete='off' onChange={(e) => setDesc(e.target.value)}
                                    value={desc} sx={{ gridColumn: "span 2" }} />
                            )}

                            <Button sx={{ gridColumn: "span 2" }} variant="outlined" type='submit'>
                                Update
                            </Button>
                        </form>
                    </Box>
                </Modal>
            )}
        </>
    )
}

export default ModelPopup;