import React, { useEffect } from 'react';
import './css/cards.css';
import './css/baground.css';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { fetchBooks } from '../Redux/Actions/Books'; 
import { useDispatch, useSelector } from 'react-redux';
import { Rate } from 'antd';
import NavScroll from '../compunents/nav bar/nav';


const Romance = () => {
    const dispatch = useDispatch();
    const books = useSelector(state => state.books.books);
    const searchQuery = useSelector(state => state.books.searchQuery);
    const apiKey = 'AIzaSyDUviEVDY5i8QPeBcJMerHc9MJWcJZx-OY'; 
    const query = 'romance';
    
    useEffect(() => {
        if (searchQuery) {
            dispatch(fetchBooks(searchQuery, apiKey));
        } else {
            dispatch(fetchBooks(query, apiKey));
        }
    }, [searchQuery, dispatch]);

    const displayBooks = (books) => {
        if (!books || books.length === 0) {
            return <div>No books found.</div>;
        }
        const generateRandomRating = () => {
            return Math.floor(Math.random() * 5) + 1; // Random rating between 1 and 5
        };
    

        return books.map((book) => {
            const title = book.volumeInfo.title || 'No title available';
            const publishedDate = book.volumeInfo.publishedDate || 'No publishedDate available';
            const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'No authors available';
            const pageCount = book.volumeInfo.pageCount || 'No page count available';
            const thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '';
            const averageRating = book.volumeInfo.averageRating || generateRandomRating();

            return (
                <div key={book.id}>
                    <div className='cardss'>
                        <div className="flip-card">
                            <div className="flip-card-inner">
                                <div className="flip-card-front">
                                    <Card.Img className="cardimg" variant="top" src={thumbnail} alt="Book cover" />
                                    <Card.Body>
                                        <Card.Title>{title}</Card.Title>
                                        <Rate disabled defaultValue={averageRating} className="custom-rate" />;

                                    </Card.Body>
                                </div>
                                <div className="flip-card-back">
                                    <p className="title">Infos</p>
                                    <Card.Text><p><b>Title:</b> {title}</p></Card.Text>
                                    <Card.Text><p><b>Author:</b> {authors}</p></Card.Text>
                                    <Card.Text><p><b>Published Date:</b> {publishedDate}</p></Card.Text>
                                    <Card.Text><p><b>Page Count:</b> {pageCount}</p></Card.Text>

                                    <Link to={`/Description/${book.id}`}>
                                        <div className="scene">
                                            <div className="cube">
                                                <span className="side top">AND MORE</span>
                                                <span className="side front">DESCRIPTION</span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    };

    return (
        <div>
        <NavScroll/>

            <div className="square-box3"></div>
            <div className="square-box4"></div>
            <div className="square-box"></div>
            <div className="square-box2"></div>
            <h1 className='genra'> ROMANCE BOOK'S </h1>
            <div id="books">
                {displayBooks(books)}
            </div>
        </div>
    );
}

export default Romance;
