d3.csv("./data/gapminder.csv").then(function(data) {

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
    FILTER THE DATA

    This time, we'll use the .filter() method to only grab
    longitudinal data for the United States, to show changes
    in life expectancy over time

    */
    const filtered_data = data.filter(function(d) {
        return d.country === "United States";
    });

    /*
    DETERMINE MIN AND MAX VALUES OF VARIABLES
    */
    const lifeExp = {
        min: d3.min(filtered_data, function(d) { return +d.lifeExp; }),
        max: d3.max(filtered_data, function(d) { return +d.lifeExp; })
    };

    const years = {
        min: d3.min(filtered_data, function(d) { return +d.year; }),
        max: d3.max(filtered_data, function(d) { return +d.year; })
    };



    /*
    CREATE SCALES

    Does it make sense to start the minimum for the yScale domain
    at `lifeExp.min`? Why or why not?

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
    DRAW THE LINE

    Notice that the pattern here is slightly different
    from the previous data join we've seen!

    We simply append a new `path` to the SVG canvas;
    then, join our array of data to that path with .datum();
    finally, define the `d` attribute of the path using our
    `line` function defined above.

    */
    const path = svg.append("path")
        .datum(filtered_data)
            .attr("d", function(d) { return line(d); })
            .attr("stroke", "steelblue")
            .attr("stroke-width", 3)
            .attr("fill", "none"); // Why do we need to define fill as "none" here?
    
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

});
