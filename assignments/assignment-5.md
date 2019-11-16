[<< Back to Main](../README.md)

# Assignment 5

This assignment builds on the work you have done for [Assignment 4](./assignment-4.md).

In this assignment you will focus on building the backend service for the bookstore. Here is a high-level overview of what you will be doing:

* Set up a MongoDB database
* Build a simple web server using Node.js
* Build a check-out routine using AJAX POST


## Dependencies

1. You will need [Node.js](https://nodejs.org) to complete this assignment, so please install Node.js if you haven't done so yet. Node.js comes with a tool called NPM (Node Package Manager), which you can use to download Node.js modules written by other people. After you have installed Node.js, you will need the following NPM modules (but *don't install these NPM modules yet*, you will do this in Task 1):
    * `express` (npm)
    * `mongodb` (npm)

2. You will also need [MongoDB](https://docs.mongodb.com/manual/administration/install-community/) to store the data that your application will be accessing.

3. In addition, we provide you with a boilerplate and a some utility functions - you will find them in the instructions below.


## Tasks

We use the following object schemas to describe the structure of objects:
```
Product = {
    "_id": ObjectId(String),
    "label": String,
    "price" : Number,
    "quantity" : Number,
    "imageUrl": String,
    "category": String
}

ProductArray = [ Product, Product, Product, ... ]

Products = {
    Product._id: {
        "label": Product.label,
        "price": Product.price,
        "quantity": Product.quantity,
        "imageUrl": Product.imageUrl,
    },
    Product._id: {
        "label": Product.label,
        ... 
    },
    Product._id: {
        "label": Product.label,
        ... 
    },
    ...
}

Cart = {
    Product._id: Number,
    Product._id: Number,
    Product._id: Number,
    ...
}

Order = {
    "_id": ObjectId(String),
    "client_id": String,
    "cart": Cart,
    "total": Number
}

Query = {
    minPrice: Number|String,
    maxPrice: Number|String,
    category: String
}
```
For example, when we refer to a "`Product` object" in the instructions below, we mean an object with fields `"label"`, `"price"`, `"quantity"`,`"imageUrl"`,`"category"` as shown in the schema above. The field `"_id"` exists in the case of a MongoDB document.


1. (2 Points) We will take a few small steps first to prepare for "full-stack" development.
    * A) **Reorganize your project directory** to include the server application. A [boilerplate](../server-boilerplate/) of the application has been provided for you and you're welcome to copy it and start from there (if you copied it before, take a look at it again as it's been updated). Your project directory should now have the following structure:
        ```
        /public/
            /css/
            /js/
            /index.html
        /index.js
        /initdb.mongo
        /package.json
        /StoreDB.js
        ```
        * When you're moving things within your project directory, **make sure you don't move the `.git` directory and `.gitignore` file**.
        * Make sure in your `.gitignore` file, you have a line `**/node_modules/**` (you should already have this as we included it upon setting up the repo). This tells `git` not to commit your NPM dependencies.
        * The `/public/` directory should now contain the files you had until now (up to `assignment-4`).
        * You can now *remove* the `/images` directory as you will be fetching the images from a different server.
        * Once you've reorganized the directory, install the NPM dependencies mentioned above. You should see a `/node_modules` directory once you've installed them.
        * If everything is set up properly, you should now be able to serve your client-side application by typing `node index.js` (`index.js` is your server application). The server should bind to port 3000 and your client app should be accessible via a browser at [`http://localhost:3000`](http://localhost:3000).
    * B) **Initialize the database using the [script provided](../server-boilerplate/initdb.mongo)**. Start a Mongo Shell by typing `mongo`, then load the script by `load("initdb.mongo")`. It initializes two collections, `products` and `orders`, and it will populate your database with the product list. You can type `db.products.find()` to see if the products were entered properly. If you need to reset your database, simply repeat the `load` command.
    
