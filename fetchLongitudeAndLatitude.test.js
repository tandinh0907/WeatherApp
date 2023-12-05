import { fetchLongitudeAndLatitude } from "./fetchLongitudeAndLatitude.js";
import { ensureReject } from "./utils.js";
import assert from "node:assert";

test("fetchLongitudeAndLatitude follows type specification", async () => {
    const promise = fetchLongitudeAndLatitude(
        "University of Massachusetts Amherst"
    );
    assert(typeof promise === "object" && typeof promise.then === "function");

    return promise.then((result) => {
        assert(typeof result === "object"); //  Assert the result is an object
        assert(typeof result.lon === "number"); // Assert that the lon value is a number
        assert(typeof result.lat === "number"); // Assert that the lat value is a number
        assert(Object.keys(result).length === 2); // Assert there are only two keys in the object
    });
});

test("fetchCurrentWeather rejects on incorrect query", async () => {
    const promise = fetchLongitudeAndLatitude("IntentionallyWrong");
    return ensureReject(promise);
});
