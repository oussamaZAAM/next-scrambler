export function shuffleArray<T>(array: T[], key: number): T[] {
    const shuffledArray = array.slice();
  
    // Deterministic shuffling algorithm based on the key
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      let j = (key + i) % (i + 1);
  
      // Check if elements at indices i and j are consecutive
      while (Math.abs(i - j) === 1) {
        j = (j + 1) % (i + 1); // Find a new index for j
      }
  
      // Swap elements at indices i and j
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j]!, shuffledArray[i]!];
    }
  
    return shuffledArray;
  }