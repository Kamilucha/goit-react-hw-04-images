import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageList } from './ImageGallery.styled';
import PropTypes from 'prop-types';


export const ImageGallery = ({ images, onClick }) => {

  if (!images || images.length === 0) {
    return <p>Start searching for images</p>;
  }

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
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired, 
    onClick: PropTypes.func.isRequired,
}
