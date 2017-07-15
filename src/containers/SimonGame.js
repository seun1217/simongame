import React, { Component } from 'react';
import Button from '../components/Button';

const sound1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'); 
const sound2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'); 
const sound3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'); 
const sound4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'); 
const soundBoard = [sound1, sound2, sound3, sound4];

export default class Scoreboard extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      userAttempt: [],
      sequence: [],
      isStrictMode: false
    };
  }

  componentWillMount() {
    this.setState({
      sequence: [this.getRandomInt()]
    });
  }

  componentDidMount() {
    this.start();
  }

  getRandomInt = () => Math.floor(Math.random() * 4) 

  register = (btn) => {
    this.setState({
      userAttempt: [...this.state.userAttempt, btn]
    });
    const currentIndex = this.state.userAttempt.length;
    console.log('currentIndex', currentIndex);
    console.log('sequence[currentIndex]', this.state.sequence[currentIndex]);
    console.log('btn', btn);
    if (parseInt(btn, 10) !== parseInt(this.state.sequence[currentIndex], 10)) {
     alert('you got it wrong. try again.');
     this.setState({
       userAttempt: []
     });
     if (this.state.isStrictMode) {
     alert('you got it wrong in the strict mode. The game restarts with a random series of buttons presses.');
      this.setState({
        sequence: [this.getRandomInt()]
      });
     }
     setTimeout(() => this.start(), 1000);
    } else if (currentIndex === this.state.sequence.length - 1) { 
      if (currentIndex === 19) {
        alert('You have won!');
        this.restart();
      } else {
        this.setState({
          userAttempt: [],
          sequence: [...this.state.sequence, this.getRandomInt()]
        });
        setTimeout(() => this.start(), 1000);
      }
    }
  }

  flash = (btn) => {
    const toAnimate = $('#btn' + btn);

    toAnimate.addClass('anim');

    soundBoard[btn].playbackRate = 0.7;
    soundBoard[btn].play();

    setTimeout(() => {
      toAnimate.removeClass('anim');
    }, 500);
  }


  start = () => {
    let i = 0;
    const currentSeq = this.state.sequence;
    const interval = setInterval(() => {
      this.flash(currentSeq[i]);
      i += 1;
      if (i >= currentSeq.length) {
        clearInterval(interval);
      }
    }, 1200);
    console.log(this.state.sequence);
  }

  addSequence = () => {
    this.setState({
      sequence: [...this.state.sequence, this.getRandomInt()]
    });
  }

  toggleStrictMode = () => {
    this.setState({
      isStrictMode: !this.state.isStrictMode
    });
    if (!this.state.isStrictMode) {
      $('#strict').addClass('strictOn');
    } else {
      $('#strict').removeClass('strictOn');
    }
    console.log('strictMode: ', this.state.isStrictMode);
  }

  restart = () => {
    this.setState({
      userAttempt: [],
      sequence: [this.getRandomInt()]
    });
    setTimeout(this.start(), 500);
  }
  
  render() {
    return (
      <div className="flex-container">
        <Button 
          id="btn0" 
          className="color" 
          bgColor="red" 
          flash={this.flash} 
          register={this.register} 
        />
        <Button 
          id="btn1" 
          className="color" 
          bgColor="blue" 
          flash={this.flash} 
          register={this.register} 
        />
        <Button 
          id="btn2" 
          className="color" 
          bgColor="orange" 
          flash={this.flash} 
          register={this.register} 
        />
        <Button 
          id="btn3" 
          className="color" 
          bgColor="green" 
          flash={this.flash} 
          register={this.register} 
        />
        <div className="center-panel">
          <h1> Simon Game </h1>
          <span id="count" className="count">count:{this.state.sequence.length}</span>
          <Button id="restart" className="restart" text="restart" restart={this.restart} />
          <Button id="strict" className="strict" text="strict" toggle={this.toggleStrictMode} />
        </div>
      </div>
    );
  }
}
