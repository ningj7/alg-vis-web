import { FC, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import styles from "./mergeSort.module.scss";

interface Item {
  value: number;
  position: "top" | "bottom" | "center";
}

interface MergeSortProps {
  data: Item[];
  comparing: number[]; // 比较的两个元素的索引
  mergeRange: [number, number] | null; // 当前合并区间
}

const MergeSort: FC<MergeSortProps> = ({ data, comparing, mergeRange }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(() => {
      setSize({
        width: containerRef.current!.clientWidth,
        height: containerRef.current!.clientHeight,
      });
    });

    observer.observe(containerRef.current);

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
    const barWidth = contentWidth / data.length;
    const barCornerRadius = 6;
    const totalHeight = size.height;

    const scaleY = d3.scaleLinear()
      .domain([0, d3.max(data.map(d => d.value)) || 10])
      .range([0, (totalHeight - 60) / 2]);

    svg.attr("width", size.width).attr("height", size.height);

    const group = svg.append("g").attr("transform", `translate(${(size.width - contentWidth) / 2}, 0)`);

    data.forEach((item, i) => {
      const yOffset = item.position === "top" ? 0 : item.position === "bottom" ? totalHeight / 2 : 0;
      const y = totalHeight - scaleY(item.value) - yOffset - 30;

      const isComparing = comparing.includes(i);

      group.append("rect")
        .attr("x", i * barWidth)
        .attr("y", y)
        .attr("width", barWidth - 6)
        .attr("height", scaleY(item.value))
        .attr("rx", barCornerRadius)
        .attr("fill", () => {
          if (isComparing) return "#d32f2f"; // 绯红
          if (item.position === "top") return "#2c3e50"; // 墨蓝
          if (item.position === "bottom") return "#81a784"; // 竹青
          return "#455a64"; // 中央灰
        });

      group.append("text")
        .text(item.value)
        .attr("x", i * barWidth + (barWidth - 6) / 2)
        .attr("y", y - 10)
        .attr("text-anchor", "middle")
        .attr("fill", "#3e2723")
        .style("font-size", "14px")
        .style("font-family", "serif");
    });

    if (mergeRange) {
      const [start, end] = mergeRange;
      group.append("rect")
        .attr("x", start * barWidth)
        .attr("y", 0)
        .attr("width", (end - start + 1) * barWidth)
        .attr("height", totalHeight - 30)
        .attr("fill", "none")
        .attr("stroke", "#90caf9")
        .attr("stroke-dasharray", "6,2");
    }
  }, [data, comparing, mergeRange, size]);

  return (
    <div ref={containerRef} className={styles.bubble}>
      <svg ref={svgRef} />
    </div>
  );
};

export default MergeSort;
