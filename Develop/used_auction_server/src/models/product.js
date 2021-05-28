import mongoose, { Schema } from 'mongoose';

// 

const ProductSchema = new Schema({

    product_name : String,  
    owner_id : String,

    start_date : {type : Date, default : Date.now}, 
    current_time : {type : Date},
    end_time : {type : Date},

    start_price : {type : Number, default : 0},
    current_price : {type : Number, default : 0},
    
    bidding_id : {type : String, default : ''},   
    
});



ProductSchema.method.getproduct = function(product_name){
    return this.findOne({ product_name })
}
ProductSchema.method.getsprice = function(start_price){
    return this.findOne({ start_price })
}
ProductSchema.method.getcprice = function(current_price){
    return this.findOne({ current_price })
}
ProductSchema.method.getenddate = function(end_date){
    return this.findOne({ end_date })
}


const Product = mongoose.model('Product', ProductSchema);

export default Product;