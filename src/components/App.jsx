import { Component } from 'react';
import axios from 'axios';
import SearchBar from './Searchbar/Searchbar.jsx';
import ImageGallery from './ImageGallery/ImageGallery.jsx';
import Loader from './Loader/Loader.jsx';
import Button from './Button/Button.jsx';
import Modal from './Modal/Modal.jsx';
import '../styles.css';

class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    isLoading: false,
    selectedImage: null,
    totalHits: null,
  };
  componentDidMount() {
    // this.fetchImages();
  }
  componentDidUpdate(_, prevState) {
    if (prevState.query !== this.state.query) {
      this.setState({ page: 1, images: [] }, this.fetchImages);
    } else if (prevState.page !== this.state.page) {
      this.fetchImages();
    }
  }

  handleSubmit = value => {
    this.setState({ query: value });
  };

  fetchImages = () => {
    this.setState({ isLoading: true });
    const apiKey = '40081345-2806d7337f047551466163511';
    const { query, page } = this.state;
    const url = `https://pixabay.com/api/?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`;

    axios
      .get(url)
      .then(response => {
        this.setState(prevState => ({
          images:
            page === 1
              ? response.data.hits
              : [...prevState.images, ...response.data.hits],
          totalHits: response.data.totalHits,
        }));
        console.log('response', response);
      })
      .catch(error => console.error('Error fetching images: ', error))
      .finally(() => this.setState({ isLoading: false }));
  };

  loadMoreImages = () => {
    this.setState(
      prevState => ({ page: prevState.page + 1 }),
      this.fetchImages
    );
  };

  handleInputChange = query => {
    this.setState({ query });
  };

  handleImageClick = imageUrl => {
    this.setState({ selectedImage: imageUrl });
  };

  closeModal = () => {
    this.setState({ selectedImage: null });
  };

  render() {
    const { images, isLoading, selectedImage, totalHits } = this.state;
    console.log('totalHits', totalHits);
    return (
      <div className="app">
        <SearchBar onInputChange={this.handleInputChange} />
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {isLoading && <Loader />}
        {images.length > 0 && images.length < totalHits && (
          <Button onLoadMore={this.loadMoreImages} />
        )}
        {selectedImage && (
          <Modal selectedImage={selectedImage} onCloseModal={this.closeModal} />
        )}
      </div>
    );
  }
}

export default App;