2. (2 Points) [JS+HTML] To interact with the server, we will make some modifications in the client app. To help you focus on server-side development, we're providing you with some client-side functions that you can copy+paste into your application. You will need to set up the rest of your code to properly integrate the functions we're providing.
    * A) In `assignment-4` you initialized `store` with the URL `https://cpen400a-bookstore.herokuapp.com`. Change this URL and use the URL of your server instead.
    * B) Declare a new global variable `displayed` and assign an empty array. This array will store the keys of products that should be displayed in the view.
    * C) Previously in the `renderProductList` function, you iterated over the keys of `storeInstance.stock`. Modify this loop to iterate over the `displayed` array.
    * D) Previously, after you initialized the `store` instance, you called `store.syncWithServer` with no arguments. Now pass in a callback function with signature `function(delta)`. In the callback function, update the `displayed` array, assigning the keys of the `delta` object. Then invoke `renderProductList` with the appropriate arguments.
    * E) We are providing [2 functions for you to use here](./assignment-5-client.js). Copy them into your client application. You are also welcome to write your own or modify the given code, but you will be responsible for making them work.
        * The first is a `Store` method called `queryProducts` with the signature `function(query, callback)`. This method takes in a `query` object, makes an AJAX GET request with the appropriate query string, then invokes `onUpdate` upon getting a response, and finally invokes the `callback` function.
        * The second is a rendering function named `renderMenu` with the signature `function(container, storeInstance)`. It renders the product category menu and the price filters on the given DOM element.
    * F) To use the provided functions, replace the `#menu` element with a `div#menuView` in your HTML. This is where you will render the product category menu. In your JavaScript where you define `store.onUpdate` handler, add a call to `renderMenu`, passing in the appropriate arguments.

3. (3 Points) [JS] We can use the `mongodb` library to interact with the database. However, the API provided by the module are quite low-level and we want to abstract out these details so we don't have to call the low-level methods all the time. In this task we will write a `StoreDB` object that will take care of the low-level operations. We have provided a [template for `StoreDB`](../server-boilerplate/StoreDB.js), which you will complete.
    * A) Complete the implementation for `StoreDB.prototype.getProducts`.
        * It should accept a single argument `queryParams`, which is a `Query` object.
        * It should find documents in the MongoDB `products` collection, filtered according to the `queryParams` object.
        * If `"minPrice"` is given, the result should only contain products with price higher than or equal to `"minPrice"`.
        * If `"maxPrice"` is given, the result should only contain products with price lower than or equal to `"maxPrice"`.
        * If `"category"` is given, the result should only contain products with category equal to `"category"`.
        * Any combination of the above query parameters should work.
        * It should return a `Promise` that resolves to a `Products` object we've been working with so far (not the raw MongoDB result). Make sure you don't return an array (while the standard practice is returning an array, we'll return an associative array so that we don't have to make a lot of changes on the client side)
    * B) `require` the module `StoreDB.js` in your server application (i.e. `index.js`). Then declare a variable `db`, assigning a `StoreDB` instance initialized with the appropriate arguments (look in `initdb.mongo` for the database name).

