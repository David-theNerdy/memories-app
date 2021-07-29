import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    message: String,
<<<<<<< HEAD
    name: String, 
=======
    name: String,
>>>>>>> 429ba36 (fix bugs, make fully responsive, add new features)
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: { type: [String], default: [] },
    createdAt: {
        type: Date,
        default: new Date(),
    },
<<<<<<< HEAD
=======
    comments: { type: [String], default: [] },
>>>>>>> 429ba36 (fix bugs, make fully responsive, add new features)
})

var PostMessage = mongoose.model('PostMessage', postSchema);

<<<<<<< HEAD
export default PostMessage;

//on this model we can run GET, PUT,... comment later on
=======
export default PostMessage;
>>>>>>> 429ba36 (fix bugs, make fully responsive, add new features)
