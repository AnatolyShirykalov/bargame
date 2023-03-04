import React from 'react';
import './game.css';
import { generateValidMatrix } from './matrix';

class Game extends React.Component {
  state = {
    bars: [],
    matrix: [],
    barCount: 10,
    isWinning: false,
  }
  componentDidMount() {
    this.initBars();
  }
  initBars() {
    const bars = [];
    for (let i = 0; i < this.state.barCount; i++) {
      bars.push({
        id: i,
        value: Math.floor(Math.random() * 100),
      })
    }
    const matrix = generateValidMatrix(this.state.barCount);
    this.setState({ bars, matrix, isWinning: false, isLoosing: false });
  }

  renderHeader() {
    return (
      <div className="game-header">
        <input className="game-header__input" type="number" value={this.state.barCount} onChange={(e) => this.setState({ barCount: e.target.value })} />
        <button className="game-header__button" onClick={() => this.initBars()}>Generate</button>
      </div>
    )
  }

  onIncrement(id) {
    const bars = this.state.bars.map(bar => {
      if (bar.id === id) {
        return {...bar, value: bar.value + 1}
      } else {
        const delta = this.state.matrix[id][bar.id];
        return {...bar, value: bar.value + delta}
      }
    })
    this.setState({ bars, isWinning: this.isWinning(bars), isLoosing: this.isLoosing(bars) });
  }

  onDecrement(id) {
    const bars = this.state.bars.map(bar => {
      if (bar.id === id) {
        return {...bar, value: bar.value - 1}
      } else {
        const delta = this.state.matrix[id][bar.id];
        return {...bar, value: bar.value - delta}
      }
    })
    this.setState({ bars, isWinning: this.isWinning(bars), isLoosing: this.isLoosing(bars) });
  }

  isWinning(bars) {
    if (bars.length === 0) {
      return false;
    }
    const firstHeight = bars[0].value;
    const allEqual = bars.every(bar => Math.abs(bar.value - firstHeight) < 2);
    return allEqual;
  }

  isLoosing(bars) {
    if (bars.length === 0) {
      return false;
    }
    const anyNonPositive = bars.some(bar => bar.value <= 0);
    const anyMoreOrEqualToHundred = bars.some(bar => bar.value >= 100);
    return anyNonPositive || anyMoreOrEqualToHundred;
  }

  renderWinningText() {
    if (this.state.isWinning) {
      return (
        <div className="game-winner">
          <div className="game-winner__text">You won!</div>
        </div>
      )
    }
  }

  renderLoosingText() {
    if (this.state.isLoosing) {
      return (
        <div className="game-looser-popup">
          <div className="game-looser__text">Wasted!</div>
          <button className="game-looser__button" onClick={() => this.initBars()}>Try again</button>
        </div>
      )
    }
  }

  isDisabled() {
    return this.state.isWinning || this.state.isLoosing;
  }

  render() {

    return (
      <div>
        <div className="game-board">
          {this.renderHeader()}
          {this.renderWinningText()}
          {this.renderLoosingText()}
          <div className="game-bars">
            {this.state.bars.map(bar => (
              <div className="game-bar-container" key={bar.id}>
                <div className="game-bar__item" key={bar.id} style={{ height: `${bar.value * 3}px` }}></div>
                <div className="game-bar__buttons">
                  <button className="game-bar__button" disabled={this.isDisabled()} onClick={() => this.onIncrement(bar.id)}>+</button>
                  <button className="game-bar__button" disabled={this.isDisabled()} onClick={() => this.onDecrement(bar.id)}>-</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default Game;
