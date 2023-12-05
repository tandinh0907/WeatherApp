import { sortObject } from "./utils.js";
import assert from "node:assert";

test("sortObject as expected", async () => {
    const obj_test = { two: 2, one: 1, five: 5, three: 3 };
    const output_arr = sortObject(obj_test);
    const correct_arr = [5, 3, 2, 1];

    assert(
        output_arr.length === correct_arr.length &&
            output_arr.every((v, i) => output_arr[i] === correct_arr[i])
    );
});
