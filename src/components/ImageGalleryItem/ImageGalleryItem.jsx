import { useUser } from '../customProviderComponent/customProviderComponent';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = () => {
  const { searchResults, handleImageClick } = useUser();

  if (!searchResults || searchResults.length === 0) {
    return null;
  }

  return searchResults.map(result => (
    <li key={result.id} className={css.item}>
      <img
        className={css.image}
        src={result.webformatURL}
        alt={result.tags}
        name={result.largeImageURL}
        onClick={handleImageClick}
      />
    </li>
  ));
};

ImageGalleryItem.propTypes = {
  results: PropTypes.array.isRequired,
  imageClick: PropTypes.func.isRequired,
};
