import { useUser } from '../customProviderComponent/customProviderComponent';
import css from './Modal.module.css';
import svg from './icons.svg';
import PropTypes from 'prop-types';


export const Modal = () => {
  const { fullImage, imageAlt, handleClose } = useUser();

  return (
    <>
      {fullImage !== undefined && (
        <div className={css.overlay}>
          <button className={css.closeModal} onClick={handleClose}>
            <svg width="20px" height="20px" className={css.modalIcon}>
              <use href={`${svg}#icon-close`}></use>
            </svg>
          </button>
          <div className={css.modal}>
            <img className={css.modalImage} src={fullImage} alt={imageAlt} />
          </div>
        </div>
      )}
    </>
  );
};

Modal.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  altSrc: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};
