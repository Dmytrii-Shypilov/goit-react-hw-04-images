import { useState } from 'react';
import PropTypes from 'prop-types';

import s from './search-bar.module.css';

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const getSearchQuery = e => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  const getSubmit = e => {
    e.preventDefault();
    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={s.searchbar}>
      <form className={s.form} onSubmit={getSubmit}>
        <input
          onChange={getSearchQuery}
          className={s.input}
          type="text"
          value={query}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit" className={s.button}>
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
