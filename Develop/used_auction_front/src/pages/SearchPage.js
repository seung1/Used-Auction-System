import React, {Component} from "react";
import { Route, Link } from "react-router-dom";
import ProductDetail from "../components/common/ProductDetail";
import ProductDetailList from "../components/common/ProductDetailList";
import styled from "styled-components";
import Button from "../components/common/Button";
import RecommendBox from '../components/common/RecommendBox';
import SaveBox from '../components/common/SaveBox';
import * as auth from '../api/auth'
import * as stuff from '../api/stuff';

const Wrapper = styled.div`
    font-size: 2rem;
    padding-top: 4rem;
    justify-content: center;
    // align-items: center;
    display: flex;
  `;

const BigBox = styled.div`
    display : flex;
    justify-context : center;
`

const ComponentBox = styled.div`
    border: 1px solid black;
    width : 100%
`

class SearchPage extends Component {

    
    constructor(props) {
        super(props);
        this.state = {
            selectedKey: -1,
            Products : [],
            keyword:'',
            SaveList: [],
            RecommendList : [],
            choice:'',
            place:''
        };
        this.callApi()

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCategory = this.handleCategory.bind(this);
        this.handlePlace = this.handlePlace.bind(this);
    }
    

    callApi = async () => {
        // proxy에 설정한 주소에 fetch 인자의 주소를 덧붙여서 정보를 받아옵니다.
        const res = await fetch(`/api/stuff/getStuff`);
        const body = await res.json();
        this.setState({Products : body});
        // 저장 목록
        const username = JSON.parse(localStorage.getItem("user")).username
        const res2 = await auth.getMySaveList({username : username})
        this.setState({SaveList : res2.data})
        // 추천 목록
        const res3 = await auth.getSaveList({username : username})
        this.setState({RecommendList : res3.data})
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

    handleCategory(e) {
        this.setState({
            choice: e.target.value
        });
    };

    handlePlace(e) {
        this.setState({
            place: e.target.value
        });
    };

    render() {
        const mapToComponents = (data) => {
            data.sort();
            data = data.filter(
                (product) => {
                    return product.product_name.toLowerCase()
                    .indexOf(this.state.keyword.toLowerCase()) > -1 &
                    product.category.toLowerCase()
                    .indexOf(this.state.choice.toLowerCase()) > -1 &
                    product.local_area.toLowerCase()
                    .indexOf(this.state.place.toLowerCase()) > -1;
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
                        <p />
                <BigBox>
                    <ComponentBox>
                        <SaveBox stuffList = {this.state.Products} saveList = {this.state.SaveList}/>
                    </ComponentBox>
                    <ComponentBox>
                        <label>
                            <select 
                                name="choice"
                                value={this.state.choice}
                                placeholder="상품별 카테고리로 찾기"
                                onChange={this.handleCategory}>
                                <option value="의류">의류</option>
                                <option value="디지털/가전">디지털/가전</option>
                                <option value="잡화">잡화</option>
                                <option value="뷰티/미용">뷰티/미용</option>
                            </select>
                        </label>
                        <p />
                        <label>
                            <select 
                                name="place"
                                value={this.state.place}
                                placeholder="지역별 카테고리로 찾기"
                                onChange={this.handlePlace}>
                                <option value="강남구">강남구</option>
                                <option value="동작구">동작구</option>
                                <option value="중구">중구</option>
                            </select>
                        </label>
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
                            isSelected={this.state.selectedKey != -1} saveList = {this.state.SaveList}
                            product={this.state.Products.filter(v => v.product_number === this.state.selectedKey)[0]}
                        />
                    </ComponentBox>
                    <ComponentBox>
                        <RecommendBox stuffList = {this.state.Products} recommendList = {this.state.RecommendList}/>
                    </ComponentBox>
                </BigBox>
            </div>
        );
    }
  }
  
  
  export default SearchPage;