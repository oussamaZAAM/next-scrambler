"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reassembleImage = void 0;
function reassembleImage(imagePieces) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    if (context) {
        var pieceImage = new Image();
        pieceImage.src = imagePieces[0] ? imagePieces[0] : "";
        var pieceWidth = pieceImage.width;
        var pieceHeight = pieceImage.height;
        var gridSize = Math.sqrt(imagePieces.length);
        canvas.width = pieceWidth * gridSize;
        canvas.height = pieceHeight * gridSize;
        for (var i = 0; i < imagePieces.length; i++) {
            var row = Math.floor(i / gridSize);
            var col = i % gridSize;
            var pieceImage_1 = new Image();
            pieceImage_1.src = imagePieces[0] ? imagePieces[0] : "";
            context.drawImage(pieceImage_1, col * pieceWidth, row * pieceHeight, pieceWidth, pieceHeight);
        }
        return canvas.toDataURL();
    }
    return '';
}
exports.reassembleImage = reassembleImage;
