import assert from "node:assert";
import {
    fetchUMassWeather,
    fetchUCalWeather,
    fetchUniversityWeather,
} from "./universityWeather";

test("fetchUCalWeather follows type specification", () => {
    const promise = fetchUCalWeather();
    assert(typeof promise === "object" && typeof promise.then === "function");

    return promise.then((result) => {
        assert(typeof result === "object");
        assert(Object.keys(result).every((x) => typeof x === "string"));
        assert(Object.values(result).every((x) => typeof x === "number"));
    });
});

test("fetchUMassWeather follows type specification", () => {
    const promise = fetchUMassWeather();
    assert(typeof promise === "object" && typeof promise.then === "function");

    return promise.then((result) => {
        assert(typeof result === "object");
        assert(Object.keys(result).every((x) => typeof x === "string"));
        assert(Object.values(result).every((x) => typeof x === "number"));
    });
});

test("fetchUniversityWeather follows errors out correctly", () => {
    const promise = fetchUniversityWeather("BadQuery"); // No university with this name exists
    assert(typeof promise === "object" && typeof promise.then === "function");
    expect.assertions(1);
    return expect(promise).rejects.toThrow();
});
