var canvas = document.getElementById("myCanvas");
var canvasRectangle = document.getElementById("canvasRectangle");
var sliderXL = document.getElementById("rangeXL");
var sliderXR = document.getElementById("rangeXR");
var sliderYL = document.getElementById("rangeYL");
var sliderYR = document.getElementById("rangeYR");
var sliderCycle = document.getElementById("rangecycle");
var btnSimulate = document.getElementById("btnSimulate");
var selectShape = document.getElementById("selectShapes");

var valueCycle = 5000;
var areaRectangle = 700 * 700;
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
    if (!(selectShape.value == 0 && document.getElementById('list-dots').length == 0)) processSimulate();
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
    sizeXL = Number(document.getElementById('rangeXL').value);
    sizeXR = Number(document.getElementById('rangeXR').value);
    sizeYL = Number(document.getElementById('rangeYL').value);
    sizeYR = Number(document.getElementById('rangeYR').value);

    createRectangleBorder(sizeXL, sizeXR, sizeYL, sizeYR);
}

function processSimulate() {
    createRectangleBorder(sizeXL, sizeXR, sizeYL, sizeYR);
    let areaExpected = 0;
    if (selectShape.value == 'circle')
        areaExpected = Math.PI * Math.pow(5, 2);
    else
        areaExpected = calculateArea();
    document.getElementById('info-expected').innerHTML = areaExpected.toFixed(2);
    document.getElementById('info-total').innerHTML = valueCycle;

    let dentro = 0;
    for (let i = 0; i < valueCycle; i++) {
        setTimeout(function () {
            let x = Math.random() * (sizeXR - sizeXL) + sizeXL,
                y = Math.random() * (sizeYR - sizeYL) + sizeYL;
            let point = { 'x': x, 'y': y };
            createPoint(point);

            if (selectShape.value == 'circle') {
                if (Math.pow(x - 5, 2) + Math.pow(y - 5, 2) <= Math.pow(5, 2))
                    dentro++;
            }
            else {
                if (pointInside(point))
                    dentro++;
            }
            areaRectangle = (sizeXR - sizeXL) * (sizeYR - sizeYL);
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
        valueLeft += vertices[i]['y'] * vertices[i + 1]['x'];
        valueRight += vertices[i]['x'] * vertices[i + 1]['y'];
    }

    let result = Math.abs((valueLeft - valueRight) / 2);
    return result;
}

function pointInside(point) {
    point.x = point.x;
    point.y = point.y;

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

function createDot() {
    let li = document.createElement('li');
    let div = document.createElement('div');

    let input1 = document.createElement('input')
    input1.type = 'number';
    input1.setAttribute('value', 0);
    input1.min = '0';
    input1.max = '10';
    input1.classList.add('dot-create');
    input1.onchange = () => {
        createShapeButton();
    }

    let input2 = document.createElement('input')
    input2.type = 'number';
    input2.setAttribute('value', 0);
    input2.min = '0';
    input2.max = '10';
    input2.classList.add('dot-create');
    input2.onchange = () => {
        createShapeButton();
    }

    div.appendChild(input1);
    div.appendChild(input2);
    li.appendChild(div);
    document.getElementById('list-dots').appendChild(li);
}

function convertArray(array) {
    let arrayConvert = []
    for (let i = 0; i < array.length; i++) {
        arrayConvert.push({ 'x': array[i][0], 'y': array[i][1] });
    }
    return arrayConvert;
}

// Add dot.
document.querySelector('#add-dot h3').addEventListener('click', () => {
    createDot();
    createShapeButton();
});
// Event close popup.
document.querySelector('#popup-modal h4').addEventListener('click', () => {
    popup('none');
});
//Event open popup
document.querySelector('#btnCreate').addEventListener('click', () => {
    popup("flex");
});
// Function event popup.
function popup(opcion) {
    document.getElementById('popup').style.display = opcion;
}