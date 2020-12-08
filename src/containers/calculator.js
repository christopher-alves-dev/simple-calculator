import { Component } from 'react';
import Display from '../components/display';
import { Button } from '../components/button';

class Calculator extends Component {
  initialState = {firstValue: 0, secondValue: 0, operator: 1, isSum: false, isSubtraction: false, isMultiply: false, isDivision: false}

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  putValue = (value) => {
    const { firstValue, secondValue, operator } = this.state;

    const lastValue = operator === 1 ? firstValue : secondValue;
    switch (operator) {
      case 1:
        this.setState({firstValue:(lastValue * 10) + value});
        break;
      case 2:
        this.setState({secondValue:(lastValue * 10) + value});
        break;
    }
  }

  getValue = () => {
    const { firstValue, secondValue, operator, isSum, isSubtraction, isMultiply, isDivision } = this.state

    switch (operator) {
      case 1: return firstValue;
      case 2: return secondValue;
      case 3: if (isSum) {
          return firstValue + secondValue;
        } else if (isSubtraction) {
          return firstValue - secondValue;
        } else if (isMultiply) {
          return firstValue * secondValue;
        } else if ((isDivision) && secondValue !== 0) {
          return firstValue / secondValue;
        } else {
          return this.displayError('rgb(228, 93, 93)', '#000')
        }
      // return isSum ? firstValue + secondValue : firstValue - secondValue;
    }
  }

  displayError(bgColor, fontColor) {
    const display = document.querySelector('.display');
    display.classList.add('errorDivisor')
    return 'Error: Divisor = 0'
  }

  pickOperation = (isSum, isSubtraction, isMultiply, isDivision) => {
    this.setState({ operator: 2, isSum, isSubtraction, isMultiply, isDivision });
  }

  execOperation = () => {
    this.setState({ operator: 3 });
  }

  clear = () => {
    const display = document.querySelector('.display');
    display.classList.remove('errorDivisor');
    this.setState(this.initialState);
  }

  render() {
    const { operator } = this.state;

    return (
      <div className={"calculator"}>
        <Display value={this.getValue()}/>
        
        <div className={"containerButtons"}>
          <div className={"numbersButtons"}>
            <Button display={"1"} onClick={() => this.putValue(1)} disabled={operator === 3}/>
            <Button display={"2"} onClick={() => this.putValue(2)} disabled={operator === 3}/>
            <Button display={"3"} onClick={() => this.putValue(3)} disabled={operator === 3}/>
            <Button display={"4"} onClick={() => this.putValue(4)} disabled={operator === 3}/>
            <Button display={"5"} onClick={() => this.putValue(5)} disabled={operator === 3}/>
            <Button display={"6"} onClick={() => this.putValue(6)} disabled={operator === 3}/>
            <Button display={"7"} onClick={() => this.putValue(7)} disabled={operator === 3}/>
            <Button display={"8"} onClick={() => this.putValue(8)} disabled={operator === 3}/>
            <Button display={"9"} onClick={() => this.putValue(9)} disabled={operator === 3}/>
            <Button display={"0"} onClick={() => this.putValue(0)} disabled={operator === 3}/>
            <Button display={"="} onClick={() => this.execOperation()} disabled={operator === 1}/>
            <Button display={"C"} onClick={() => this.clear()}/>
          </div>
          
          <div className={"operatorsButtons"}>
            <Button display={"/"} onClick={() => this.pickOperation(false, false, false, true)} disabled={operator !== 1}/>
            <Button display={"*"} onClick={() => this.pickOperation(false, false, true, false)} disabled={operator !== 1}/>
            <Button display={"+"} onClick={() => this.pickOperation(true, false, false, false)} disabled={operator !== 1}/>
            <Button display={"-"} onClick={() => this.pickOperation(false, true, false, false)} disabled={operator !== 1}/>
          </div>

        </div>

      </div>
    )
  }
}

export default Calculator;