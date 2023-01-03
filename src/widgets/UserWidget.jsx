/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Divider, IconButton, Tooltip, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Flexbetween from '../components/Flexbetween';
import WidgetWrapper from "../components/WidgetWrapper";
import UserImage from "../components/UserImage";
import {
    EmailOutlined, Facebook, FemaleOutlined, GitHub, InfoOutlined, Instagram, LinkedIn, LocationOnOutlined, MaleOutlined, ManageAccountsOutlined,
    PhoneAndroidOutlined, TransgenderOutlined
} from '@mui/icons-material';
import { useSelector } from 'react-redux';

function UserWidget({ user }) {
    console.log(user)
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
                        <Typography variant='h6' fontWeight="500" fontFamily="serif">{user.profession}</Typography>
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
                    {user.gender.toUpperCase() === "MALE" ? <MaleOutlined fontSize='medium' />
                        : user.gender.toUpperCase() === "FEMALE" ? <FemaleOutlined fontSize='medium' /> : <TransgenderOutlined fontSize='medium' />}
                    <Typography variant='h5' fontWeight="500" fontFamily="serif">{user.gender}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="1rem">
                    <InfoOutlined fontSize='medium' />
                    <Typography variant='h5' fontWeight="500" fontFamily="serif">{user.about}</Typography>
                </Box>
            </Box>

            <Divider />

            <Flexbetween p="0.8rem 0.5rem">
                <Box sx={{ cursor: "pointer" }}>
                    <a href={user.facebookId} target="_blank" rel="noreferrer">
                        <Facebook sx={{
                            fontSize: "1.6rem",
                            fill: "#000",
                            "&:hover": {
                                fill: "#2563eb"
                            }
                        }} />
                    </a>
                </Box>
                <Box>
                    <a href={user.instagramId} target="_blank" rel="noreferrer">
                        <Instagram sx={{
                            fontSize: "1.6rem",
                            fill: "#000",
                            "&:hover": {
                                fill: "#9d174d"
                            }
                        }} />
                    </a>
                </Box>
                <Box>
                    <a href={user.linkedinId} target="_blank" rel="noreferrer">
                        <LinkedIn sx={{
                            fontSize: "1.6rem",
                            fill: "#000",
                            "&:hover": {
                                fill: "#0891b2"
                            }
                        }} />
                    </a>
                </Box>
                <Box>
                    <a href={user.githubId} target="_blank" rel="noreferrer">
                        <GitHub sx={{
                            fontSize: "1.6rem",
                            fill: "#000",
                            "&:hover": {
                                fill: "#000"
                            }
                        }} />
                    </a>
                </Box>
            </Flexbetween>

        </WidgetWrapper>
    )
}

export default UserWidget