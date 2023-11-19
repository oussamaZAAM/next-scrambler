"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deshuffleArray = void 0;
function deshuffleArray(shuffledArray, key) {
    var _a;
    var originalArray = shuffledArray.slice();
    // Inverse of the shuffling algorithm
    for (var i = 1; i < originalArray.length; i++) {
        var j = (key + i) % (i + 1);
        // Check if elements at indices i and j are consecutive
        while (Math.abs(i - j) === 1) {
            j = (j + 1) % (i + 1); // Find a new index for j
        }
        // Swap elements at indices i and j
        _a = [originalArray[j], originalArray[i]], originalArray[i] = _a[0], originalArray[j] = _a[1];
    }
    return originalArray;
}
exports.deshuffleArray = deshuffleArray;
