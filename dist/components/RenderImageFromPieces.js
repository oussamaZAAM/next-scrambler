"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var RenderImageFromPieces = function (_a) {
    var pieces = _a.pieces, width = _a.width, height = _a.height;
    var canvasRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        if (!canvasRef.current)
            return;
        var canvas = canvasRef.current;
        var ctx = canvas.getContext('2d');
        if (ctx) {
            var imagePromises = pieces.map(function (src) {
                return new Promise(function (resolve, reject) {
                    var image = new Image();
                    image.onload = function () { return resolve(image); };
                    image.onerror = function () { return reject(new Error('Failed to load image.')); };
                    image.src = src;
                });
            });
            Promise.all(imagePromises)
                .then(function (images) {
                var totalImages = images.length;
                var columns = Math.ceil(Math.sqrt(totalImages));
                var rows = Math.ceil(totalImages / columns);
                var cellWidth = Math.ceil(width / columns);
                var cellHeight = Math.ceil(height / rows);
                canvas.width = width;
                canvas.height = height;
                ctx.clearRect(0, 0, width, height);
                images.forEach(function (image, index) {
                    var columnIndex = index % columns;
                    var rowIndex = Math.floor(index / columns);
                    var cellX = columnIndex * cellWidth;
                    var cellY = rowIndex * cellHeight;
                    var aspectWidth = Math.min(image.width, cellWidth);
                    var aspectHeight = Math.min(image.height, cellHeight);
                    var x = cellX + (cellWidth - aspectWidth) / 2;
                    var y = cellY + (cellHeight - aspectHeight) / 2;
                    ctx.drawImage(image, x, y, aspectWidth, aspectHeight);
                });
            })
                .catch(function (error) {
                console.error('Failed to load images:', error);
            });
        }
    }, [pieces, width, height]);
    return React.createElement("canvas", { ref: canvasRef });
};
exports.default = RenderImageFromPieces;
