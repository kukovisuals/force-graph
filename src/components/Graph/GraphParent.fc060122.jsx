import { useRef, useEffect } from "react";
import * as d3 from "d3";

function GraphParent({ width, height, nodes, groups }) {

  const currentRef = useRef(null);
  useEffect(() => {

    // draw(width, height, nodes, d3.select(currentRef.current));

    return () => {};
  }, []);

  return (
    <svg ref={currentRef} width={width} height={height}>
      <g className="nodes" />
      <g className="texto" />
    </svg>
  );
}

function draw(width, height, node, grupos=6, svg) {

  const redColor = ['#450003','#5C0002','#94090D','#D40D12','#FF1D23']
  const scaleColor = d3.scaleQuantize().domain([90000, 170000]).range(redColor)

  const colorsCollection = ['#7003FF', '#3000DB', '#0001F5', '#0B37DE', '#0D72FF']
  const sectionsGroup = Math.abs(Math.round(width/grupos)-10)
  const xCenter = Array.from({length: grupos}, (_,y) => sectionsGroup * (y + 1) )


  // console.log(xCenter, sectionsGroup)
  d3.forceSimulation(node)
    .force("charge", d3.forceManyBody().strength(5))
    .force(
      "x",
      d3.forceX().x(function (d) {
        return xCenter[d.category];
      })
    )
    .force(
      "collision",
      d3.forceCollide().radius(function (d) {
        return d.size;
      })
    )
    .on("tick", ticked);


  function moveNodes() {
    svg
      .select(".nodes")
      .selectAll("circle")
      .data(node)
      .join("circle")
      .attr("r", (d) => d.size)
      .attr("fill", d => getColor(d))
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y);
  }

  function getColor(data){
    if(data.salary > 0){
      return scaleColor(data.salary)
    }
    return colorsCollection[data.category]
  }


  function moveText() {
    svg
      .select(".texto")
      .selectAll("text")
      .data(node)
      .join("text")
      .attr("fill", '#fff')
      .attr("x", (d) => d.x - 25 )
      .attr("y", (d) => d.y)
      .text((d) => {
        if(d.size === 50) return d.id
      });
  }

  function ticked() {
    moveNodes();
    moveText();
  }
}

export default GraphParent;
