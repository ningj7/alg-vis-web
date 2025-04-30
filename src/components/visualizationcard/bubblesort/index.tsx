import { FC, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import styles from "./bubbleSort.module.scss";

interface Data {
  values: number[];
  curIndex: number | null;
  sortedTailIndex: number;
}

const BubbleSort: FC<Data> = ({ values, curIndex, sortedTailIndex }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  // 监听容器尺寸变化
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(() => {
      const width = containerRef.current!.clientWidth;
      const height = containerRef.current!.clientHeight;
      setSize({ width, height });
    });

    observer.observe(containerRef.current);

    // 初始设置一次尺寸
    const initialWidth = containerRef.current.clientWidth;
    const initialHeight = containerRef.current.clientHeight;
    setSize({ width: initialWidth, height: initialHeight });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!svgRef.current || size.width === 0 || size.height === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const padding = 40;
    const maxContentWidth = 600;
    const contentWidth = Math.min(maxContentWidth, size.width - padding * 2);
    const barWidth = contentWidth / values.length;
    const barCornerRadius = 6;

    const scaleY = d3.scaleLinear()
      .domain([0, d3.max(values) || 10])
      .range([0, size.height - 60]);

    svg
      .attr("width", size.width)
      .attr("height", size.height);

    const group = svg.append("g")
      .attr("transform", `translate(${(size.width - contentWidth) / 2}, 0)`);

    group.selectAll("rect")
      .data(values)
      .enter()
      .append("rect")
      .attr("x", (_, i) => i * barWidth)
      .attr("y", d => size.height - scaleY(d))
      .attr("width", barWidth - 6)
      .attr("height", d => scaleY(d))
      .attr("rx", barCornerRadius)
      .attr("fill", (_, i) => {
        if (i >= sortedTailIndex) return "#81a784"; // 竹青
        if (curIndex !== null && (i === curIndex || i === curIndex + 1)) return "#d32f2f"; // 绯红
        return "#90a4ae"; //青灰
      })
      .transition()
      .duration(400)
      .ease(d3.easeCubicOut)
      .attr("x", (_, i) => i * barWidth);

    group.selectAll("text")
      .data(values)
      .enter()
      .append("text")
      .text(d => d)
      .attr("x", (_, i) => i * barWidth + (barWidth - 6) / 2)
      .attr("y", d => size.height - scaleY(d) - 10)
      .attr("text-anchor", "middle")
      .attr("fill", "#3e2723")
      .style("font-size", "14px")
      .style("font-family", "serif");

  }, [values, curIndex, sortedTailIndex, size]);

  return (
    <div ref={containerRef} className={styles.bubble}>
      <svg ref={svgRef} />
    </div>
  );
};

export default BubbleSort;