import { useState, useEffect } from 'react';

import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';
import Modal from './Modal';
import { API } from '../services/fetch';

const App = () => {
  const [gallery, setGallery] = useState({
    pictures: [],
    loading: false,
    error: null,
  });

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [modal, setModal] = useState({
    modalVisible: false,
    modalBody: null,
  });

  useEffect(() => {
    if (query === '') {
      return;
    }

    setGallery(prevState => ({
      ...prevState,
      loading: true,
      error: null,
    }));

    const fetch = async () => {
      try {
        const response = await API.fetch(query, page);
        const data = response.data.hits;

        setGallery(prevState => ({
          pictures: [...prevState.pictures, ...data],
          loading: false,
          error: null,
        }));
      } catch (error) {
        setGallery({
          pictures: gallery.pictures,
          loading: false,
          error: error.message,
        });
      }
    };
    fetch();
  }, [query, page]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = modalBody => {
    setModal({
      modalVisible: true,
      modalBody,
    });
  };

  const closeModal = () => {
    setModal({
      modalVisible: false,
      modalBody: null,
    });
  };

  const getQueryOnSubmit = query => {
    setQuery(query);
    setGallery({ ...gallery, pictures: [] });
  };

  const { pictures, loading } = gallery;
  const { modalBody, modalVisible } = modal;

  return (
    <>
      <SearchBar onSubmit={getQueryOnSubmit} />
      {Boolean(pictures.length) && (
        <ImageGallery pictures={pictures} onClick={openModal} />
      )}
      {loading && <Loader />}
      {Boolean(pictures.length) && <Button onClick={loadMore} />}
      {modalVisible && (
        <Modal onClick={closeModal}>
          <img width="600" height="380" src={modalBody} alt="" />
        </Modal>
      )}
    </>
  );
};

export default App;
