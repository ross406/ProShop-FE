import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../componenets/Message';
import Loader from '../componenets/Loader';
import { login } from '../actions/userActions';
import FormContainer from '../componenets/FormContainer';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import './css/login.css';
import { BASE_URL } from '../constants/constants';
import Google from './css/google.svg'


const LoginScreen = () => {

  const history = useHistory();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location?.search ? location?.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const loginwithgoogle = ()=> {
    window.open(`${BASE_URL}/auth/google/callback`,"_self")
  }

  const loginwithguest = () => {
    setEmail("john@example.com")
    setPassword("12345678")
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
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
          <Form.Label>Password Address</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Sign In
        </Button>
      </Form>
      <Button style={{display:'flex',marginTop:"25px"}} className='login-with-google-btn' onClick={loginwithguest}>
          <span> Use Guest Credentials </span>
      </Button>
      <Button style={{display:'flex',marginTop:"25px"}} className='login-with-google-btn' onClick={loginwithgoogle}>
        <img src={Google} width={"20px"} style={{marginRight:"10px"}}/>  <span> Sign In With Google</span>
      </Button>

      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
