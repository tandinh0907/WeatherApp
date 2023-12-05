import assert from "node:assert";
import { fetchUniversities } from "./fetchUniversities.js";
import { ensureReject } from "./utils.js";

test("fetchUniversities follows type specification", async () => {
    const promise = fetchUniversities("University of Massachusetts Amherst");
    assert(typeof promise === "object" && typeof promise.then === "function");

    return promise.then((result) => {
        assert(Array.isArray(result)); // Assert the result in an array
        assert(result.length === 1);
        assert(result.every((x) => typeof x === "string")); // Assert each element in the array is a string
    });
});

test("fetchUniversities does not fail on incorrect input", async () => {
    const promise = fetchUniversities("WrongOnPurpose");
    assert(typeof promise === "object" && typeof promise.then === "function");

    return promise.then((result) => {
        assert(Array.isArray(result)); // Assert the result in an array
        assert(result.length === 0);
    });
});

test("fetchUniversities does not fail on response failure", async () => {
    const promise = fetchUniversities("p");
    assert(typeof promise === "object" && typeof promise.then === "function");
    return ensureReject(promise);
});
