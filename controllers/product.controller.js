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
            console.log(response.data);
            const filterjson = [];
            const json = response.data.products;

            json.forEach(e => {

        // If we'll get a product without image, avoid error and say 'No data found'        
        var im;
                try {
                    im = e.image.src;
                  }
                  catch(error) {
                    console.error(error);
                    im = "No data"
     
                  }

                const tmp = {
                    title: e.title,
                    description: e.body_html,
                    image: im,//e.image.src;
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
productCtrl.newProduct = (req, res, next) => {

    axios.post(url + '/products.json', {
        "product": {
            title: req.body.title,
            body_html: req.body.description,
            variants: [{
                price: req.body.price
            }]
        }
    }).then(response => {
        res.json(response.data)
    }).catch(e => {
        console.log(e);
        res.json(e);
    });

};

module.exports = productCtrl;

