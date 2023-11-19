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
function UploadToServer(_a) {
    var _this = this;
    var complexity = _a.complexity, cipherKey = _a.cipherKey, fileName = _a.fileName, uploadPath = _a.uploadPath, folderName = _a.folderName;
    var _b = (0, react_1.useState)(null), selectedFile = _b[0], setSelectedFile = _b[1];
    var _c = (0, react_1.useState)(0), imageWidth = _c[0], setImageWidth = _c[1];
    var _d = (0, react_1.useState)(0), imageHeight = _d[0], setImageHeight = _d[1];
    var _e = (0, react_1.useState)(""), imageName = _e[0], setImageName = _e[1];
    var _f = (0, react_1.useState)([]), imagePieces = _f[0], setImagePieces = _f[1];
    var handleFileChange = function (e) {
        var file = e.target.files && e.target.files[0];
        setImageName(file.name);
        setSelectedFile(file || null);
    };
    var loadImageFromFile = function (file) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.onloadend = function () {
                resolve(reader.result);
            };
            reader.onerror = function (error) {
                reject(error);
            };
            reader.readAsDataURL(file);
        });
    };
    (0, react_1.useEffect)(function () {
        setImagePieces([]);
        if (selectedFile) {
            loadImageFromFile(selectedFile)
                .then(function (dataUrl) {
                var image = new Image();
                image.src = dataUrl;
                image.onload = function () {
                    var thisImageWidth = image.width;
                    setImageWidth(thisImageWidth);
                    var thisImageHeight = image.height;
                    setImageHeight(thisImageHeight);
                    var pieceWidth = thisImageWidth / complexity;
                    var pieceHeight = thisImageHeight / complexity;
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
        }
    }, [selectedFile]);
    (0, react_1.useEffect)(function () {
        var PostData = function (pieces) { return __awaiter(_this, void 0, void 0, function () {
            var data, response, responseData, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
                            pieces: pieces,
                            width: imageWidth,
                            height: imageHeight,
                            folder: folderName || "uploads",
                            filename: fileName || imageName,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch(uploadPath, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(data)
                            })];
                    case 2:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error('Request failed');
                        }
                        return [4 /*yield*/, response.json()];
                    case 3:
                        responseData = _a.sent();
                        console.log('Response:', responseData);
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.error('Error:', error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        if (imagePieces.length === complexity * complexity) {
            PostData((0, shuffleArray_1.shuffleArray)(imagePieces, cipherKey));
        }
    }, [imagePieces, selectedFile]);
    return (React.createElement("form", null,
        React.createElement("input", { type: "file", onChange: handleFileChange })));
}
exports.default = UploadToServer;
