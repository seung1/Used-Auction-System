import React, {Component} from "react";
import { Route, Link } from "react-router-dom";
import ProductDetail from "../components/common/ProductDetail";
import ProductDetailList from "../components/common/ProductDetailList";
import CategoryDetail from "../components/common/CategoryDetail";
import styled from "styled-components";
import Button from "../components/common/Button";

const Wrapper = styled.div`
    font-size: 2rem;
    padding-top: 4rem;
    justify-content: center;
    // align-items: center;
    display: flex;
  `;

class SearchPage extends Component {

    
    constructor(props) {
        super(props);
        this.state = {
            selectedKey: -1,
            Products : [],
            keyword:'',
        };
        this.callApi()

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
  
    callApi = async () => {
        // proxy에 설정한 주소에 fetch 인자의 주소를 덧붙여서 정보를 받아옵니다.
        const res = await fetch(`/api/stuff/getStuff`);
        const body = await res.json();
        this.setState({Products : body});
    };
    
    handleChange(e) {
        this.setState({
            keyword: e.target.value
        });
    }

    handleClick(key) {
        this.setState({
            selectedKey: key
        });
    };

    render() {
        const mapToComponents = (data) => {
            data.sort();
            data = data.filter(
                (product) => {
                    return product.product_name.toLowerCase()
                    .indexOf(this.state.keyword.toLowerCase()) > -1;
                }
            );
            return data.map((product) => {
                return (<ProductDetailList 
                    product={product} 
                    key={product.product_number}
                    onClick={()=> this.handleClick(product.product_number)}/>);
            });
        };

        
        return (
            <div className="App">
                <h1>PRODUCT SEARCH PAGE</h1>
                <Wrapper>
                    <Button>
                        <Link to = '/enroll'>
                            물건 등록
                        </Link>
                    </Button>
                </Wrapper>
                <CategoryDetail />
                <p />
                <input
                    type="text"
                    name="keyword"
                    placeholder="검색어를 입력하세요"
                    value={this.state.keyword}
                    onChange={this.handleChange}
                />
                <hr />
                <div>{mapToComponents(this.state.Products)}</div>
                <ProductDetail
                    isSelected={this.state.selectedKey != -1}
                    product={this.state.Products.filter(v => v.product_number === this.state.selectedKey)[0]}
                />
            </div>
        );
    }
  }
  
  
  export default SearchPage;