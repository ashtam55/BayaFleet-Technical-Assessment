// Data stream
const heartbeats = [60, 56, 70, 76, 79, 82, 93, 120, 130, 125, 58, 73, 80, 106, 127];

// Function to calculate the lowest average heartbeat in a 5-minute window
function findLowestAverage(heartbeats) {
    const windowSize = 10;  // Each window represents 5 minutes (300 seconds)

    let lowestAverage = Number.POSITIVE_INFINITY;

    // Iterate through the array and compute the average for each 5-minute window
    for (let i = 0; i <= heartbeats.length - windowSize; i++) {
        // Extract a 5-minute window
        const window = heartbeats.slice(i, i + windowSize);

        // Calculate the average of the current window
        const windowSum = window.reduce((sum, value) => sum + value, 0);
        const windowAverage = windowSum / windowSize;

        // Update the lowest average if the current one is lower
        if (windowAverage < lowestAverage) {
            lowestAverage = windowAverage;
        }
    }

    return lowestAverage;
}

// Call the function and print the result
const lowestAvg = findLowestAverage(heartbeats);
console.log("The lowest average heartbeat in a 5-minute frame is:", lowestAvg);
