import React, { useEffect, useState } from 'react'
import './css/cards.css';
import './css/baground.css';
import NavScroll from '../compunents/nav bar/nav';
// import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { addProduct } from '../Redux/Actions/product';
import { getProducts } from '../Redux/Actions/product';
import Cards from '../compunents/Cards';




export const Books = () => {

                    //   modal
                    const [show, setShow] =  useState(false);

                    const handleClose = () => setShow(false);
                    const handleShow = () => setShow(true);

                                //    add

                                const [newProduct, setNewProduct] = useState({});
                                const dispatch = useDispatch();
                              
                              
                                const handleChange = (e) => {
                                  setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
                                };
                              
                                const handleProduct = async (e) => {
                                  e.preventDefault();
                                  try {
                                    await dispatch(addProduct(newProduct));
                                  } catch (error) {
                                    console.error("ADD failed:", error);
                                  
                                  }setShow(false);
                                };
  



    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

  return (
    <div>

<NavScroll/>
                 <div className="square-box3"></div>;

<div className="square-box4"></div>;

<div className="square-box"></div>;
<div className="square-box2"></div>;

                           {/* modall */}
      <div className="scene"   onClick={handleShow}  style={{marginTop:'7%',marginLeft:'40%'}}>
                                            <div className="cube">
                                                <span className="side top"> A BOOK</span>
                                                <span className="side front">ADD</span>
                                            </div>
                                        </div>





      <Modal  style={{backgroundColor:' rgb(217, 170, 132,0.2),'}}  show={show} onHide={handleClose} >
        <Modal.Header  style={{backgroundColor:' rgb(217, 170, 132)'}} closeButton>
          <Modal.Title>Add A Book You Like..</Modal.Title>
        </Modal.Header>

        <Modal.Body   >
<div className="form" style={{marginBottom:'4%',width:'80%',marginLeft:'9%',}}>
        <input className="inputt" placeholder="title" type="text" name='title' style={{ width: '100%' }} onChange={handleChange} value={newProduct.title}/>
                <input className="inputt" type="text" placeholder="author" name='author' style={{ width: '100%' }}  onChange={handleChange} value={newProduct.author} />
                <input className="inputt" placeholder="description" type="text" name='description' style={{ width: '100%' }}onChange={handleChange} value={newProduct.description}/>
                <input className="inputt" type="nuber" placeholder="rate" name='rate' style={{ width: '100%' }} onChange={handleChange} value={newProduct.rate}/>
                <input className="inputt" type="link" placeholder="imgLink" name='imgLink'  style={{ width: '100%' }}onChange={handleChange} value={newProduct.imgLink} />
                </div>
            
            
            </Modal.Body>
        <Modal.Footer  >
        <button className="btn" variant="primary" type="submit"onClick={handleClose}>Close</button>
        <button className="btn" variant="primary" type="submit" style={{backgroundColor:'#d9aa84'}} onClick={handleProduct}>Save</button>
        </Modal.Footer>
      </Modal>


      <div>
        </div>

<div style={{ display:'flex',
                      flexWrap: 'wrap',
                      gap: '60px',
                      justifyContent: 'center',
                      alignItems: 'center',  
                    }}>  
<Cards/>    
</div>
</div>

  
 
  )
}
                    //  orgg