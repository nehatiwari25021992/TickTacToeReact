import React, { Component } from 'react';
import './App.css';

class App extends Component {

constructor(){
  super()
  this.state = {
    boardX : [
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ],
    boardO : [
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ],
    game : [
      ['','',''],
      ['','',''],
      ['','','']
    ],
    winner : "",
    isWinnerFound : false
  }
}

updateScore = (r,c,e) => {
  console.log("r ",r)
  console.log("c ",c)
  console.log("e.target.value ",e.target.value)
  const newState = Object.assign({},this.state)
  newState.game[r][c]=e.target.value
   
  if(e.target.value === "o"){
    newState.boardO[r][c]=1
  }else{
    newState.boardX[r][c]=1
  }
  this.setState(newState)
  this.checkForWinner()
}


checkForWinner = () => {
  const newState = Object.assign({},this.state)
  console.log("newSate ",newState)
  if(!this.checkForRow(newState,newState.boardX,"X")){
    if(!this.checkForRow(newState,newState.boardO,"O")){
      if(!this.checkForCol(newState,newState.boardX,"X")){
        if(!this.checkForCol(newState,newState.boardO,"O")){
          if(!this.checkForDig(newState,newState.boardX,"X")){
            if(!this.checkForDig(newState,newState.boardO,"O")){
            }
          }
        }
      }
    }
  }
}

checkForDig = (newState,board,w) => {
  const x = board
  let sum = 0
  let sum2 = 0
  let l = x[0].length
  x.map((s,index) => {   
    l = l-1
      sum = sum + x[index][index]
      sum2 = sum2 + x[index][l]
    })

    if(sum === 3){
      newState.isWinnerFound = true
      newState.winner = w
      this.setState(newState)
      return true;
    }

    if(sum2 === 3){
      newState.isWinnerFound = true
      newState.winner = w
      this.setState(newState)
      return true;
    }
 
  return false;
}

checkForCol = (newState,board,w) => {
  const x = board
  x.map((s,index) => {
    let sum = 0
    x[index].map((c,k) => {
      sum = sum + x[k][index]
    })
    if(sum === 3){
      newState.isWinnerFound = true
      newState.winner = w
      this.setState(newState)
      return true;
    }
  })
  return false;
}


checkForRow = (newState,board,w) => {
  const x = board
  x.map((s,index) => {
    let sum = 0
    x[index].map((c,k) => {
      sum = sum + x[index][k]
    })
    if(sum === 3){
      newState.isWinnerFound = true
      newState.winner = w
      this.setState(newState)
      return true;
    }
  })
  return false;
}



render() {
    return (
      <div className="App">
          <h1>TICK TAC TOE</h1>
          {
            (() => {
              if(this.state.isWinnerFound){
               return (<h2>WINNER IS -- {this.state.winner}</h2>)
              }
            })()
          }
          <table><tbody>
            {
              this.state.game.map((row,indexR) => {
               return (<tr>
                    {
                      this.state.game[indexR].map((col,indexC) => {
                        return (
                          <td>
                            {
                              (() =>{
                                if(this.state.game[indexR][indexC] == 0){
                                  return (
                                    <input type="text" value={this.state.game[indexR][indexC]} onChange={this.updateScore.bind(this,indexR,indexC)}/>
                                  )
                                }else{
                                  return (<div>{this.state.game[indexR][indexC]}</div>)
                                }
                              })()
                            }
                          </td>
                        )
                      })
                    }
                </tr>)
              })
            }
            </tbody>
          </table>
      </div>
    );
  }
}

export default App;
