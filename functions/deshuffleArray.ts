export function deshuffleArray<T>(shuffledArray: T[], key: number): T[] {
  const originalArray = shuffledArray.slice();

  // Inverse of the shuffling algorithm
  for (let i = 1; i < originalArray.length; i++) {
    let j = (key + i) % (i + 1);

    // Check if elements at indices i and j are consecutive
    while (Math.abs(i - j) === 1) {
      j = (j + 1) % (i + 1); // Find a new index for j
    }

    // Swap elements at indices i and j
    [originalArray[i], originalArray[j]] = [originalArray[j]!, originalArray[i]!];
  }

  return originalArray;
}