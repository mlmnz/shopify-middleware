const axios = require('axios');


// Products controller def
const productCtrl = {};

// Credentials, apiversion from Shopify
const shopifyAPI = require('../shopifyAuth.json');

//URL Format
const url = 'https://'.concat(shopifyAPI.apiKey, ':',
    shopifyAPI.password, '@',
    shopifyAPI.hostname, '/admin/api/',
    shopifyAPI.apiVer);




// Get all products from db
productCtrl.getProducts = (req, res, next) => {

    axios.get(url + '/products.json')
        .then(response => {
            //console.log(response.data);
            const filterjson = [];
            const json = response.data.products;

            json.forEach(e => {
                const tmp = {
                    title: e.title,
                    description: e.body_html,
                    image: e.image.src,
                    price: e.variants["0"].price
                };
                filterjson.push(tmp);
 
            });
            console.log(filterjson);
            res.json(filterjson);

        })
        .catch(err => {
            console.log(err);
            res.json("status:error")
        });

};



//Add new product
 productCtrl.newProduct = (req, res, next) => { };

module.exports = productCtrl;

