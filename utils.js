import assert from "node:assert";
import { URL } from "node:url";

// makeSearchURL(baseUrl: string, objParams: Object): string
export function makeSearchURL(baseUrl, objParams) {
    const searchURL = new URL(baseUrl);

    for (const [key, value] of Object.entries(objParams)) {
        searchURL.searchParams.append(key, value);
    }

    return searchURL.toString();
}

// getAvg(arr: number): number
export function getAvg(arr) {
    return arr.reduce((acc, e) => acc + e, 0) / arr.length;
}

// toObject(string[], string[]): Object
export function toObject(arrKeys, arrValues) {
    let rv = {};
    for (let i = 0; i < arrKeys.length; ++i) {
        rv[arrKeys[i]] = arrValues[i];
    }
    return rv;
}

// objEqual(o1: Object, o2: Object): boolean
export function objEqual(o1, o2) {
    const eq = (a, b) => Object.keys(a).every((k) => a[k] === b[k]);
    return eq(o1, o2) && eq(o2, o1);
}

// ensureReject(Promise): Promise
export async function ensureReject(promise) {
    return promise.then(undefined, (_) => {
        assert(true);
    });
}

// sortObject(obj: Object): T[]
export function sortObject(obj) {
    return Object.values(obj).sort((a, b) => b - a);
}
