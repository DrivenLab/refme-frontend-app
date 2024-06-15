import { getData, storeData, removeData } from "@/utils/storage";
import * as FileSystem from "expo-file-system";


const downloadedVideos = "DOWNLOADED_VIDEOS"
const downloadedWorkouts = "DOWNLOADED_WORKOUTS"

// Esta función obtiene los videos descargados de un entrenamiento
export const storeDownloadedVideo = async (storesUris: string[], workoutId: number ) => {

    try {
        await storeData({
            name: downloadedVideos + workoutId,
            value: JSON.stringify(storesUris),
        });
        const workouts: number[] = [];
        const storedWorkouts = await getData(downloadedWorkouts);

        if (storedWorkouts) {
            try {
                const parsedWorkouts = JSON.parse(storedWorkouts);
                if (Array.isArray(parsedWorkouts)) {
                    workouts.push(...parsedWorkouts);
                }
            } catch (error) {
                console.error("Error parsing stored workouts:", error);
            }
        }
        
        workouts.push(workoutId);
        
        await storeData({
            name: downloadedWorkouts,
            value: JSON.stringify(workouts),
        });
        
            
    }
    catch (error) {
        console.log("Error storing downloaded video", error);
    }

}
// Esta función limpia los videos descargados de un entrenamiento
export const cleanWorkoutDownloadedVideos = async (workoutId:number) => {
    let urisToClean: string[] = [];
    try {
        const data = await getData(downloadedVideos + workoutId);
        const arr = JSON.parse(data);
        await removeData(downloadedVideos + workoutId);

        const storedWorkoutsData = await getData(downloadedWorkouts);
        if (storedWorkoutsData) {
            const storedWorkouts = JSON.parse(storedWorkoutsData);
            if (Array.isArray(storedWorkouts)) {
                const workouts = storedWorkouts.filter((workout: number) => workout !== workoutId);
                await storeData({
                    name: downloadedWorkouts,
                    value: JSON.stringify(workouts),
                });
            } else {
                throw new Error(
                    `storedWorkouts is not an array is ${typeof storedWorkouts} Obj: ${storedWorkouts}`
                );
            }
        }
        
        if (arr && Array.isArray(arr)) {
            urisToClean = arr;
        } else {
            throw new Error(
                `Stored data is not an array, it is ${typeof arr}. Obj: ${arr}`
            );
        }
    } catch (error) {
        console.log("Error cleaning downloaded videos", error);
    }

    urisToClean.forEach((uri: string) => {
        FileSystem.deleteAsync(uri, { idempotent: true });
    });
}