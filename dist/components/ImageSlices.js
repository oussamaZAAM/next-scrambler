"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var image_1 = require("next/image");
var react_1 = require("react");
var ImageSlices = function (_a) {
    var pieces = _a.pieces, height = _a.height, width = _a.width;
    var gridSize = Math.ceil(Math.sqrt(pieces.length));
    return (react_1.default.createElement("div", { style: { display: 'grid', gridTemplateColumns: "repeat(".concat(gridSize, ", 1fr)"), width: width, height: height, position: 'relative' } }, pieces.map(function (src, index) { return (react_1.default.createElement(image_1.default, { width: width, height: height, key: index, src: src, alt: "Image Slice" })); })));
};
exports.default = ImageSlices;
