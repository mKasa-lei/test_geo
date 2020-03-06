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
  

// //レーダーチャート

// export type RadarDataType = {
//   id: number
//   name: string
//   volume: number
// }

// export class RadarChart {
//   width: number | null = null
//   height: number | null = null
//   // color: d3.ScaleOrdinal<string, unknown>
//   config = {
//     radius: 5,
//     width: 300,
//     height: 300,
//     factor: 1,
//     factorLegend: 0.85,
//     levels: 5,
//     maxValue: 0,
//     radians: 2 * Math.PI,
//     opacityArea: 0.5,
//     ToRight: 5,
//     TranslateX: 8,
//     TranslateY: 20,
//     ExtraWidthX: 100,
//     ExtraWidthY: 100,
//     color: ["#6F257F", "#CA0D59"],
//   }
//   body: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>
//   svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any> | null = null
//   data: Array<Array<RadarDataType>>
//   totalItems: number
//   allAxis: Array<string>
//   radius: number

//   g: d3.Selection<SVGGElement, unknown, HTMLElement, any>
//   axis: d3.Selection<SVGGElement, string, SVGGElement, unknown>

//   constructor(data: Array<Array<RadarDataType>>, w?: number, h?: number) {
//     if (w && h) {
//       this.config.width = w
//       this.config.height = h
//     }
//     //ここがoptionで動かせるよう修正
//     this.config.maxValue = 10
//     this.data = data
//     this.body = d3.select(".radar")
//     if (!this.body) return null
//     this.setParams()
//     this.draw()
//     this.drawAxis()
//     this.drawRadar()
//     this.drawArea()
//   }

//   setParams() {
//     // this.color = d3.scaleOrdinal().domain(this.config.color.map((d, i) => `${i}`)).range(this.config.color).unknown("#fff")
//     this.svg = this.body
//       .append("svg")
//       .attr("width", this.config.width)
//       .attr("height", this.config.height)
//     this.totalItems = this.data[0].length
//     this.allAxis = this.data[0].map(data => data.name)
//     this.radius =
//       this.config.factor *
//       Math.min(this.config.width / 2, this.config.height / 2)
//   }

//   draw() {
//     if (!this.svg) return
//     this.g = this.svg
//       .append("g")
//       .attr(
//         "transform",
//         `translate(${this.config.TranslateX}, ${this.config.TranslateY})`
//       )
//   }

//   drawAxis() {
//     this.axis = this.g
//       .selectAll(".axis")
//       .data(this.allAxis)
//       .enter()
//       .append("g")
//       .attr("class", "axis")

//     this.axis
//       .append("line")
//       .attr("x1", this.config.width / 2)
//       .attr("y1", this.config.height / 2)
//       .attr(
//         "x2",
//         (d, i) =>
//           (this.config.width / 2) *
//           (1 -
//             this.config.factor *
//               Math.sin((i * this.config.radians) / this.totalItems))
//       )
//       .attr(
//         "y2",
//         (d, i) =>
//           (this.config.height / 2) *
//           (1 -
//             this.config.factor *
//               Math.cos((i * this.config.radians) / this.totalItems))
//       )
//       .attr("class", "line")
//       .attr("stroke", "grey")
//       .attr("stroke-width", "1px")

//     this.axis
//       .append("text")
//       .attr("class", "legend")
//       .text((d: string) => d)
//       .style("font-family", "sans-serif")
//       .style("font-size", "11px")
//       .attr("text-anchor", "middle")
//       .attr("dy", "1.5em")
//       .attr("transform", `translate(0, -10)`)
//       .attr(
//         "x",
//         (d, i) =>
//           (this.config.width / 2) *
//             (1 -
//               this.config.factorLegend *
//                 Math.sin((i * this.config.radians) / this.totalItems)) -
//           20 * Math.sin((i * this.config.radians) / this.totalItems)
//       )
//       .attr(
//         "y",
//         (d, i) =>
//           (this.config.height / 2) *
//             (1 -
//               this.config.factorLegend *
//                 Math.cos((i * this.config.radians) / this.totalItems)) -
//           20 * Math.cos((i * this.config.radians) / this.totalItems)
//       )
//   }

