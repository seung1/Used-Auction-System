import React, { Component } from 'react';

class ProductDetail extends Component {
    

    render() {

        const details = (
            <div>
                <p>{this.props.product.product_name}</p>
                <p>{this.props.product.category}</p>
                <p>{this.props.product.user_name}</p>
                <p>{this.props.product.local_area}</p>
            </div>
        )
    
        const blank = (<div> Not Selected</div>);

        return (
            <div>
                <h2>Details</h2>
                {this.props.isSelected ? details : blank }
            </div>
        );
    }
}

ProductDetail.defaultProps = {
    product: {
        name:'',
        category:'',
        user:'',
        place:''
    }
}

export default ProductDetail;