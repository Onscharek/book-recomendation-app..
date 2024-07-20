import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import './css/cards.css';
import './css/description.css';
import './css/baground.css';
import { useParams } from 'react-router-dom';
import { Rate } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import NavScroll from '../compunents/nav bar/nav';




const Description = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const apiKey = 'AIzaSyDUviEVDY5i8QPeBcJMerHc9MJWcJZx-OY';

    useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes/${id}?key=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                console.log("Fetched book data:", data); // Log the fetched data
                setBook(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [id, apiKey]);

    const generateRandomRating = () => {
        return Math.floor(Math.random() * 5) + 1; // Random rating between 1 and 5
    };
 

    if (!book) {
        return <div>Loading...</div>;
    }

    const title = book.volumeInfo.title || 'No title available';
    const publishedDate = book.volumeInfo.publishedDate || 'No publishedDate available';
    const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'No authors available';
    const pageCount = book.volumeInfo.pageCount || 'No pageCount';
    const previewLink = book.volumeInfo.previewLink || 'No previewLink';
    const thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '';
    const acsTokenLink = book.accessInfo?.pdf?.acsTokenLink || '';

    console.log("Access token link:", acsTokenLink); // Log the acsTokenLink

    const description = book.volumeInfo.description || 'No description available';
    const sanitizedDescription = DOMPurify.sanitize(description);

    const averageRating = book.volumeInfo.averageRating || generateRandomRating();

    const handleDownload = () => {
        if (acsTokenLink) {
            const a = document.createElement('a');
            a.href = acsTokenLink;
            a.download = `${title}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else {
            alert('Sorry There Is No download link available Form This Book.');
        }
    };

    return (<div>
      <NavScroll/>
        <div style={{marginTop:'10%'}}>




<div className="square-box3"></div>

<div className="square-box4"></div>

<div className="square-box"></div>
<div className="square-box2"></div>


<img variant="top" src={thumbnail} alt="Book cover" className='bimg' />

<div style={{ width: '80%', margin: '0 auto', textAlign: 'center', marginTop: '-2%' }}>
  <b className='infotitle'>Infos:</b>
  <div className='info'>
    <p><b>Title:</b> {title}</p>
    <p><b>Author:</b> {authors}</p>
    <p><b>Published Date:</b> {publishedDate}</p>
    <p><b>Page Count:</b> {pageCount}</p>
    <p><b>Rating:</b><Rate disabled defaultValue={averageRating} className="custom-rate" /></p>
  </div>
  <div className='btns' style={{ display: 'flex', justifyContent: 'center', gap: '1%' }}>
    <button className="button" type="button" onClick={handleDownload}>
      <span className="button__text">Download</span>
      <span className="button__icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" className="svg">
          <path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z"></path>
          <path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z"></path>
          <path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z"></path>
        </svg>
      </span>
    </button>
    <a style={{ textDecoration: 'none' }} href={previewLink} target="_blank" rel="noopener noreferrer">
      <button className="button" type="button">
        <span className="button__text">Preview</span>
        <span className="button__icon">
          <EyeOutlined />
        </span>
      </button>
    </a>
  </div>
  <div>
    <b className='desctitle'>Description:</b>
    <div className='desc' dangerouslySetInnerHTML={{ __html: sanitizedDescription }} style={{ marginTop: '2%' }} />
  </div>
</div>



        


 </div></div>
                        

    );
}

export default Description;
