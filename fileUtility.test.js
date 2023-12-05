import assert from "node:assert";
import { readFromJSONFile, writeToJSONFile } from "./fileUtility.js";
import { objEqual } from "./utils.js";

test("reading and writing objects work properly", async () => {
    let sample_obj = { one: 1, two: 2, three: 3 };
    const fname = "testOutput.json";

    return writeToJSONFile(fname, sample_obj)
        .then((_) => readFromJSONFile(fname))
        .then((result) => {
            assert(typeof result === "object");
            assert(objEqual(sample_obj, result));
        });
});
