# shopify-middleware

Middleware with the Node.js(v12.16.0) Express framework, to use the Shopify API.


In shopifyAuth.json are the credentials for ShopifyAPI

The listening port is 3000

You need use a BasicAuth in the header


To get all products, you make a GET request:
GET: yourhost:3000/products




To create a new product, you make a POST request:
POST: yourhost:3000/products

Following schema has example: 

    {
        "title": "tProduct5",
        "description": "This is tProduct3's description =)",
        "price": "5000.00"
    }




