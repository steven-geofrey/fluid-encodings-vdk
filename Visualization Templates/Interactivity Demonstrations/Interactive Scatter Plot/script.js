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

    */
    const filtered_data = data.filter(function(d) {
        return d.year == 2007;
    });

    /*
    DETERMINE MIN AND MAX VALUES OF VARIABLES
    */
    const lifeExp = {
        min: d3.min(filtered_data, function(d) { return +d.lifeExp; }),
        max: d3.max(filtered_data, function(d) { return +d.lifeExp; })
    };

    const gdpPercap = {
        min: d3.min(filtered_data, function(d) { return +d.gdpPercap; }),
        max: d3.max(filtered_data, function(d) { return +d.gdpPercap; })
    };

    const pop = {
        min: d3.min(filtered_data, function(d) { return +d.pop; }),
        max: d3.max(filtered_data, function(d) { return +d.pop; })
    }

    /*
    CREATE SCALES
    */
    const xScale = d3.scaleLinear()
        .domain([gdpPercap.min, gdpPercap.max])
        .range([margin.left, width-margin.right]);

    const yScale = d3.scaleLinear()
        .domain([lifeExp.min, lifeExp.max])
        .range([height-margin.bottom, margin.top]);

    const rScale = d3.scaleSqrt()
        .domain([pop.min, pop.max])
        .range([3, 25]);

    var colorScale = d3.scaleOrdinal(d3.schemeCategory10);

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
    */
    const points = svg.selectAll("circle")
        .data(filtered_data)
        .enter()
        .append("circle")
            .attr("cx", function(d) { return xScale(d.gdpPercap); })
            .attr("cy", function(d) { return yScale(d.lifeExp); })
            .attr("r", function(d) { return rScale(d.pop); })
            .attr("fill", function(d) { return colorScale(d.continent); });
    
    /*
    DRAW AXIS LABELS
    */
    const xAxisLabel = svg.append("text")
        .attr("class","axisLabel")
        .attr("x", width/2)
        .attr("y", height-margin.bottom/2)
        .text("GDP Per Capita");

    const yAxisLabel = svg.append("text")
        .attr("class","axisLabel")
        .attr("transform","rotate(-90)")
        .attr("x",-height/2)
        .attr("y",margin.left/2)
        .text("Life Expectancy");

    /* TOOLTIP */

    const tooltip = d3.select("#chart")
        .append("div")
        .attr("class","tooltip");

    points.on("mouseover", function(e, d) {

        let cx = +d3.select(this).attr("cx")+20;
        let cy = +d3.select(this).attr("cy")-10;

        tooltip.style("visibility","visible")
            .style("left", `${cx}px`)
            .style("top", `${cy}px`)
            .html(`<b>Country:</b> ${d.country}<br><b>GDP per Capita:</b> ${Math.round(d.gdpPercap)}<br><b>Life Expectancy</b>: ${Math.round(d.lifeExp)} years`);

        d3.select(this)
            .attr("stroke","#F6C900")
            .attr("stroke-width",2);

    }).on("mouseout", function() {

        tooltip.style("visibility","hidden");

        d3.select(this)
            .attr("stroke","none")
            .attr("stroke-width",0);
            
    });


    /* FILTER BY CHECKBOX */


    d3.selectAll(".region--option").on("click", function() {

        let isChecked = d3.select(this).property("checked");
        let continent = d3.select(this).property("value");

        let selection = points.filter(function(d) {
            return d.continent === continent;
        });

        if (isChecked == true) {
            selection.attr("opacity", 1)
                .attr("pointer-events", "all");
        } else {
            selection.attr("opacity", 0)
                .attr("pointer-events", "none");
        }

    });


});
