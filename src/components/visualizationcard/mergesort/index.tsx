import { FC, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import styles from "./mergeSort.module.scss";

export interface MergeSortChartProps {
  array: number[];
  tempArray?: number[] | null;
  comparing?: number[] | null;
  mergeRange?: [number, number] | null;
}

const MergeSortChart: FC<MergeSortChartProps> = ({ array, tempArray, comparing, mergeRange }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(() => {
      const width = containerRef.current!.clientWidth;
      const height = containerRef.current!.clientHeight;
      setSize({ width, height });
    });

    observer.observe(containerRef.current);
    setSize({
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!svgRef.current || size.width === 0 || size.height === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const padding = 20;
    const spacing = 18;
    const contentWidth = Math.min(600, size.width - padding * 2);
    const barGap = 6;
    const barCornerRadius = 6;
    const barWidth = contentWidth / array.length;

    const isMerging = Array.isArray(mergeRange);
    const zoneHeight = isMerging
      ? (size.height - padding * 2 - spacing) / 2
      : size.height - padding * 2;

    const allValues = [...array.filter(v => v !== -1), ...(tempArray ?? [])];
    const maxValue = d3.max(allValues) || 1;

    const scaleY = d3.scaleLinear().domain([0, maxValue]).range([0, zoneHeight - 20]);

    const group = svg
      .attr("width", size.width)
      .attr("height", size.height)
      .append("g")
      .attr("transform", `translate(${(size.width - contentWidth) / 2}, ${padding})`);

    const getColor = (index: number): string => {
      if (comparing?.includes(index)) return "#b71c1c";
      return "#90a4ae";
    };

    const drawBars = (
      items: { value: number; index: number }[],
      offsetY: number,
      className: string,
      fill?: string
    ) => {
      const filtered = items.filter(d => d.value !== -1);
      group
        .selectAll(`rect.${className}`)
        .data(filtered)
        .enter()
        .append("rect")
        .attr("class", className)
        .attr("x", d => d.index * barWidth)
        .attr("y", d => offsetY + (zoneHeight - scaleY(d.value)))
        .attr("width", barWidth - barGap)
        .attr("height", d => scaleY(d.value))
        .attr("rx", barCornerRadius)
        .attr("fill", d => fill ?? getColor(d.index));

      group
        .selectAll(`text.${className}`)
        .data(filtered)
        .enter()
        .append("text")
        .text(d => d.value)
        .attr("x", d => d.index * barWidth + (barWidth - barGap) / 2)
        .attr("y", d => offsetY + (zoneHeight - scaleY(d.value)) - 6)
        .attr("text-anchor", "middle")
        .attr("fill", "#3e2723")
        .style("font-size", "13px")
        .style("font-family", "serif");
    };

    if (isMerging && mergeRange) {
      const [start, end] = mergeRange;

      drawBars(
        array.map((value, i) => ({ value, index: i })),
        0,
        "top"
      );

      // 始终绘制 bottom 区域，哪怕 tempData 是空数组
      drawBars(
        (tempArray ?? []).map((value, i) => ({
          value,
          index: start + i,
        })),
        zoneHeight + spacing,
        "bottom",
        "#81a784"
      );

      // 框线区域
      const boxX = start * barWidth - 2;
      const boxWidth = (end - start + 1) * barWidth + 4;
      const boxY = -4;
      const boxHeight = zoneHeight * 2 + spacing + 8;

      group
        .append("rect")
        .attr("x", boxX)
        .attr("y", boxY)
        .attr("width", boxWidth)
        .attr("height", boxHeight)
        .attr("fill", "none")
        .attr("stroke", "#5d4037")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "6,3")
        .attr("rx", 4);
    } else {
      drawBars(
        array.map((value, i) => ({ value, index: i })),
        0,
        "center"
      );
    }
  }, [array, tempArray, comparing, mergeRange, size]);

  return (
    <div ref={containerRef} className={styles.mergeSortChart}>
      <svg ref={svgRef} />
    </div>
  );
};

export default MergeSortChart;