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

let verticesShape1 = [
    { 'x': 0, 'y': 0 },
    { 'x': 2, 'y': 5 },
    { 'x': 8, 'y': 4 },
    { 'x': 10, 'y': 0 },
];

createMap();
createRectangleBorder();

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
        areaExpected = calculateArea(); // 176400;
    document.getElementById('info-expected').innerHTML = areaExpected.toFixed(2);
    document.getElementById('info-total').innerHTML = valueCycle;

    let dentro = 0;
    for (let i = 0; i < valueCycle; i++) {
        setTimeout(function () {
            let x = Math.random() * (sizeX * scale), y = Math.random() * (sizeY * scale);
            let point = { 'x': x, 'y': y };
            createPoint(point);

            if (selectShape.value == 1) {
                if (Math.pow(x - 350, 2) + Math.pow(y - 350, 2) <= Math.pow(350, 2))
                    dentro++;
            }
            else if (selectShape.value == 2) {
                if (pointInside(point))
                    dentro++;
            }
            document.getElementById('info-result').innerHTML = (areaRectangle * (dentro / valueCycle)).toFixed(2);
            document.getElementById('info-inside').innerHTML = dentro;

        }, 0);
    }
}

function calculateArea() {
    let vertices = JSON.parse(JSON.stringify(verticesShape1));
    vertices.push(vertices[0]);

    let count = vertices.length - 1;
    let valueLeft = 0, valueRight = 0;

    for (let i = 0; i < count; i++) {
        valueLeft += vertices[i]['y'] * vertices[i + 1]['x'] * scale * scale;
        valueRight += vertices[i]['x'] * vertices[i + 1]['y'] * scale * scale;
    }

    let result = Math.abs((valueLeft - valueRight) / 2);
    return result;
}

function pointInside(point) {
    point.x = point.x / 70;
    point.y = point.y / 70;

    let intersections = 0;
    for (let i = 1; i < verticesShape1.length; i++) {
        let vertex1 = verticesShape1[i - 1];
        let vertex2 = verticesShape1[i];
        if (vertex1['y'] == vertex2['y'] && vertex1['y'] == point['y'] && point['x'] > Math.min(vertex1['x'], vertex2['x']) && point['x'] < Math.max(vertex1['x'], vertex2['x']))
            return true; //boundary
        if (point['y'] > Math.min(vertex1['y'], vertex2['y']) && point['y'] <= Math.max(vertex1['y'], vertex2['y']) && point['x'] <= Math.max(vertex1['x'], vertex2['x']) && vertex1['y'] != vertex2['y']) {
            xinters = (point['y'] - vertex1['y']) * (vertex2['x'] - vertex1['x']) / (vertex2['y'] - vertex1['y']) + vertex1['x'];
            if (xinters == point['x'])
                return true; //boundary
            if (vertex1['x'] == vertex2['x'] || point['x'] <= xinters)
                intersections++;
        }
    }
    if (intersections % 2 != 0) {
        return true; //inside
    } else {
        return false; //outside
    }
}