[<< Back to Main](../README.md)

# Overview

You are hired as a web developer for UBC bookstore to develop a website to sell their products online. As a part of your job you are going to build an online store where you can list different items that can be sold online. Students can register on the website, browse all the available products, check out availability, read product description and purchase any of the listed items.


# Assignment 1

For the first part of this project, you will need to build the homepage for the online store. Below is a wireframe of how the web page should look:

![layout.png](./layout.png?raw=true "Web Page Wireframe")

You are free to choose colours and fonts of your own choice.

**For this assignment, you will be using HTML and CSS to define the layout of a web page and apply styles to different DOM elements. There is no JavaScript required for this assignment, so you will be penalized if you use JavaScript for this assignment.**


## Directory Structure

To help you get started, you will need to structure your project like the following. **Submission instructions are given in the end of this document.**

```
/css/
/js/
/images/
/index.html
```

* Root folder (all html files go in this folder)
  * css
    * (all stylesheets go in this folder)
  * js
    * (all JavaScript files go in this folder)
  * images
    * (all images go in this folder)
  * index.html (this should be the entry point to your website)


## Tasks

1. [HTML] Create the html layout that will be required to generate the web page provided in the screenshot. Your homepage should include the following elements:
    
    * Header (div id=header)
        * Logo (img id=logo)
        * Welcome Banner (img id=banner)
    * Main Content (div id=content)
        * Navigation Menu (ul id=menu)
            * Menu Item 1 (li class=menuItem)
            * Menu Item 2 (li class=menuItem)
            * Menu Item 3 (li class=menuItem)
        * Product List (ul id=productList)
            * Product 1 (li class=product)
            * Product 2 (li class=product)
            * Product n (li class=product)
    * Footer (div id=footer)

    * **You can find and download all the product images that you will be displaying on the home page [HERE](./images/). The product name and price are indicated in the file name.**

2. [CSS] Create a CSS stylesheet to add relevant styles that would help you design the layout for the web page. A few things to keep in mind:
    * The width of the content within the website should be 1000px.
    * The content should be centered within the web page.

3. [CSS] You need to add some interactivity to the website using pure css (no javascript is required for these tasks, so *please do not use JavaScript*)
    * A) When you hover over any of the items in the navigation menu, the **text and background color should be changed**. As soon as you move the mouse pointer away, the color should be restored back to the original color.
    * B) When you hover over any of the product, the **background color around the product should change, and the price should become visible on top of the product image**. As soon as you take the mouse pointer away, the price should disappear and the background should revert to its original color.


## Testing

**To test your code, insert the following script tags in the head tag of your page**
```
<script src="http://ece.ubc.ca/~kumseok/src/cpen400a/jquery-3.3.1.min.js" type="text/javascript"></script>
<script src="http://ece.ubc.ca/~kumseok/src/cpen400a/test-1.js" type="text/javascript"></script>
```
You will see a red button on the top-right corner of your web page. Click it to test your code.

* Note that you do not need to setup any server to host the webpage you are creating. Simply open the html pape with any browser, the webpage will be displayed.

* The marks and feedback you get from the test script is for your debugging purposes. **Those marks are not used for grading.**


## Marking

There are 3 tasks for this assignment:
* Task 1: 2 Points
* Task 2: 2 Points
* Task 3:
  * A: 3 Points
  * B: 3 Points


## Submission instructions:

* For each assignment, create a branch called `assignment-{number}` (case-sensitive, note the hyphen), for ex: `assignment-1`, `assignment-2`, * etc.
    * The TAs use a script to automate the checkout process, so it is **important that the branch name follows the format**
    * You can create as many branches as you want, but we will only mark the branch that follows this naming format
* Make sure you push your changes to that branch before midnight (11:59 PM) on the date of the assignment deadline - late submissions will not be accepted.
    * We will be downloading the code on the midnight of the due date, any changes to code after that point will not be considered for marking.

* For a step-by-step walk-through of the submission procedure, go [here](../tutorials/git-setup.md)


### Deadline:

These deadlines will be strictly enforced; we won't be looking at any commits done after this time-stamp.

* L1A, L1B, and L1C - Monday, September 23, 2019 23:59:59 PST

Feel free to create the branch *assignment-N* from the beginning and make incremental commits. Doing it this way you would still have partially completed work even if you accidentally forget to push the final commit on the day of the deadline. We will `checkout` the most recent commit time-stamped before the deadline. For this Assignment 1, the branch should be called `assignment-1`.
