
import express from 'express';
<<<<<<< HEAD
=======
import bodyParser from 'body-parser';
>>>>>>> 429ba36 (fix bugs, make fully responsive, add new features)
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';
<<<<<<< HEAD
import userRouter from './routes/user.js';
=======
import userRouter from "./routes/user.js";
>>>>>>> 429ba36 (fix bugs, make fully responsive, add new features)

const app = express();

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

<<<<<<< HEAD

app.use('/posts', postRoutes);
app.use("/user", userRouter);

//mongoDB implement 

const CONNECTION_URL = 'mongodb+srv://david:h71211176@cluster0.mndzw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
//you should not expose your name and password like this. Create enviromental variable instead

const PORT = process.env.PORT|| 5000;
//This will automatically change when we update to Heroku

//use mongoose to connect to our database, which will return a promise
=======
app.use('/posts', postRoutes);
app.use("/user", userRouter);

const CONNECTION_URL = 'mongodb+srv://david:h71211176@cluster0.mndzw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT|| 5000;

>>>>>>> 429ba36 (fix bugs, make fully responsive, add new features)
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

<<<<<<< HEAD
mongoose.set('useFindAndModify', false); 
//this make sure that we won't have any warning in the console 
=======
mongoose.set('useFindAndModify', false);
>>>>>>> 429ba36 (fix bugs, make fully responsive, add new features)