//   drawRadar() {
//     for (let i = 0; i < this.config.levels; i++) {
//       const levelFactor =
//         this.config.factor * this.radius * ((i + 1) / this.config.levels)
//       this.g
//         .selectAll(".levels")
//         .data(this.allAxis)
//         .enter()
//         .append("svg:line")
//         .attr(
//           "x1",
//           (d, j) =>
//             levelFactor *
//             (1 -
//               this.config.factor *
//                 Math.sin((j * this.config.radians) / this.totalItems))
//         )
//         .attr(
//           "y1",
//           (d, j) =>
//             levelFactor *
//             (1 -
//               this.config.factor *
//                 Math.cos((j * this.config.radians) / this.totalItems))
//         )
//         .attr(
//           "x2",
//           (d, j) =>
//             levelFactor *
//             (1 -
//               this.config.factor *
//                 Math.sin(((j + 1) * this.config.radians) / this.totalItems))
//         )
//         .attr(
//           "y2",
//           (d, j) =>
//             levelFactor *
//             (1 -
//               this.config.factor *
//                 Math.cos(((j + 1) * this.config.radians) / this.totalItems))
//         )
//         .attr("class", "line")
//         .attr("stroke", "grey")
//         .attr("stroke-opacity", 0.75)
//         .attr("stroke-width", "0.3px")
//         .attr(
//           "transform",
//           `translate(${this.config.width / 2 - levelFactor}, ${this.config
//             .height /
//             2 -
//             levelFactor})`
//         )

//       this.g
//         .selectAll(".levels")
//         .data(this.data[0])
//         .enter()
//         .append("svg:text")
//         .attr("x", () => levelFactor * (1 - this.config.factor * Math.sin(0)))
//         .attr("y", () => levelFactor * (1 - this.config.factor * Math.cos(0)))
//         .attr("class", "legend")
//         .attr("font-family", "sans-serif")
//         .attr("font-size", "13px")
//         .attr(
//           "transform",
//           `translate(${this.config.width / 2 -
//             levelFactor +
//             this.config.ToRight},${this.config.height / 2 - levelFactor})`
//         )
//         .attr("fill", "#737373")
//         .text(((i + 1) * this.config.maxValue) / this.config.levels)
//     }
//   }

//   drawArea() {
//     const dataValues: Array<Array<[number, number]>> = this.data.map(data => {
//       const dataArray: Array<[number, number]> = data.map((d, j) => {
//         const dataVolume: number = get(d, "volume", null)
//         return [
//           (this.config.width / 2) *
//             (1 -
//               (parseFloat(String(Math.max(dataVolume, 0))) /
//                 this.config.maxValue) *
//                 this.config.factor *
//                 Math.sin((j * this.config.radians) / this.totalItems)),
//           (this.config.height / 2) *
//             (1 -
//               (parseFloat(String(Math.max(dataVolume, 0))) /
//                 this.config.maxValue) *
//                 this.config.factor *
//                 Math.cos((j * this.config.radians) / this.totalItems)),
//         ]
//       })
//       dataArray.push(dataArray[0])
//       return dataArray
//     })

//     this.g
//       .append("g")
//       .attr("class", "radar-chart-area")
//       .selectAll(".area")
//       .data(dataValues)
//       .enter()
//       .append("polygon")
//       .attr("class", "radar-chart-polygon")
//       .style("stroke-width", "2px")
//       .style("stroke", (d, i: number) => this.config.color[i])
//       .attr("points", d => join(flatten(d), ","))
//       .style("fill", (d, i) => this.config.color[i])
//       .style("fill-opacity", this.config.opacityArea)
//       .on("mouseover", () => {
//         this.g.selectAll("polygon").style("fill-opacity", 0.7)
//       })
//       .on("mouseout", () => {
//         this.g
//           .selectAll("polygon")
//           .style("fill-opacity", this.config.opacityArea)
//       })
//   }
// }
