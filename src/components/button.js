import React, { Component } from 'react';

export class Button extends Component {


  handleClick() {
    const { onClick, disabled} = this.props

    if ((onClick) && (!disabled))
      onClick();
  }

  render() {
    const pickCssBtnClass = this.props.disabled ? "button disabled" : "button";

    return (
      <div className={pickCssBtnClass} onClick={this.handleClick.bind(this)}>
        {this.props.display}
      </div>
    )
  }
}
