// DB 스키마 짜는 곳
import mongoose, { Schema } from 'mongoose';

// const autoIncrement = require('moongoose-auto-increment');
// autoIncrement.initialize(mongoose.connection);

const ProductSchema = new Schema({
    product_number : Number,    // 물건 번호
    start_date : {type : Date, default : Date.now}, // 등록 시작일, 자동 생성
    product_name : String,  // 물건 이름
    price : {type : Number, default : 0},
    user_name: String, // 판매 등록 유저
    category : String,  // 물건 카테고리
    local_area : String,    // 판매 지역
    bidding_id : {type : String, default : ''},    // 현 입찰자 아이디
    total_bidding : [String],  // 현재까지 입찰자 리스트 -> 인기 매물 위함
    soldout : {type : Boolean, default : false} // 아직 판매중인지
});

// // AutoIncrement
// ProductSchema.plugin(
//     autoIncrement.plugin, {
//         model : 'ProductSchema',
//         field : 'product_number',
//         startAt : 1,
//         increment : 1,
//     }
// )

// // // 등록
// // ProductSchema.methods.enrollProduct = function (data) {
// //     this.product_number = data.product_number;
// //     this.product_name = data.product_name;
// //     this.category = data.category;
// //     this.local_area = data.local_area;
// //     this.bidding_id = '';
// //     this.total_bidding = [];
// //     this.soldout = false;
// // // }
ProductSchema.methods.removeStuff = function (product_number) {
    this.remove({product_name : product_number})
}

// // // 물품 상세 정보 가져오기
// ProductSchema.statics.getProductInfo = function (product_number) {
//     return this.findOne({product_number : product_number})   // findOne method -> find메소드로 가져올 수 있는 객체 중 하나만
//     // ref : https://squll1.tistory.com/entry/mongodb-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EA%B2%80%EC%83%89-find-findOne-%EC%A0%95%EB%A0%AC-sort
// }

// ProductSchema.statics.removeStuff = function (product_name) {
//     this.remove({product_name : product_name})
// }


// // 물품 검색
// ProductSchema.methods.searchProduct = function (search_input, search_type) {
//     // 이름 검색
//     if (search_type === 'product_name') return this.find({product_name : search_input})
//     // 카테고리 검색
//     else if (search_type === 'product_category') return this.find({category : search_input})
//     // 지역 검색
//     else if (search_type === 'product_area') return this.find({local_area : search_input})
//     // 전체 검색
//     else if (search_type === null || search_input === '') return this.find()
// }

const Product = mongoose.model('Product', ProductSchema);

export default Product;