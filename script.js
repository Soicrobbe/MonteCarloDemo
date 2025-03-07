// Initial function to integrate
let f = new Function("x", "return Math.sin(x);");

// Monte Carlo integration function
function monteCarloIntegration(f, a, b, numSamples) {
    let sum = 0;
    let points = [];

    for (let i = 0; i < numSamples; i++) {
        let x = Math.random() * (b - a) + a;  // Random x between a and b
        let y = f(x);  // Function value at x
        sum += y;
        points.push({x: x, y: y});  // Store x, y pair for visualization
    }

    let integral = (b - a) * sum / numSamples;
    return {integral, points};
}

// Function to update the plot and perform integration
function updatePlot() {
    // Get the function from the input
    const userInput = document.getElementById("function-input");
    if (userInput.value == "") {
        userInput.value = "Math.sin(x)";
    }

    try {
        // Update the function dynamically based on input
        f = new Function("x", `return ${userInput.value};`);

        // Integration bounds and samples
        const a = 0;  // Lower bound
        const b = Math.PI;  // Upper bound
        const numSamples = 1000;  // Number of random points

        // Perform Monte Carlo integration
        const {integral, points} = monteCarloIntegration(f, a, b, numSamples);

        // Prepare data for plotting
        const xVals = [];
        const yVals = [];
        const plotPointsX = [];
        const plotPointsY = [];

        for (let i = 0; i <= 100; i++) {
            xVals.push(a + (b - a) * i / 100);
            yVals.push(f(xVals[i]));
        }

        points.forEach(point => {
            plotPointsX.push(point.x);
            plotPointsY.push(point.y);
        });

        // Create the plot
        const trace1 = {
            x: xVals,
            y: yVals,
            mode: 'lines',
            name: 'Function f(x)',
            line: {color: 'blue'}
        };

        const trace2 = {
            x: plotPointsX,
            y: plotPointsY,
            mode: 'markers',
            name: 'Monte Carlo Samples',
            marker: {color: 'red', size: 5}
        };

        const isMobile = window.innerWidth <= 768;
        const layout = {
            title: `Monte Carlo Integration Approximation:<br> Integral = ${integral.toFixed(4)}`,
            xaxis: {title: 'x'},
            yaxis: {title: 'f(x)'},
            legend: {
                orientation: 'h', // Horizontal orientation
                x: 0.0,
                xanchor: 'left',
                y: isMobile ? 1.05 : 1, // Move legend above the plot on mobile
                yanchor: 'top',
            },
            margin: {
                t:120
            }
        };

        const data = [trace1, trace2];
        Plotly.newPlot('plot', data, layout);

    } catch (error) {
        alert("Invalid function. Please enter a valid JavaScript expression.");
    }
}

// Update the plot on input change
document.getElementById("function-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        console.log("hello world")
        updatePlot();
    }
});

// Initial plot
updatePlot();
