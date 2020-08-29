var canvas = document.getElementById("myCanvas");
var colorDots = 'rgba(10, 11, 83, .5)';
var valueCycle = 10000;
var scale = 70;

createMap();
createRectangleBorder()
// createShape1();
createCircle();
// processSimulate();

function processSimulate() {
    for (let i = 0; i < valueCycle; i++) {
        createPoint();
    }
}

function createRectangleBorder() {
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = 'rgb(191, 23, 27)';
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.rect(0, 0, 700, 700);
    ctx.stroke();
    ctx.stroke();
}

function createMap() {
    // Set graph
    var width = 725, height = 725;

    // create an svg container
    var vis = d3.select("#graph")
        .append("svg:svg")
        .attr("width", width + 25)
        .attr("height", height + 25);

    var xScale = d3.scale.linear().domain([10, 0]).range([width, 25]);
    var yScale = d3.scale.linear().domain([0, 10]).range([width, 25]);

    // define the y axis
    var yAxis = d3.svg.axis()
        .orient("left")
        .scale(yScale);

    // define the y axis
    var xAxis = d3.svg.axis()
        .orient("bottom")
        .scale(xScale);

    var xAxisPlot = vis.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + (height) + ")")
        .call(xAxis.tickSize(0, 0, 0));

    var yAxisPlot = vis.append("g")
        .attr("class", "axis axis--y")
        .attr("transform", "translate(" + (25) + ",0)")
        .call(yAxis.tickSize(0, 0, 0));


    xAxisPlot.selectAll(".tick line")
        .attr("y1", -700);

    yAxisPlot.selectAll(".tick line")
        .attr("x2", 700);
}

function createCircle() {
    var ctxDot2 = canvas.getContext("2d");
    ctxDot2.fillStyle = "transparent";
    ctxDot2.strokeStyle = 'rgb(191, 23, 27)';
    ctxDot2.lineWidth = 1;
    ctxDot2.beginPath();
    ctxDot2.arc(scale * 5, scale * 5, scale * 5, 0, Math.PI * 2, true);
    ctxDot2.fill();
    ctxDot2.stroke();

    var ctxDotCenter = canvas.getContext("2d");
    ctxDotCenter.fillStyle = "#434745";
    ctxDotCenter.strokeStyle = '#434745';
    ctxDotCenter.lineWidth = 2;
    ctxDotCenter.beginPath();
    ctxDotCenter.arc(scale * 5, scale * 5, 4, 0, Math.PI * 2, true);
    ctxDotCenter.fill();
    ctxDotCenter.stroke();
}

function createShape1() {
    // Create first line
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = '#434745';
    ctx.lineWidth = 2;

    ctx.moveTo(0, 0);
    ctx.lineTo(scale * 2, scale * 5);
    ctx.stroke();

    // Create second line
    var ctx2 = canvas.getContext("2d");
    ctx2.moveTo(scale * 2, scale * 5);
    ctx2.lineTo(scale * 8, scale * 4);
    ctx2.stroke();

    // Create third line
    var ctx3 = canvas.getContext("2d");
    ctx3.moveTo(scale * 8, scale * 4);
    ctx3.lineTo(scale * 10, 0);
    ctx3.stroke();

    // // Create first dot
    // var ctxDot2 = canvas.getContext("2d");
    // ctxDot2.fillStyle = "#0B6AB1";
    // ctxDot2.strokeStyle = '#434745';
    // ctxDot2.lineWidth = 2;
    // ctxDot2.beginPath();
    // ctxDot2.arc(scale * 8, scale * 4, 5, 0, Math.PI * 2, true);
    // ctxDot2.fill();
    // ctxDot2.stroke();

    // // Create second dot
    // var ctxDot1 = canvas.getContext("2d");
    // ctxDot1.fillStyle = "#0B6AB1";
    // ctxDot1.strokeStyle = '#434745';
    // ctxDot1.lineWidth = 2;
    // ctxDot1.beginPath();
    // ctxDot1.arc(scale * 2, scale * 5, 5, 0, Math.PI * 2, true);
    // ctxDot1.fill();
    // ctxDot1.stroke();
}

function createPoint() {
    var ctxDot = canvas.getContext("2d");
    ctxDot.fillStyle = colorDots;
    ctxDot.beginPath();
    ctxDot.arc(Math.random() * canvas.width, Math.random() * canvas.height, 2, 0, Math.PI * 2, true);
    ctxDot.fill();
}
