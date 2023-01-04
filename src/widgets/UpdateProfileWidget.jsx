import { Box, Button, FormControl, FormLabel, InputLabel, MenuItem, Select, TextField, Typography, useMediaQuery } from '@mui/material';
import * as yup from "yup";
import axios from 'axios';
import { Formik } from 'formik';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../pages/Navbar';
import { setUser } from "../state/index";
import { useNavigate } from 'react-router-dom';



const updatedSchema = yup.object().shape({
    userName: yup.string().required("username required"),
    phoneNo: yup.string().required("phone number required").min(10, "number must be 10 digit").max(10, "number must be 10 digit"),
    location: yup.string().required("location required"),
    profession: yup.string().required("profession required"),
    gender: yup.string().required("gender required"),
    about: yup.string(),
    facebookId: yup.string(),
    instagramId: yup.string(),
    linkedinId: yup.string(),
    GithubId: yup.string()
})


function UpdateProfileWidget() {

    const dispatch = useDispatch();
    // const { palette } = useTheme();
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const userId = user._id;
    const isNonMobile = useMediaQuery("(min-width: 1000px)");


    let preview = `http://localhost:3030/assets/${user.picturePath}`;

    const userUpdate = async (values) => {
        const formData = new FormData();

        if (values.picture) {
            formData.append("picturePath", values.picture.name);
        } else {
            formData.append("picturePath", user.picturePath);
        }

        for (let value in values) {
            formData.append(value, values[value]);
        }

        const res = await axios.patch(`http://localhost:3030/user/${userId}`, formData);
        dispatch(setUser({ user: res.data }));
        navigate("/");
    }


    return (
        <>
            <Navbar />
            <Box width={isNonMobile ? "50%" : "90%"} m="2rem auto">
                <Formik
                    onSubmit={userUpdate}
                    initialValues={{
                        userName: user.userName,
                        phoneNo: user.phoneNo,
                        gender: user.gender,
                        profession: user.profession,
                        location: user.location,
                        about: user.about,
                        facebookId: user.facebookId,
                        instagramId: user.instagramId,
                        linkedinId: user.linkedinId,
                        githubId: user.githubId
                    }}
                    validationSchema={updatedSchema}>
                    {({ values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        setFieldValue }) => (
                        <form onSubmit={handleSubmit}>
                            <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                sx={{
                                    "& > div": {
                                        gridColumn: isNonMobile ? undefined : "span 4"
                                    }
                                }}>

                                <Box sx={{ gridColumn: "span 4" }}>
                                    <FormLabel htmlFor="dropzone-file" sx={{ position: "relative", width: "100%" }}>
                                        <TextField type='file' id="dropzone-file"
                                            onChange={(e) => {
                                                setFieldValue("picture", e.target.files[0])
                                            }}
                                            sx={{ visibility: "hidden" }} />
                                        <img style={{
                                            objectFit: "cover", borderRadius: "50%",
                                            marginLeft: `${isNonMobile ? "3rem" : "7rem"}`
                                        }}
                                            width={100} height={100}
                                            src={preview} alt="user" />
                                        <Typography textAlign="center" fontFamily="serif" sx={{ color: "green" }}>
                                            {values.picture &&
                                                <>
                                                    <span style={{ display: "none" }}>{preview = URL.createObjectURL(values.picture)}</span>
                                                    {"Successfully Changed Image"}
                                                </>
                                            }</Typography>
                                    </FormLabel>
                                </Box>
                                <TextField autoComplete='off' label="Username" name="userName"
                                    onBlur={handleBlur} onChange={handleChange}
                                    value={values.userName}
                                    error={Boolean(touched.userName) && Boolean(errors.userName)}
                                    helperText={touched.userName && errors.userName}
                                    sx={{ gridColumn: "span 2", input: { fontFamily: "serif" } }} />
                                <TextField autoComplete='off' label="Phone number" name="phoneNo"
                                    onBlur={handleBlur} onChange={handleChange}
                                    value={values.phoneNo}
                                    error={Boolean(touched.phoneNo) && Boolean(errors.phoneNo)}
                                    helperText={touched.phoneNo && errors.phoneNo}
                                    sx={{ gridColumn: "span 2", input: { fontFamily: "serif" } }} />
                                <FormControl sx={{ gridColumn: "span 2", fontFamily: "serif" }}>
                                    <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                    <Select label="Gender"
                                        labelId="demo-simple-select-label" id="demo-simple-select"
                                        name="gender" onBlur={handleBlur} onChange={handleChange}
                                        value={values.gender}
                                        error={Boolean(touched.gender) && Boolean(errors.gender)}
                                        helpertext={touched.gender && errors.gender}
                                    >
                                        <MenuItem value="Male" sx={{ fontFamily: "serif" }}>Male</MenuItem>
                                        <MenuItem value="Female" sx={{ fontFamily: "serif" }}>Female</MenuItem>
                                        <MenuItem value="Other" sx={{ fontFamily: "serif" }}>Others</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField autoComplete='off' label="Profession" name="profession"
                                    onBlur={handleBlur} onChange={handleChange}
                                    value={values.profession}
                                    error={Boolean(touched.profession) && Boolean(errors.profession)}
                                    helperText={touched.profession && errors.profession}
                                    sx={{ gridColumn: "span 2", input: { fontFamily: "serif" } }} />
                                <TextField autoComplete='off' label="Location" name="location"
                                    onBlur={handleBlur} onChange={handleChange}
                                    value={values.location}
                                    error={Boolean(touched.location) && Boolean(errors.location)}
                                    helperText={touched.location && errors.location}
                                    sx={{ gridColumn: "span 2", input: { fontFamily: "serif" } }} />
                                <TextField autoComplete='off' label="About" name="about"
                                    onBlur={handleBlur} onChange={handleChange}
                                    value={values.about}
                                    error={Boolean(touched.about) && Boolean(errors.about)}
                                    helperText={touched.about && errors.about}
                                    sx={{ gridColumn: "span 2", input: { fontFamily: "serif" } }} />

                                <TextField autoComplete='off' label="Facebook ID" name="facebookId"
                                    onBlur={handleBlur} onChange={handleChange}
                                    value={values.facebookId}
                                    error={Boolean(touched.facebookId) && Boolean(errors.facebookId)}
                                    helperText={touched.facebookId && errors.facebookId}
                                    sx={{ gridColumn: "span 2", input: { fontFamily: "serif" } }} />
                                <TextField autoComplete='off' label="Instagram ID" name="instagramId"
                                    onBlur={handleBlur} onChange={handleChange}
                                    value={values.instagramId}
                                    error={Boolean(touched.instagramId) && Boolean(errors.instagramId)}
                                    helperText={touched.instagramId && errors.instagramId}
                                    sx={{ gridColumn: "span 2", input: { fontFamily: "serif" } }} />
                                <TextField autoComplete='off' label="Linkedin ID" name="linkedinId"
                                    onBlur={handleBlur} onChange={handleChange}
                                    value={values.linkedinId}
                                    error={Boolean(touched.linkedinId) && Boolean(errors.linkedinId)}
                                    helperText={touched.linkedinId && errors.linkedinId}
                                    sx={{ gridColumn: "span 2", input: { fontFamily: "serif" } }} />
                                <TextField autoComplete='off' label="Github ID" name="githubId"
                                    onBlur={handleBlur} onChange={handleChange}
                                    value={values.githubId}
                                    error={Boolean(touched.githubId) && Boolean(errors.githubId)}
                                    helperText={touched.githubId && errors.githubId}
                                    sx={{ gridColumn: "span 2", input: { fontFamily: "serif" } }} />
                            </Box>

                            <Box>
                                <Button
                                    fullWidth
                                    variant='outlined'
                                    type="submit"
                                    sx={{
                                        m: "2rem 0",
                                        p: "0.6rem 1rem",
                                        fontFamily: "serif",
                                        fontSize: "16px"
                                    }}
                                >
                                    Update
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </>
    )
}

export default UpdateProfileWidget;