4. (2 Points) [JS] In your server app, **create a HTTP `GET` endpoint `/products`** that returns the products in the database.
    * Use the [Express.js API](https://expressjs.com/en/4x/api.html#app) to define a GET endpoint.
    * The handler for this endpoint should use `db.getProducts` to read a `Products` object.
    * The handler should pass a `Query` object (created from the query-string) as the argument into `db.getProducts` function.
    * If the database operation was successful, send the `Products` object as a JSON object.
    * If the database operation was unsuccessful, set the response status to 500 and send an error message.

5. (1 Point) [JS] Write a reusable function that can be used to make an AJAX POST request, similar to the `ajaxGet` function you implemented in `assignment-4`. The function should have the following signature: `ajaxPost(url, data, onSuccess, onError)`.
    * The first argument `url` is a string representing the URL to make request to.
    * The second argument `data` is the object to attach as the payload of the request.
    * The third argument `onSuccess` is a function that is called if the request was successful, and it takes in a single argument - the response returned from the server.
    * The fourth argument `onError` is a function that is called if the request failed or timed out, and it also takes in a single argument - the error of the request.
    * Unlike `ajaxGet`, you *do not need to retry* the request in case of failure; simply invoke the `onError` callback with the appropriate error.
    * Upon successfully receiving a response, invoke the `onSuccess` callback function. Convert the response payload into a JavaScript object and then pass it as the argument.
    * The request payload should be a **JSON string**, and the request header should be set accordingly to indicate that the payload is JSON (i.e. the `Content-Type` header should be `"application/json;charset=UTF-8"`).

You should be able to use the function like this:

```
ajaxPost("http://localhost:3000/checkout",
    {
        // some object
    },
    function(response){
        // do something with the response
    },
    function(error){
        // do something with the error
    }
);
```

6. (1 Point) [JS] Update `Store.prototype.checkOut` to make an actual AJAX POST request.
    * In the place where you alert the user the total amount due, remove the alert and use `ajaxPost` to make an AJAX POST request to the `/checkout` endpoint.
    * You should pass in an `Order` object as the `data` argument for the `ajaxPost` call.
        * You can generate a random number to use for the `client_id` field.
        * `cart` field should be the current `cart` object.
        * `total` field should be the total amount due.
    * If POST request is successful, do the following:
        * alert the user that the items were successfully checked out.
        * set the `cart` to an empty object.
        * invoke `onUpdate` with no arguments.
    * If POST request is unsuccessful, do the following:
        * alert the user about the error

7. (2 Points) [JS] In `StoreDB.js`, complete the implementation for `StoreDB.prototype.addOrder`.
    * It should accept a single argument `order`, which is an `Order` object.
    * It should insert an `Order` document in the MongoDB `orders` collection.
    * It should also decrement the quantities in the `products` collection accordingly. That is, if `cart` field contains `{ Box1: 3 }`, 3 should be decremented from the product with `_id` = `"Box1"` in the `products` collection.
    * It should return a `Promise` that resolves to the ObjectId of the newly inserted Mongo Document.

8. (2 Points) [JS] **Create a HTTP `POST` endpoint `/checkout`** that accepts an order and inserts it in the database.
    * The handler for this endpoint should accept an `Order` object in the payload of the request, *sanitize the object*, and then use it as the argument for `db.addOrder`. By *sanitize* we mean: check that the `Order` object has the correct fields and type-checks.
    * The handler for this endpoint should use `db.addOrder` to insert the order into the database.
    * If the database operation was successful, attach the resolved ID to the response as a JSON object.
    * If the database operation was unsuccessful, set the response status to 500 and add an error message.
    
## Test
To test your code, insert the following script tags within the head tag of your page
```
<script src="http://ece.ubc.ca/~kumseok/src/cpen400a/jquery-3.3.1.min.js" type="text/javascript"></script>
<script src="http://ece.ubc.ca/~kumseok/src/cpen400a/test-5.js" type="text/javascript"></script>
```
You will see a red button on the top-right corner of your web page. Click it to test your code.
Watch out for the alert messages which tell you any missing components/functionalities. You are responsible for ensuring that all the functionalities above are implemented correctly - the tests are only there to help you. We reserve the right to test your code with other test cases than the above.

* The feedback you get from the test script is for your debugging purpose only; **they are not used directly for grading.**


## Marking

There are 8 tasks for this assignment (Total 15 Points):
* Task 1: 2 Points
* Task 2: 2 Points
* Task 3: 3 Points
* Task 4: 2 Points
* Task 5: 1 Point
* Task 6: 1 Point
* Task 7: 2 Points
* Task 8: 2 Points


## Submission instructions:

* Create a branch called `assignment-5`.
* Update the code to reflect the changes for this assignment.
* Make sure you commit and push your changes before the due date - late submissions will not be accepted.


### Deadlines:

These deadlines will be strictly enforced; we won't be looking at any commits done after this time-stamp.

* L1A, L1B and L1C - Tuesday, November 26, 2019 23:59:59 PST


## Labs are mandatory on the week of assignment submission:

* If you cannot attend the lab to demo your assignment for any reason, you need to notice Instructors on Piazza ahead of at least 24 hours before the lab section starts. Otherwise, you will be recorded as no attendance and will have marks deducted.
