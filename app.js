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

  //const auth = {username: process.env.USER || 'user@example.com', password: process.env.PASS || 'Abcd1234'}
  const auth = { username: 'user@example.com', password: 'Abcd1234' }
  //Username and password from header
  const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
  const [username, password] = Buffer.from(b64auth, 'base64').toString().split(':')

  // Verify username and password are set and correct
  if (username === auth.username && password === auth.password) {
    console.log("API Access granted")
    return next()
  }

  // Access denied...
  var msg =''
  if (req.headers.authorization == undefined) {
    msg = 'Not authorized. Authentication is required and has not yet been provided'
  }
  else {
    msg = 'Not authorized. Authentication is required and has failed'
  }
  console.error(`Error: ${msg}`)
  res.status(401);
  res.json({
    'status': 'Error',
    'message': msg
  })
})


//Routes
app.use('/api/products', require('./routes/product.routes'));

//Invalid routes
app.use((req, res) => {
  // Invalid request
  res.status(404);
  res.json({
    'status': 'Error',
    'message': `Invalid request. Route 'HOST${req.url}' not found`
  })
});

//error route
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    'status': 'Error',
    'message': error.message
  })
})


//Run server
app.listen(app.get('port'), () => {
  console.log('Server listening on port', app.get('port'))
});