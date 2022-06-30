let express = require('express')
let app = express();
let bodyParser = require('body-parser');
var cors = require('cors');
let mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const secret_key = 'WERTYUIHGHGDTYOIUYTRDFGJ';

// app configuration
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(`mongodb://localhost/uber`, { useNewUrlParser: true });
var db = mongoose.connection;
if (!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")


let userRouter = require('./routers/userRouter');
let addressRouter = require('./routers/addressRouter');
let orderRouter = require('./routers/orderRouter');


const checkAuth = function(req, res, next) {
    if(!req.headers.authorization) {
      res.status(400).send('Authorization Token is required');
    }
    let token = req.headers.authorization?req.headers.authorization.replace("Bearer ",""):null;
    if(token!==null) {
      jwt.verify(token, secret_key, (err, user)=> {
        if(err) res.status(401).send('Invalid Token or expored');
        req.user = user;
        console.log(user);
        next();
      });
    } else {
      res.status(401).send('Unauthorized access');
      return;
    }
  }

// routes
app.get('/', (req, res) => res.send('Welcome to Uber API Service'));

app.use('/api', userRouter);
app.use('/api', checkAuth, addressRouter);
app.use('/api', checkAuth, orderRouter);

app.listen(4000, '0.0.0.0', function () {
    console.log(`listening on *: ${4000}`);
});
