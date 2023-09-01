import { useRef, useState } from 'react';

import Card from './components/cards/cards';
import StatsModal from './components/StatsModal/StatsModal';

import './App.css';
import { Button } from '@mui/material';


function App() {

  const [switchMatch, setSwitchMatch] = useState([0, 0]);
  //  [0 --> wins, 0 --> loss] in a match where we switched

  const [noSwitchMatch, setNoSwitchMatch] = useState([0, 0]);
  //  [0 --> wins, 0 --> loss] in a match where we did not switch

  const N = 3;

  const [selectedOption, setSelectedOption] = useState(null);
  const [flipped, setFlipped] = useState([]);
  const [won, setWon] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);
  const winningCard = useRef(Math.floor(Math.random() * N));
  const prevSelection = useRef(-1);

  let arr = [...Array(N).keys()]

  const handleShow =(e)=>{
    console.log(selectedOption, prevSelection.current)

    if(winningCard.current === selectedOption){
      setWon(true);
    }else{
      setWon(false);
    }

    if(prevSelection.current === selectedOption){
      if(winningCard.current === selectedOption){
        setNoSwitchMatch(prev => [prev[0] + 1, prev[1]])
      }else{
        setNoSwitchMatch(prev => [prev[0], prev[1] + 1])
      }
    }else{
      if(winningCard.current === selectedOption){
        setSwitchMatch(prev => [prev[0] + 1, prev[1]])
      }else{
        setSwitchMatch(prev => [prev[0], prev[1] + 1])
      }
    }

    setFlipped([...Array(N).keys()]);
  }

  const handleReset =() =>{
    setSelectedCount(0);
    setFlipped([]);
    setWon(false);
    setSelectedOption(null);

    setTimeout(()=>{
      winningCard.current = Math.floor(Math.random() * N);
    }, 100);
  }

  return (
    <>
    <h1 className='title-center title'><b>Monty Hall Problem</b></h1>
    <div className='title-center'>
      <StatsModal
        switchMatch={switchMatch}
        noSwitchMatch={noSwitchMatch}
      />
    </div>
    <hr></hr>

    { flipped.length === 0?
      <h2 className='title-center hint'>Select a door to open</h2>:
      flipped.length < N ? 
      <h2 className='title-center hint'>Do you want to switch your decision?</h2>:
      won ? <h2 className='title-center hint'>You Won!</h2> :
      <h2 className='title-center hint'>You Lost!</h2>
    }

    <div className='flex-box'>
      {arr.map(c =>(
        <Card 
          key={c} 
          title={c} 
          object={c!==winningCard.current ? 'goat' : 'car'} 
          path={"./pictures/" + (c!==winningCard.current ? 'goat.jpg' : 'car.jpg')}
          heading={c!==winningCard.current ? 'You goat it!' : 'Car as pet Carpet?'}
          desc={c!==winningCard.current ? 'goat form the depths of hell. It has killed many, maybe you will survive?' : 'A toy car. Nothing special.'} 
          selected={selectedOption === c} 
          setSelectedOption={setSelectedOption} 
          flipped={flipped} 
          winningCard={winningCard}
          setFlipped={setFlipped}
          selectedCount={selectedCount}
          setSelectedCount={setSelectedCount}
          N={N}
          prevSelection={prevSelection}
        />
      ))
      }
    </div>
    <div className='title-center'>
      {selectedOption !== null && flipped.length !== N?
          <Button variant="contained" onClick={handleShow} id='show-result'>
            Show Result
          </Button>
      : 
      flipped.length === N ?
      <Button variant="contained" onClick={handleReset} id='reset'>
        Reset
      </Button>:
      ''
      }

    </div>
    </>
  );
}

export default App;
