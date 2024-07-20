import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../Redux/Actions/User';
import './css/cards.css';
import './css/login.css';

const Login = () => {
    const [user, setUser] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuth, user: loggedInUser, errors } = useSelector(state => state.user);

    useEffect(() => {
        if (isAuth && loggedInUser) { // Ensure loggedInUser is defined
            navigate(`/Profile/${loggedInUser._id}`);
        }
    }, [isAuth, navigate, loggedInUser]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleUser = (e) => { 
        e.preventDefault();
        dispatch(login(user));
    };

    useEffect(() => {
        if (errors.length > 0) {
            alert("Wrong Email Or Password ,Or Register first");  
        }
    }, [errors]);   

    return (
        <div>
                        <img className='books22' src="https://i.pinimg.com/originals/67/18/22/671822c2f63dd5f65d8fd15c9710420b.jpg" alt="books" style={{width:'100%',marginTop:'0%', marginRight:'50%', opacity: '0.5' }} />

            <div className="square-box3"></div>
            <div className="square-box4"></div>
            <div className="square-box"></div>
            <div className="square-box2"></div>

            <img className='books' src="https://www.freepnglogos.com/uploads/book-png/old-books-png-transparent-Images-0.png" alt="books" style={{ width: '30%', marginTop: '4%', marginRight: '50%' }} />

            <p className='name' style={{ marginTop: '1%' }}> Welcome to Book's Paradise!</p>

            <form className="form">
                <h1 className="heading" style={{ textShadow: '2px 2px 2px #d9aa84,' }}>Login</h1>
                <h5>Welcome Back Friend..!🧡</h5>
                <h6>Or Register If You Don't have an Account <Link to="/"><button className="btn" style={{ marginTop: '-1.5%' }}>Register</button></Link></h6>

                <input className="inputt" placeholder="Email" type="Email" name='email' onChange={handleChange} style={{ width: '100%' }} />
                <input className="inputt" type="password" placeholder="Password" name='password' onChange={handleChange} style={{ width: '100%' }} />
           <button className="btn" variant="primary" type="submit" onClick={handleUser} >Login</button>
            </form> 
            <p className='prg' style={{ marginTop: '2%', marginBottom: '-1%' }}>Where your gonna find you favorite book</p>
        </div>
    );
};

export default Login;
