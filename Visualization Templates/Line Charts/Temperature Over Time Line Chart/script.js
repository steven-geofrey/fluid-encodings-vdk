/* CHALLENGE OVERVIEW

In this challenge, you must do the following:
* Create a line chart that shows change in 
average global land temperature over time

This challenge uses data from the following source on Kaggle:
https://www.kaggle.com/berkeleyearth/climate-change-earth-surface-temperature-data

Complete the tasks below to solve this challenge.

*/

/* TASK 1: INSPECT AND LOAD THE DATA

Examine the data in the file provided named GlobalTemperatures.csv.

The source for this data set is here: 
https://www.kaggle.com/berkeleyearth/climate-change-earth-surface-temperature-data?select=GlobalTemperatures.csv

Use d3.csv() to load this file into the browser.

*/
d3.csv("./data/GlobaLTemperatures.csv").then(function(data) {



    /*
    DEFINE DIMENSIONS OF SVG + CREATE SVG CANVAS
    */
    const width = document.querySelector("#chart").clientWidth;
    const height = document.querySelector("#chart").clientHeight;
    const margin = {top: 50, left: 100, right: 50, bottom: 150};

    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);


    /*
    TASK 2: DETERMINE MIN AND MAX VALUES OF VARIABLES

    Use d3.min() and d3.max() to compute the minimum and maximum value
    of LandAverageTemperature.

    */
    const avgTemperature = {
        min: d3.min(data, function(d) { return +d.LandAverageTemperature; }),
        max: d3.max(data, function(d) { return +d.LandAverageTemperature; })
    };

    /* THEN, DO THE SAME FOR DATES IN THE DATA SET

    The dates in the data set are stored in a property named `dt`.

    Ordinarily, we might think we can compute minimum and maximum values
    for this property with this pattern:

    const dates = {
        min: d3.min(data, function(d) { return d.dt; }),
        max: d3.max(data, function(d) { return d.dt; })
    };

    But this doesn't work as expected -- because it's treating `d.dt` 
    as a String value, not a date that has temporal value!

    If you examine the `dt` values in the data set, you'll see they
    all have the following form:

        1750-01-01
        1800-06-01
        1920-12-01
        etc.


    This format can be abbreviated as YEAR-MONTH-DAY, 
    or YYYY-MM-DD, and is an extremely common format in computer
    representations of dates.

    We need to convert this String into a JavaScript 'Date' object.

    To do that, we need to wrap every instance of `d.dt` in our code
    in the following pattern:

        new Date(d.dt)

    So when computing minimum and maximum values of `d.dt`, the
    return statements instead look like this:

        return new Date(d.dt);

    Use this pattern to convert `d.dt` into JavaScript Date objects,
    and then compute the minimum and maximum values of those dates.

    */
    const dates = {
        min: d3.min(data, function(d) { return new Date(d.dt); }),
        max: d3.max(data, function(d) { return new Date(d.dt); })
    };


    /*
    TASK 3: CREATE SCALES

    The x-axis of our line chart will represent dates in the data set.

    We've just converted `d.dt` into Date objects, so that means we
    can use those minimum and maximum values as the domain of a new
    scale in D3:

        d3.scaleTime()

    This is a special form of d3.scaleLinear(), where the domain
    consists of JavaScript Date objects, instead of simple
    Number values.

    This scale is used the same way as d3.scaleLinear(), but
    for the domain, we need to supply a miminum and maximum
    Date value, like this:

        d3.scaleTime()
            .domain([MIN_DATE, MAX_DATE])
            ...

    Complete the following xScale code to define the domain
    of this time scale using the minimum and maximum dates
    you computed in the previous task.

    */

    const xScale = d3.scaleTime()
        .domain([dates.min, dates.max])
        .range([margin.left, width-margin.right]);

    
    const yScale = d3.scaleLinear()
        .domain([avgTemperature.min - 15, avgTemperature.max + 15])
        .range([height-margin.bottom, margin.top]);


    /*
    DRAW AXES
    */
    const xAxis = svg.append("g")
        .attr("class","axis")
        .attr("transform", `translate(0,${height-margin.bottom})`)
        .call(d3.axisBottom().scale(xScale));

    const yAxis = svg.append("g")
        .attr("class","axis")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft().scale(yScale));

    /* BONUS! ROTATE THE X-AXIS TICK LABELS */

    xAxis.selectAll("text")
        .attr("text-anchor", "start")
        .attr("transform", "rotate(45)");


    /* TASK 4: CREATE LINE GENERATOR 
    
    Finally, create a line generator using d3.line() that you
    can use to draw a `path` element showing the change in
    global average land temperature over time.

    IMPORTANT! Remember that `xScale` has a domain that now accepts
    JS Date objects as input. When you define the accessor function
    for the `.x()` method of your line generator, you'll need
    to pass into xScale() a JS date object, i.e.,

        return xScale(new Date(d.dt));

    The whole `new Date()` construction goes entirely inside
    the parentheses of xScale()!

    Complete the line generator below. The .y() accessor function
    should be based on passing LandAverageTemperature into yScale().
    
    */

    let line = d3.line()
        .x(function(d) { return xScale(new Date(d.dt)); })
        .y(function(d) { return yScale(d.LandAverageTemperature); })
        .curve(d3.curveLinear);


    /*
    DRAW THE LINE

    */
    const path = svg.append("path")
        .datum(data)
            .attr("d", function(d) { return line(d); })
            .attr("stroke", "steelblue")
            .attr("stroke-width", 3)
            .attr("fill", "none");
    
    /*
    DRAW AXIS LABELS
    */
    const xAxisLabel = svg.append("text")
        .attr("class","axisLabel")
        .attr("x", width/2)
        .attr("y", height-margin.bottom/2)
        .text("Date");

    const yAxisLabel = svg.append("text")
        .attr("class","axisLabel")
        .attr("transform","rotate(-90)")
        .attr("x",-height/2)
        .attr("y",margin.left/2)
        .text("Average Temperature (C)");

});
