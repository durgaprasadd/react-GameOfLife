import React, { Component } from 'react';
import updateGrid from './lib.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.height = 10;
    this.width = 10;
    this.state = { grid: this.initCells(this.height, this.width) }
    this.timer = '';
    this.canClick = true;
  }

  initCells(height, width) {
    let cells = new Array(height).fill(width);
    return cells.map(x => new Array(x).fill(0));
  }

  createCell(cell, rowIndex, cellIndex) {
    const id = rowIndex * this.height + cellIndex;
    let _className = null;
    if (cell) _className = "filled";
    return <td id={id} className={_className}></td>
  }

  createRow(row, rowIndex) {
    return <tr>{row.map((cell, cellIndex) => this.createCell(cell, rowIndex, cellIndex))}</tr>
  }


  handleClick(event) {
    let id = event.target.id;
    if (!id) return;
    id = +id;
    this.setState(state => {
      let { grid } = state;
      const rowIndex = Math.floor(id / this.height);
      const cellIndex = id - rowIndex * this.height;
      grid[rowIndex][cellIndex] = 1 - grid[rowIndex][cellIndex];
      return { grid };
    })
  }

  isAllDead() {
    let { grid } = this.state;
    return grid.every(row => row.every(cell => cell === 0));
  }

  start() {
    if (this.timer) return;
    this.canClick = false;
    this.timer = setInterval(() => {
      if (this.isAllDead()) return this.stop();
      this.setState(state => {
        let { grid } = state;
        grid = updateGrid(grid);
        return { grid };
      })
    }, 1000)
  }

  stop() {
    this.stopInterval();
    this.setState(state => state);
    this.timer = '';
  }

  stopInterval() {
    this.canClick = true;
    clearInterval(this.timer)
  }

  reset() {
    this.stopInterval()
    this.setState(state => {
      state.grid = this.initCells(this.height, this.width);
      return state;
    })
  }
  printBoard(grid) {
    let clickHandler = '';
    if (this.canClick) clickHandler = this.handleClick.bind(this);
    return <div className="main">
      <h1>Game Of Life</h1>
      <table onClick={clickHandler}>
        <tbody>{grid.map((row, rowIndex) => this.createRow(row, rowIndex))}</tbody>
      </table>
      <div className="buttonDiv">
        <button onClick={this.start.bind(this)}>Start</button>
        <button onClick={this.stop.bind(this)}>Stop</button>
        <button onClick={this.reset.bind(this)}>Reset</button>
      </div>
    </div>;
  }

  render() {
    return this.printBoard(this.state.grid);
  }
}

export default App;
