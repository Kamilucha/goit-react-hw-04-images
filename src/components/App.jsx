
import { Component, useState, useEffect} from "react"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchImg } from "services/pixabay-api";

import { SearchBar } from 'components/Searchbar/Searchbar'
import { ImageGallery }  from 'components/ImageGallery/ImageGallery'

import { ButtonLoadMore } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";

// export default class OldApp extends Component {
//   state = {
//     images: [],
//     loading: false,
//     showModal: false,
//     modalValue: {},
//     loadMore: false,
//     page: 1,
//     // name: '', 
//     totalImages: 0,
//     imageName: 'initialImage',
//   }

//   onLoadMore = async () => {
//     this.setState(({ page }) => ({
//       page: page + 1,
//     }))
//   }
  
//   async componentDidUpdate(prevProps, prevState) {
//     if (
//       prevState.imageName !== this.state.imageName ||
//       prevState.page !== this.state.page
//     ) {
//       this.setState({ loading: true });

//       const { hits, total } = await fetchImg(this.state.imageName, this.state.page);
//       if (!total) {
//         return alert('На жаль, за вашим запитом нічого не знайдено');
//       }

//       this.setState(({ images }) => ({
//         images: [...images, ...hits],
//         loading: false,
//       }))
//     }

//   }
  
//   toggleModal = modalValue => {

//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//       modalValue
//     }))
//   }

//   handleSearch = async (imageName) => {

//     this.setState({ imageName, images: [], loadMore: true, page: 1 })
//     // this.setState({ images: [], loading: true });
  
//     // const { hits } = await fetchImg(imageName, 1);
  
//     // this.setState({ images: hits, loading: false, page: 1, loadMore: true, imageName });
//   };

//   render() {
//     const { images, loading, showModal, modalValue, loadMore } = this.state;

//     return <>
//       {showModal && <Modal onClick={this.toggleModal} data={modalValue} onClose={ this.toggleModal} />}
//       {loading && <Loader/>}
//       <SearchBar onSubmit={this.handleSearch} />
//       <ImageGallery images={images} loading={loading} onClick={this.toggleModal} loadMore={this.onLoadMore} />
//       {loadMore && <ButtonLoadMore onClick={this.onLoadMore} />}
//       <ToastContainer autoClose={3000} />
//     </>
//   };
// }

export const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalValue, setModalValue] = useState({});
  const [loadMore, setLoadMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [imageName, setImageName] = useState('initialImage');

  useEffect(() => {
    
    fetchImgData()

  }, [page, imageName])

  async function fetchImgData() {
    if (page === 1) {
      onLoadMore(false);
      setImages([]);
    }

    setLoading(true);

    try {
      const { hits, total } = await fetchImg(imageName, page);
  
      setImages([...images, ...hits]);

      if (!total) {
        setLoading(false);
          return alert('На жаль, за вашим запитом нічого не знайдено');
      };
      setLoading(false);
      
    } catch (error) {
      console.log(error)
    } 
  }

  const onLoadMore = async () => {
    setPage(prevPage => 
      prevPage + 1
    )
  }

  const toggleModal = (data) => {
    setShowModal(!showModal)
     if (data) {
      setModalValue(data);
    } else {
      setModalValue({});
    }
  }

  const handleSearch = async (imageName) => {
    setImageName(imageName)
    setImages([])
    setLoadMore(true)
    setPage(1)
  };

  return <>
      {showModal && <Modal onClick={toggleModal} data={modalValue} onClose={ toggleModal} />}
      {loading && <Loader/>}
      <SearchBar onSubmit={handleSearch} />
      <ImageGallery images={images} loading={loading} onClick={toggleModal} loadMore={onLoadMore} />
      {loadMore && <ButtonLoadMore onClick={onLoadMore} />}
      <ToastContainer autoClose={3000} />
    </>
}