import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, setSearchQuery } from '../../Redux/Actions/Books';
import { useNavigate, Link } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import './nav.css';
import { logout } from '../../Redux/Actions/User'; // Import logout action

function NavScroll() {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const apiKey = 'AIzaSyDUviEVDY5i8QPeBcJMerHc9MJWcJZx-OY';
    const { isAuth, user: loggedInUser } = useSelector(state => state.user);

    const handleSearch = () => {
        const query = input.trim().toLowerCase();
        dispatch(setSearchQuery(query));
        dispatch(fetchBooks(query, apiKey));
        navigate(`/search-results/${query}`);
    };

    const handleLogout = () => {
        dispatch(logout()); // Dispatch logout action
        navigate('/'); // Navigate to the home page after logout
    };

    return (
        <div>
            <div style={{ marginBottom: '1px' }} className="notification-bar">
                <p>Welcome To Your Favorite Book Store</p>
                <p>Welcome To Your Favorite Book Store</p>
                <p>Welcome To Your Favorite Book Store</p>
            </div>

            <div>
                <div className='nn'>
                <Navbar
                    style={{
                        paddingLeft: '3%',
                        paddingRight: '3%',
                        marginTop: '2%',
                        position: 'fixed',
                        top: 0,
                        width: '100%',
                        zIndex: 1000,
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        padding: '0px 0',
                        border: '2px solid rgb(217, 170, 132)',
                        boxShadow: '2px 2px 2px rgb(217, 170, 132)'
                    }}
                    expand="lg"
                >
                    <Container fluid>
                        <Navbar.Brand style={{ paddingRight: '2%' }} className='np'>
                            <Nav.Link as={Link} to={isAuth && loggedInUser ? `/home/${loggedInUser._id}` : "/home"} className='np'>
                                <b>Book's Paradise</b>
                            </Nav.Link>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>



                                {isAuth && loggedInUser ? (
                                    <Navbar.Brand className='np'>
                                        <Nav.Link as={Link} to={`/Profile/${loggedInUser._id}`}  className='np'>
                                            Profile
                                        </Nav.Link>
                                    </Navbar.Brand>
                                ) : (
                                    <Navbar.Brand></Navbar.Brand>
                                )}


                                                                {isAuth && loggedInUser ? (
                                    <Navbar.Brand className='np'>
                                        <Nav.Link as={Link} to={`/BooksFromYou/${loggedInUser._id}`}  className='np'>
                                        BooksFromYou
                                        </Nav.Link>
                                    </Navbar.Brand>
                                ) : (
                                    <Navbar.Brand></Navbar.Brand>
                                )}

                                
                            </Nav>







                            <Navbar.Brand className='np'>
                                    <Nav.Link as={Link} to="/" onClick={handleLogout} className='np'>
                                        Logout 
                                    </Nav.Link>
                                </Navbar.Brand>



                            <Form style={{ paddingRight: '5%' }} className="d-flex">
                                <Form.Control
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Nav.Link>
                                    <SearchOutlined style={{ paddingTop: '5%', fontSize: '32px' }} onClick={handleSearch} />
                                </Nav.Link>
                            </Form>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </div></div>
    );
}

export default NavScroll;
