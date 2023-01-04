import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from "yup";
import { Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Box } from '@mui/material';
import Dropzone from "react-dropzone";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { setLogin } from "../../state/index";
import Flexbetween from "../../components/Flexbetween";
import { Visibility, VisibilityOff } from '@mui/icons-material';


const loginSchema = yup.object().shape({
    email: yup.string().email("email required").required("email must be required"),
    password: yup.string().required("password must be required").min(5, "password must be greater then 5 character")
});

const registerSchema = yup.object().shape({
    userName: yup.string().required("username required"),
    email: yup.string().email("Invalid email").required("email required"),
    password: yup.string().required("password required").min(5, "password must be greater then 5 character"),
    phoneNo: yup.string().required("phone number required").min(10, "number must be 10 digit").max(10, "number must be 10 digit"),
    location: yup.string().required("location required"),
    profession: yup.string().required("profession required"),
    gender: yup.string().required("gender required"),
    picture: yup.string().required("picture required"),
    about: yup.string(),
    facebookId: yup.string(),
    instagramId: yup.string(),
    linkedinId: yup.string(),
    githubId: yup.string(),
});


// const initialLoginValues = {
//     email: "",
//     password: ""
// };

const initialRegisterValues = {
    userName: "",
    email: "",
    password: "",
    phoneNo: "",
    profession: "",
    gender: "Male",
    picture: "",
    location: "",
    about: "",
    facebookId: "",
    instagramId: "",
    linkedinId: "",
    githubId: ""
};


