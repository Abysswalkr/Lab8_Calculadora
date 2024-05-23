import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const handleNumberClick = (value) => {
    if (display.length >= 9 && !waitingForNewValue) return;
    if (waitingForNewValue) {
      setDisplay(value);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? value : display + value);
    }
  };

  const handleOperationClick = (value) => {
    if (operation && !waitingForNewValue) {
      const result = calculate(prevValue, display, operation);
      setDisplay(result);
      setPrevValue(result);
    } else {
      setPrevValue(display);
    }
    setOperation(value);
    setWaitingForNewValue(true);
  };

  const handleEqualsClick = () => {
    if (operation) {
      const result = calculate(prevValue, display, operation);
      setDisplay(result);
      setPrevValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const handleClearClick = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const handleDecimalClick = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const calculate = (prev, current, operation) => {
    const prevNum = parseFloat(prev);
    const currentNum = parseFloat(current);

    let result = 0;
    if (operation === '+') {
      result = prevNum + currentNum;
    } else if (operation === '-') {
      result = prevNum - currentNum;
    } else if (operation === 'x') {
      result = prevNum * currentNum;
    } else if (operation === '÷') {
      if (currentNum === 0) return 'ERROR';
      result = prevNum / currentNum;
    }

    if (result > 999999999) return 'ERROR';
    if (result < 0) return 'ERROR';

    return String(result).slice(0, 9);
  };

  return (
    <div className="calculator">
      <div className="calculator__screen">
        <h5 className="calculator__result" data-testid="display">{display}</h5>
      </div>
      <div className="calculator__buttons">
        <button className="btn highlight" onClick={handleClearClick}>C</button>
        <button className="btn highlight" onClick={() => handleOperationClick('÷')}>÷</button>
        <button className="btn highlight" onClick={() => handleOperationClick('x')}>x</button>
        <button className="btn" onClick={() => handleNumberClick('9')}>
          <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M6.141 1.2L1.67588 6L6.141 10.8H18.75V1.2H6.141ZM5.5814 12L0 6L5.5814 0H20V12H5.5814Z" fill="#6B8AFA"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M9.17574 3.17574C9.41005 2.94142 9.78995 2.94142 10.0243 3.17574L14.8243 7.97574C15.0586 8.21005 15.0586 8.58995 14.8243 8.82426C14.5899 9.05858 14.2101 9.05858 13.9757 8.82426L9.17574 4.02426C8.94142 3.78995 8.94142 3.41005 9.17574 3.17574Z" fill="#6B8AFA"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M14.8243 3.17574C14.5899 2.94142 14.2101 2.94142 13.9757 3.17574L9.17574 7.97574C8.94142 8.21005 8.94142 8.58995 9.17574 8.82426C9.41005 9.05858 9.78995 9.05858 10.0243 8.82426L14.8243 4.02426C15.0586 3.78995 15.0586 3.41005 14.8243 3.17574Z" fill="#6B8AFA"/>
          </svg>
        </button>
        <button className="btn" onClick={() => handleNumberClick('7')}>7</button>
        <button className="btn" onClick={() => handleNumberClick('8')}>8</button>
        <button className="btn" onClick={() => handleNumberClick('9')}>9</button>
        <button className="btn highlight" onClick={() => handleOperationClick('-')}>-</button>
        <button className="btn" onClick={() => handleNumberClick('4')}>4</button>
        <button className="btn" onClick={() => handleNumberClick('5')}>5</button>
        <button className="btn" onClick={() => handleNumberClick('6')}>6</button>
        <button className="btn highlight" onClick={() => handleOperationClick('+')}>+</button>
        <button className="btn" onClick={() => handleNumberClick('1')}>1</button>
        <button className="btn" onClick={() => handleNumberClick('2')}>2</button>
        <button className="btn" onClick={() => handleNumberClick('3')}>3</button>
        <button className="btn equal" onClick={handleEqualsClick}>=</button>
        <button className="btn" onClick={() => handleNumberClick('0')}>0</button>
        <button className="btn" onClick={handleDecimalClick}>.</button>
      </div>
    </div>
  );
};

export default Calculator;
