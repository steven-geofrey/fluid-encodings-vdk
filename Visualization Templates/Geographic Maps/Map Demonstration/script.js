function parseCSV(d) {
    return {
        name: d["Museum Name"],
        lat: +d.Latitude,
        lon: +d.Longitude,
        type: d["Museum Type"],
        city: d["City"],
        state: d["State"]
    };
}

const promises = [
    d3.csv("./data/northeast-museums.csv", parseCSV),
    d3.json("./geojson/gz_2010_us_040_00_20m.json")
];


Promise.all(promises).then(function(data) {

    const museums = data[0];

    console.log(museums);

    const world = data[1];

    const width = document.querySelector("#chart").clientWidth;
    const height = document.querySelector("#chart").clientHeight;
    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);


    const projection = d3.geoMercator()
        .translate([width/2, height/2])
        .center([-70.821001, 41.587268])
        .scale(2500);

    const path = d3.geoPath()
        .projection(projection);

    svg.selectAll("path")
        .data(world.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("class", "state");

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10)
        .domain(["GENERAL MUSEUM", "ART MUSEUM", "HISTORY MUSEUM", "SCIENCE & TECHNOLOGY MUSEUM OR PLANETARIUM", "NATURAL HISTORY MUSEUM", "CHILDREN'S MUSEUM"]);


    const points = svg.selectAll("circle")
        .data(museums)
        .enter().append("circle")
        .attr("cx", function(d) {
            var proj = projection([d.lon, d.lat]);
            return proj[0];
        }).attr("cy", function(d) {
            var proj = projection([d.lon, d.lat]);
            return proj[1];
        }).attr("r", 3)
        .attr("fill", function(d) {
            return colorScale(d.type);
        })


    const tooltip = d3.select("#chart")
        .append("div")
        .attr("class", "tooltip");

    svg.selectAll("circle")
        .on("mouseover", function(e, d) {

            // let cx = +d3.select(this).attr("cx") + 20;
            // let cy = +d3.select(this).attr("cy") - 10;

            // Modified cx and cy for tooltip, based on zoom transform
            let cx = (+d3.select(this).attr("cx"))*k + tX + 20;
            let cy = (+d3.select(this).attr("cy"))*k + tY - 10;

            tooltip.style("visibility", "visible") 
                .style("left", cx + "px") 
                .style("top", cy + "px") 
                .html(`<b>${d.name}</b><br>Type: ${d.type}<br>Location: ${d.city}, ${d.state}`);

            d3.select(this)
                .attr("r", 10/k)
                .attr("stroke", "white")
                .attr("stroke-width", 2/k);

        }).on("mouseout", function() {

            tooltip.style("visibility", "hidden");

            d3.select(this)
                .attr("r", 3/k)
                .attr("stroke", "none");


        });


        /* FILTER BY CHECKBOX

        We'll use the same filtering pattern we've seen before
        to filter the markers on the map by museum type.

        */

        d3.selectAll(".type--option").on("click", function() {

            let isChecked = d3.select(this).property("checked");
            let museumType = d3.select(this).property("value");

            let selection = points.filter(function(d) {
                return d.type === museumType;
            });

            if (isChecked == true) {
                selection.attr("opacity", 1);
            } else {
                selection.attr("opacity", 0);
            }
            
        });


        /*
        ADDING ZOOM

        Maps are great candidates for zooming. But zooming is actually
        a very complex task -- made especially complex in SVG!

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
            // svg.selectAll("path").attr("transform", e.transform);

            // Grab the scaling factor, x translation, and y translation
            k = e.transform.k;
            tX = e.transform.x;
            tY = e.transform.y;

            svg.selectAll("*").attr("transform", e.transform);
            svg.selectAll("circle").attr("r", 3 / k);

        }


});