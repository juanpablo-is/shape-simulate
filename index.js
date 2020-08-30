var canvas = document.getElementById("myCanvas");
var canvasRectangle = document.getElementById("canvasRectangle");
var colorDots = 'rgba(10, 11, 83, .5)';
var sliderX = document.getElementById("rangeX");
var sliderY = document.getElementById("rangeY");
var sliderCycle = document.getElementById("rangecycle");
var btnSimulate = document.getElementById("btnSimulate");
var selectShape = document.getElementById("selectShapes");

var valueCycle = 5000;
var areaRectangle = 700 * 700;
var scale = 70;
let sizeX = 10;
let sizeY = 10;

var timing = null;

createMap();
createRectangleBorder()

selectShape.onchange = function () {
    clearTimeout(timing);
    createRectangleBorder(sizeX * scale, sizeY * scale);
    canvas.getContext("2d").clearRect(0, 0, 700, 700);
    canvas.getContext("2d").beginPath();
    switch (this.value) {
        case '1':
            createCircle();
            break;
        case '2':
            createShape1();
            break;
    }
}
btnSimulate.onclick = function () {
    clearTimeout(timing);
    if (selectShape.value != 0) processSimulate();
    else alert('You must choose a shape.')
};
sliderX.oninput = function () {
    clearTimeout(timing);
    sizeX = this.value;
    document.getElementById('rangeX-label').innerHTML = sizeX;
    createRectangleBorder(sizeX * scale, sizeY * scale);
};
sliderY.oninput = function () {
    clearTimeout(timing);
    sizeY = this.value;
    document.getElementById('rangeY-label').innerHTML = sizeY;
    createRectangleBorder(sizeX * scale, sizeY * scale);
};
sliderCycle.oninput = function () {
    clearTimeout(timing);
    valueCycle = this.value;
    document.getElementById('rangecycle-label').innerHTML = valueCycle;
    document.getElementById('info-total').innerHTML = valueCycle;
};

function processSimulate() {
    createRectangleBorder(sizeX * scale, sizeY * scale);
    areaRectangle = sizeX * sizeY * scale * scale;

    let areaExpected = 0;
    if (selectShape.value == 1)
        areaExpected = Math.PI * Math.pow(350, 2);
    else if (selectShape.value == 2)
        areaExpected = 24500 + 14700 + 117600 + 19600;
    document.getElementById('info-expected').innerHTML = areaExpected.toFixed(2);
    document.getElementById('info-total').innerHTML = valueCycle;

    let dentro = 0;
    for (let i = 0; i < valueCycle; i++) {
        setTimeout(function () {
            let x = Math.random() * (sizeX * scale), y = Math.random() * (sizeY * scale);
            if (selectShape.value == 1) {
                if (Math.pow(x - 350, 2) + Math.pow(y - 350, 2) <= Math.pow(350, 2))
                    dentro++;
                document.getElementById('info-result').innerHTML = (areaRectangle * (dentro / valueCycle)).toFixed(2);
                document.getElementById('info-inside').innerHTML = dentro;
            }

            createPoint(x, y);
        }, 0);
    }
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

    // Create first dot
    var ctxDot2 = canvas.getContext("2d");
    ctxDot2.fillStyle = "#0B6AB1";
    ctxDot2.strokeStyle = '#434745';
    ctxDot2.lineWidth = 2;
    ctxDot2.beginPath();
    ctxDot2.arc(scale * 8, scale * 4, 5, 0, Math.PI * 2, true);
    ctxDot2.fill();
    ctxDot2.stroke();

    // Create second dot
    var ctxDot1 = canvas.getContext("2d");
    ctxDot1.fillStyle = "#0B6AB1";
    ctxDot1.strokeStyle = '#434745';
    ctxDot1.lineWidth = 2;
    ctxDot1.beginPath();
    ctxDot1.arc(scale * 2, scale * 5, 5, 0, Math.PI * 2, true);
    ctxDot1.fill();
    ctxDot1.stroke();
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

function createRectangleBorder(width = 700, height = 700) {
    var ctx = canvasRectangle.getContext("2d");
    ctx.clearRect(0, 0, 700, 700);
    ctx.strokeStyle = 'rgb(191, 23, 27)';
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.rect(0, 0, width, height);
    ctx.stroke();
}

function createPoint(x, y) {
    var ctxDot = canvasRectangle.getContext("2d");
    ctxDot.fillStyle = colorDots;
    ctxDot.beginPath();
    ctxDot.arc(x, y, 2, 0, Math.PI * 2, true);
    ctxDot.fill();
}