import mongoose from 'mongoose';

const {Schema} = mongoose;

// const autoIncrement = require('moongoose-auto-increment');
// autoIncrement.initialize(mongoose.connection);


// use schema from subgroup3
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


const Product = mongoose.model('Product', ProductSchema);

export default Product;