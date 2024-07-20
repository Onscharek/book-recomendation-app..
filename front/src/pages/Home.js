import React , { useEffect } from 'react'
import './css/cards.css';
import './css/baground.css';
import './css/hame.css';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { fetchBooks } from '../Redux/Actions/Books'; 
import { useDispatch, useSelector } from 'react-redux';
import { Rate } from 'antd';


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Search from '../compunents/nav bar/Search';
import NavScroll from '../compunents/nav bar/nav';


const Home = () => {

  


  const dispatch = useDispatch();
  const books = useSelector(state => state.books.books);
  const searchQuery = useSelector(state => state.books.searchQuery);
  const apiKey = 'AIzaSyDUviEVDY5i8QPeBcJMerHc9MJWcJZx-OY'; 
  const query = 'film';
  const { isAuth, user: loggedInUser } = useSelector(state => state.user);

  
  useEffect(() => {
      if (searchQuery) {
          dispatch(fetchBooks(searchQuery, apiKey));
      } else {
          dispatch(fetchBooks(query, apiKey));
      }
  }, [searchQuery, dispatch]);



  const generateRandomRating = () => {
    return Math.floor(Math.random() * 5) + 1; // Random rating between 1 and 5
};
 



  const displayBooks = (books) => {
      if (!books || books.length === 0) {
          return <div>No books found.</div>;
      }

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
              <div className='page'>

         <div className="square-box3"></div>;

         <div className="square-box4"></div>;

      <div className="square-box"></div>;
      <div className="square-box2"></div>;
   

  <div >
  <img className='books' src="https://www.freepnglogos.com/uploads/book-png/old-books-png-transparent-Images-0.png" alt="books" style={{width:'30%',marginTop:'8%', marginRight:'50%',}} />

  <div>
  <p className='name'>Book's Paradise</p>

  </div>
  </div>
  
  <p className='select'>Select Your Genre.</p>
  <Search/>

<Container style={{marginTop:'2%' }}>
      <Row >
        <Col  md={6}><div className="container" >

 
        <Link as={Link} to={isAuth && loggedInUser ? `/Horor/${loggedInUser._id}` : "/Horor"}><div data-text="HORROR" style={{ "--r": "-15" }} className="glass">
    <span viewBox="0 0 496 512" height="1em" >
      <path><img src="https://cdn-icons-png.flaticon.com/512/3507/3507934.png" alt="books" style={{width:'30%',marginTop:'8%', marginRight:'50%',}} /></path>
    </span>
  </div></Link>

   
  <Link as={Link} to={isAuth && loggedInUser ? `/Romance/${loggedInUser._id}` : "/Romance"}>
  <div data-text="ROMANCE" style={{ "--r": "5" }} className="glass">
  <span viewBox="0 0 496 512" height="1em" >
      <path><img src="https://cdn-icons-png.flaticon.com/512/2560/2560343.png" alt="books" style={{width:'30%',marginTop:'8%', marginRight:'50%',}} /></path>
    </span>
  </div>
  </Link>
     
  <Link as={Link} to={isAuth && loggedInUser ? `/Fiction/${loggedInUser._id}` : "/Fiction"}>
  <div data-text="FICTION" style={{ "--r": "25" }} className="glass">
  <span viewBox="0 0 496 512" height="1em" >
      <path><img src="https://cdn-icons-png.flaticon.com/512/2178/2178121.png" alt="books" style={{width:'30%',marginTop:'8%', marginRight:'50%',}} /></path>
    </span>
  </div>
  </Link>
</div>
</Col>
<Col   xs={6} ><div className="container" >
           
        <Link  as={Link} to={isAuth && loggedInUser ? `/Computing/${loggedInUser._id}` : "/Computing"}>
            <div data-text="COMPUTING" style={{ "--r": "-15" }} className="glass">
  <span viewBox="0 0 496 512" height="1em" >
      <path><img src="https://cdn-icons-png.flaticon.com/512/4264/4264850.png" alt="books" style={{width:'30%',marginTop:'8%', marginRight:'50%',}} /></path>
    </span>
  </div>
  </Link>

  <Link as={Link} to={isAuth && loggedInUser ? `/History/${loggedInUser._id}` : "/History"}>
  <div data-text="HISTORY" style={{ "--r": "5" }} className="glass">
  <span viewBox="0 0 496 512" height="1em" >
      <path><img src="https://icon-library.com/images/history-icon/history-icon-7.jpg" alt="books" style={{width:'30%',marginTop:'8%', marginRight:'50%',}} /></path>
    </span>
  </div>  
  </Link>

  <Link as={Link} to={isAuth && loggedInUser ? `/Drama/${loggedInUser._id}` : "/Drama"}>
  <div data-text="DRAMA" style={{ "--r": "25" }} className="glass">
  <span viewBox="0 0 496 512" height="1em" >
      <path><img src="https://www.freeiconspng.com/thumbs/theater-icon/comedy-drama-masks-theater-theatre-icon--5.png" alt="books" style={{width:'30%',marginTop:'8%', marginRight:'50%',}} /></path>
    </span>
  </div> 
  </Link>
    
</div>


</Col> 
      </Row>

    </Container>

    <p className='prg'>Whether you're into thrillers that keep you on the edge of your seat <br/>or literary classics that stir the soul,<br/> our extensive database ensures there's something for everyone.<br/> Explore curated lists, discover hidden gems, </p>
    <p className='select'style={{marginTop:'3%'}}>↓Our Top Selection↓</p>

    <div id="books">
                {displayBooks(books)}
            </div> </div>

    </div>
  )
}

export default Home