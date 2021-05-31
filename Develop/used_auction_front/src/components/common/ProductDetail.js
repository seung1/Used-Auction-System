import React, { Component } from 'react';
import * as auth from '../../api/auth'
class ProductDetail extends Component {
    async onClickEvent(product_number) {
        const username = JSON.parse(localStorage.getItem("user")).username
        let form = {
            username : username,
            product_number : product_number,
            mode : 'save',
            have : 0,
        }

        if (this.props.saveList.includes(product_number)) {
            form.have = true
            await auth.saveAndBuy(form)
        } 
        else {
            form.have = false
            await auth.saveAndBuy(form)
        }
        alert(form.have ? '삭제완료' : '저장완료')
        window.location.reload()
    }

    render() {
        const details = (
            <div>
                <p>상품명: {this.props.product.product_name}</p>
                <p>카테고리: {this.props.product.category}</p>
                <p>판매자: {this.props.product.user_name}</p>
                <p>판매지역: {this.props.product.local_area}</p>
                <button onClick = {() => this.onClickEvent(this.props.product.product_number)}>
                        {this.props.saveList.includes(this.props.product.product_number) ? '삭제' : '저장'}
                </button>
            </div>
                    
        )
    
        const blank = (<div> Not Selected</div>);

        return (
            <div>
                <div>
                    <h2>Details</h2>
                    {this.props.isSelected ? details : blank }
                </div>
                <div>
                </div>
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