<<<<<<< HEAD
import jwt from 'jsonwebtoken'

 
//let say you want to like a post
// click the like button -> auth middle will confirm or deny your request (next : okay you good to go) => like controllers
// so middleware is for anykind of action that happen before something 
=======
import jwt from "jsonwebtoken";

>>>>>>> 429ba36 (fix bugs, make fully responsive, add new features)
const secret = 'test';

const auth = async (req, res, next) => {
  try {
<<<<<<< HEAD
    console.log(req)
    const token = req.headers.authorization.split(" ")[1];
    
=======
    const token = req.headers.authorization.split(" ")[1];
>>>>>>> 429ba36 (fix bugs, make fully responsive, add new features)
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {      
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }    

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
<<<<<<< HEAD



//sub is google unique id for user
=======
>>>>>>> 429ba36 (fix bugs, make fully responsive, add new features)
