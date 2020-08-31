var scale = 70;
var colorDots = 'rgba(10, 11, 83, .5)';

function createPoint(point) {
    var ctxDot = canvasRectangle.getContext("2d");
    ctxDot.fillStyle = colorDots;
    ctxDot.beginPath();
    ctxDot.arc(point.x * scale, point.y * scale, 2, 0, Math.PI * 2, true);
    ctxDot.fill();
}

function createCircle() {
    var canvasCircle = canvas.getContext("2d");
    canvasCircle.fillStyle = "transparent";
    canvasCircle.strokeStyle = 'rgb(191, 23, 27)';
    canvasCircle.lineWidth = 1;
    canvasCircle.beginPath();
    canvasCircle.arc(scale * 5, scale * 5, scale * 5, 0, Math.PI * 2, true);
    canvasCircle.fill();
    canvasCircle.stroke();

    var ctxDotCenter = canvas.getContext("2d");
    ctxDotCenter.fillStyle = "#434745";
    ctxDotCenter.strokeStyle = '#434745';
    ctxDotCenter.lineWidth = 2;
    ctxDotCenter.beginPath();
    ctxDotCenter.arc(scale * 5, scale * 5, 4, 0, Math.PI * 2, true);
    ctxDotCenter.fill();
    ctxDotCenter.stroke();
}

function createShape() {
    // Create first line
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = '#434745';
    ctx.lineWidth = 2;

    for (let i = 0; i < verticesArr.length; i++) {
        //Create a line.
        var ctx2 = canvas.getContext("2d");
        ctx2.moveTo(scale * verticesArr[i]['x'], scale * verticesArr[i]['y']);
        ctx2.lineWidth = 3;
        ctx2.lineTo(scale * verticesArr[i == verticesArr.length - 1 ? 0 : i + 1]['x'], scale * verticesArr[i == verticesArr.length - 1 ? 0 : i + 1]['y']);
        ctx2.stroke();

        //Create a dot.
        var ctxDot2 = canvas.getContext("2d");
        ctxDot2.fillStyle = "#0B6AB1";
        ctxDot2.strokeStyle = '#434745';
        ctxDot2.lineWidth = 3;
        // Dot start.
        ctxDot2.beginPath();
        ctxDot2.arc(scale * verticesArr[i == verticesArr.length - 1 ? 0 : i + 1]['x'], scale * verticesArr[i == verticesArr.length - 1 ? 0 : i + 1]['y'], 5, 0, Math.PI * 2, true);
        ctxDot2.fill();
        ctxDot2.stroke();
        //Dot end.
        ctxDot2.beginPath();
        ctxDot2.arc(scale * verticesArr[i == verticesArr.length - 1 ? 0 : i + 1]['x'], scale * verticesArr[i == verticesArr.length - 1 ? 0 : i + 1]['y'], 5, 0, Math.PI * 2, true);
        ctxDot2.fill();
        ctxDot2.stroke();
    }
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

function createRectangleBorder(xL = 0, xR = 10, yL = 0, yR = 10) {
    var ctx = canvasRectangle.getContext("2d");
    ctx.clearRect(0, 0, 700, 700);
    ctx.strokeStyle = 'rgb(191, 23, 27)';
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.rect((xL * scale), (yL * scale), (xR - xL) * scale, (yR - yL) * scale);
    // ctx.rect(70, 70, 140, 140);
    ctx.stroke();
}