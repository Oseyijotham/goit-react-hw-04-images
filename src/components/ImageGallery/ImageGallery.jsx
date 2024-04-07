import { useUser } from '../customProviderComponent/customProviderComponent';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';


export const ImageGallery = ({children}) => {
  const { searchResults, isLoading } = useUser();

  return (
    <>
      {searchResults.length !== 0   ? (
        <ul className={css.gallery}>{children}</ul>
      ) : (isLoading === false && 
          (
        <div className={css.message}>
          <p className={css.messageItem}>No Pictures</p>
          </div>
        )
      )}
    </>
  );
};

ImageGallery.propTypes = {
  children: PropTypes.node.isRequired,
  gallery: PropTypes.array.isRequired,
};
