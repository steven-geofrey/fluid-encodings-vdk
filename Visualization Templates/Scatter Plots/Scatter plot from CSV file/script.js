d3.csv("./data/boston-rents.csv").then(function(data) {

    /* VIEW THE DATA 
    
    IMPORTANT! Note that ALL values imported with d3.csv() are
    converted to JavaScript String values -- even the values that
    look like numbers!

    We'll need to be careful about this in the future, because
    strange things can happen when we try to use JavaScript
    to interact with values that should be numeric...!
    */
    console.log(data);

    /*
    SETTING UP THE SVG CANVAS
    */
    const width = 800;
    const height = 500;
    const margin = {top: 25, left: 100, right: 25, bottom: 100};

    /*
    CREATE THE SVG CANVAS
    */

    const canvas = d3.select("#visualization")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    /*
    DEFINE SCALES
    */

    let xScale = d3.scaleLinear()
        .domain([0, 170])
        .range([margin.left, width-margin.right]);

    let yScale = d3.scaleLinear()
        .domain([0, 3500])
        .range([height-margin.bottom, margin.top]);

    let rScale = d3.scaleSqrt()
        .domain([0, 65])
        .range([0, 15]);

    let fillScale = d3.scaleOrdinal()
        .domain(["Younger Adult", "College"])
        .range(["#446688", "#CC0000"]);


    /*
    DRAW THE MARKS

    Next, we will use the D3 data join pattern to generate marks
    for our visualization.

    IMPORTANT! In our original code, the array of data
    that we used to perform the data join was named `neighborhoods`,
    but now we're assuming our data are located inside an array
    named `data` that's created as a parameter in the function expression
    we are passing into the d3.csv() pattern.

    To reflect this change, when we conduct the data join,
    we need to make sure that we are joining the right variable name!

    */


    canvas.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(d) { return xScale(d.income); })
        .attr("cy", function(d) { return yScale(d.rent); })
        .attr("r", function(d) { return rScale(d.population); })
        .attr("fill", function(d) { return fillScale(d.primaryAge); })
        .attr("opacity", 0.6);


    /* DRAW AXES */

    const xAxis = canvas.append("g")
        .attr("transform",`translate(0,${height-margin.bottom})`)
        .call(d3.axisBottom().scale(xScale).tickFormat(d3.format("$,")));

    const yAxis = canvas.append("g")
        .attr("transform",`translate(${margin.left},0)`)
        .call(d3.axisLeft().scale(yScale).tickFormat(d3.format("$,")));



    /* ADDING AXIS LABELS */
    canvas.append("text")
        .attr("class","axisLabel")
        .attr("x", margin.left + (width-margin.left-margin.right)/2)
        .attr("y", height - 20)
        .attr("text-anchor","middle")
        .text("Median Income (USD, Thousands)");

    canvas.append("text")
        .attr("class","axisLabel")
        .attr("x", -(height-margin.bottom)/2)
        .attr("y", 20)
        .attr("text-anchor","middle")
        .attr("transform","rotate(-90)")
        .text("Median Rent (USD)");

});




