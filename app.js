const express = require('express');
const morgan = require('express');
const app = express();

//App settings
//Server Port, From Variable ent or defined (default:3000)
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev')); //Logger
app.use(express.json());

//Get user and password and verify
app.use((req, res, next) => {

    const auth = {username: 'user@example.com', password: 'Abcd1234'} // change this
  
    //Username and password from header
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [username, password] = Buffer.from(b64auth, 'base64').toString().split(':')
  
    // Verify username and password are set and correct
    if (username === auth.username && password === auth.password) {
      console.log("API Access granted")
      return next()
    }
  
    // Access denied...
    res.status(401).send('Authentication required.') // custom message
  })
  

//Routes
app.use(require('./routes/product.routes'));


//Run server
app.listen(app.get('port'), () => {
    console.log('Server listening on port', app.get('port'))
});