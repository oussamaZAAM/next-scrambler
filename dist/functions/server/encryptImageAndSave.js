"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptImageAndSave = exports.scrambleCanvas = void 0;
var shuffleArray_1 = require("../shuffleArray");
var canvas_1 = require("canvas");
var fs_1 = require("fs");
var path_1 = require("path");
function scrambleCanvas(canvas, complexity) {
    return __awaiter(this, void 0, void 0, function () {
        var ctx, imageWidth, imageHeight, pieceWidth, pieceHeight, imagePieces, row, col, pieceCanvas, pieceCtx;
        return __generator(this, function (_a) {
            ctx = canvas.getContext('2d');
            imageWidth = canvas.width;
            imageHeight = canvas.height;
            pieceWidth = imageWidth / complexity;
            pieceHeight = imageHeight / complexity;
            imagePieces = [];
            // Loop through the rows and columns of the canvas to create image pieces
            for (row = 0; row < complexity; row++) {
                for (col = 0; col < complexity; col++) {
                    pieceCanvas = (0, canvas_1.createCanvas)(pieceWidth, pieceHeight);
                    pieceCtx = pieceCanvas.getContext('2d');
                    if (pieceCtx && ctx) {
                        // Draw the corresponding piece of the original canvas onto each piece canvas
                        pieceCtx.drawImage(canvas, col * pieceWidth, row * pieceHeight, pieceWidth, pieceHeight, 0, 0, pieceWidth, pieceHeight);
                        // Convert the piece canvas to a data URL and add it to the imagePieces array
                        imagePieces.push(pieceCanvas.toDataURL());
                    }
                }
            }
            return [2 /*return*/, imagePieces];
        });
    });
}
exports.scrambleCanvas = scrambleCanvas;
function encryptImageAndSave(file, complexity, cipherKey, folder, filename) {
    return __awaiter(this, void 0, void 0, function () {
        var reader, chunks, _a, done, value, buffer, image, width, height, canvas, ctx, imagePieces, imagePromises, images, totalImages, columns_1, rows, cellWidth_1, cellHeight_1, scrambledCanvas, scrambledContext_1, outputFolderPath, outputFilePath, outputStream_1, stream, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    reader = file.stream().getReader();
                    chunks = [];
                    _b.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 3];
                    return [4 /*yield*/, reader.read()];
                case 2:
                    _a = _b.sent(), done = _a.done, value = _a.value;
                    if (done)
                        return [3 /*break*/, 3];
                    chunks.push(value);
                    return [3 /*break*/, 1];
                case 3:
                    buffer = Buffer.concat(chunks);
                    return [4 /*yield*/, (0, canvas_1.loadImage)(buffer)];
                case 4:
                    image = _b.sent();
                    width = image.width;
                    height = image.height;
                    canvas = (0, canvas_1.createCanvas)(width, height);
                    ctx = canvas.getContext('2d');
                    // Draw the image onto the canvas
                    ctx.drawImage(image, 0, 0, width, height);
                    _b.label = 5;
                case 5:
                    _b.trys.push([5, 8, , 9]);
                    return [4 /*yield*/, scrambleCanvas(canvas, complexity)];
                case 6:
                    imagePieces = _b.sent();
                    imagePromises = (0, shuffleArray_1.shuffleArray)(imagePieces, cipherKey).map(function (src) { return (0, canvas_1.loadImage)(src); });
                    return [4 /*yield*/, Promise.all(imagePromises)];
                case 7:
                    images = _b.sent();
                    totalImages = images.length;
                    columns_1 = Math.ceil(Math.sqrt(totalImages));
                    rows = Math.ceil(totalImages / columns_1);
                    cellWidth_1 = Math.ceil(width / columns_1);
                    cellHeight_1 = Math.ceil(height / rows);
                    scrambledCanvas = (0, canvas_1.createCanvas)(width, height);
                    scrambledContext_1 = scrambledCanvas.getContext('2d');
                    // Clear the canvas
                    scrambledContext_1.clearRect(0, 0, width, height);
                    // Draw each image onto the new canvas at the appropriate position
                    images.forEach(function (image, index) {
                        var columnIndex = index % columns_1;
                        var rowIndex = Math.floor(index / columns_1);
                        var cellX = columnIndex * cellWidth_1;
                        var cellY = rowIndex * cellHeight_1;
                        var aspectWidth = Math.min(image.width, cellWidth_1);
                        var aspectHeight = Math.min(image.height, cellHeight_1);
                        var x = cellX + (cellWidth_1 - aspectWidth) / 2;
                        var y = cellY + (cellHeight_1 - aspectHeight) / 2;
                        scrambledContext_1.drawImage(image, x, y, aspectWidth, aspectHeight);
                    });
                    outputFolderPath = path_1.default.join(process.cwd(), folder);
                    outputFilePath = path_1.default.join(outputFolderPath, filename);
                    // Create the output folder (if it doesn't exist)
                    fs_1.default.mkdirSync(outputFolderPath, { recursive: true });
                    outputStream_1 = fs_1.default.createWriteStream(outputFilePath);
                    stream = scrambledCanvas.createPNGStream();
                    // Pipe the canvas stream to the output stream
                    stream.pipe(outputStream_1);
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            outputStream_1.on('finish', function () { return resolve; });
                            outputStream_1.on('error', reject);
                        })];
                case 8:
                    error_1 = _b.sent();
                    console.error('Failed to load images:', error_1);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.encryptImageAndSave = encryptImageAndSave;
