import React, { useState } from 'react';
import './Words.css';
import NavScroll from '../compunents/nav bar/nav';

const words = ['BOOK', 'READ', 'LIBRARY', 'AUTHOR', 'PAGES', 'NOVEL'];

const generateGrid = () => {
  const grid = Array(10).fill(null).map(() => Array(10).fill(''));

  const placeWord = (word) => {
    const directions = ['H', 'V'];
    const direction = directions[Math.floor(Math.random() * directions.length)];
    const startX = Math.floor(Math.random() * (10 - (direction === 'H' ? word.length : 0)));
    const startY = Math.floor(Math.random() * (10 - (direction === 'V' ? word.length : 0)));

    for (let i = 0; i < word.length; i++) {
      if (direction === 'H') grid[startY][startX + i] = word[i];
      if (direction === 'V') grid[startY + i][startX] = word[i];
    }
  };

  words.forEach(word => placeWord(word));

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (grid[i][j] === '') grid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    }
  }

  return grid;
};

const WordSearch = () => {
  const [grid, setGrid] = useState(generateGrid());
  const [foundWords, setFoundWords] = useState([]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [wrongSelections, setWrongSelections] = useState(0);
  const [highlightedCells, setHighlightedCells] = useState([]);

  const handleClick = (x, y) => {
    const newSelectedCells = [...selectedCells, { x, y }];
    setSelectedCells(newSelectedCells);

    const selectedWord = checkForWord(newSelectedCells);
    if (selectedWord) {
      if (!foundWords.includes(selectedWord)) {
        setFoundWords([...foundWords, selectedWord]);
        setHighlightedCells([...highlightedCells, ...newSelectedCells]);
        setSelectedCells([]);
      }
    } else {
      const newWrongSelections = wrongSelections + 1;
      setWrongSelections(newWrongSelections);

      if (newWrongSelections >= 7) {
        setSelectedCells([]);
        setWrongSelections(0);
      }
    }
  };

  const checkForWord = (cells) => {
    cells.sort((a, b) => a.y - b.y || a.x - b.x);
    const selectedLetters = cells.map(({ x, y }) => grid[y][x]).join('');
    return words.find(word => word === selectedLetters) || null;
  };

  const resetGame = () => {
    setGrid(generateGrid());
    setFoundWords([]);
    setSelectedCells([]);
    setWrongSelections(0);
    setHighlightedCells([]);
  };

  return (
    <>
    <NavScroll />
    <img className='books22' src="https://i.pinimg.com/originals/67/18/22/671822c2f63dd5f65d8fd15c9710420b.jpg" alt="books" style={{width:'100%',marginTop:'0%', marginRight:'50%', opacity: '0.5' }} />

        <div className="square-box3"></div>
        <div className="square-box4"></div> 
        <div className="square-box"></div>
        <div className="square-box2"></div>
        <p className='select' style={{ marginTop: '6%', display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
  Word Search Puzzle
</p>
 
    <div className="container">
    <div className="words-list">
        <h2>Words to Find:</h2>
        <ul>
          {words.map((word, index) => (
            <li key={index} className={foundWords.includes(word) ? 'found' : ''}>
              {word}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid">
        {grid.map((row, i) => (
          <div key={i} className="row">
            {row.map((cell, j) => (
              <div
                key={j}
                className={`cell ${selectedCells.some(({ x, y }) => x === j && y === i) ? 'selected' : ''} ${highlightedCells.some(({ x, y }) => x === j && y === i) ? 'found' : ''}`}
                onClick={() => handleClick(j, i)}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={resetGame} className="reset-button">Reset</button>
    </div></>
  );
};

export default WordSearch;