function Form() {

    const [pageType, setPageType] = useState("login");
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";
    const [visible, setVisible] = useState(false);


    const login = async (values, onSubmitProps) => {
        const loggedIn = await axios.post("http://localhost:3030/auth/login", values);

        onSubmitProps.resetForm();

        if (loggedIn) {
            dispatch(
                setLogin({
                    user: loggedIn.data.user,
                    token: loggedIn.data.token
                })
            )
        }
        navigate("/")
    }

    const register = async (values, onSubmitProps) => {
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value]);
        }
        formData.append("picturePath", values.picture.name);

        const savedUserRes = await axios.post("http://localhost:3030/auth/register", formData);
        console.log(savedUserRes.data);

        if (savedUserRes) {
            setPageType("login");
        }
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps);
    };

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialRegisterValues}
            validationSchema={isLogin ? loginSchema : registerSchema}>
            {({ values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm }) => (
                <form onSubmit={handleSubmit} >
                    <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": {
                                gridColumn: isNonMobile ? undefined : "span 4"
                            },
                            fontFamily: "serif"
                        }}>
                        <TextField label="Email" name="email"
                            autoComplete='off'
                            onBlur={handleBlur} onChange={handleChange}
                            value={values.email}
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{ gridColumn: "span 2" }} />
                        <TextField autoComplete='off' label="Password" name="password" type={visible ? "text" : "password"}
                            onBlur={handleBlur} onChange={handleChange}
                            value={values.password}
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx={{ gridColumn: "span 2" }} InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end" onClick={() => setVisible((visibility) => !visibility)} sx={{ cursor: "pointer" }}>
                                        {visible ? <Visibility sx={{ right: "0", top: "0" }} /> : <VisibilityOff sx={{ right: "0", top: "0" }} />}
                                    </InputAdornment>
                                )
                            }} />
                        {isRegister && (
                            <>
                                <TextField autoComplete='off' label="Username" name="userName"
                                    onBlur={handleBlur} onChange={handleChange}
                                    value={values.userName}
                                    error={Boolean(touched.userName) && Boolean(errors.userName)}
                                    helperText={touched.userName && errors.userName}
                                    sx={{ gridColumn: "span 2" }} />
                                <TextField autoComplete='off' label="Phone number" name="phoneNo"
                                    onBlur={handleBlur} onChange={handleChange}
                                    value={values.phoneNo}
                                    error={Boolean(touched.phoneNo) && Boolean(errors.phoneNo)}
                                    helperText={touched.phoneNo && errors.phoneNo}
                                    sx={{ gridColumn: "span 2" }} />
                                <FormControl sx={{ gridColumn: "span 2" }}>
                                    <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                    <Select label="Gender"
                                        labelId="demo-simple-select-label" id="demo-simple-select"
                                        name="gender" onBlur={handleBlur} onChange={handleChange}
                                        value={values.gender}
                                        error={Boolean(touched.gender) && Boolean(errors.gender)}
                                        helpertext={touched.gender && errors.gender}
                                    >
                                        <MenuItem value="Male">Male</MenuItem>
                                        <MenuItem value="Female">Female</MenuItem>
                                        <MenuItem value="Other">Others</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField autoComplete='off' label="Profession" name="profession"
                                    onBlur={handleBlur} onChange={handleChange}
                                    value={values.profession}
                                    error={Boolean(touched.profession) && Boolean(errors.profession)}
                                    helperText={touched.profession && errors.profession}
                                    sx={{ gridColumn: "span 2" }} />

                                <Box
                                    gridColumn="span 4"
                                    border={`1px solid ${palette.neutral.medium}`}
                                    borderRadius="5px"
                                    p="1rem"
                                    required
                                >
                                    <Dropzone
                                        acceptedFiles=".jpg,.jpeg,.png"
                                        multiple={false}
                                        onDrop={(acceptedFiles) =>
                                            setFieldValue("picture", acceptedFiles[0])
                                        }
                                    >
                                        {({ getRootProps, getInputProps }) => (
                                            <Box
                                                {...getRootProps()}
                                                border={`2px dashed ${palette.primary.main}`}
                                                p="0.5rem"
                                                sx={{ "&:hover": { cursor: "pointer" } }}
                                            >
                                                <input {...getInputProps()} />
                                                {!values.picture ? (
                                                    <p>Add Picture Here*</p>
                                                ) : (
                                                    <Flexbetween>
                                                        <Typography>{values.picture.name}</Typography>
                                                        <EditOutlinedIcon />
                                                    </Flexbetween>
                                                )}
                                            </Box>
                                        )}
                                    </Dropzone>
                                </Box>

                                <TextField autoComplete='off' label="Location" name="location"
                                    onBlur={handleBlur} onChange={handleChange}
                                    value={values.location}
                                    error={Boolean(touched.location) && Boolean(errors.location)}
                                    helperText={touched.location && errors.location}
                                    sx={{ gridColumn: "span 2" }} />
                                <TextField autoComplete='off' label="About" name="about"
                                    onBlur={handleBlur} onChange={handleChange}
                                    value={values.about}
                                    error={Boolean(touched.about) && Boolean(errors.about)}
                                    helperText={touched.about && errors.about}
                                    sx={{ gridColumn: "span 2" }} />

                                <TextField autoComplete='off' label="Facebook ID" name="facebookId"
                                    onBlur={handleBlur} onChange={handleChange}
                                    value={values.facebookId}
                                    error={Boolean(touched.facebookId) && Boolean(errors.facebookId)}
                                    helperText={touched.facebookId && errors.facebookId}
                                    sx={{ gridColumn: "span 2" }} />
                                <TextField autoComplete='off' label="Instagram ID" name="instagramId"
                                    onBlur={handleBlur} onChange={handleChange}
                                    value={values.instagramId}
                                    error={Boolean(touched.instagramId) && Boolean(errors.instagramId)}
                                    helperText={touched.instagramId && errors.instagramId}
                                    sx={{ gridColumn: "span 2" }} />
                                <TextField autoComplete='off' label="Linkedin ID" name="linkedinId"
                                    onBlur={handleBlur} onChange={handleChange}
                                    value={values.linkedinId}
                                    error={Boolean(touched.linkedinId) && Boolean(errors.linkedinId)}
                                    helperText={touched.linkedinId && errors.linkedinId}
                                    sx={{ gridColumn: "span 2" }} />
                                <TextField autoComplete='off' label="Github ID" name="githubId"
                                    onBlur={handleBlur} onChange={handleChange}
                                    value={values.githubId}
                                    error={Boolean(touched.githubId) && Boolean(errors.githubId)}
                                    helperText={touched.githubId && errors.githubId}
                                    sx={{ gridColumn: "span 2" }} />
                            </>
                        )}
                    </Box>

                    <Box>
                        <Button
                            fullWidth
                            variant='outlined'
                            type="submit"
                            sx={{
                                m: "2rem 0",
                                p: "1rem",
                            }}
                        >
                            {isLogin ? "LOGIN" : "REGISTER"}
                        </Button>
                        <Typography
                            onClick={() => {
                                setPageType(isLogin ? "register" : "login");
                                resetForm();
                            }}
                            fontSize={15}
                            color="Highlight"
                        >
                            {isLogin
                                ? "Don't have an account? Sign Up here."
                                : "Already have an account? Login here."}
                        </Typography>
                    </Box>
                </form>
            )}
        </Formik>
    )
}

export default Form