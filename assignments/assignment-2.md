[<< Back to Main](../README.md)

# Assignment 2

This assignment builds on the work you have done for [Assignment 1](./assignment-1.md).

For this assignment you will be implementing the "Shopping Cart" functionality. Here is a high-level overview of what you will be doing:

* Create a "Store" object to keep track of the application's state
* Create "Add to Cart", "Remove from Cart" buttons
* Create a "Show Cart" button to see the items in the cart
* Create a timer to track user inactivity


## Directory Structure

Same as assignment 1, except this time it will include a JavaScript file that describes your application.

```
/css/
/js/
    /app.js
/images/
/index.html
```

In the above example `app.js` will have all your JavaScript code. You should include this in your `index.html` as a `<script>` tag.


## Tasks

1. (2 Points) [JS] Define a constructor function with the signature `function Store(initialStock)`, which will be used to instantiate a `Store` object. This `Store` object will keep track of the items in the store and the items in the cart. *Although we do tolerate the use of ES6 for the assignments, for this Task **do not use the ES6 `class`***.
    * A) The constructor function should initialize the following properties:
        * `"stock"` - initialize it with `initialStock` passed as the argument to the constructor
        * `"cart"` - initialize it with an empty object (i.e. associative array)
    * B) Define the following methods for `Store` (i.e. prototype functions) - You don't need to implement the function body yet; you will do that in Task 5:
        * `addItemToCart(itemName)`
        * `removeItemFromCart(itemName)`

2. (1 Point) [JS] Create a **global variable** named `products` and then assign it an associative array (i.e. an object) that will store information about the products.
    * The keys of this object should be the names of the product (e.g. `"Box1"`) found in the file names of the [product images](./images/) we provided in assignment 1.
    * The value corresponding to each key should be yet another associative array, storing information about a product. The object should have the following properties:
        * `"label"` - `(string)` Human friendly name of the product
        * `"imageUrl"` - `(string)` The URL of the product image
        * `"price"` - `(number)` The price of the product
        * `"quantity"` - `(number)` The quantity of the product **(initialize this to 5 for all products)**

3. (1 Point) [JS] Create a **global variable** named `store` and then assign a new instance of `Store` you defined in Task 1. Use the `product` object created in Task 2 as the argument.

4. (2 Points) [HTML] For each product box, create "Add to Cart" and "Remove from Cart" buttons that are shown when the mouse pointer is over it:
    * A) Use `btn-add` as the class name for the "Add to Cart" button. When clicked, this button should invoke `addItemToCart` method of the `store` object you instantiated in Task 3, using the appropriate item name as the argument.
    * B) Use `btn-remove` as the class name for the "Remove from Cart" button. When clicked, this button should invoke `removeItemFromCart` method of the `store` object you instantiated in Task 3, using the appropriate item name as the argument.

5. (4 Points) [JS] Implement the following methods of `Store`:
    * A) `addItemToCart(itemName)` - this function should accept a string argument `itemName`. If the cart object already has a value corresponding to this key, increment it. If not, set it to 1. Decrement the quantity in the stock accordingly. Handle cases where the stock does not have the item anymore.
    * B) `removeItemFromCart(itemName)` - this function should accept a string argument `itemName`. If the cart object has a value corresponding to this key, decrement it. Increment the quantity in the stock accordingly. If the quantity in the cart becomes 0, delete the entry in the cart.

6. (2 Points) [JS+HTML] Implement a function with the signature `showCart(cart)`, which **invokes an `alert` to display the contents of the given cart object** as shown below in the example. Then create a "Show Cart" button with id=`btn-show-cart` somewhere in your HTML, which, when clicked, will invoke the `showCart` function with the appropriate cart object.

```
Box1 : 3
Jeans : 1
Keyboard : 2
```

7. (3 Points) [JS] Create a **global variable** named `inactiveTime` and initialize it to `0`. Then implement an "Inactivity Tracker" feature using `setInterval` or `setTimeout`. Use the global `inactiveTime` variable to keep track of how much time has elapsed. If the user does not perform any action (adding item to cart, removing item from cart, viewing cart) within **30 seconds** since the last time an action was performed, an `alert` should be displayed with a message (e.g. "Hey there! Are you still planning to buy something?"). Clicking OK on the alert should reset the timer. At any point, if the user performs an action, the timer should be reset as well.


## Testing

**To test your code, insert the following script tags within the head tag of your page**
```
<script src="http://ece.ubc.ca/~kumseok/src/cpen400a/jquery-3.3.1.min.js" type="text/javascript"></script>
<script src="http://ece.ubc.ca/~kumseok/src/cpen400a/test-2.js" type="text/javascript"></script>
```
You will see a red button on the top-right corner of your web page. Click it to test your code.
Watch out for the alert messages which tell you any missing components/functionalities. You are responsible for ensuring that all the functionalities above are implemented correctly - the tests are only there to help you. We reserve the right to test your code with other test cases than the above.

* The feedback you get from the test script is for your debugging purpose only; **they are not used directly for grading.**


## Marking

There are 7 tasks for this assignment (Total 15 Points):
* Task 1: 2 Points
* Task 2: 1 Point
* Task 3: 1 Point
* Task 4:
  * A: 1 Point
  * B: 1 Point
* Task 5:
  * A: 2 Point
  * B: 2 Point
* Task 6: 2 Points
* Task 7: 3 Points


## Submission instructions:

* Create a branch called `assignment-2`.
* Update the code to reflect the changes for this assignment.
* Make sure you commit and push your changes before the due date - late submissions will not be accepted.


### Deadlines:

These deadlines will be strictly enforced; we won't be looking at any commits done after this time-stamp.

* L1A, L1B and L1C - Monday, October 7, 2019 23:59:59 PST


## Labs are mandatory on the week of assignment submission:

* If you cannot attend the lab to demo your assignment for any reason, you need to notice Instructors on Piazza ahead of at least 24 hours before the lab section starts. Otherwise, you will be recorded as no attendance and will have marks deducted.
