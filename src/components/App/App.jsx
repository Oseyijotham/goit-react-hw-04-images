
import { useUser } from '../customProviderComponent/customProviderComponent';
import { useEffect } from 'react';
import { SearchBar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';


export const App = () => {
  const { initialApiCall } = useUser();

  useEffect(() => {
     initialApiCall()
     // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

  return (
    <div>
      <SearchBar/>
      <ImageGallery>
        <ImageGalleryItem/>
      </ImageGallery>
      <Loader/>
      <Modal/>
      <Button/>
    </div>
  );
};