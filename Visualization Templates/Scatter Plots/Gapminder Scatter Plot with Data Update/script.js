d3.csv("./data/gapminder.csv").then(function(data) {


    /*
    DEFINE DIMENSIONS AND GENERATE SVG
    */

    const width = document.querySelector("#chart").clientWidth;
    const height = document.querySelector("#chart").clientHeight;
    const margin = {top: 50, left: 150, right: 50, bottom: 150};

    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    /*
    FILTER DATA
    */
    const filtered_data2007 = data.filter(function(d) {
        return d.year == 2007;
    });

    const filtered_data1957 = data.filter(function(d) {
        return d.year == 1957;
    });
    
    /*
    CALCULATE MINIMUM AND MAXIMUM VALUES
    */
    const lifeExp = {
        min1957: d3.min(filtered_data1957, function(d) { return +d.lifeExp; }),
        max1957: d3.max(filtered_data1957, function(d) { return +d.lifeExp; }),
        min2007: d3.min(filtered_data2007, function(d) { return +d.lifeExp; }),
        max2007: d3.max(filtered_data2007, function(d) { return +d.lifeExp; })

    };

    const gdpPercap = {
        min1957: d3.min(filtered_data1957, function(d) { return +d.gdpPercap; }),
        max1957: d3.max(filtered_data1957, function(d) { return +d.gdpPercap; }),
        min2007: d3.min(filtered_data2007, function(d) { return +d.gdpPercap; }),
        max2007: d3.max(filtered_data2007, function(d) { return +d.gdpPercap; })
    };

    const pop = {
        min1957: d3.min(filtered_data1957, function(d) { return +d.pop; }),
        max1957: d3.max(filtered_data1957, function(d) { return +d.pop; }),
        min2007: d3.min(filtered_data2007, function(d) { return +d.pop; }),
        max2007: d3.max(filtered_data2007, function(d) { return +d.pop; })
    };

    /*
    DEFINE SCALES
    */
    const xScale = d3.scaleLinear()
        .domain([gdpPercap.min1957, gdpPercap.max1957])
        .range([margin.left, width-margin.right]);

    const yScale = d3.scaleLinear()
        .domain([lifeExp.min1957, lifeExp.max1957])
        .range([height-margin.bottom, margin.top]);

    const rScale = d3.scaleSqrt()
        .domain([pop.min1957, pop.max1957])
        .range([3, 25]);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

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
    DRAW POINTS FOR SCATTER PLOT
    */
    let points = svg.selectAll("circle")
        .data(filtered_data1957, function(d) { return d.country; })
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


    /* ADD A TOOLTIP */

    let tooltip = d3.select("#chart")
        .append("div")
        .attr("class", "tooltip");

    svg.selectAll("circle").on("mouseover", function(e, d) {

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

    /*
    UPDATE DATA, WITH TRANSITION

    We will need to do several things:
    - Update the xScale and yScale domains
    - Bind a new data set to the existing circles
    - Draw new circles for any new data
    - Update the position, size, and color of existing circles, with new data
    - Update the x- and y-axis display
    - Remove any circles corresponding to deleted data
    */

    d3.select("#year1957").on("click", function() {
        xScale.domain([gdpPercap.min1957, gdpPercap.max1957]);

        yScale.domain([lifeExp.min1957, lifeExp.max1957]);
    
        let enterPoints = svg.selectAll("circle")
            .data(filtered_data1957, function(d) { return d.country; });
    
        enterPoints.enter()
            .append("circle")
            .attr("cx", function(d) { return xScale(d.gdpPercap); })
            .attr("cy", function(d) { return yScale(d.lifeExp); })
            .attr("r", function(d) { return rScale(d.pop); })
            .attr("fill", function(d) { return colorScale(d.continent); })
        .merge(enterPoints)
            .transition()
            .duration(2000)
            .delay(250)
            .attr("cx", function(d) { return xScale(d.gdpPercap); })
            .attr("cy", function(d) { return yScale(d.lifeExp); })
            .attr("r", function(d) { return rScale(d.pop); })
            .attr("fill", function(d) { return colorScale(d.continent); });
    
        xAxis.transition()
            .duration(2000)
            .delay(250)
            .call(d3.axisBottom().scale(xScale));
        
        yAxis.transition()
            .duration(2000)
            .delay(250)
            .call(d3.axisLeft().scale(yScale));
    
        enterPoints.exit()
            .transition()
            .duration(2000)
            .delay(250)
            .attr("r",0)
            .remove();
    });

    d3.select("#year2007").on("click", function() {

        xScale.domain([gdpPercap.min2007, gdpPercap.max2007]);

        yScale.domain([lifeExp.min2007, lifeExp.max2007]);
    
        let enterPoints = svg.selectAll("circle")
            .data(filtered_data2007, function(d) { return d.country; });

        enterPoints.enter()
            .append("circle")
            .attr("cx", function(d) { return xScale(d.gdpPercap); })
            .attr("cy", function(d) { return yScale(d.lifeExp); })
            .attr("r", function(d) { return rScale(d.pop); })
            .attr("fill", function(d) { return colorScale(d.continent); })
        .merge(enterPoints)
            .transition()
            .duration(2000)
            .delay(250)
            .attr("cx", function(d) { return xScale(d.gdpPercap); })
            .attr("cy", function(d) { return yScale(d.lifeExp); })
            .attr("r", function(d) { return rScale(d.pop); })
            .attr("fill", function(d) { return colorScale(d.continent); });
    
        xAxis.transition()
            .duration(2000)
            .delay(250)
            .call(d3.axisBottom().scale(xScale));
        
        yAxis.transition()
            .duration(2000)
            .delay(250)
            .call(d3.axisLeft().scale(yScale));
    
        enterPoints.exit()
            .transition()
            .duration(2000)
            .delay(250)
            .attr("r",0)
            .remove();
    });




});

