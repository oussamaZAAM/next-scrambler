"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var shuffleArray_1 = require("../functions/shuffleArray");
var react_1 = require("react");
var RenderImageFromPieces_1 = require("./RenderImageFromPieces");
var ImageSlices_1 = require("./ImageSlices");
function ScramblePath(_a) {
    var path = _a.path, cipherKey = _a.cipherKey, complexity = _a.complexity, _b = _a.width, width = _b === void 0 ? 800 : _b, _c = _a.height, height = _c === void 0 ? 450 : _c, onePiece = _a.onePiece;
    var _d = (0, react_1.useState)([]), imagePieces = _d[0], setImagePieces = _d[1];
    var _e = (0, react_1.useState)(imagePieces), scrambledPieces = _e[0], setScrambledPieces = _e[1];
    var loadImageFromPath = function (imagePath) {
        return new Promise(function (resolve, reject) {
            var image = new Image();
            image.onload = function () {
                var canvas = document.createElement('canvas');
                canvas.width = image.width;
                canvas.height = image.height;
                var context = canvas.getContext('2d');
                if (context) {
                    context.drawImage(image, 0, 0);
                    resolve(canvas.toDataURL());
                }
                else {
                    reject(new Error('Failed to get canvas context.'));
                }
            };
            image.onerror = function (error) {
                reject(error);
            };
            image.src = imagePath;
        });
    };
    (0, react_1.useEffect)(function () {
        setImagePieces([]);
        loadImageFromPath(path)
            .then(function (dataUrl) {
            var image = new Image();
            image.src = dataUrl;
            image.onload = function () {
                var pieceWidth = image.width / complexity;
                var pieceHeight = image.height / complexity;
                for (var row = 0; row < complexity; row++) {
                    var _loop_1 = function (col) {
                        var canvas = document.createElement('canvas');
                        canvas.width = pieceWidth;
                        canvas.height = pieceHeight;
                        var context = canvas.getContext('2d');
                        if (context) {
                            context.drawImage(image, col * pieceWidth, row * pieceHeight, pieceWidth, pieceHeight, 0, 0, pieceWidth, pieceHeight);
                            setImagePieces(function (prevPieces) { return __spreadArray(__spreadArray([], prevPieces, true), [canvas.toDataURL()], false); });
                        }
                    };
                    for (var col = 0; col < complexity; col++) {
                        _loop_1(col);
                    }
                }
            };
        })
            .catch(function (error) {
            console.error('Failed to load image:', error);
        });
    }, []);
    (0, react_1.useEffect)(function () {
        if (imagePieces.length === complexity * complexity) {
            setScrambledPieces((0, shuffleArray_1.shuffleArray)(imagePieces, cipherKey));
        }
    }, [imagePieces]);
    return (React.createElement("div", { style: { display: "flex", justifyContent: "center", alignItems: "center" } }, onePiece
        ? React.createElement(RenderImageFromPieces_1.default, { pieces: scrambledPieces, width: width, height: height })
        : React.createElement(ImageSlices_1.default, { pieces: scrambledPieces, width: width, height: height })));
}
exports.default = ScramblePath;
