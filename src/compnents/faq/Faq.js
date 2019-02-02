import React from 'react';

import './Faq.css'

export default class Faq extends React.Component {
  constructor() {
    super();
    this.state = {
      showAnswer:true
    }
  }

  hrGenerator() {
    return this.props.index !== this.props.faqLength-1 ? <div className="hr"></div> : null;
  }

  answerDivGenerator() {
    if (!this.state.showAnswer) {
      return <div className="answer">{this.props.qAndA.a}</div>
    }
  }

  plusMinusIcon() {
    return this.state.showAnswer ? <i  className="fa fa-plus" aria-hidden="true"></i> : <i className="fa fa-minus" aria-hidden="true"></i>
  }

  render() {
    return <div className="faq">
      <div onClick={()=> this.setState({showAnswer: !this.state.showAnswer})} className="faq-header">
        <h4>{this.props.qAndA.q}</h4>
        {this.plusMinusIcon()}
      </div>
      {this.hrGenerator()}
      {this.answerDivGenerator()}

    </div>
  }
}