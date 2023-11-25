import { Component } from 'react';

class Modal extends Component {
  handleCloseModal = e => {
    if (e.target === e.currentTarget) {
      this.props.onCloseModal();
    }
  };

  render() {
    const { selectedImage } = this.props;

    return (
      <div className="Overlay" onClick={this.handleCloseModal}>
        <div className="Modal">
          <img src={selectedImage} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;
