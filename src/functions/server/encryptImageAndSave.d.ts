export declare function encryptImageAndSave(
    file: Blob,
    complexity: number,
    cipherKey: number,
    folder: string,
    filename: string
  ): Promise<void>;