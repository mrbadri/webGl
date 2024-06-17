class create_svg{
    constructor(points = []) {
        const svg = document.querySelector('#svgContainer');

        const smoothing = 0.2;
        const line = (pointA, pointB) => {
            const lengthX = pointB[0] - pointA[0];
            const lengthY = pointB[1] - pointA[1];
            return {
                length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
                angle: Math.atan2(lengthY, lengthX)
            }
        }
        const controlPoint = (lineCalc, smooth) => (current, previous, next, reverse) => {
            const p = previous || current;
            const n = next || current;
            const l = lineCalc(p, n)
            const angle = l.angle + (reverse ? Math.PI : 0);
            const length = l.length * smooth;
            const x = current[0] + Math.cos(angle) * length;
            const y = current[1] + Math.sin(angle) * length;

            return [x, y]
        }

        const bezierCommand = (controlPointCalc) => (point, i, a) => {
            // start control point
            const [cpsX, cpsY] = controlPointCalc(a[i - 1], a[i - 2], point);
            // end control point
            const [cpeX, cpeY] = controlPointCalc(point, a[i - 1], a[i + 1], true);

            return `C ${cpsX},${cpsY} ${cpeX},${cpeY} ${point[0]},${point[1]}`;
        }

        const svgPath = (points, command) => {
            const d = points.reduce((acc, point, i, a) => i === 0
                    ? `M ${point[0]},${point[1]}`
                    : `${acc} ${command(point, i, a)}`
                , '');
            return `<path d="${d}" id="roadpath" fill="none" stroke="grey" />`;
        }
        const controlPointCalc = controlPoint(line, smoothing);
        const bezierCommandCalc = bezierCommand(controlPointCalc);

        svg.innerHTML = svgPath(points, bezierCommandCalc);
    }
}

export {create_svg}