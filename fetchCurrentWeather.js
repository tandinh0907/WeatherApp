import { makeSearchURL } from "./utils.js";

// fetchCurrentWeather(longitude: number, latitude: number): Promise<{ time: string[], temperature_2m: number[] }>
export async function fetchCurrentWeather(longitude, latitude) {
    const params = {
        longitude: longitude,
        latitude: latitude,
        hourly: "temperature_2m",
        temperature_unit: "fahrenheit",
    };
    return fetch(
        makeSearchURL("https://api.open-meteo.com/v1/forecast", params)
    )
        .then((res) =>
            res.ok
                ? res.json()
                : res.json().then(
                      (resJson) => Promise.reject(new Error(resJson["reason"])),
                      (_) => Promise.reject(new Error("API down."))
                  )
        )

        .then((resJson) => ({
            time: resJson.hourly.time,
            temperature_2m: resJson.hourly.temperature_2m,
        }));
}
