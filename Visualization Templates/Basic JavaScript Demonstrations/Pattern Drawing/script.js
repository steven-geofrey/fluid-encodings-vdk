/* CREATE THE SVG CANVAS */
const width = window.innerWidth;
const height = window.innerHeight;

const svg = d3.select("#canvas")
    .append("svg")
    .attr("width", width)
    .attr("height", height);


/* SOME HELPER FUNCTIONS TO GENERATE RANDOM ATTRIBUTES */
function randomX() {
    let rx = Math.random() * width;
    return rx;
}

function randomY() {
    let ry = Math.random() * height;
    return ry;
}    

function randomSize() {
    let rsize = 10 + Math.random() * 240;
    return rsize;
}

function randomOpacity() {
    let ropacity = Math.random();
    return ropacity;
}



/* DRAW A RANDOM CIRCLE */
d3.select("#shape--circle").on("click", function() {

    svg.append("circle")
        .attr("cx", randomX())
        .attr("cy", randomY())
        .attr("r", randomSize())
        .attr("fill", "#CC0000")
        .attr("opacity", randomOpacity());

});

/* DRAW A RANDOM SQUARE */
d3.select("#shape--square").on("click", function() {

    let size = randomSize();

    svg.append("rect")
        .attr("x", randomX())
        .attr("y", randomY())
        .attr("width", size)
        .attr("height", size)
        .attr("fill", "#446688")
        .attr("opacity", randomOpacity());

});

/* CREATE YOUR OWN SHAPE OR PATTERN TO DRAW */
d3.select("#shape--pattern").on("click", function() {

    let x = randomX();
    let y = randomY();

    svg.append("rect")
        .attr("x", x)
        .attr("y", y)
        .attr("width", 20)
        .attr("height", 20)
        .attr("fill", "#446688");

    svg.append("rect")
        .attr("x", x)
        .attr("y", y+50)
        .attr("width", 20)
        .attr("height", 20)
        .attr("fill", "#446688");

    svg.append("rect")
        .attr("x", x)
        .attr("y", y+100)
        .attr("width", 20)
        .attr("height", 20)
        .attr("fill", "#446688");

});

/* DRAW SOMEONE ELSE'S PATTERN WITH THE MYSTERY BUTTON */
d3.select("#shape--mystery").on("click", function() {


});



/* CREATE A BUTTON TO CLEAR THE SVG CANVAS */
d3.select("#clear").on("click", function() {
    
    svg.selectAll("*").remove();

});
