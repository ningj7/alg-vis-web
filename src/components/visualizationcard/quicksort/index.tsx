import { FC, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import styles from "./quick.module.scss";

export interface Data {
    array: number[];
    status: number[]; // 0-默认, 1-基准, 2-当前选择, 3-已排序
    index: number;
}

const QuickSort: FC<Data> = ({ array, status, index }) => {
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
        const barWidth = contentWidth / array.length;
        const barCornerRadius = 6;

        const scaleY = d3.scaleLinear()
            .domain([0, d3.max(array) || 10])
            .range([0, size.height - 80]);

        svg
            .attr("width", size.width)
            .attr("height", size.height);

        const group = svg.append("g")
            .attr("transform", `translate(${(size.width - contentWidth) / 2}, 0)`);

        const getColor = (s: number) => {
            switch (s) {
                case 1: return "#f57c00"; // 基准 - 橘黄
                case 2: return "#d32f2f"; // 当前 - 绯红
                case 3: return "#81a784"; // 已排序 -竹青
                default: return "#90a4ae"; // 默认 - 青灰
            }
        };

        // 柱状图
        group.selectAll("rect")
            .data(array)
            .enter()
            .append("rect")
            .attr("x", (_, i) => i * barWidth)
            .attr("y", d => size.height - scaleY(d) - 40)
            .attr("width", barWidth - 6)
            .attr("height", d => scaleY(d))
            .attr("rx", barCornerRadius)
            .attr("fill", (_, i) => getColor(status[i]))
            .transition()
            .duration(400)
            .ease(d3.easeCubicOut)
            .attr("x", (_, i) => i * barWidth);

        // 数字
        group.selectAll("text")
            .data(array)
            .enter()
            .append("text")
            .text(d => d)
            .attr("x", (_, i) => i * barWidth + (barWidth - 6) / 2)
            .attr("y", d => size.height - scaleY(d) - 50)
            .attr("text-anchor", "middle")
            .attr("fill", "#3e2723")
            .style("font-size", "14px")
            .style("font-family", "serif");

        // 箭头指示 index
        if (index >= 0 && index < array.length) {
            group.append("text")
                .text("↑")
                .attr("x", index * barWidth + (barWidth - 6) / 2)
                .attr("y", size.height - 10) // 靠下位置，指向柱状图底部
                .attr("text-anchor", "middle")
                .attr("fill", "#ffb300") // 深金色，醒目且古风
                .style("font-size", "35px") // 更大字体
                .style("font-weight", "bold");
        }

    }, [array, status, index, size]);

    return (
        <div ref={containerRef} className={styles.quick}>
            <svg ref={svgRef} />
        </div>
    );
};

export default QuickSort;