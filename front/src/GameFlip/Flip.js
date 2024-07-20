import { useEffect, useState } from 'react';
import fruitItems from './fruits.json';
import './Flip.css';
import NavScroll from '../compunents/nav bar/nav'

function Card({ fruit, flipped, chooseCard  }) {
  const cardClickHandle = (e) => {
    chooseCard(fruit);
  };

  return (
    <div className={`card ${flipped ? 'matched' : ''}`} onClick={cardClickHandle}>
      <img style={{ transform: 'rotateY(180deg)' }} src={fruit.src} alt='fruits' />
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4"></path>
        <line x1="12" y1="19" x2="12" y2="19.01"></line>
      </svg>
    </div>
  );
}

function Flip() {
  const [fruits, setFruits] = useState([]);
  const [fruitOne, setFruitOne] = useState(null);
  const [fruitTwo, setFruitTwo] = useState(null);

  const chooseCard = (fruit) => {
    fruitOne ? setFruitTwo(fruit) : setFruitOne(fruit);
  };

  const initGame = () => {
    const allFruits = [...fruitItems, ...fruitItems]
      .sort(() => Math.random() - 0.5)
      .map((item) => ({ ...item, id: Math.random() }));
    setFruits(allFruits);
  };

  const resetGame = () => {
    setFruits((prevFruits) => {
      return prevFruits.map((item) => {
        if (item.matched) {
          return { ...item, matched: false };
        }
        return item;
      });
    });

    setFruitOne(null);
    setFruitTwo(null);

    setTimeout(() => {
      initGame();
    }, 500);
  };

  useEffect(() => {
    initGame(); // Initialize the game when the component mounts
  }, []);

  useEffect(() => {
    if (fruitOne && fruitTwo) {
      if (fruitOne.src === fruitTwo.src) {
        setFruits((prevFruits) => {
          return prevFruits.map((item) => {
            if (item.src === fruitOne.src) {
              return { ...item, matched: true };
            } else {
              return item;
            }
          });
        });
      }

      setTimeout(() => {
        setFruitOne(null);
        setFruitTwo(null);
      }, 500);
    }
  }, [fruitTwo, fruitOne]);

  return (
    <div >
                  <img className='books22' src="https://i.pinimg.com/originals/67/18/22/671822c2f63dd5f65d8fd15c9710420b.jpg" alt="books" style={{width:'100%',marginTop:'0%', marginRight:'50%', opacity: '0.5' }} />

    <div className="square-box3"></div>
    <div className="square-box4"></div> 
    <div className="square-box"></div>
    <div className="square-box2"></div>

    <NavScroll/>
    <p className='select' style={{marginTop:'6%'}}>Memory Game</p> 

    <div className='flipp'>
    
      <div className="game-block" >
        {fruits.map((fruit, key) => (
          <Card 
            key={key} 
            chooseCard={chooseCard}
            flipped={fruit === fruitOne || fruit === fruitTwo || fruit.matched}
            fruit={fruit} 
          />
        ))}
      </div>
      <button className='reset' onClick={resetGame}>
Reset Game
      </button>
      </div>
      
    </div>
  );
}

export default Flip;
