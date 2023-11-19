"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shuffleArray = void 0;
function shuffleArray(array, key) {
    var _a;
    var shuffledArray = array.slice();
    // Deterministic shuffling algorithm based on the key
    for (var i = shuffledArray.length - 1; i > 0; i--) {
        var j = (key + i) % (i + 1);
        // Check if elements at indices i and j are consecutive
        while (Math.abs(i - j) === 1) {
            j = (j + 1) % (i + 1); // Find a new index for j
        }
        // Swap elements at indices i and j
        _a = [shuffledArray[j], shuffledArray[i]], shuffledArray[i] = _a[0], shuffledArray[j] = _a[1];
    }
    return shuffledArray;
}
exports.shuffleArray = shuffleArray;
