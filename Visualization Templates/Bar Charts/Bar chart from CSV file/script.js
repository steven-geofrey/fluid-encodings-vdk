d3.csv("./data/boston-rents-limited.csv").then(function(data) {

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

    let xScale = d3.scaleBand()
        .domain(["Back Bay", "Fenway", "Mission Hill", "Jamaica Plain", "South Boston"])
        .range([margin.left, width-margin.right])
        .padding(0.5);

    let yScale = d3.scaleLinear()
        .domain([0, 3500])
        .range([height-margin.bottom, margin.top]);


    /*
    DRAW THE MARKS

    Next, we will use the D3 data join pattern to generate marks
    for our visualization.

    IMPORTANT! In our original code, the array of data
    that we used to perform the data join was named `neighborhoods`,
    but now we're assuming our data are located inside an array
    named `data` that's created with the d3.csv() pattern.

    What needs to change below, to reflect this difference?

    */


    canvas.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
            .attr("x", function(d) { return xScale(d.area); })
            .attr("y", function(d) { return yScale(d.rent); })
            .attr("width", xScale.bandwidth())
            .attr("height", function(d) { return height - margin.bottom - yScale(d.rent); })
            .attr("fill", "steelblue");



    /* DRAW AXES */

    const xAxis = canvas.append("g")
        .attr("transform",`translate(0,${height-margin.bottom})`)
        .call(d3.axisBottom().scale(xScale));

    const yAxis = canvas.append("g")
        .attr("transform",`translate(${margin.left},0)`)
        .call(d3.axisLeft().scale(yScale).tickFormat(d3.format("$,")));



    /* ADDING AXIS LABELS */
    canvas.append("text")
        .attr("class","axisLabel")
        .attr("x", margin.left + (width-margin.left-margin.right)/2)
        .attr("y", height - 20)
        .attr("text-anchor","middle")
        .text("Neighborhood");

    canvas.append("text")
        .attr("class","axisLabel")
        .attr("x", -(height-margin.bottom)/2)
        .attr("y", 20)
        .attr("text-anchor","middle")
        .attr("transform","rotate(-90)")
        .text("Median Rent (USD)");

});




