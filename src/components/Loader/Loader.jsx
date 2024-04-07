import { useUser } from '../customProviderComponent/customProviderComponent';
import { ThreeCircles } from 'react-loader-spinner';
import css from './Loader.module.css';
import PropTypes from 'prop-types';

export const Loader = () => {
  const { isLoading } = useUser();

  return (
    <>
      {isLoading && (
        <div className={css.backDrop}>
          <ThreeCircles
            visible={true}
            height="80"
            width="80"
            color="rgb(209, 209, 209)"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass={css.loader}
          />
        </div>
      )}
    </>
  );
};

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
