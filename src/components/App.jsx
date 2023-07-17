import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';



export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const newContact = {
      name: this.state.name,
      number: this.state.number,
      id: nanoid(),
    };
    if (this.state.contacts.find(contact => contact.name === newContact.name)) {
      alert(`${this.state.name} is already in contacts`);
      return;
    }
    this.setState({ contacts: [...this.state.contacts, newContact] });
    e.target.reset();
  };

  handleRemoveContact = id => {
    const filteredContacts = this.state.contacts.filter(
      contact => contact.id !== id
    );
    this.setState({ contacts: filteredContacts });
  };

  componentDidMount() {
    if (JSON.parse(localStorage.getItem('phonebook') === null)) {
      localStorage.setItem('phonebook', JSON.stringify([]));
    }
    this.setState({
      contacts: JSON.parse(localStorage.getItem('phonebook')),
    });
  }

  componentDidUpdate() {
    localStorage.setItem('phonebook', JSON.stringify(this.state.contacts));
  }

  render() {
    const { contacts } = this.state;

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
        />
        <h2>Contacts</h2>
        <Filter onChange={this.handleChange} />
        <ContactList
          contacts={contacts}
          filter={this.state.filter}
          onRemoveContact={this.handleRemoveContact}
        />
      </div>
    );
  }
}
