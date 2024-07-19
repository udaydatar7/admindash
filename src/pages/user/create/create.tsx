import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  Switch,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  FormHelperText,
} from '@mui/material';
import { styled } from '@mui/system';
import Image from 'next/image';
import { Upload } from '@mui/icons-material';
import { File } from 'buffer';

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  fullName: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Enter a valid email').required('Email is required'),
  phoneNumber: Yup.string().required('Phone Number is required'),
  country: Yup.string().required('Country is required'),
  state: Yup.string().required('State/Region is required'),
  city: Yup.string().required('City is required'),
  address: Yup.string().required('Address is required'),
  zipCode: Yup.string().required('Zip Code is required'),
  company: Yup.string().required('Company is required'),
  role: Yup.string().required('Role is required'),
});

const CreateUser = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      fullName: '',
      email: '',
      phoneNumber: '',
      country: '',
      state: '',
      city: '',
      address: '',
      zipCode: '',
      company: '',
      role: '',
      emailVerified: true,

    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:5000/api/users/users', values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('User created successfully:', response.data);
      } catch (error) {
        console.error('Error creating user:', error);
      }
    },
  });

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Create a new user
      </Typography>
      <Typography variant="body2" sx={{ mb: 3 }}>
        Dashboard &gt; User &gt; New user
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 2,
                border: '1px dashed #ccc',
                borderRadius: '8px',
                height: '100%',
              }}
            >
              <Typography variant="body2" align="center">
                Upload photo
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  mt: 2,
                }}
              >
                <Image
                  src="/placeholder-image.png" 
                  alt="Upload photo"
                  width={100}
                  height={100}
                />
                <input id="file" name="file" type="file" />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                </Typography>
                <Typography variant="body2">
                  max size of 3 Mb
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
                Disabling this will automatically send the user a verification email
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="username"
                  name="username"
                  label="Username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  error={formik.touched.username && Boolean(formik.errors.username)}
                  helperText={formik.touched.username && formik.errors.username}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="fullName"
                  name="fullName"
                  label="Full Name"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                  helperText={formik.touched.fullName && formik.errors.fullName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email Address"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Phone Number"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                  helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={formik.touched.country && Boolean(formik.errors.country)}>
                  <InputLabel id="country-label">Country</InputLabel>
                  <Select
                    labelId="country-label"
                    id="country"
                    name="country"
                    value={formik.values.country}
                    onChange={formik.handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="USA">USA</MenuItem>
                    <MenuItem value="Canada">Canada</MenuItem>
                    <MenuItem value="UK">UK</MenuItem>
                    {/* Add more countries as needed */}
                  </Select>
                  <FormHelperText>{formik.touched.country && formik.errors.country}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="state"
                  name="state"
                  label="State/Region"
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  error={formik.touched.state && Boolean(formik.errors.state)}
                  helperText={formik.touched.state && formik.errors.state}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="city"
                  name="city"
                  label="City"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  helperText={formik.touched.city && formik.errors.city}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="address"
                  name="address"
                  label="Address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  error={formik.touched.address && Boolean(formik.errors.address)}
                  helperText={formik.touched.address && formik.errors.address}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="zipCode"
                  name="zipCode"
                  label="Zip Code"
                  value={formik.values.zipCode}
                  onChange={formik.handleChange}
                  error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
                  helperText={formik.touched.zipCode && formik.errors.zipCode}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="company"
                  name="company"
                  label="Company"
                  value={formik.values.company}
                  onChange={formik.handleChange}
                  error={formik.touched.company && Boolean(formik.errors.company)}
                  helperText={formik.touched.company && formik.errors.company}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={formik.touched.role && Boolean(formik.errors.role)}>
                  <InputLabel id="role-label">Role</InputLabel>
                  <Select
                    labelId="role-label"
                    id="role"
                    name="role"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="User">User</MenuItem>
                    <MenuItem value="Manager">Manager</MenuItem>
                    {/* Add more roles as needed */}
                  </Select>
                  <FormHelperText>{formik.touched.role && formik.errors.role}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formik.values.emailVerified}
                      onChange={formik.handleChange}
                      name="emailVerified"
                      color="primary"
                    />
                  }
                  label="Email Verified"
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 3 }}>
              <Button color="primary" variant="contained" fullWidth type="submit">
                Create User
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CreateUser;
