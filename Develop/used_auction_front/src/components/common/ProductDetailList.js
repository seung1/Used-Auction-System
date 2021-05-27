import React, { Component } from 'react';

class ProductDetailList extends Component {
  render() {
    return (
      <div onClick={this.props.onClick}>
        {this.props.product.product_name}
      </div>
    );
  }
}

export default ProductDetailList;