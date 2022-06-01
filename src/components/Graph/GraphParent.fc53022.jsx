import {useRef, useEffect} from 'react';
import * as d3 from 'd3';
// const node = [
//   {id: 'teacherA', size: 20},
//   {id: 'teacherB', size: 20},
//   {id: 'teacherC', size: 20},
//   {id: 'studentA', size: 10},
//   {id: 'studentB', size: 10},
//   {id: 'studentC', size: 10},
// ]

const node = [
  { category: 0, id: "teacherA", size: 50 },
  { category: 1, id: "teacherB", size: 50 },
  { category: 2, id: "teacherC", size: 50 },
  { category: 0, id: "studentA", size: 10, salary: 9000 },
  { category: 1, id: "studentC", size: 10, salary: 9000 },
  { category: 0, id: "studentC", size: 10, salary: 10000 },
  { category: 2, id: "studentB", size: 10, salary: 12000},
];

const link = [
  { source: 0, target: 4 },
  { source: 0, target: 3 },
  { source: 1, target: 3 },
  { source: 2, target: 3 },
  { source: 2, target: 4 },
  { source: 2, target: 5 },
];
function GraphParent({width, height, nodes, links}) {

  const currentRef = useRef(null)
  useEffect(() => {
    draw(nodes, links)

    return () => {}
  },[nodes, links])


  function draw(node, link){

    const svg = d3.select(currentRef.current)

    const simulation = d3.forceSimulation(node)
      .force("charge", d3.forceManyBody())
      .force("link", d3.forceLink(link))
      .force("center", d3.forceCenter(width/2, height/2))
      .on('tick', ticked());

    function ticked() {
      svg
        .selectAll('line')
        .data(link)
        .enter()
        .append('line')
        .attr('stroke', 'black')
        .attr('x1', (d) => d.source.x )
        .attr('y1', (d) => d.source.y )
        .attr('x2', (d) => d.target.x )
        .attr('y2', (d) => d.target.y )
    
      svg
        .selectAll('circle')
        .data(node)
        .join('circle')
        .attr('r', 5)
        .attr('cx', function(d) {
          return d.x
        })
        .attr('cy', function(d) {
          return d.y
        });

      console.log(link)
    }

    
  }

 

  return <svg ref={currentRef} width={width} height={height}/>
}

export default GraphParent;
