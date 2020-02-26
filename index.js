import * as d3 from "d3"
import axios from "axios"

const plotPositions = [
    { id: 0, country: "日本", position: [135, 35.32], icon: "" },
    { id: 1, country: "台湾", position: [121.31, 25.2], icon: "" },
    { id: 2, country: "フィリピン", position: [120.58, 14.36], icon: "" },
    { id: 3, country: "ベトナム", position: [106.37, 10.49], icon: "" },
    { id: 4, country: "インドネシア", position: [106.84, -6.2], icon: "" },
    { id: 5, country: "タイ", position: [100.5, 13.75], icon: "" },
    { id: 6, country: "マレーシア", position: [101.97, 4.21], icon: "" },
    { id: 7, country: "シンガポール", position: [103.81, 1.35], icon: "" },
    { id: 8, country: "中国", position: [121.27, 31.13], icon: "" },
    { id: 9, country: "香港", position: [114.16, 22.31], icon: "" },
    { id: 10, country: "韓国", position: [126.59, 37.34], icon: "" },
    { id: 11, country: "イスラエル", position: [35.21, 31.76], icon: "" },
    { id: 12, country: "米国", position: [-74, 40.71], icon: "" },
  ]



  const width = 1000,
  height = 1000

  const discribe = async() => {
    const res = await axios.get("/stub/geo.geojson")
    const geoData = res.data
    const svg = d3
        .select(".geo")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
  
        
      const projection = d3
      .geoMercator()
      .center(d3.geoCentroid(geoData))
      .scale(100)
      .translate([width / 2, height / 2])
  
    const path = d3.geoPath().projection(projection)
    // const plot = projection([135, 35.39])
  
    const geoPath = svg
      .selectAll("path")
      .data(geoData.features)
      .enter()
      .append("path")
      .attr("d", path)
      //色付けてきとう
      // .attr("fill", (datum, i) => d3.hsl(i * 10, 78, 32))
      .attr("fill", "#222")
      .attr("stroke", "#014569")
  
    geoPath
      .on("mouseover", () => {
        d3.select(d3.event.target).style("fill", "#000")
      })
      .on("mouseleave", () => {
        d3.select(d3.event.target).style("fill", "#222")
      })
  
    svg
      .selectAll("g")
      .data(plotPositions)
      .enter()
      .append("g")
      .append("circle")
      .attr("cx", (datum) => projection(datum.position)[0])
      .attr("cy", (datum) => projection(datum.position)[1])
      .attr("r", 5)
      .attr("stroke", "grey")
      .attr("fill", "white")
  }
  