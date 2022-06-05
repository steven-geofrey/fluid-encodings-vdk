/* CHALLENGE OVERVIEW

In this challenge, you must do the following:
* Create a multiseries line chart, where 3 lines for 3 different
    countries are drawn in the same chart
* Draw a label on the chart for the name of each country, positioned
    adjacent to the last point in each line's path

Your line chart will show change in life expectancy over time
for your 3 selected countries.

Complete the tasks below to solve this challenge.

*/

d3.csv("./data/gapminder.csv").then(function(data) {

    /*
    DEFINE DIMENSIONS OF SVG + CREATE SVG CANVAS
    */
    const width = document.querySelector("#chart").clientWidth;
    const height = document.querySelector("#chart").clientHeight;
    const margin = {top: 50, left: 100, right: 50, bottom: 100};

    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    /*
    TASK 1: FILTER THE DATA

    As a group, choose 3 different countries to focus on
    in the data set.

    Then, use the .filter() method to create 3 separate filtered
    arrays of data, each of which only holds the data for the
    countries you have selected.

    Store each filtered country in its own variable. For example:

    const COUNTRYNAME1 = data.filter(function(d) {
        ... filter the data for only country #1 ...
    });

    const COUNTRYNAME2 = data.filter(function(d) {
        ... filter the data for only country #2 ...
    });

    const COUNTRYNAME3 = data.filter(function(d) {
        ... filter the data for only country #3 ...
    });

    */
    const usa = data.filter(function(d) {
        return d.country === "United States";
    });

    const india = data.filter(function(d) {
        return d.country === "India";
    });

    const china = data.filter(function(d) {
        return d.country === "China";
    });

    /*
    TASK 2: DETERMINE MIN AND MAX VALUES OF VARIABLES

    Your line chart will show changes in life expectancy over time
    for your countries. 

    Determine the minimum and maximum values of `lifeExp` and `year`
    in your combined data set.

    However, now that you're mixing together 3 different slices of the data,
    how do you use code to figure out the minimum and maximum values
    of the variables across the 3 slices combined?

    HINT: Use the following pattern to combine your 3 filtered arrays created above
    into one single array:
    
        const combined = COUNTRYNAME1.concat(COUNTRYNAME2, COUNTRYNAME3);

    Then, use d3.min() and d3.max() to determine
    the minimum and maximum values of the properties in the combined array.

    */

    const combined = usa.concat(india, china);

    console.log(combined);

    const lifeExp = {
        min: d3.min(combined, function(d) { return +d.lifeExp; }),
        max: d3.max(combined, function(d) { return +d.lifeExp; })
    };

    const years = {
        min: d3.min(combined, function(d) { return +d.year; }),
        max: d3.max(combined, function(d) { return +d.year; })
    };


    /*
    CREATE SCALES


    */
    const xScale = d3.scaleLinear()
        .domain([years.min, years.max])
        .range([margin.left, width-margin.right]);

    const yScale = d3.scaleLinear()
        .domain([lifeExp.min - 20, lifeExp.max + 20])
        .range([height-margin.bottom, margin.top]);


    /*
    DRAW AXES
    */
    const xAxis = svg.append("g")
        .attr("class","axis")
        .attr("transform", `translate(0,${height-margin.bottom})`)
        .call(d3.axisBottom().scale(xScale).tickFormat(d3.format("")));

    const yAxis = svg.append("g")
        .attr("class","axis")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft().scale(yScale));

    /* BONUS! ROTATE THE X-AXIS TICK LABELS */

    xAxis.selectAll("text")
        .attr("text-anchor", "start")
        .attr("transform", "rotate(45)");


    /* CREATE LINE GENERATOR 
    
    For more info about d3.line(), see: https://github.com/d3/d3-shape/blob/v3.0.1/README.md#lines

    For more info about curve interpolators, see: https://github.com/d3/d3-shape/blob/v3.0.1/README.md#curves
    
    */

    let line = d3.line()
        .x(function(d) { return xScale(d.year); })
        .y(function(d) { return yScale(d.lifeExp); })
        .curve(d3.curveLinear);

    /*
    TASK 3: DRAW THE LINES

    Now, draw 3 separate lines -- one for each of your selected countries.

    Since drawing a line chart uses a single SVG.append("path") pattern,
    instead of a traditional data join, you can repeat that pattern 3 times,
    once for each of your countries. E.g.,

    const path_COUNTRY1 = svg.append("path")
        .datum(COUNTRY1_DATA)
        .attr("d", function(d) { return line(d); })
        ...

    const path_COUNTRY2 = svg.append("path")
        .datum(COUNTRY2_DATA)
        .attr("d", function(d) { return line(d); })
        ...


    const path_COUNTRY3 = svg.append("path")
        .datum(COUNTRY3_DATA)
        .attr("d", function(d) { return line(d); })
        ...

    */
    const path_usa = svg.append("path")
        .datum(usa)
        .attr("d", function(d) { return line(d); })
        .attr("stroke", "steelblue")
        .attr("stroke-width", 3)
        .attr("fill", "none");
    

    const path_india = svg.append("path")
        .datum(india)
        .attr("d", function(d) { return line(d); })
        .attr("stroke", "orange")
        .attr("stroke-width", 3)
        .attr("fill", "none");

                
    const path_china = svg.append("path")
        .datum(china)
        .attr("d", function(d) { return line(d); })
        .attr("stroke", "green")
        .attr("stroke-width", 3)
        .attr("fill", "none");

        
    /*
    DRAW AXIS LABELS
    */
    const xAxisLabel = svg.append("text")
        .attr("class","axisLabel")
        .attr("x", width/2)
        .attr("y", height-margin.bottom/2)
        .text("Year");

    const yAxisLabel = svg.append("text")
        .attr("class","axisLabel")
        .attr("transform","rotate(-90)")
        .attr("x",-height/2)
        .attr("y",margin.left/2)
        .text("Life Expectancy (Years)");


    /* BONUS TASK

    How would you use code to draw a text label
    that appears next to the last point in each line,
    for each country, where the text label states the name
    of the country represented by the line?

    */

    let last_usa = usa[usa.length-1];
    let last_india = india[india.length-1];
    let last_china = china[china.length-1];

    svg.append("text")
        .attr("x", xScale(last_usa.year))
        .attr("y", yScale(last_usa.lifeExp))
        .attr("text-anchor", "end")
        .text("United States");

    svg.append("text")
        .attr("x", xScale(last_india.year))
        .attr("y", yScale(last_india.lifeExp))
        .attr("text-anchor", "end")
        .text("India");

    svg.append("text")
        .attr("x", xScale(last_china.year))
        .attr("y", yScale(last_china.lifeExp))
        .attr("text-anchor", "end")
        .text("China");

});
