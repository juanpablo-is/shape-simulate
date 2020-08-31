var canvas = document.getElementById("myCanvas");
var canvasRectangle = document.getElementById("canvasRectangle");
var colorDots = 'rgba(10, 11, 83, .5)';
var sliderXL = document.getElementById("rangeXL");
var sliderXR = document.getElementById("rangeXR");
var sliderYL = document.getElementById("rangeYL");
var sliderYR = document.getElementById("rangeYR");
var sliderCycle = document.getElementById("rangecycle");
var btnSimulate = document.getElementById("btnSimulate");
var selectShape = document.getElementById("selectShapes");

var valueCycle = 5000;
var areaRectangle = 700 * 700;
var scale = 70;
let sizeXL = 0;
let sizeXR = 10;
let sizeYL = 0;
let sizeYR = 10;

var timing = null;

let verticesArr = [];

createMap();
createRectangleBorder();

selectShape.onchange = function () {
    verticesArr = selectShape.options[selectShape.selectedIndex].dataset.vertices != undefined ? convertArray(JSON.parse(selectShape.options[selectShape.selectedIndex].dataset.vertices)) : [];
    slider()
    canvas.getContext("2d").clearRect(0, 0, 700, 700);
    canvas.getContext("2d").beginPath();
    switch (this.value) {
        case '1':
            createCircle();
            break;
        case '2':
            createShape();
            break;
    }
}
btnSimulate.onclick = function () {
    clearTimeout(timing);
    if (selectShape.value != 0) processSimulate();
    else alert('You must choose a shape.')
};
sliderXL.oninput = function () {
    slider()
};
sliderXR.oninput = function () {
    slider()
};
sliderYL.oninput = function () {
    slider()
};
sliderYR.oninput = function () {
    slider()
};
sliderCycle.oninput = function () {
    clearTimeout(timing);
    valueCycle = this.value;
    document.getElementById('rangecycle-label').innerHTML = valueCycle;
    document.getElementById('info-total').innerHTML = valueCycle;
};

function slider() {
    clearTimeout(timing);
    sizeXL = document.getElementById('rangeXL').value;
    sizeXR = document.getElementById('rangeXR').value;
    sizeYL = document.getElementById('rangeYL').value;
    sizeYR = document.getElementById('rangeYR').value;

    // document.getElementById('rangeX-label').innerHTML = sizeX;
    createRectangleBorder(sizeXL * scale, sizeXR * scale, sizeYL * scale, sizeYR * scale);
    return (sizeXR - sizeXL) * scale * (sizeYR - sizeYL) * scale;
}

function processSimulate() {
    areaRectangle = slider();

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
            let x = Math.random() * (sizeXR * scale - sizeXL * scale) + (sizeXL * scale),
                y = Math.random() * (sizeYR * scale - sizeYL * scale) + (sizeYL * scale);
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
    let vertices = JSON.parse(JSON.stringify(verticesArr));
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
    for (let i = 1; i < verticesArr.length; i++) {
        let vertex1 = verticesArr[i - 1];
        let vertex2 = verticesArr[i];
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

function convertArray(array) {
    let arrayConvert = []
    for (let i = 0; i < array.length; i++) {
        arrayConvert.push({ 'x': array[i][0], 'y': array[i][1] });
    }
    return arrayConvert;
}