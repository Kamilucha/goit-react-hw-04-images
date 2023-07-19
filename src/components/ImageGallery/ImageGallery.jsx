import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import { ImageList } from './ImageGallery.styled';
import PropTypes from 'prop-types';



export default class ImageGallery extends Component{
  static propTypes = {
    images: PropTypes.array.isRequired, 
    onClick: PropTypes.func.isRequired,
  }

  // async componentDidUpdate(prevProps, prevState){
  //   const { loadMore, page, imageName, } = this.props;
  //   if (prevProps.imageName !== imageName || prevProps.page !== page) {
  //     if (prevProps.imageName !== imageName) {
  //       loadMore(false);
  //       this.setState({ images: [], page: 1 });
  //     }
  //   }
  // }
    render() {
      const { images, onClick } = this.props;

      if (!images || images.length === 0) {
        return <p>Start searching for images</p>;
      };
        
      return  (
      <div>

          <ImageList>
            {images.map(({ id, webformatURL, largeImageURL, tags,}) => (
              <ImageGalleryItem
                key={id}
                id={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                tags={tags}
                onClick={onClick}
              />
            ))}
          </ImageList>
        
      </div>
    );
  };
};
