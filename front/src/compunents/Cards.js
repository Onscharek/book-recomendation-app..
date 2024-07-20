import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, deleteProduct, getProduct, editProduct } from '../Redux/Actions/product';
import { Button, Card, Spinner, Offcanvas, Form } from 'react-bootstrap';
import { Rate } from 'antd';
import '../pages/css/cards.css';

const Cards = () => {
    const dispatch = useDispatch();
    const { listProducts, load, productToGet } = useSelector(state => state.product);
    const { user } = useSelector(state => state.user);

    const [show, setShow] = useState(false);
    const [editFormData, setEditFormData] = useState({
        title: '',
        description: '',
        author: '',
        rate: '',
        imgLink: ''
    });

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        dispatch(getProduct(id));
        setShow(true);
    };

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    useEffect(() => {
        if (productToGet) {
            setEditFormData({
                title: productToGet.title || '',
                description: productToGet.description || '',
                author: productToGet.author || '',
                rate: productToGet.rate || '',
                imgLink: productToGet.imgLink || ''
            });
        }
    }, [productToGet]);

    const handleChange = (e) => {
        setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(editProduct(productToGet._id, editFormData));
        handleClose();
    };


    if (load) {
        return <Spinner animation="border" variant="primary" />;
    }

    const isAdmin = () => {
        return (
            user &&
            (user._id === '6692fb9fe7818d413aef8f73' || user.email === 'onnscharek@gmail.com')
        );
    };

    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '20px' // Adjust gap as per your design
        }}>
            {listProducts.map((product) => (
                <div className='cardss' key={product._id} style={{ minWidth: '300px', maxWidth: '400px' }}>
                    <div className="flip-card">
                        <div className="flip-card-inner">
                            <div className="flip-card-front">
                                <Card.Img className="cardimg" variant="top" src={product.imgLink} alt="Book cover" />
                                <Card.Body>
                                    <Card.Title>{product.title}</Card.Title>
                                    <Card.Title>{product.author}</Card.Title>
                                    <Rate disabled defaultValue={product.rate} className="custom-rate" />
                                </Card.Body>
                            </div>
                            <div className="flip-card-back">
                                <p className="title">Infos</p>
                                <Card.Text>
                                    <p><b>Description:</b> {product.description}</p>
                                </Card.Text>
                                {(isAdmin() || (user && user._id === product.id_user)) ? (
                                    <div>
                                        <Button variant='outline-dark' onClick={() => dispatch(deleteProduct(product._id))} style={{ marginRight: '2%' }}>
                                            Delete
                                        </Button>
                                        <Button variant='outline-light' onClick={() => handleShow(product._id)} style={{ marginLeft: '2%' }}>
                                            Edit
                                        </Button>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Edit Book</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form onSubmit={handleSubmit}>

                        <Form.Group controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter title"
                                name="title"
                                value={editFormData.title}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formauthor">
                            <Form.Label>Author</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Author"
                                name="author"
                                value={editFormData.author}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter description"
                                name="description"
                                value={editFormData.description}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formrate">
                            <Form.Label>Rate</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Rate"
                                name="rate"
                                value={editFormData.rate}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formImage">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter image URL"
                                name="imgLink"
                                value={editFormData.imgLink}
                                onChange={handleChange}
                            />
                        </Form.Group>


                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
};

export default Cards;
