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
exports.processImages = void 0;
var canvas_1 = require("canvas");
var fs_1 = require("fs");
var server_1 = require("next/server");
var path_1 = require("path");
function processImages(options) {
    return __awaiter(this, void 0, void 0, function () {
        var pieces, width, height, folder, filename, canvas, ctx, imagePromises, images, totalImages, columns_1, rows, cellWidth_1, cellHeight_1, outputFolderPath, outputFilePath, outputStream_1, stream, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pieces = options.pieces, width = options.width, height = options.height, folder = options.folder, filename = options.filename;
                    if (!Array.isArray(pieces)) {
                        return [2 /*return*/, server_1.NextResponse.json(new Error('Invalid pieces data'), { status: 400 })];
                    }
                    if (pieces.length === 0) {
                        return [2 /*return*/, server_1.NextResponse.json(new Error('Empty pieces array'), { status: 400 })];
                    }
                    canvas = (0, canvas_1.createCanvas)(width, height);
                    ctx = canvas.getContext('2d');
                    if (!ctx) {
                        return [2 /*return*/, server_1.NextResponse.json(new Error('Failed to create canvas context'), { status: 500 })];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    imagePromises = pieces.map(function (src) { return (0, canvas_1.loadImage)(src); });
                    return [4 /*yield*/, Promise.all(imagePromises)];
                case 2:
                    images = _a.sent();
                    totalImages = images.length;
                    columns_1 = Math.ceil(Math.sqrt(totalImages));
                    rows = Math.ceil(totalImages / columns_1);
                    cellWidth_1 = Math.ceil(width / columns_1);
                    cellHeight_1 = Math.ceil(height / rows);
                    ctx.clearRect(0, 0, width, height);
                    images.forEach(function (image, index) {
                        var columnIndex = index % columns_1;
                        var rowIndex = Math.floor(index / columns_1);
                        var cellX = columnIndex * cellWidth_1;
                        var cellY = rowIndex * cellHeight_1;
                        var aspectWidth = Math.min(image.width, cellWidth_1);
                        var aspectHeight = Math.min(image.height, cellHeight_1);
                        var x = cellX + (cellWidth_1 - aspectWidth) / 2;
                        var y = cellY + (cellHeight_1 - aspectHeight) / 2;
                        ctx.drawImage(image, x, y, aspectWidth, aspectHeight);
                    });
                    outputFolderPath = path_1.default.join(process.cwd(), folder);
                    outputFilePath = path_1.default.join(outputFolderPath, filename);
                    fs_1.default.mkdirSync(outputFolderPath, { recursive: true });
                    outputStream_1 = fs_1.default.createWriteStream(outputFilePath);
                    stream = canvas.createPNGStream();
                    stream.pipe(outputStream_1);
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            outputStream_1.on('finish', function () {
                                console.log('Rendered image saved successfully');
                                resolve(server_1.NextResponse.json({ success: true }, { status: 200 }));
                            });
                            outputStream_1.on('error', function (error) {
                                console.error('Failed to save rendered image:', error);
                                reject(server_1.NextResponse.json(new Error('Failed to save rendered image'), { status: 500 }));
                            });
                        })];
                case 3:
                    error_1 = _a.sent();
                    console.error('Failed to load images:', error_1);
                    return [2 /*return*/, server_1.NextResponse.json(new Error('Failed to load images'), { status: 500 })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.processImages = processImages;
