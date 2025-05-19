import { FC, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import styles from "./heap.module.scss";

export interface HeapSortProps {
    data: number[];
    comparingId?: number[];
    sortedIndex?: number;
}

const HeapSort: FC<HeapSortProps> = ({
    data,
    comparingId = [],
    sortedIndex = data.length,
}) => {
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
        svg.attr("width", size.width).attr("height", size.height);

        const margin = { top: 40, right: 40, bottom: 60, left: 40 };
        const width = size.width - margin.left - margin.right;
        const height = size.height - margin.top - margin.bottom;

        const nodes = data.map((value, i) => ({ id: i, value }));
        const root = d3
            .stratify<{ id: number; value: number }>()
            .id(d => `${d.id}`)
            .parentId(d => {
                if (d.id === 0) return null;
                return `${Math.floor((d.id - 1) / 2)}`;
            })(nodes);

        const treeLayout = d3.tree<any>().size([width, height * 0.6]);
        const treeData = treeLayout(root);

        const g = svg
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Draw links (直线连接)
        g.selectAll("line.link")
            .data(treeData.links())
            .enter()
            .append("line")
            .attr("stroke", "#90a4ae")
            .attr("stroke-width", 2)
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        // Draw nodes
        const nodeG = g
            .selectAll("g.node")
            .data(treeData.descendants())
            .enter()
            .append("g")
            .attr("transform", d => `translate(${d.x},${d.y})`);

        nodeG
            .append("circle")
            .attr("r", 20)
            .attr("fill", d => {
                if (comparingId.includes(d.data.id)) return "#f57f17"; // 比较中
                if (d.data.id >= sortedIndex) return "#4caf50"; // 已排序
                return "#b0bec5"; // 默认
            })
            .attr("stroke", "#263238")
            .attr("stroke-width", 1.5);

        nodeG
            .append("text")
            .attr("dy", "0.35em")
            .attr("text-anchor", "middle")
            .attr("fill", "#fff")
            .style("font-size", "13px")
            .text(d => d.data.value);

        // Draw data array at left-bottom corner
        const arrayWidth = Math.min(width * 0.5, 300);
        const rectWidth = arrayWidth / data.length;
        const rectHeight = 28;
        const arrayX = 0;
        const arrayY = height - rectHeight;

        const arrayG = g.append("g").attr("transform", `translate(${arrayX},${arrayY})`);

        arrayG
            .selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (_, i) => i * rectWidth)
            .attr("y", 0)
            .attr("width", rectWidth)
            .attr("height", rectHeight)
            .attr("fill", (_, i) => (i >= sortedIndex ? "#4caf50" : "#b0bec5"))
            .attr("stroke", "#263238");

        arrayG
            .selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .attr("x", (_, i) => i * rectWidth + rectWidth / 2)
            .attr("y", rectHeight / 2)
            .attr("dy", "0.35em")
            .attr("text-anchor", "middle")
            .attr("fill", "#fff")
            .style("font-size", "13px")
            .text(d => d);
    }, [data, comparingId, sortedIndex, size]);

    return (
        <div ref={containerRef} className={styles.heapChart}>
            <svg ref={svgRef} />
        </div>
    );
};

export default HeapSort;