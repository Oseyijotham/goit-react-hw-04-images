import { useUser } from '../customProviderComponent/customProviderComponent';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';


export const SearchBar = () => {
  const { handleSubmit } = useUser();

  return (
    <header className={css.searchBar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit" className={css.button}>
          <span className={css.buttonLabel}>Search</span>
        </button>
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onCompletion: PropTypes.func.isRequired,
};
