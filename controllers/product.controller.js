const axios = require('axios');

// Products controller def
const productCtrl = {};

// Credentials, apiversion from Shopify
const api = require('../shopifyAuth.json');

//URL Format 
const username=api['apiKey']
const password=api['password']
const shop=api['hostname']
const apiversion=api['apiVer']
const resource='products'
const url = `https://${username}:${password}@${shop}.myshopify.com/admin/api/${apiversion}/${resource}.json`

// Get all products from db
productCtrl.getProducts = (req, res, next) => {

    //Make the GET request to Shopify API
    axios.get(url)
        .then(response => {
            const raw = response.data['products'];
            const products = [];

            //For each element (products), get name, description, image and price properties
            raw.forEach(product => {
                products.push({
                    'name': product['title'],
                    'description': product['body_html'],
                    'image': product['image'] == null ? "Image not found" : product['image']['src'],
                    'price': product['variants'][0]['price']
                })
            });

           //Response to client
            res.json({ 
                'status': 'Successful', 
                'message': "Products list", 
                'products': products })

        })
        .catch(err => {
            console.error(err);
            next(err)
        });

};



//Add new product
productCtrl.newProduct = (req, res, next) => {
    //Validate the required keys
    const keys = ['name','description', 'price']
    keys.forEach(key => {
        if (!(key in req.body)){
            console.error(`The key '${key}' was not found`)
            res.status(400)
            res.json({
                'status': 'Error',
                'message': `The key '${key}' was not found`
              })
        }

    })

    //Fill new products schema
   const newProduct = {
        'product': {
            'title': req.body['name'],
            'body_html': req.body['description'],
            'variants': 
            [{
                'price': req.body['price']
            }]
        }
    }

    axios.post(url, newProduct)
        .then(response => {
            res.json({ 
                'status': 'Successful', 
                'message': "Product created",
                'response' : response.data})
        })
        .catch(err => {
            console.error(err);
            next(err)
        });

};

module.exports = productCtrl;

