import axios from 'axios';

export const startSrch = async srchTerm => {
  try {
    const response = await axios.get(`https://pixabay.com/api/`, {
      params: {
        key: '41151959-2696743ecd3219a7fd97287eb',
        q: srchTerm,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: 12,
        page: 1,
      },
    });
    const users = await response.data;
    return users;
  } catch (error) {
    console.error(error);
  }
};

export const loadSrch = async (srchTerm, pageNum) => {
  try {
    const response = await axios.get(`https://pixabay.com/api/`, {
      params: {
        key: '41151959-2696743ecd3219a7fd97287eb',
        q: srchTerm,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: 12,
        page: pageNum,
      },
    });
    const users = await response.data;
    return users;
  } catch (error) {
    console.error(error);
  }
};
