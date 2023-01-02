/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Divider, IconButton, Tooltip, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Flexbetween from '../components/Flexbetween';
import WidgetWrapper from "../components/WidgetWrapper";
import UserImage from "../components/UserImage";
import { EmailOutlined, FemaleOutlined, InfoOutlined, LocationOnOutlined, MaleOutlined, ManageAccountsOutlined, PhoneAndroidOutlined, WorkOutlineOutlined } from '@mui/icons-material';
import { useSelector } from 'react-redux';

function UserWidget({ user }) {

    const navigate = useNavigate();
    const userId = useSelector((state) => state.user._id);

    if (!user) return null;

    const char = user.userName.charAt(0).toUpperCase();
    const name = char + user.userName.substring(1, user.userName.length);

    return (
        <WidgetWrapper>
            <Flexbetween
                gap="0.5rem"
                pb="1.1rem">
                <Flexbetween onClick={() => navigate(`/profile/${user._id}`)} gap="1rem" sx={{ cursor: "pointer" }}>
                    <UserImage image={user.picturePath} size={60} />
                    <Box>
                        <Typography variant='h4' fontWeight="500" fontFamily="serif">{name}</Typography>
                        <Typography variant='h7' fontWeight="500" fontFamily="serif">{user.friends.length} friends</Typography>
                    </Box>
                </Flexbetween>
                {userId === user._id && (
                    <Tooltip title="Edit">
                        <IconButton onClick={() => navigate("/profile/update")}>
                            <ManageAccountsOutlined />
                        </IconButton>
                    </Tooltip>
                )}
            </Flexbetween>

            <Divider />

            <Box p="1rem 0">
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    <EmailOutlined fontSize='medium' />
                    <Typography variant='h5' fontWeight="500" fontFamily="serif">{user.email}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="1rem">
                    <PhoneAndroidOutlined fontSize='medium' />
                    <Typography variant='h5' fontWeight="500" fontFamily="serif">{user.phoneNo}</Typography>
                </Box>
            </Box>

            <Divider />

            <Box p="1rem 0">
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    <LocationOnOutlined fontSize='medium' />
                    <Typography variant='h5' fontWeight="500" fontFamily="serif">{user.location}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    <WorkOutlineOutlined fontSize='medium' />
                    <Typography variant='h5' fontWeight="500" fontFamily="serif">{user.profession}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="1rem">
                    {user.gender.toUpperCase() === "MALE" ? <MaleOutlined fontSize='medium' />
                        : <FemaleOutlined fontSize='medium' />}
                    <Typography variant='h5' fontWeight="500" fontFamily="serif">{user.gender}</Typography>
                </Box>
            </Box>

            <Divider />

            <Box p="1rem 0" display="flex" alignItems="center" gap="1rem">
                <InfoOutlined fontSize='medium' />
                <Typography variant='h5' fontWeight="500" fontFamily="serif">{user.about}</Typography>
            </Box>
        </WidgetWrapper>
    )
}

export default UserWidget