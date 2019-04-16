import React, { Component } from 'react';



class Section extends Component {

  render() {
    const {content}=this.props
    
    const {display = 'none'}=this.props
    return (
      <h2 style={{display:display}}>{content}</h2>
    );
  }
}

export default Section;
