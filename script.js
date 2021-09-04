const svg = d3.select("svg")

const width = +svg.attr("width")
const height = +svg.attr("height")

const render = data => {
  const xValue = d => d.acceleration
  const yValue = d => d.horsepower
  const margin = {top:50, right:40, bottom:70, left:100}
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.bottom - margin.top
  const circleRadius = 5
  const xAxisLabel = "Acceleration"
  const yAxisLabel = "Horsepower"
  const title = `Cars: ${yAxisLabel} vs ${xAxisLabel}` 
  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth])
    .nice() //lines are closed
  
  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, yValue))
    .range([0, innerHeight])
    .nice()

  const xAxis = d3.axisBottom(xScale)
    .tickSize(-innerHeight)
    .tickPadding(20)

  const g = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

  const yAxis = d3.axisLeft(yScale)
    .tickSize(-innerWidth)
    .tickPadding(10)
  
  const yAxisG = g.append("g")
    .call(yAxis)
  
  yAxisG
    .selectAll(".domain") //dom element
    .remove()
  
  yAxisG
    .append("text")
    .attr("class", "axis-label")
    .text(yAxisLabel)
    .attr("x", -innerHeight / 2)
    .attr("text-anchor", "middle")
    .attr("y", -50)
    .attr("transform", `rotate(-90)`)

  const xAxisG = g.append("g")
    .call(xAxis)
    .attr("transform", `translate(0, ${innerHeight})`)

  xAxisG
    .attr("fill", "black")
    .selectAll(".domain") //dom element
    .remove()

  xAxisG.append("text")
    .attr("class", "axis-label")
    .text(xAxisLabel)
    .attr("x", innerWidth / 2)
    .attr("y", 60)

  g.selectAll("circle").data(data)
    .enter().append("circle")
    .attr("cy", d => yScale(yValue(d)))
    .attr("cx", d => xScale(xValue(d)))
    .attr("r", circleRadius)

  g.append("text")
    .attr("class", "title")
    .attr("y", -10)
    .text(title)
}

d3.csv("https://vizhub.com/curran/datasets/auto-mpg.csv")
  .then(data => {
    data.forEach(d => {
      d.mpg = +d.mpg
      d.cylinders = +d.cylinders
      d.displacement = +d.displacement
      d.horsepower = +d.horsepower
      d.weight = +d.weight
      d.acceleration = +d.acceleration
      d.year = +d.year
    })
    render(data) // d for data
})
