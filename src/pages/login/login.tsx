import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const Login = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    });

    const handleLogin = async (values: { email: string; password: string }) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', values);
            const { token } = response.data;
            localStorage.setItem('token', token); // Store token in local storage
            router.push('./dashboard'); // Redirect to home page
        } catch (error) {
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Login
                </Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleLogin}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <Box sx={{ mb: 2 }}>
                                <Field
                                    as={TextField}
                                    name="email"
                                    type="email"
                                    label="Email"
                                    fullWidth
                                    error={touched.email && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                />
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <Field
                                    as={TextField}
                                    name="password"
                                    type="password"
                                    label="Password"
                                    fullWidth
                                    error={touched.password && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                />
                            </Box>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Login
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Container>
    );
};

export default Login;
