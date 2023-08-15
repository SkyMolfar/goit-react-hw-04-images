import React, { useState, useEffect } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import * as APIservices from '../APIservices/APIservices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [isShowModal, setIsShowModal] = useState(false);
  const [showImage, setShowImage] = useState(null);
  const [isShowLoadMore, setIsShowLoadMore] = useState(false);

  useEffect(() => {
    if (query !== '' || page !== 1) {
      getImage();
    }
  }, [query, page]);

  const getImage = async () => {
    setIsLoading(true);
    try {
      const { totalHits, hits } = await APIservices.fetchImage(query, page);
      if (totalHits === 0) {
        toast.error(`There are no images with query "${query}"`);
      } else {
        setImages(prevImages => [...prevImages, ...hits]);
        setIsShowLoadMore(page < Math.ceil(totalHits / 12));
      }
    } catch (error) {
      setError(error.message);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImage = image => {
    setIsShowModal(!isShowModal);
    setShowImage(image);
  };

  const onCloseModal = () => {
    setIsShowModal(false);
  };

  const hasImages = images.length > 0;

  return (
    <div>
      <Searchbar onSubmit={setQuery} />
      {isLoading && <Loader />}
      {hasImages && <ImageGallery images={images} onHandleImage={handleImage} />}
      <ToastContainer
        icon={false}
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        theme="colored"
      />
      {isShowLoadMore && <Button onLoadMore={onLoadMore} />}
      {isShowModal && <Modal image={showImage} onCloseModal={onCloseModal} />}
    </div>
  );
};

export default App;
