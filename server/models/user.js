import mongoose from "mongoose";

const userSchema = mongoose.Schema({
<<<<<<< HEAD
    name: {type:String, require:true},
    email: {type:String, require:true},
    password: {type:String,require:true},
    id: {type:String}
})


let UserSchema = mongoose.model('UserSchema', userSchema);

export default UserSchema;
=======
  name: { type: String, required:  true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
});

export default mongoose.model("User", userSchema);
>>>>>>> 429ba36 (fix bugs, make fully responsive, add new features)
