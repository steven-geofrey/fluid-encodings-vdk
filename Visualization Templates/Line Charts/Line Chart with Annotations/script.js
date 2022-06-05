/* CHALLENGE OVERVIEW

In this challenge, you must do the following:
* Add annotations to a line chart of ozone air quality index
values over time that highlight regions and points of interest
in the drawn chart

This challenge uses data from the following source on Kaggle:
https://www.kaggle.com/sogun3/uspollution

The data have been modified to only include Boston pollution data.

Complete the tasks below to solve this challenge.

*/

d3.csv("./data/boston_pollution_2000_2016.csv").then(function(data) {

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
    DETERMINE MIN AND MAX VALUES OF VARIABLES
    
    In this demonstration, we will use a line chart to illustrate
    changes in average ozone air quality index in Boston over time.

    Note that there's a pattern inside of this code of the following form:

        new Date();

    This creates a JavaScript Date object, which is different from a typical
    String value!

    This pattern is explained by one of the other challenges.

    */

    const dates = {
        min: d3.min(data, function(d) { return new Date(d.Date); }),
        max: d3.max(data, function(d) { return new Date(d.Date); })
    };


    /*
    CREATE SCALES

    In this chart, the x-axis represents date, and the y-axis
    represents ozone air quality index.

    Note that the xScale uses this pattern:

        d3.scaleTime()

    This is a special form of d3.scaleLinear(), where the domain
    features JS Date values, not Number values!

    This pattern is explained in another challenge.
    
    */
    const xScale = d3.scaleTime()
        .domain([dates.min, dates.max])
        .range([margin.left, width-margin.right]);

    const yScale = d3.scaleLinear()
        .domain([0, 200])
        .range([height-margin.bottom, margin.top]);




    /* TASK 1: ADD ANNOTATIONS

    This chart shows ozone AQI over time. Note that the AQI is a number
    from 0 to 300, and different ranges of the AQI correspond to different
    degrees of "healthy" or "unhealthy" air quality.

    The reference ranges for AQI can be found here:
    https://www.airnow.gov/aqi/aqi-basics/


    In the following section, you will use these AQI reference ranges
    to add annotations to the drawn line chart.

    Specifically, add these annotations:
    * a shaded rectangle to represent the range for 'Moderate' AQI values
    * a shaded rectangle to represent the range for 'Unhealthy for Sensitive Groups'
    * a shaded rectangle to represent the range for 'Unhealthy'
    
    Each rectangle should span the entire width of the plotting area of the chart,
    and the shaded region should extend vertically across the reference ranges.
    
    For each shaded region, append a new SVG `rect` element.
    
    HINT: How can you use the yScale() function to determine where each
    rectangle should be located, and how tall it should be?

    */

    // Draw colored region for 'Moderate' level
    svg.append("rect")
        .attr("x", margin.left)
        .attr("y", yScale(100))
        .attr("width", width - margin.left - margin.right)
        .attr("height", yScale(50) - yScale(100))
        .attr("fill", "#FFEAAA")
        .attr("opacity", 0.6);

    // Draw colored region for 'Unhealthy for Sensitive Groups'
    svg.append("rect")
        .attr("x", margin.left)
        .attr("y", yScale(150))
        .attr("width", width - margin.left - margin.right)
        .attr("height", yScale(101) - yScale(150))
        .attr("fill", "#D4AA6A")
        .attr("opacity", 0.6);

    // Draw colored region for 'Unhealthy'
    svg.append("rect")
        .attr("x", margin.left)
        .attr("y", yScale(200))
        .attr("width", width - margin.left - margin.right)
        .attr("height", yScale(151) - yScale(200))
        .attr("fill", "#CA6573")
        .attr("opacity", 0.6);



    /* CREATE LINE GENERATOR 
    
    For more info about d3.line(), see: https://github.com/d3/d3-shape/blob/v3.0.1/README.md#lines

    For more info about curve interpolators, see: https://github.com/d3/d3-shape/blob/v3.0.1/README.md#curves
    
    */

    let line = d3.line()
        .x(function(d) { return xScale(new Date(d.Date)); })
        .y(function(d) { return yScale(d['Avg O3 AQI']); })
        .curve(d3.curveLinear);

    /*
    DRAW THE LINE

    Notice that the pattern here is slightly different
    from the previous data join we've seen!

    */
    const path = svg.append("path")
        .datum(data)
            .attr("d", function(d) { return line(d); })
            .attr("stroke", "steelblue")
            .attr("stroke-width", 3)
            .attr("fill", "none");


    /* TASK 2: ADD MORE ANNOTATIONS 
    
    Now, add an annotation for the highest ozone AQI value
    in the data set.

    Specifically, do the following:
    * Use d3.max() to determine the highest value of `Avg O3 AQI` in the data set
    * Use the .filter() method to find the original data object in `data` that
        matches that highest `Avg O3 AQI` value

        DO NOT MANUALLY LOOK INSIDE THE DATA TO FIND THE ROW WITH THE
        HIGHEST VALUE! USE JAVASCRIPT TO FIND THIS.

    * Using that datum's date and ozone AQI value, draw a circle that sits
        on top of the line at the date with the highest AQI value

        HINT: Use xScale() and yScale() to locate where the circle should be drawn.
        Note that you'll need to pass the `Date` property into xScale() as
            xScale(new Date(...`Date`...))

        (Ask Steven for help with this)
        
        HINT: .filter() returns an array of filtered objects.
        How can you use index value to grab the ONE AND ONLY returned
        result, when you're filtering to find the date with the highest
        AQI value?

    * Finally, add an SVG `text` element that appears next to the
        circle you've drawn that indicates what that date's record AQI
        was recorded as


    
    */


    // Use d3.max() to find the highest value of `Avg O3 AQI`
    let highest_o3 = d3.max(data, function(d) { return +d['Avg O3 AQI']; });

    // Use .filter() to find the complete datum inside `data`
    // that matches that max value
    let highest_data = data.filter(function(d) {
        return d['Avg O3 AQI'] == highest_o3;
    })[0];

    let highest_x = xScale(new Date(highest_data.Date));
    let highest_y = yScale(highest_data['Avg O3 AQI']);


    // Draw a circle for the highest AQI value
    svg.append("circle")
        .attr("cx", highest_x)
        .attr("cy", highest_y)
        .attr("r", 5)
        .attr("stroke", "#CC0000")
        .attr("stroke-width", 2)
        .attr("fill", "#CCCCCC");

    // Draw a text label for the highest AQI point
    svg.append("text")
        .attr("class", "annotationLabel")
        .attr("x", highest_x + 10)
        .attr("y", highest_y)
        .text(`Max O3 AQI: ${highest_data['Avg O3 AQI']}`);

    

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
