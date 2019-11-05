[<< Back to Main](../README.md)

# Assignment 4

This assignment builds on the work you have done for [Assignment 3](./assignment-3.md).

In this assignment you will focus on interacting with a remote server. Here is a high-level overview of what you will be doing:

* Fetch the products from a remote server using AJAX
* Implement the first part of the cart check-out routine


## Tasks

The following URLs can be used for this assignment:
* `https://cpen400a-bookstore.herokuapp.com/products` - returns object containing all the products
* `https://cpen400a-bookstore.herokuapp.com/products/<itemName>` - returns a single product identified by `<itemName>` 
* `https://cpen400a-bookstore.herokuapp.com/test/reliable` - the reliable version of `/products` endpoint
* `https://cpen400a-bookstore.herokuapp.com/test/error` - this endpoint always returns error

1. (2 Points) [JS] First we will make some minor modifications to prepare for integration with server-side logic:
    * Remove the `products` variable as we no longer need it.
    * Modify the constructor function of `Store` like the following:
        * The constructor should now have the signature `function Store(serverUrl)`.
        * Initialize the property `serverUrl` with the argument passed to the constructor function.
        * Instead of initializing the `stock` property with `initialStock`, assign an empty object.
    * Modify the initialization of the `store` variable accordingly, passing in `https://cpen400a-bookstore.herokuapp.com` as the argument. (previously you passed in the `products` object)
    * Modify the anonymous function you assigned to `store.onUpdate` so that if `itemName` is not given, the entire product list is redrawn (by invoking `renderProductList` with the appropriate arguments).

2. (5 Points) [JS] Write a reusable function that can be used for making AJAX calls. [jQuery](http://jquery.com) has a `$.get(url, callback)` function, which can be used to make XMLHttpRequests to servers and get back data. For this task you will be writing a similar function with the following signature: `ajaxGet(url, onSuccess, onError)`.
    * The first argument `url` is a string representing the URL to make request to.
    * The second argument `onSuccess` is a function that is called if the request was successful, and it takes in a single argument - the response returned from the server.
    * The third argument `onError` is a function that is called if the request ultimately failed, and it also takes in a single argument - the error of the request.
    * The remote server you are fetching the data from is not very reliable. Sometimes, instead of returning the product list the server takes a long time, which causes the AJAX request to time out. Also, sometimes the server returns error 500 instead of the product list. In either case, you will need to retry the request until you get the list of products from the web server. If you are still unable to get a response after 3 retries, invoke the `onError` callback function.
    * Upon successfully receiving a response, invoke the `onSuccess` callback function. Convert the response payload into a JavaScript object and then pass it as the argument.

You should be able to use the function like this:

```
ajaxGet("https://cpen400a-bookstore.herokuapp.com/products",
	function(response){
		// do something with the response
	},
	function(error){
    // this function should be invoked only after all 3 retries have failed.
		// do something with the error
	}
);
```

To help you get started, here is [some reference to the XMLHttpRequest API](https://www.w3schools.com/xml/xml_http.asp).

3. (4 Points) [JS] Define a method for `Store` with the following signature: `syncWithServer(onSync)`
    * The first argument `onSync` is a function that is called after the `Store` instance has successfully synchronized its `stock` with the server.
    * Using the `ajaxGet` function you wrote above, make a request to the server. The URL to use is the value of `serverUrl` property plus `"/products"`.
    * The response returned from the server has the same structure as `products` variable we've been using so far. Upon succesfully receiving a response, compute a "delta" object with the following structure (the "delta" object tells us about what has been changed since the last time we synchronized. The example below corresponds to the case where the price of `Box1` changed from `10` to `5` and the quantity from `5` to `8`):
    ```
    var delta = {
        'Box1': {
            price: -5,
            quantity: 3
        }
    }
    ```
    * Once you've computed the "delta" object, update the `stock` property using the object fetched from the server. You will need to pay close attention when updating the quantity of items (if some items are currently in the cart, can you simply replace the `stock` with the new stock object?). After that, invoke the store instance's `onUpdate` function with no arguments to trigger re-rendering of the view.
    * If `onSync` argument was provided, call it and pass in the "delta" object as the argument.
    * Finally, after you have initialized the `store` variable, call this `syncWithServer` method with no arguments.

4. (4 Points) [JS] You will implement the first part of the check-out routine in this task; the rest of the check-out procedure will be completed in the next assignment.
    * A) Create a "Check Out" button with id `btn-check-out` in your cart modal. Bind a click event listener that does the following:
        * First, disable the button to prevent multiple clicks.
        * Then call `storeInstance.checkOut`, passing in a callback function.
        * Re-enable the button in the callback function.
    * B) Define a method for `Store` with the following signature: `checkOut(onFinish)`.
        * This method should first invoke the `syncWithServer` method to check that the items are still available. Pass in a callback function with the signature `function(delta)`.
        * In the callback function, if there was a change in the stock (i.e. if `delta` is not an empty object), alert the user of the changes. One alert can show all the changes, for example:
        ```
        Price of Jeans changed from $50 to $60
        Quantity of Fancy Keyboard changed from 7 to 3
        ```
        * If there was no change in the stock and everything is okay to check out, alert the user the total amount due. (In the next assignment, we will be replacing this part with the actual check-out request)
        * If `onFinish` argument was provided, call it.


## Testing

**To test your code, insert the following script tags within the head tag of your page**
```
<script src="http://ece.ubc.ca/~kumseok/src/cpen400a/jquery-3.3.1.min.js" type="text/javascript"></script>
<script src="http://ece.ubc.ca/~kumseok/src/cpen400a/test-4.js" type="text/javascript"></script>
```
You will see a red button on the top-right corner of your web page. Click it to test your code.
Watch out for the alert messages which tell you any missing components/functionalities. You are responsible for ensuring that all the functionalities above are implemented correctly - the tests are only there to help you. We reserve the right to test your code with other test cases than the above.

* The feedback you get from the test script is for your debugging purpose only; **they are not used directly for grading.**


## Marking

There are 4 tasks for this assignment (Total 15 Points):
* Task 1: 2 Points
* Task 2: 5 Points
* Task 3: 4 Points
* Task 4:
  * A: 1 Points
  * B: 3 Point


## Submission instructions:

* Create a branch called `assignment-4`.
* Update the code to reflect the changes for this assignment.
* Make sure you commit and push your changes before the due date - late submissions will not be accepted.


### Deadlines:

These deadlines will be strictly enforced; we won't be looking at any commits done after this time-stamp.

* L1A, L1B and L1C - Tuesday, November 12, 2019 23:59:59 PST


## Labs are mandatory on the week of assignment submission:

* If you cannot attend the lab to demo your assignment for any reason, you need to notice Instructors on Piazza at least 24 hours before the lab section starts. Otherwise, you will be recorded as no attendance and will have marks deducted.
