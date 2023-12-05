import { readFile, writeFile } from "node:fs/promises";

// writeToJSONFile(path: string, data: object | object[]): Promise<void>
export async function writeToJSONFile(path, data) {
    let jsonRepr = JSON.stringify(data);
    return writeFile(path, jsonRepr);
}

// readFromJSONFile(path: string): Promise<object | object[]>
export async function readFromJSONFile(path) {
    return readFile(path).then((data) => JSON.parse(data));
}
