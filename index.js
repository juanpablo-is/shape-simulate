var canvas = document.getElementById("myCanvas");
var colorDots = 'green';
var valueCycle = 10000;

createMap();
createShape1();
createCircle();

for (let i = 0; i < valueCycle; i++) {
    // createPoint();
}

function createMap() {
    // Set graph
    var width = 1035, height = 1020;

    // create an svg container
    var vis = d3.select("#graph")
        .append("svg:svg")
        .attr("width", width)
        .attr("height", height);

    var xScale = d3.scale.linear().domain([10, 0]).range([width - 10, 25]);
    var yScale = d3.scale.linear().domain([0, 5]).range([height / 2, 10]);

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
        .attr("transform", "translate(0," + (height - 510) + ")")
        .call(xAxis.tickSize(0, 0, 0));

    var yAxisPlot = vis.append("g")
        .attr("class", "axis axis--y")
        .attr("transform", "translate(" + (25) + ",0)")
        .call(yAxis.tickSize(0, 0, 0));


    xAxisPlot.selectAll(".tick line")
        .attr("y1", -500);

    yAxisPlot.selectAll(".tick line")
        .attr("x2", 1000);
}

function createCircle() {
    var ctxDot2 = canvas.getContext("2d");
    ctxDot2.fillStyle = "transparent";
    ctxDot2.strokeStyle = '#434745';
    ctxDot2.lineWidth = 2;
    ctxDot2.beginPath();
    ctxDot2.arc(500, 250, 240, 0, Math.PI * 2, true);
    ctxDot2.fill();
    ctxDot2.stroke();

    var ctxDotCenter = canvas.getContext("2d");
    ctxDotCenter.fillStyle = "#434745";
    ctxDotCenter.strokeStyle = '#434745';
    ctxDotCenter.lineWidth = 2;
    ctxDotCenter.beginPath();
    ctxDotCenter.arc(500, 250, 4, 0, Math.PI * 2, true);
    ctxDotCenter.fill();
    ctxDotCenter.stroke();
}

function createShape1() {
    // Create first line
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = '#434745';
    ctx.lineWidth = 2;

    ctx.moveTo(0, 0);
    ctx.lineTo(200, 500);
    ctx.stroke();

    // Create second line
    var ctx2 = canvas.getContext("2d");
    ctx2.moveTo(200, 500);
    ctx2.lineTo(800, 400);
    ctx2.stroke();

    // Create third line
    var ctx3 = canvas.getContext("2d");
    ctx3.moveTo(800, 400);
    ctx3.lineTo(1000, 0);
    ctx3.stroke();

    // Create first dot
    var ctxDot2 = canvas.getContext("2d");
    ctxDot2.fillStyle = "#0B6AB1";
    ctxDot2.strokeStyle = '#434745';
    ctxDot2.lineWidth = 2;
    ctxDot2.beginPath();
    ctxDot2.arc(800, 400, 5, 0, Math.PI * 2, true);
    ctxDot2.fill();
    ctxDot2.stroke();

    // Create second dot
    var ctxDot1 = canvas.getContext("2d");
    ctxDot1.fillStyle = "#0B6AB1";
    ctxDot1.strokeStyle = '#434745';
    ctxDot1.lineWidth = 2;
    ctxDot1.beginPath();
    ctxDot1.arc(200, 500, 5, 0, Math.PI * 2, true);
    ctxDot1.fill();
    ctxDot1.stroke();
}

function createPoint() {
    var ctxDot = canvas.getContext("2d");
    ctxDot.fillStyle = colorDots;
    ctxDot.beginPath();
    ctxDot.arc(Math.random() * canvas.width, Math.random() * canvas.height, 2, 0, Math.PI * 2, true);
    ctxDot.fill();
}
