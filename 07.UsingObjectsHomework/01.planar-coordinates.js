/*
    Write functions for working with shapes in standard Planar coordinate system.
    Points are represented by coordinates P(X, Y)
    Lines are represented by two points, marking their beginning and ending L(P1(X1,Y1), P2(X2,Y2))
    Calculate the distance between two points.
    Check if three segment lines can form a triangle.
*/

function createPoint(x, y) {
    return {
        x: x,
        y: y
    }
}

function createLine(x1, y1, x2, y2) {
    return {
        start: createPoint(x1, y1),
        end: createPoint(x2, y2),
        length: getDistanceBetweenPoints
    }
}

function getDistanceBetweenPoints(a, b) {
    var distance = Math.sqrt((a.x - b.x)*(a.x - b.x) + (a.y - b.y)*(a.y - b.y));

    return parseFloat(distance.toFixed(4));
}

function checkIfTriangleExists(a, b, c) {
    if( a.length(a.start, a.end) + b.length(b.start, b.end) > c.length(c.start, c.end) &&
        a.length(a.start, a.end) + c.length(c.start, c.end) > b.length(b.start, b.end) &&
        b.length(b.start, b.end) + c.length(c.start, c.end) > a.length(a.start, a.end)) {
        return true;
    }

    return false;
}

(function planarCoordinates() {
    var pointA = createPoint(0, 4),
        pointB = createPoint(3, 8);

    console.log('PointA = ', pointA);
    console.log('PointB = ', pointB);
    console.log('Distance = ' + getDistanceBetweenPoints(pointA, pointB));
    console.log('');

    var sideA = createLine(1, -4, 3, 8),
        sideB = createLine(0, 2, -5, 4),
        sideC = createLine(2, -1, -4, 4);

    console.log('SideA = ' + sideA.length(sideA.start, sideA.end));
    console.log('SideB = ' + sideB.length(sideB.start, sideB.end));
    console.log('SideC = ' + sideC.length(sideC.start, sideC.end));

    console.log('Triangle exists? -> ' + checkIfTriangleExists(sideA, sideB, sideC));
    console.log('');

    sideB = createLine(0, 2, 1, 1);

    console.log('SideA = ' + sideA.length(sideA.start, sideA.end));
    console.log('SideB = ' + sideB.length(sideB.start, sideB.end));
    console.log('SideC = ' + sideC.length(sideC.start, sideC.end));

    console.log('Triangle exists? -> ' + checkIfTriangleExists(sideA, sideB, sideC));
}) ();