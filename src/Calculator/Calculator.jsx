import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('');
  const [operator, setOperator] = useState(null);
  const [operand, setOperand] = useState(null);

  const handleClick = (value) => {
    if (!isNaN(value) || value === '.') {
      if (display.length < 9) {
        setDisplay((prev) => (prev + value).slice(0, 9));
      }
    } else if (['+', '-', 'x', '÷'].includes(value)) {
      if (operand !== null) {
        const result = calculateResult();
        if (isError(result)) {
          setDisplay('ERROR');
          setOperand(null);
          setOperator(null);
        } else {
          setDisplay(result);
          setOperand(result);
          setOperator(value);
        }
      } else {
        setOperand(display);
        setOperator(value);
        setDisplay('');
      }
    } else if (value === '=') {
      const result = calculateResult();
      if (isError(result)) {
        setDisplay('ERROR');
      } else {
        setDisplay(result);
      }
      setOperand(null);
      setOperator(null);
    } else if (value === 'C') {
      setDisplay('');
      setOperator(null);
      setOperand(null);
    } else if (value === 'Backspace') {
      setDisplay(display.slice(0, -1));
    }
  };

  const calculateResult = () => {
    const num1 = parseFloat(operand);
    const num2 = parseFloat(display);
    let result;

    switch (operator) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case 'x':
        result = num1 * num2;
        break;
      case '÷':
        result = num2 !== 0 ? num1 / num2 : 'ERROR';
        break;
      default:
        result = display;
        break;
    }

    return result.toString().slice(0, 9);
  };

  const isError = (result) => {
    return result < 0 || result > 999999999 || result === 'ERROR';
  };

  return (
    <div className="calculator">
      <div className="calculator__screen">
        <h5 className="calculator__result" data-testid="display">{display}</h5>
      </div>
      <div className="calculator__buttons">
        {['C', '÷', 'x', 'Backspace', '7', '8', '9', '-', '4', '5', '6', '+', '1', '2', '3', '=', '0', '.'].map((button) => (
          <button
            key={button}
            onClick={() => handleClick(button === 'Backspace' ? 'Backspace' : button)}
            className={`btn ${button === '=' ? 'equal' : button === 'C' || button === '÷' || button === 'x' || button === '-' || button === '+' ? 'highlight' : ''}`}
          >
            {button === 'Backspace' ? (
              <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M6.141 1.2L1.67588 6L6.141 10.8H18.75V1.2H6.141ZM5.5814 12L0 6L5.5814 0H20V12H5.5814Z" fill="#6B8AFA"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M9.17574 3.17574C9.41005 2.94142 9.78995 2.94142 10.0243 3.17574L14.8243 7.97574C15.0586 8.21005 15.0586 8.58995 14.8243 8.82426C14.5899 9.05858 14.2101 9.05858 13.9757 8.82426L9.17574 4.02426C8.94142 3.78995 8.94142 3.41005 9.17574 3.17574Z" fill="#6B8AFA"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M14.8243 3.17574C14.5899 2.94142 14.2101 2.94142 13.9757 3.17574L9.17574 7.97574C8.94142 8.21005 8.94142 8.58995 9.17574 8.82426C9.41005 9.05858 9.78995 9.05858 10.0243 8.82426L14.8243 4.02426C15.0586 3.78995 15.0586 3.41005 14.8243 3.17574Z" fill="#6B8AFA"/>
              </svg>
            ) : button}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
