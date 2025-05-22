import { FC, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import styles from "./spanningTree.module.scss";

export interface SpanningTreeProps {
    edges: Record<number, number[][]>; // [to, weight]
    visited: number[]; // 0: 未访问, 1: 已访问
    edgeStatus: number[][] | null; // 每项为 [from, to, status]，status: 0(未访问), 1(正在访问), 2(已访问)
    totalWeight: number;
}

const SpanningTree: FC<SpanningTreeProps> = ({
    edges,
    visited,
    edgeStatus,
    totalWeight,
}) => {
    console.log("edges?", edgeStatus);
    console.log("visited?", visited);
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

        const margin = { top: 40, right: 40, bottom: 80, left: 40 };
        const contentWidth = size.width - margin.left - margin.right;
        const contentHeight = size.height - margin.top - margin.bottom;

        // 节点和边提取
        const nodeSet = new Set<number>();
        Object.keys(edges).forEach(fromStr => {
            const from = Number(fromStr);
            edges[from].forEach(([to]) => {
                nodeSet.add(from);
                nodeSet.add(to);
            });
        });
        const nodes = Array.from(nodeSet).map(id => ({ id }));

        const edgeMap = new Map<string, number>();
        const statusMap = new Map<string, number>();

        // 构建无向边和状态映射
        Object.entries(edges).forEach(([fromStr, tos]) => {
            const from = Number(fromStr);
            for (const [to, weight] of tos) {
                const key = from < to ? `${from}-${to}` : `${to}-${from}`;
                if (!edgeMap.has(key)) edgeMap.set(key, weight);
            }
        });

        if (edgeStatus) {
            for (let u = 0; u < edgeStatus.length; u++) {
                for (let v = 0; v < edgeStatus[u].length; v++) {
                    const status = edgeStatus[u][v];
                    if (status > 0) {
                        const key = u < v ? `${u}-${v}` : `${v}-${u}`;
                        statusMap.set(key, status);
                    }
                }
            }
        }

        const links = Array.from(edgeMap.entries()).map(([key, weight]) => {
            const [u, v] = key.split("-").map(Number);
            const status = statusMap.get(key) ?? 0;
            let color = "#90a4ae";
            if (status === 1) color = "#fbc02d";
            else if (status === 2) color = "#4caf50";
            return {
                source: u,
                target: v,
                weight,
                color,
                status,
            };
        });

        // D3 力导向布局
        const simulation = d3
            .forceSimulation(nodes as any)
            .force("charge", d3.forceManyBody().strength(-400))
            .force("center", d3.forceCenter(contentWidth / 2, contentHeight / 2))
            .force("link", d3.forceLink(links).id((d: any) => d.id).distance(160))
            .force("collision", d3.forceCollide(40))
            .stop();

        for (let i = 0; i < 400; ++i) simulation.tick();

        const g = svg
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const nodeRadius = 20;

        // 绘制边
        g.selectAll("line.link")
            .data(links)
            .enter()
            .append("line")
            .attr("x1", d => (d.source as any).x!)
            .attr("y1", d => (d.source as any).y!)
            .attr("x2", d => (d.target as any).x!)
            .attr("y2", d => (d.target as any).y!)
            .attr("stroke", d => d.color)
            .attr("stroke-width", d => (d.status === 2 ? 3 : d.status === 1 ? 2.5 : 1.5));

        // 边权
        g.selectAll("text.weight")
            .data(links)
            .enter()
            .append("text")
            .attr("x", d => ((d.source as any).x! + (d.target as any).x!) / 2)
            .attr("y", d => ((d.source as any).y! + (d.target as any).y!) / 2)
            .attr("dy", "-0.3em")
            .attr("text-anchor", "middle")
            .attr("fill", "#444")
            .style("font-size", "12px")
            .text(d => d.weight);

        // 绘制节点
        const nodeGroup = g
            .selectAll("g.node")
            .data(nodes)
            .enter()
            .append("g")
            .attr("transform", d => `translate(${(d as any).x},${(d as any).y})`);

        nodeGroup
            .append("circle")
            .attr("r", nodeRadius)
            .attr("fill", d => (visited[d.id] === 1 ? "#4caf50" : "#cfd8dc"))
            .attr("stroke", "#263238")
            .attr("stroke-width", 1.5);

        nodeGroup
            .append("text")
            .attr("dy", "0.35em")
            .attr("text-anchor", "middle")
            .attr("fill", "#fff")
            .style("font-size", "13px")
            .text(d => d.id);

        // 绘制权重信息
        const weightBox = svg
            .append("g")
            .attr("transform", `translate(${size.width - 160}, ${size.height - 50})`);

        weightBox
            .append("rect")
            .attr("width", 120)
            .attr("height", 32)
            .attr("fill", "#f0f0f0")
            .attr("stroke", "#37474f")
            .attr("stroke-width", 1.5)
            .attr("rx", 6);

        weightBox
            .append("text")
            .attr("x", 60)
            .attr("y", 21)
            .attr("text-anchor", "middle")
            .attr("fill", "#263238")
            .style("font-size", "14px")
            .text(`当前权值: ${totalWeight}`);
    }, [edges, visited, edgeStatus, totalWeight, size]);

    return (
        <div ref={containerRef} className={styles.spanningTreeChart}>
            <svg ref={svgRef} />
        </div>
    );
};

export default SpanningTree;