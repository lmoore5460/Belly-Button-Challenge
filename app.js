//Use the D3 library to read in samples.json from the URL:
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Fetch the JSON data and console log it
let metaData
let samples
d3.json(url).then(function(data) {
    console.log(data);
    let selector = d3.select("#selDataset");
    metaData = data.metadata;
    samples = data.samples;
    console.log("Meta_Data:",metaData);
    console.log("Samples:",samples);
    data.names.forEach((id) => {
        selector.append("option").text(id).property("value", id); 
    });
    barChart(samples[0])
    bubbleChart(samples[0]);
    demographicInfoFunction(metaData[0]);
});

function barChart(selection) {
    // Sample data for the horizontal bar chart
    var data = [{
        type: 'bar',
        orientation: 'h', // Set the orientation to horizontal
        x: selection.sample_values.slice(0, 10).reverse(), // Data for the horizontal bars
        y: selection.otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse(), // Labels for the bars
        text: selection.otu_labels.slice(0,10).reverse(),
    }];

  // Layout configuration for the chart
  var layout = {
    title: 'Top 10 OTUs',
    xaxis: { title: 'sample_values' }, // X-axis title
    yaxis: { title: 'otu_id' }, // Y-axis title
  };

  // Create the horizontal bar chart in the specified container
  Plotly.newPlot('bar', data, layout);

}

function optionChanged(value) {
    const selection = samples.find((object) => object.id == value);
    const metaSelection = metaData.find((object) => object.id == value);
    // Bar Chart
    barChart(selection);

    // Bubble Chart
     bubbleChart(selection);

     // Demographic Info
     demographicInfoFunction(metaSelection);
}

function barChart(selection) {
    // Data for the horizontal bar chart
    var data = [{
        type: 'bar',
        orientation: 'h', // Set the orientation to horizontal
        x: selection.sample_values.slice(0, 10).reverse(), // Data for the horizontal bars
        y: selection.otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse(), // Labels for the bars
        text: selection.otu_labels.slice(0,10).reverse(),
    }];

  // Layout configuration for the chart
  var layout = {
    title: 'Top 10 OTUs',
    xaxis: { title: 'sample_values' }, // X-axis title
    yaxis: { title: 'otu_id' }, // Y-axis title
  };

  // Create the horizontal bar chart in the specified container
  Plotly.newPlot('bar', data, layout);

}

function bubbleChart(selection) {
    // Data for a bubble chart
    var data = [
    {
        type: "scatter",
        x: selection.otu_ids, // X-axis values
        y: selection.sample_values, // Y-axis values
        mode: "markers", // Set the mode to 'markers' for a bubble chart
        marker: {
            size: selection.sample_values, // Size of bubbles
            color: selection.otu_ids, // Color of bubbles
            colorscale: 'Viridis', // Color scale for the bubbles
            text: selection.otu_labels, // Hover text
        },
    },
  ];
  
    // Layout configuration for the chart
    var layout = {
    title: 'OTU Bubble Chart',
    xaxis: { title: 'otu_ids' },
    yaxis: { title: 'sample_values' },
    };
  
    // Create the bubble chart
    Plotly.newPlot('bubble', data, layout);
}

function demographicInfoFunction(selection) {
  let demographicInfoSelection = d3.select("#sample-metadata");

  demographicInfoSelection.html(
  `id: ${selection.id} <br>
  ethnicity: ${selection.id} <br>
  gender: ${selection.gender} <br>
  age: ${selection.age} <br>
  location: ${selection.location} <br>
  bbtype: ${selection.bbtype} <br>
  wfreq: ${selection.wfreq} <br>
  `


  );
}