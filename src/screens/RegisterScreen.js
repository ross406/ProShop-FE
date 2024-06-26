import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../componenets/Message';
import Loader from '../componenets/Loader';
import { register } from '../actions/userActions';
import FormContainer from '../componenets/FormContainer';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Google from './css/google.svg'
import { BASE_URL } from '../constants/constants';

const RegisterScreen = () => {
  const history = useHistory();
  const location = useLocation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location?.search ? location?.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const validateForm = () => {
    // Check if any of the fields are empty
    if (!name || !email || !password || !confirmPassword) {
      setMessage('Please fill in all fields');
      return false;
    }
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('Invalid email format');
      return false;
    }
    // Check password length
    if (password.length < 8) {
      setMessage('Password must be at least 8 characters');
      return false;
    }
    // Check if passwords match
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return false;
    }
    // If all validations pass
    return true;
  };


  const submitHandler = (e) => {
    e.preventDefault();
  
    setMessage(null);

    if (validateForm()) {
      // If validation passes, dispatch register action
      dispatch(register(name, email, password));
    }
  };

  const loginwithgoogle = ()=> {
    window.open(`${BASE_URL}/auth/google/callback`,"_self")
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password </Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Register
        </Button>
      </Form>

      <Button style={{display:'flex',marginTop:"25px"}} className='login-with-google-btn' onClick={loginwithgoogle}>
        <img src={Google} width={"20px"} style={{marginRight:"10px"}}/>  <span> Sign In With Google</span>
      </Button>

      <Row className='py-3'>
        <Col>
          Have an Account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
