# shopify-middleware

Middleware with the Node.js(v12.16.0) Express framework, to use the Shopify API.


In shopifyAuth.json are the credentials for ShopifyAPI

The listening port is 3000

## Authenticacion
You need use a BasicAuth in the header request, If you provide incorrect credentials or not provide, you get an error message like:

{
  "status": "Error",
  "message": "Not authorized. Authentication is required and has not yet been provided"
}

## Get Products
To get all products, you make a GET request:
>yourhost:3000/api/products

The ouput will be like:

{
  "status": "Successful",
  "message": "Products list",
  "products": [
    {
      "name": "tProduct1",
      "description": "This is the tProdut1's description",
      "image": "https://cdn.shopify.com/s/files/1/...",
      "price": "1000.00"
    },
    {
      "name": "tProduct2",
      "description": "This is tProduct2's description =0",
      "image": "https://cdn.shopify.com/s/files/1/...",
      "price": "2000.00"
    },
    {...} ,
    {...}
}


## Create a new product
To create a new product, you make a POST request:
>POST: yourhost:3000/api/products

Following schema as example: 

    {
        "title": "This is a name example",
        "description": "This is a description example",
        "price": "5000"
    }


This request produce a response

    {
    "status": "Successful",
    "message": "Product created",
    "response": {
        "product": {
            "id": 4618856661123,
            "title": "This is a name example",
            ...
            }
        }
    }
