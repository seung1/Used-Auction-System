import mongoose from 'mongoose';
const { Schema } = mongoose;


const TestSchema = new Schema({
    title: String,
    body: String,
    tags: [String],
    publishedDate:{
    type: Date,
    default: Date.now, 
},
});

const Post = mongoose.model('Post,TestSchema');
export default Post;