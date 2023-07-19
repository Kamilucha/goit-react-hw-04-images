
import { Component } from "react"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchImg } from "services/pixabay-api";

import SearchBar from 'components/Searchbar/Searchbar'
import  ImageGallery  from 'components/ImageGallery/ImageGallery'

import { ButtonLoadMore } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import Modal from "./Modal/Modal";

export default class App extends Component {
  state = {
    images: [],
    loading: false,
    showModal: false,
    modalValue: {},
    loadMore: false,
    page: 1,
    // name: '', 
    totalImages: 0,
    imageName: 'initialImage',
  }

  onLoadMore = async () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }))

    // const { imageName, page } = this.state;

    // const { hits } = await fetchImg(imageName, page + 1);

    // this.setState(({ images }) => ({
    //   images: [...images, ...hits],
    //   page: page + 1,
    // }))
  }
  
  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.imageName !== this.state.imageName ||
      prevState.page !== this.state.page
    ) {
      this.setState({ loading: true });

      const { hits, total } = await fetchImg(this.state.imageName, this.state.page);
      if (!total) {
        return alert('На жаль, за вашим запитом нічого не знайдено');
      }

      this.setState(({ images }) => ({
        images: [...images, ...hits],
        loading: false,
      }))
    }


    /*
     fetchImg("initialImage", 1)
      .then(({ hits }) => this.setState({ ...this.state, images: hits }))
       .catch(error => console.log('Error fetching images:', error))
       .finally(() => {
        this.setState({ ...this.state, loading: false });
      });
      */
  }
  
  toggleModal = modalValue => {
    // this.setState({ modalValue })

    this.setState(({ showModal }) => ({
      showModal: !showModal,
      modalValue
    }))
  }

  handleSearch = async (imageName) => {

    this.setState({ imageName, images: [], loadMore: true, page: 1 })
    // this.setState({ images: [], loading: true });
  
    // const { hits } = await fetchImg(imageName, 1);
  
    // this.setState({ images: hits, loading: false, page: 1, loadMore: true, imageName });
  };

  render() {
    const { images, loading, showModal, modalValue, loadMore } = this.state;

    return <>
      {showModal && <Modal onClick={this.toggleModal} data={modalValue} onClose={ this.toggleModal} />}
      {loading && <Loader/>}
      <SearchBar onSubmit={this.handleSearch} />
      <ImageGallery images={images} loading={loading} onClick={this.toggleModal} loadMore={this.onLoadMore} />
      {loadMore && <ButtonLoadMore onClick={this.onLoadMore} />}
      <ToastContainer autoClose={3000} />
    </>
  };
}