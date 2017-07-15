import React, { Component } from 'react';
import { render } from 'react-dom';

export default class Button extends Component {

  onClick = () => {
    if (this.props.register) { this.props.register(this.props.id.slice(3)); }
    if (this.props.flash) { this.props.flash(this.props.id.slice(3)); }
    if (this.props.toggle) { this.props.toggle(); }
    if (this.props.restart) { this.props.restart(); }
  }

  render() {
    return (
        <div 
          onClick={this.onClick}
          className={this.props.className}
          id={this.props.id} 
          style={{ backgroundColor: this.props.bgColor }}
        >{this.props.text}</div>
    );
  }
}
