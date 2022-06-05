d3.csv("./data/gapminder.csv").then(function(data) {

    /*
    DEFINE DIMENSIONS OF SVG + CREATE SVG CANVAS
    */
    const width = document.querySelector("#chart").clientWidth;
    const height = document.querySelector("#chart").clientHeight;
    const margin = {top: 50, left: 150, right: 50, bottom: 150};

    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    /*
    FILTER THE DATA

    We will create an area chart to show GDP per capita over time
    specifically for the United States

    */
    const filtered_data = data.filter(function(d) {
        return d.country === "United States";
    });

    /*
    DETERMINE MIN AND MAX VALUES OF VARIABLES

    Notice that here we are calculating minimum and maximum values
    for GDP per capita, not life expectancy!

    */
    const gdpPercap = {
        min: d3.min(filtered_data, function(d) { return +d.gdpPercap; }),
        max: d3.max(filtered_data, function(d) { return +d.gdpPercap; })
    };

    const years = {
        min: d3.min(filtered_data, function(d) { return +d.year; }),
        max: d3.max(filtered_data, function(d) { return +d.year; })
    };


    /*
    CREATE SCALES

    Does it make sense to start the minimum for the yScale domain
    at `gdpPercap.min`? Why or why not?

    */
    const xScale = d3.scaleLinear()
        .domain([years.min, years.max])
        .range([margin.left, width-margin.right]);

    const yScale = d3.scaleLinear()
        .domain([gdpPercap.min - 5000, gdpPercap.max + 5000])
        .range([height-margin.bottom, margin.top]);



    /* CREATE AREA GENERATOR 
    
    For more info about d3.area(), see: https://github.com/d3/d3-shape/blob/v3.0.1/README.md#area

    For more info about curve interpolators, see: https://github.com/d3/d3-shape/blob/v3.0.1/README.md#curves    
    */

    let area = d3.area()
        .x(function(d) { return xScale(d.year); })
        .y1(function(d) { return yScale(d.gdpPercap); })
        .y0(height-margin.bottom)
        .curve(d3.curveBasis);

    /*
    DRAW THE LINE

    Notice that the pattern here is slightly different
    from the previous data join we've seen!

    */
    const path = svg.append("path")
        .datum(filtered_data)
            .attr("d", function(d) { return area(d); })
            .attr("fill", "steelblue");
            /* What happens if we define `stroke` for this path? */
            // .attr("stroke", "steelblue")
            // .attr("stroke-width", 3)
    

    /*
    DRAW AXES

    Why are we drawing the axes *after* the area, in this demonstration?

    */
    const xAxis = svg.append("g")
        .attr("class","axis")
        .attr("transform", `translate(0,${height-margin.bottom})`)
        .call(d3.axisBottom().scale(xScale).tickFormat(d3.format("")));

    const yAxis = svg.append("g")
        .attr("class","axis")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft().scale(yScale));

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
        .text("GDP per Capita");

});
