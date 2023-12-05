import { makeSearchURL } from "./utils.js";

// fetchUniversities(query: string): Promise<string[]>
export async function fetchUniversities(query) {
    const params = { name: query };
    return fetch(
        makeSearchURL("https://university-web-api.herokuapp.com/search", params)
    )
        .then((res) =>
            res.ok ? res.json() : Promise.reject(new Error("Incorrect query."))
        )
        .then((resJson) => resJson.map((obj) => obj.name));
}
