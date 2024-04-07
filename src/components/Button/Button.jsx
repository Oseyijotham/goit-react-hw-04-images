import { useUser } from '../customProviderComponent/customProviderComponent';
import css from './Button.module.css';
import PropTypes from 'prop-types';


export const Button = () => {
  const { searchResults, didUserSearch, handleButtonPress, fewResponse } = useUser();

  return (
    <div>
      {searchResults.length !== 0 && didUserSearch && !fewResponse ? (
        <button onClick={handleButtonPress} className={css.loadBtn}>
          Load More
        </button>
      ) : null}
    </div>
  );
};

Button.propTypes = {
  results: PropTypes.array.isRequired,
  onPress: PropTypes.func.isRequired,
  ifUserSearched: PropTypes.bool.isRequired,
  iflessResponse: PropTypes.bool.isRequired,
};
