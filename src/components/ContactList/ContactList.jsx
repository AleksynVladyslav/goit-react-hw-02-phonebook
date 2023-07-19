import React from 'react';
import propTypes from 'prop-types';
import css from './ContactList.module.css';

const ContactList = ({ contacts, deleteContacts }) => {
  return (
    <ul>
      {contacts.map(contact => (
        <li key={contact.id}>
          <span>{contact.name}:</span> <span>{contact.number}</span>{' '}
          <button
            className={css.button}
            type="button"
            onClick={() => deleteContacts(contact.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  deleteContacts: propTypes.func.isRequired,
  contacts: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string.isRequired,
      name: propTypes.string.isRequired,
      number: propTypes.string.isRequired,
    })
  ).isRequired,
};

export default ContactList;
