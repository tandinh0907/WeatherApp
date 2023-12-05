import { fetchCurrentWeather } from "./fetchCurrentWeather.js";
import { fetchLongitudeAndLatitude } from "./fetchLongitudeAndLatitude.js";
import { fetchUniversities } from "./fetchUniversities.js";
import { getAvg, toObject } from "./utils.js";

// fetchUniversityWeather(universityQuery: string): Promise<{ [key: string]: number }>
export async function fetchUniversityWeather(universityQuery) {
    let allUnis = await fetchUniversities(universityQuery);
    return allUnis.length === 0
        ? Promise.reject(new Error("No results found for query."))
        : Promise.all(
              allUnis.map((uni) =>
                  fetchLongitudeAndLatitude(uni)
                      .then((locData) =>
                          fetchCurrentWeather(locData.lon, locData.lat)
                      )
                      .then((temps) => getAvg(temps.temperature_2m))
              )
          ).then((allAvgs) => ({
              totalAverage: getAvg(allAvgs),
              ...toObject(allUnis, allAvgs),
          }));
}

// fetchUMassWeather(): Promise<{ [key: string]: number }>
export async function fetchUMassWeather() {
    return fetchUniversityWeather("University of Massachusetts");
}

// fetchUCalWeather(): Promise<{ [key: string]: number }>
export function fetchUCalWeather() {
    return fetchUniversityWeather("University of California");
}
