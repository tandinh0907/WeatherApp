import { makeSearchURL } from "./utils.js";

// fetchLongitudeAndLatitude(query: string): Promise<{ lon: number, lat: number }>
export async function fetchLongitudeAndLatitude(query) {
    const params = { q: query };
    return fetch(
        makeSearchURL("https://geocode-cache.herokuapp.com/search", params)
    )
        .then((res) =>
            res.ok ? res.json() : Promise.reject(new Error("API down."))
        )
        .then((resJson) =>
            resJson.length > 0
                ? Promise.resolve(resJson[0])
                : Promise.reject(new Error("No results found for query."))
        )
        .then((obj) => ({ lon: Number(obj.lon), lat: Number(obj.lat) }));
}
