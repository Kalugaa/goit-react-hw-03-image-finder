import { Component } from 'react';

class Button extends Component {
  render() {
    const { onLoadMore } = this.props;

    return (
      <div className="Button-wrapper">
        <button className="Button" onClick={onLoadMore}>
          Load More
        </button>
      </div>
    );
  }
}

export default Button;
