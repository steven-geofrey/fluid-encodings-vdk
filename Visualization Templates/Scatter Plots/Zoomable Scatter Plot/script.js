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


    /* ADDING A G ELEMENT

    We are going to append a new "g" element to the SVG
    canvas, and place everything we draw (axes, marks, labels)
    inside of that "g" element.

    The reason for this will become clearer when we want to implement
    zooming. We will create the zoom effect by manipulating the
    `transform` attribute of this "g" element, which will cause
    everthing inside of it to be transformed in the same way (scaling + translation).
    
    */
    const g = svg.append("g");

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

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    /*
    DRAW AXES
    */
    const xAxis = g.append("g")
        .attr("class","axis")
        .attr("transform", `translate(0,${height-margin.bottom})`)
        .call(d3.axisBottom().scale(xScale));

    const yAxis = g.append("g")
        .attr("class","axis")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft().scale(yScale));

    /*
    DRAW POINTS
    */
    const points = g.selectAll("circle")
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
    const xAxisLabel = g.append("text")
        .attr("class","axisLabel")
        .attr("x", width/2)
        .attr("y", height-margin.bottom/2)
        .text("GDP Per Capita");

    const yAxisLabel = g.append("text")
        .attr("class","axisLabel")
        .attr("transform","rotate(-90)")
        .attr("x",-height/2)
        .attr("y",margin.left/2)
        .text("Life Expectancy");



        /*
        ADDING ZOOM

        Visualizations with high mark density are great candidates for zooming. 
        But zooming is actually a very complex task -- made especially complex in SVG!

        D3 has a built-in module, d3.zoom() for handling zoom events.

        */
        const zoom = d3.zoom()
            .scaleExtent([1,10])
            .on('zoom', zoomed);

        svg.call(zoom);

        let k = 1;
        let tX = 0;
        let tY = 0;

        function zoomed(e) {
            // This causes problems! Why?
            // svg.selectAll('*').attr('transform', e.transform);

            // Let's try this. This also doesn't work!
            // svg.selectAll("circle").attr("transform", e.transform);

            // Grab the scaling factor, x translation, and y translation
            k = e.transform.k;
            tX = e.transform.x;
            tY = e.transform.y;

            g.attr("transform", e.transform);
            g.selectAll("circle").attr("r", function() {
                return +this.attr("r")/k;
            });

        }


});
