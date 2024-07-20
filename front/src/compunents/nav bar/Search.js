import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import { SearchOutlined } from '@ant-design/icons';
import './nav.css'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchBooks,setSearchQuery } from '../../Redux/Actions/Books';




const Search = () => {


    const [input, setInput] = useState('');
    const dispatch = useDispatch();
    const apiKey = 'AIzaSyDUviEVDY5i8QPeBcJMerHc9MJWcJZx-OY';
    const navigate = useNavigate();
    ;
    const handleSearch = () => {
        const query = input.trim().toLowerCase();
        dispatch(setSearchQuery(query));
        dispatch(fetchBooks(query, apiKey));
        navigate(`/search-results/${query}`);
    };




  return (
    <div>    
          <h6>Or Search Your Book </h6>

          <Form style={{paddingRight:'43%',paddingLeft:'45%',     }} className="d-flex">
    <Form.Control
      type="text"
      value={input} 
      onChange={(e) => setInput(e.target.value)} 
      placeholder="Search"
      className="input"
      aria-label="Search"
      style={{backgroundColor: 'rgba(255, 255, 255, 0.3)'}}
    />

    <SearchOutlined style={{ paddingLeft: '1%', fontSize: '32px' }}  onClick={handleSearch} />      

  </Form>
</div>
  )
}

export default Search