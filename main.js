import { fetchUMassWeather, fetchUCalWeather } from "./universityWeather.js";
import { writeToJSONFile } from "./fileUtility.js";
import { sortObject, toObject } from "./utils.js";

// interestingStatistic()
async function interestingStatistic() {
    // Get Weather information of umass and ucal
    let unisWeather = {
        umass: await fetchUMassWeather(),
        ucal: await fetchUCalWeather(),
    };

    // Compute average weather difference & remove "totalAverage" from both the objects
    const averageDifference =
        unisWeather["umass"].totalAverage - unisWeather["ucal"].totalAverage;
    Object.values(unisWeather).forEach((d) => delete d["totalAverage"]);

    // Sort weather averages for umass and ucal
    Object.keys(unisWeather).forEach((k) => {
        unisWeather[k] = sortObject(unisWeather[k]);
    });

    // Get differences of weather between umass and ucal
    const differenceTop = unisWeather["umass"].map(
        (e, i) => e - unisWeather["ucal"][i]
    );

    // Extract the difference of the top 3 values and put into object
    const N = 3;
    const objKeys = [...Array(N).keys()].map(
        (e) => "Top " + (e + 1) + " Difference"
    );
    let objToWrite = {
        Order: "UMass Weather - UCal Weather",
        "Average Difference": averageDifference,
        ...toObject(objKeys, differenceTop.slice(0, N)),
    };

    // Print result object to console and write to json file
    console.log(objToWrite);
    writeToJSONFile("interestingStat.json", objToWrite);
}

/*
This function calculates the total average of UMass and UCal weather. It finds the difference between
UMass and UCal average weather and also the difference of their top three greatest temperature values.
It writes final object with average and top 3 difference values to a file "interestingStat.json" and
prints to console.
*/
interestingStatistic();
