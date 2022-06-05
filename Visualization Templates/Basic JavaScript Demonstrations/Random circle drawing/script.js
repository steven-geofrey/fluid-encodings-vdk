/* CREATE THE SVG CANVAS */
const width = window.innerWidth;
const height = window.innerHeight;

const svg = d3.select("#canvas")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

/* CREATE A VARIABLE TO STORE THE CURRENT
FILL COLOR OF EACH CIRCLE */
let fillColor = "#CC0000";

/* CREATE A FUNCTION TO DRAW
A RANDOM CIRCLE WITH EACH BUTTON CLICK */
d3.select("#draw").on("click", function() {
    let rx = Math.random() * width;
    let ry = Math.random() * height;
    let rsize = 10 + Math.random() * 240;
    let ropacity = Math.random();
    
    svg.append("circle")
        .attr("cx", rx)
        .attr("cy", ry)
        .attr("r", rsize)
        .attr("fill", fillColor)
        .attr("opacity", ropacity);

});

/* CREATE BUTTONS TO CHANGE THE COLORS
OF THE RANDOM CIRCLES */
d3.select("#color--red").on("click", function() {

    fillColor = "#CC0000";

});

d3.select("#color--green").on("click", function() {

    fillColor = "#99d8c9";
    
});

d3.select("#color--blue").on("click", function() {

    fillColor = "#4682b4";
    
});

/* CREATE A BUTTON TO CLEAR THE SVG CANVAS */
d3.select("#clear").on("click", function() {
    
    svg.selectAll("*").remove();

})
