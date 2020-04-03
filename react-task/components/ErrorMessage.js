import React, { Component } from 'react';


const ErrorContainer = {
  width: '100%',
  padding: '8px 16px',
  backgroundColor: '#f7c5c0',
  color: '#a51809',
  boxSizing: 'border-box',
  marginBottom: '10px'
};


export default class ErrorMessage extends Component {
  renderMessageArray = errors => {
    const constraints = errors.map(error =>
      Object.values(error.constraints))
      .flat()
      .map((constraint, idx) => <li key={idx}>{constraint}</li>);

    return <ul>{constraints}</ul>;
  };

  render() {
    const { message } = this.props;

    return (
      <div style={ErrorContainer}>
        <h1>Oops!</h1>
        {Array.isArray(message) ? this.renderMessageArray(message) : <p>{message}</p>}
      </div>
    );
  }
}
