import React, { useState } from 'react';
import css from './Searchbar.module.css';
import SearchIcon from '@mui/icons-material/Search';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleOnChange = e => {
    setQuery(e.currentTarget.value.trim().toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (query === '') {
      return toast.error('Please, enter a query and try again');
    }

    onSubmit(query);
    setQuery('');
    e.target.reset();
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <input
          onChange={handleOnChange}
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
        />
        <button
          type="submit"
          className={css.SearchFormButton}
          aria-label="Search"
        >
          <SearchIcon />
        </button>
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
