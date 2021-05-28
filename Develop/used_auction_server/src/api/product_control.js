import ProductSchema from "../models/product"

export const dbinfo = async ctx => {

    const schema = ({
        name : String,
        start_prc : Number,
        cur_prc : Number,
        end_prc : Number
    });

    const{name, start_prc, cur_prc, end_prc} = ctx.request.body;

    /*
    try{
        const posts = await ProductSchema.find().exec();
        ctx.body = posts;

    }catch(e){
        ctx.throw(500,e);
    }
    */

};