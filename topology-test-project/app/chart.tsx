import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface ChartProps {
  data: number[]; // Example data type
}

const Chart: React.FC<ChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
      const width = svgRef.current.clientWidth;
      const height = svgRef.current.clientHeight;
      const margin = { top: 20, right: 30, bottom: 40, left: 40 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      // Clear previous content
      svg.selectAll("*").remove();

      const x = d3.scaleBand()
        .domain(data.map((_, i) => i.toString()))
        .range([margin.left, innerWidth + margin.left])
        .padding(0.1);

      const y = d3.scaleLinear()
        .domain([0, d3.max(data) ?? 0])
        .nice()
        .range([innerHeight + margin.top, margin.top]);

      svg.append("g")
        .attr("transform", `translate(0,${innerHeight + margin.top})`)
        .call(d3.axisBottom(x));

      svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));

      svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", (_, i) => x(i.toString()) ?? 0)
        .attr("y", d => y(d))
        .attr("width", x.bandwidth())
        .attr("height", d => innerHeight + margin.top - y(d))
        .style("fill", "steelblue");
    }
  }, [data]);

  return <svg ref={svgRef} width="100%" height="500"></svg>;
};

export default Chart;
