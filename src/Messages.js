import React, { Component } from 'react';
import db from './firebase.js';

class Messages extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      messageIn: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // when the component mounts...
  componentDidMount() {
    let comp = this;
    // listen for any changes to the 'messages' collection...
    db.collection('messages').onSnapshot(snapshot => 
      // and set the state messages array to the messages in the collection
      comp.setState({
        messages: snapshot.docs.map(doc => ({id: doc.id, text: doc.data().text}))
      })
    );
  }

  handleChange(e) {
    this.setState({
      messageIn: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let text = this.state.messageIn;
    this.setState({messageIn: ''});
    db.collection('messages').add({text})
      .then(() => console.log('added new document:', {text}))
      .catch(error => console.log('error adding document:', error));
  }

  handleDelete(e) {
    let messageId = e.target.dataset.id;
    db.collection('messages').doc(messageId).delete()
      .then(() => console.log('message deleted:', messageId));
  }
  
  render() {
    let messages = this.state.messages.map(message => <li key={message.id}>message: {message.text} <button data-id={message.id} onClick={this.handleDelete}>Delete</button></li>);
    return (
      <div>
        Hello World
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="messageIn" placeholder="message" 
            onChange={this.handleChange}
            value={this.state.messageIn} />
          <button>Add Message</button>
        </form>
        <ul>
          {messages}
        </ul>
      </div>
    );
  }
}

export default Messages;
