import { createContext, useContext, useState } from 'react';
import { startSrch } from '../API/api';
import { loadSrch } from '../API/api';
import Notiflix from 'notiflix';
import { useMemo } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [searchResults, getResults] = useState([]);
  const [isLoading, setLoadingStatus] = useState();
  const [fewResponse, setResponseStatus] = useState();
  const [searchTerm, setSearchTerm] = useState();
  const [pageItems, setPageItems] = useState();
  const [pageNums, setPageNums] = useState();
  const [didUserSearch, setSearchStatus] = useState();
  const [resultsAmount, setResultsAmount] = useState();
  const [fullImage, setFullImage] = useState();
  const [imageAlt, setImageAlt] = useState();
  const [initalSearchTerm, setInitalSearchTerm] = useState(
    'Artificial Intelligence'
  );

  const memoizedResponse = useMemo(
    () => startSrch(initalSearchTerm),
    [initalSearchTerm]
  );
  /* The useMemo() hook is used here because the "initalSearchTerm" state always remains the same */

  const initialApiCall = () => {
    setLoadingStatus(true);
    memoizedResponse
      .then(users => {
        const response = users.hits;
        getResults([...response]);
        setTimeout(() => {
          setLoadingStatus(false);
        }, 2000);
      })
      .catch(error => {
        Notiflix.Notify.failure(
          'Oops! Something went wrong! Try reloading the page!'
        );
        setLoadingStatus(false);
        console.error(`Error message ${error}`);
      });
  };

  const handleSubmit = evt => {
    getResults([]);
    evt.preventDefault();
    const { value } = evt.target[0];

    evt.target[1].style.boxShadow = 'inset 0 0 10px 5px rgba(0, 0, 0, 0.3)';
    setTimeout(() => {
      evt.target[1].style.boxShadow =
        '0px 4px 6px -1px rgba(0, 0, 0, 0.3), 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 10px 12px -6px rgba(0, 0, 0, 0.4)';
    }, 2000);
    setLoadingStatus(true);
    startSrch(value)
      .then(users => {
        const response = users.hits;
        const totalResponse = users.totalHits;
        console.log(users.totalHits);
        if (totalResponse !== 0) {
          Notiflix.Notify.success(
            `Hooray! We found ${users.totalHits} images.`
          );
        }
        if (totalResponse === 0) {
          Notiflix.Notify.warning(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
        if (totalResponse <= 12 && totalResponse !== 0) {
          Notiflix.Notify.warning(
            "We're sorry, but you've reached the end of search results."
          );
          setResponseStatus(true); //If page is not refreshed this stays true(even when false), hence the need for the else{}
        } else {
          setResponseStatus(false);
        }

        getResults([...response]);
        setSearchTerm(value);
        setPageNums(1);
        setPageItems(12);
        setSearchStatus(true);
        setResultsAmount(totalResponse);

        setTimeout(() => {
          setLoadingStatus(false);
        }, 2000);
      })
      .catch(error => {
        Notiflix.Notify.failure(
          'Oops! Something went wrong! Try reloading the page!'
        );
        setLoadingStatus(false);
        console.error(`Error message ${error}`);
      });
    //console.log(response);
  };

  const handleButtonPress = evt => {
    evt.target.style.boxShadow = 'inset 0 0 10px 5px rgba(0, 0, 0, 0.3)';
    setTimeout(() => {
      evt.target.style.boxShadow =
        '0px 4px 6px -1px rgba(0, 0, 0, 0.3), 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 10px 12px -6px rgba(0, 0, 0, 0.4)';
    }, 2000);

    let storageVar = pageNums;
    storageVar += 1;
    let storageVarItems = pageItems;
    storageVarItems += 12;
    if (storageVarItems >= resultsAmount) {
      Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );

      setResponseStatus(true);
    }
    setLoadingStatus(true);

    loadSrch(searchTerm, storageVar)
      .then(users => {
        const response = users.hits;

        getResults([...searchResults, ...response]);
        setPageNums(storageVar);
        setPageItems(storageVarItems);

        setTimeout(() => {
          setLoadingStatus(false);
        }, 2000);
      })
      .catch(error => {
        Notiflix.Notify.failure(
          'Oops! Something went wrong! Try reloading the page!'
        );
        setLoadingStatus(false);
        console.error(`Error message ${error}`);
      });
  };

  const handleImageClick = evt => {
    const value = evt.target.name;
    const altValue = evt.target.alt;
    console.log(altValue);
    setFullImage(value);
    setImageAlt(altValue);
  };

  const handleClose = () => {
    setFullImage(undefined);
  };

  return (
    <UserContext.Provider
      value={{
        searchResults,
        isLoading,
        fewResponse,
        didUserSearch,
        fullImage,
        imageAlt,
        initialApiCall,
        handleSubmit,
        handleButtonPress,
        handleImageClick,
        handleClose,
        setInitalSearchTerm,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
