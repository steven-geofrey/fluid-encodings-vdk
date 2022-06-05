/* DEFINE SOME VARIABLES */

const myName = "Steven";

/* Start demonstration using 'const':
const currentDay = "Monday";
*/
let currentDay = "Monday";

/* Start demonstration using 'const':
const greeting = `Happy ${currentDay}, ${myName}.`;
*/

let greeting = `Happy ${currentDay}, ${myName}.`;
console.log(myName);
console.log(greeting);

/*
USE SOME FUNCTIONS

In the following section, we use JavaScript to determine
the current date and time with `new Date()`. This code pattern
constructs a new JavaScript Date object that stores information
about the date, time, and timezone.

But this information is in an ugly and hard-to-read format!
Once we have the date and time, we can extract specific
parts of it that we want and need, like the weekday,
month and date, and time with AM/PM.

To extract this information, we can use a function that is
built into D3: d3.timeFormat().

We will use this function in the following way:

d3.timeFormat(FORMAT)(DATETIME)

In this pattern, DATETIME is the value returned by
the new Date() pattern.

FORMAT is a special formatted string value that tells
the browser how to format the various components
of the JavaScript Date object. With this, we can
extract specific parts of the date by using special
symbols and letters. In the examples below, the following
symbols are used:

%B: Full month name (e.g., October)
%e: Day of month, without leading zeroes (e.g., 9)
%I: Hour of day, in 12-hour time (e.g., 10)
%H: Hour of day, in 24-hour time (e.g., 15 for 3 PM)
%M: Minute of time
%p: AM or PM
%A: Full name of day (e.g., Friday)

For example, the formatting string "%H:%M" would
produce a formatted time of "10:05", or "08:45", etc.

For a list of formatting symbols, see:
https://github.com/d3/d3-time-format#locale_format

*/


const currentDateTime = new Date();
const currentDate = d3.timeFormat("%B %e, %Y")(currentDateTime);
const currentTime = d3.timeFormat("%I:%M %p")(currentDateTime);

/* Notice on the next line we don't use 'const'!
This is because the variable 'currentDay' has been
declared already, earlier in the code;
we aren't creating a NEW variable, but changing
the value of an EXISTING variable. */
currentDay = d3.timeFormat("%A")(currentDateTime);

/* This returns an error!
const greeting = `Happy ${currentDay}, ${myName}.`;

For two reasons: first, the variable has already
been declared with the same name; second, we declared
the variable with "const" and are trying to change
its value, which isn't allowed!

*/

greeting = `Happy ${currentDay}, ${myName}.`;
const infoMessage = `Today's date is ${currentDate}. The current time is ${currentTime}.`;



/*
USE THE VARIABLES TO CHANGE PAGE CONTENT

When we define the variables above, they exist in the browser's
memory, but they're just sort of...stuck there.

More usefully, we can insert the values of those variables
into placeholders in the page, to dynamically generate
new content.

To do this, we can use another D3 function: d3.select().

The d3.select() function enables us to grab an element
in the document. Inside the parentheses, we place a valid
CSS selector, in quotation marks.

For example, if we wanted to grab an element with the ID
value of "welcome--name", the selector for this would
be "#welcome--name" -- we write the selector in the exact
same way we would if we were writing a CSS rule!

Once we have grabbed an element, we can change its contents
using a slightly longer pattern:

d3.select(SELECTOR).html(NEWCONTENTS)

In the examples below, we grab some heading elements
in the document, and then replace their contents
with the values of variables we defined above.

DEMO NOTE: After doing the following, demonstrate
what happens when move <script> element into <head>
of HTML -- in JS, can only refer to elements if 
browser knows they exist already

*/


d3.select("#welcome--name").html(greeting);
d3.select("#welcome--greeting").html(infoMessage);


/* 
Below are some more complex examples:
We can also pass in HTML markup as a string value
into d3.select().html(), which will create
a new element! */

const link1 = "https://www.northeastern.edu";
const link2 = "https://canvas.northeastern.edu";

d3.select("#link1").html(`<a href='${link1}'>Northeastern Homepage</a>`);
d3.select("#link2").html(`<a href='${link2}'>Northeastern Canvas</a>`);




/*
DRAW SOME SHAPES

Now that we have our greetings, let's add some
colorful design elements. In the section below, we
will do this by drawing shapes on the screen.

In the past when we've drawn shapes, we have manually
and explicitly given values for things like position
and size. In this example, we will use variables --
and some help from some new code patterns --
to randomly draw some shapes with different colors
in different places of the screen.

Some useful code patterns demonstrated below:

window.innerWidth: Returns the width of the browser window
window.innerHeight: Returns the height of the browser window

*/

const width = window.innerWidth;
const height = window.innerHeight;
const svg = d3.select("#background")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

svg.append("circle")
    .attr("cx", Math.random() * width)
    .attr("cy", Math.random() * height)
    .attr("r", 100 + Math.random() * 200)
    .attr("fill", "#ccebc5")
    .attr("opacity", 0.4);

svg.append("circle")
    .attr("cx", Math.random() * width)
    .attr("cy", Math.random() * height)
    .attr("r", 200 + Math.random() * 200)
    .attr("fill", "#decbe4")
    .attr("opacity", 0.4);

svg.append("circle")
    .attr("cx", Math.random() * width)
    .attr("cy", Math.random() * height)
    .attr("r", 300 + Math.random() * 200)
    .attr("fill", "#fed9a6")
    .attr("opacity", 0.4);







/*
DRAW SOME MORE SHAPES

Using a pattern similar to that above, use Math.random()
to draw at least 2 lines and 2 squares at random positions
across the screen.

Your lines and rectangles should have an opacity of 0.4,
but their color can be anything else that you want.

*/

svg.append("line")
    .attr("x1", Math.random() * width)
    .attr("y1", Math.random() * height)
    .attr("x2", Math.random() * width)
    .attr("y2", Math.random() * height)
    .attr("stroke","steelblue")
    .attr("stroke-width",2)
    .attr("opacity",0.4);

svg.append("line")
    .attr("x1", Math.random() * width)
    .attr("y1", Math.random() * height)
    .attr("x2", Math.random() * width)
    .attr("y2", Math.random() * height)
    .attr("stroke","steelblue")
    .attr("stroke-width",2)
    .attr("opacity",0.4);

svg.append("line")
    .attr("x1", Math.random() * width)
    .attr("y1", Math.random() * height)
    .attr("x2", Math.random() * width)
    .attr("y2", Math.random() * height)
    .attr("stroke","steelblue")
    .attr("stroke-width",2)
    .attr("opacity",0.4);

svg.append("rect")
    .attr("x", Math.random() * width)
    .attr("y", Math.random() * height)
    .attr("width", 50)
    .attr("height", 50)
    .attr("fill", "steelblue")
    .attr("opacity",0.4);

svg.append("rect")
    .attr("x", Math.random() * width)
    .attr("y", Math.random() * height)
    .attr("width", 50)
    .attr("height", 50)
    .attr("fill", "steelblue")
    .attr("opacity",0.4);

svg.append("rect")
    .attr("x", Math.random() * width)
    .attr("y", Math.random() * height)
    .attr("width", 50)
    .attr("height", 50)
    .attr("fill", "steelblue")
    .attr("opacity",0.4);
