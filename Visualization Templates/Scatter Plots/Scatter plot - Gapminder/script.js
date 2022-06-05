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


    /* FILTER THE DATA 
    
    This data set is large and includes data from multiple years.

    Let's filter the data to only select data for the year 2007,
    and then subsequently use that year's data to draw the scatter plot.

    To filter the data, we can use the .filter() method for arrays.

    */

    let filtered_data = data.filter(function(d) {
        return d.year === '2007';
    });


    /*
    DETERMINE MIN AND MAX VALUES OF VARIABLES

    In the following section, we'll use the methods d3.min() and d3.max()
    to calculate minimum and maximum values of the variables in our data set.

    Note that to keep things clean, we're organizing the minimum and maximum
    values inside of objects, and storing those min/max values in properties
    named inside those objects. This helps make it easier to refer to these
    values later in our code.

    */

    const gdpPercap = {
        min: d3.min(filtered_data, function(d) { return +d.gdpPercap; }),
        max: d3.max(filtered_data, function(d) { return +d.gdpPercap; })
    };

    const lifeExp = {
        min: d3.min(filtered_data, function(d) { return +d.lifeExp; }),
        max: d3.max(filtered_data, function(d) { return +d.lifeExp; })
    };

    const pop = {
        min: d3.min(filtered_data, function(d) { return +d.pop; }),
        max: d3.max(filtered_data, function(d) { return +d.pop; })
    };



    /*
    CREATE SCALES

    We'll use the computed min and max values to create scales for
    our scatter plot:

    `xScale` will convert GDP per capita to horizontal pixel position;

    `yScale` will convert life expectancy to vertical position;

    `rScale` will convert population to circle radius; and

    `fillScale` will convert continent/region to circle color.

    But be careful about using these values!

    For example, does it make sense to start the minimum for the yScale domain
    at `lifeExp.min`? Why or why not?

    */

    const xScale = d3.scaleLinear()
        .domain([gdpPercap.min, gdpPercap.max])
        .range([margin.left, width-margin.right]);

    const yScale = d3.scaleLinear()
        .domain([0, lifeExp.max])
        .range([height-margin.bottom, margin.top]);

    const rScale = d3.scaleSqrt()
        .domain([pop.min, pop.max])
        .range([1, 15]);

    // New scale feature!
    // We can also use d3.scaleOrdinal() to create a default
    // color palette defined in D3 already.
    // See options here:
    // https://github.com/d3/d3-scale-chromatic
    const fillScale = d3.scaleOrdinal(d3.schemeCategory10);


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


    /*
    DRAW POINTS

    In this scatter plot, each circle will represent a single country;
    the horizontal position of the circle will represent GDP per capita,
    vertical position will represent life expectancy, color will represent
    continent, and radius will represent population

    */
    const points = svg.selectAll("circle")
        .data(filtered_data)
        .enter()
        .append("circle")
            .attr("cx", function(d) { return xScale(d.gdpPercap); })
            .attr("cy", function(d) { return yScale(d.lifeExp); })
            .attr("r", function(d) { return rScale(d.pop); })
            .attr("fill", function(d) { return fillScale(d.continent); });
    
    /*
    DRAW AXIS LABELS
    */
    const xAxisLabel = svg.append("text")
        .attr("class","axisLabel")
        .attr("x", width/2)
        .attr("y", height-margin.bottom/2)
        .text("GDP per Capita");

    const yAxisLabel = svg.append("text")
        .attr("class","axisLabel")
        .attr("transform","rotate(-90)")
        .attr("x",-height/2)
        .attr("y",margin.left/2)
        .text("Life Expectancy (Years)");

});
