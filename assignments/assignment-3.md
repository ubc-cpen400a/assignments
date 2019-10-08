[<< Back to Main](../README.md)

# Assignment 3

This assignment builds on the work you have done for [Assignment 2](./assignment-2.md).

In this assignment you will be focusing on making your application more dynamic. Here is a high-level overview of what you will be doing:

* Dynamically generate the product list
* Dynamically generate the shopping cart modal


## Tasks

Before you begin, you can set the inactivity timeout to 30 minutes or longer so that the alerts don't keep popping up.

1. (5 Points) [JS] Define and implement the following functions.
    * A) `renderProduct(container, storeInstance, itemName)`
        * The first argument `container` is a DOM element *(not a CSS selector string)*
        * The second argument `storeInstance` is an instance of `Store`.
        * The third argument `itemName` is the name of a product (e.g. `"Box1"`)
        * The function should generate a single product box (DOM element) corresponding to `itemName`, then **replace the contents of `container` with this new DOM element**.
        * Conditionally generate "Add to Cart" and "Remove from Cart" buttons:
            * If the quantity of an item in stock is zero, "Add to Cart" button should not be generated.
            * If the quantity of an item in cart is zero, "Remove from Cart" button should not be generated.
        * Make sure that the click handlers on the buttons are working correctly.

    * B) `renderProductList(container, storeInstance)`
        * The first argument `container` is a DOM element *(not a CSS selector string)*
        * The second argument `storeInstance` is an instance of `Store`.
        * The function should generate the product list (DOM element), which so far you had hard-coded in the HTML, and then **replace the contents of `container` with this new DOM element.**
        * Use the `renderProduct` function you created in Task 1A to generate the individual product boxes.
        * On the element **that you pass to `renderProduct`** as the first argument, assign the id `product-<itemName>` where `<itemName>` is the name of each product (e.g. `"Box1"`). *You will need this id later.*

2. (1 Point) [JS+HTML] Remove the hard-coded product list (i.e. #productList) from `index.html` and in its place put a placeholder `<div>` with id `productView`. Then invoke `renderProductList` function with the appropriate arguments to populate this `<div>` element.

3. (2 Points) [JS] If you have completed Task 1 and 2, the product list should now render when you load the page. However, when you add an item to the cart, the "Remove from Cart" button does not show because we are not updating the HTML when our cart object is modified. In this task, you will use a *callback function* to set up a mechanism to re-render the view whenever the application's state is updated.
    * Add a new property `onUpdate` in the `Store` constructor function and initialize it to `null`
    * The `onUpdate` property will later be assigned a function that takes a single argument. In `addItemToCart` and `removeItemFromCart` methods, call `this.onUpdate` function whenever cart or stock is updated, passing in `itemName` as the argument.
    * After the `store` object is instantiated, assign to its `onUpdate` property a function with the signature `function(itemName)`.
        * The first argument `itemName` is the name of a product (e.g. `"Box1"`)
        * This function should call `renderProduct` function with the appropriate arguments. (Hint: use the ids you assigned in Task 1.B)
    * If Tasks 1 ~ 3 are done correctly, the product list should now be updated dynamically.

4. (4 Points) [JS] You will be upgrading the "show cart" functionality to display a modal window instead of an alert. First, define and implement the function with signature `renderCart(container, storeInstance)`:
    * The first argument `container` is a DOM element *(not a CSS selector string)*
    * The second argument `storeInstance` is an instance of `Store`.
    * The function should generate a table (does not need to be specifically a `<table>` element, we just mean "tabular representation") displaying the contents of the cart including the quantity of each item and the total price, and then **replace the contents of `container` with this new DOM element.**
    * The table should also have "+" and "-" `<button>`s for each item, which can be clicked to increment/decrement the quantity. You should invoke the same `addItemToCart` and `removeItemFromCart` methods.

5. (3 Points) [JS+HTML+CSS] You will use the `renderCart` function from Task 4 to complete the "show cart" functionality.
    * In your HTML, place the following elements:
        * `div#modal` as a sibling of `div#footer` element. *It should initially be invisible.*
        * `div#modal-content` as an offspring of `div#modal`
        * `button#btn-hide-cart` as an offspring of `div#modal`
    * The modal should have a semi-transparent dark backdrop, and should be shown in the center of the screen.
    * Update your `showCart` function from `assignment-2` to perform the following instead of showing an alert:
        * Make `div#modal` visible
        * Use `renderCart` to update `div#modal-content`
    * Write a `hideCart` function and invoke it when `button#btn-hide-cart` is clicked. The function should:
        * Make `div#modal` invisible
    * Finally, to automatically re-render the cart content, invoke `renderCart` function with the appropriate arguments in the `onUpdate` function you defined in Task 3.


6. (Bonus 1 point) Hide the cart modal when the user presses **esc** key.


## Testing

**To test your code, insert the following script tags within the head tag of your page**
```
<script src="http://ece.ubc.ca/~kumseok/src/cpen400a/jquery-3.3.1.min.js" type="text/javascript"></script>
<script src="http://ece.ubc.ca/~kumseok/src/cpen400a/test-3.js" type="text/javascript"></script>
```
You will see a red button on the top-right corner of your web page. Click it to test your code.
Watch out for the alert messages which tell you any missing components/functionalities. You are responsible for ensuring that all the functionalities above are implemented correctly - the tests are only there to help you. We reserve the right to test your code with other test cases than the above.

* The feedback you get from the test script is for your debugging purpose only; **they are not used directly for grading.**


## Marking

There are 5 tasks + 1 bonus task for this assignment (Total 15 Points):
* Task 1:
  * A: 4 Points
  * B: 1 Point
* Task 2: 1 Point
* Task 3: 2 Points
* Task 4: 4 Points
* Task 5: 3 Points
* Bonus Task 6: 1 Point

**Bonus mark does not carry over to the next assignment - it is used only to make up for marks lost in this assignment**


## Submission instructions:

* Create a branch called `assignment-3`.
* Update the code to reflect the changes for this assignment.
* Make sure you commit and push your changes before the due date - late submissions will not be accepted.


### Deadlines:

These deadlines will be strictly enforced; we won't be looking at any commits done after this time-stamp.

* L1A, L1B, and L1C - Monday, October 21, 2019 23:59:59 PST


## Labs are mandatory on the week of assignment submission