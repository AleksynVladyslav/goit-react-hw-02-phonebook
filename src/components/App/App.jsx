import React, { Component } from 'react';
import shortid from 'shortid';
import css from './App.module.css';
import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import ContactList from 'components/ContactList/ContactList';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount(nextProps, prevState) {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  onFilterChange = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  addContact = (name, number) => {
    const { contacts } = this.state;
    if (contacts.some(contact => contact.name === name)) {
      return alert(`${name} is already in contacts`);
    }

    const newContact = {
      id: shortid.generate(),
      name: name.trim(),
      number: number,
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  filterAddContacts = () => {
    const { contacts, filter } = this.state;

    const normalizedFilter = filter.toLowerCase();
    const visibleContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );

    return visibleContacts;
  };

  render() {
    return (
      <div className={css.wrapper}>
        <h1 className={css.title}>Phonebook</h1>

        <ContactForm contacts={this.contacts} addContact={this.addContact} />
        <h2 className={css.title}>Contacts</h2>
        <Filter onFilterChange={this.onFilterChange} />
        <ContactList
          contacts={this.filterAddContacts()}
          deleteContacts={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
