import Product from '../../models/products';
import Joi from 'joi';
/*
  POST /api/stuff/enroll
  @ product_name
  @ price
  @ category
  @ local_area

  @ product_number 따로 추가
*/
export const enrollStuff = async (ctx) => {
    const now_list = await Product.find()
    let current_number = 0

    if (now_list.length) {
      current_number = now_list[now_list.length - 1].product_number + 1
    }

    const product_info = new Product({
      product_number : current_number,
      product_name : ctx.request.body.product_name,
      price : ctx.request.body.price,
      category : ctx.request.body.category,
      local_area : ctx.request.body.local_area,
      user_name : ctx.request.body.user_name
    })

    try {
      await product_info.save();
      ctx.body = 'save success'
    } catch(e) {
      return ctx.throw(500, e);
    }


    console.log(product_info)
    console.log('enrollment sucess')
};

/*
  POST /api/stuff/getStuff

  @ search_input

  1. search_input이 없다면 // 프론트에서 따로 뺄수있도록
*/
export const getStuff = async (ctx) => {
    const stuff_all = await Product.find();
    ctx.body = stuff_all

    return stuff_all
};

/*
  POST /api/stuff/getStuff

  @ product_number
*/
export const removeStuff = async (ctx) => {
  // const target = await Product.find({product_name : 'test'})
  Product.deleteOne({product_number : parseInt(ctx.request.body.product_number)}, () => {
    console.log(ctx.request.body.product_number)
    ctx.body = 'nononno'
  })
}