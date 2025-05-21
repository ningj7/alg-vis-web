import { FC, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import styles from "./dij.module.scss";

export interface DijkstraProps {
    edges: Record<number, number[][]>; 
    dis?: number[];
    visited?: number[];
    visitedEdges?: number[];
}

const Dijkstra: FC<DijkstraProps> = ({
    edges,
    dis = [],
    visited = [],
    visitedEdges = [],
}) => {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    const visitedEdge =
        visitedEdges.length === 2
            ? { from: visitedEdges[0], to: visitedEdges[1] }
            : null;

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

        const nodeSet = new Set<number>();
        Object.keys(edges).forEach(fromStr => {
            const from = Number(fromStr);
            nodeSet.add(from);
            edges[from].forEach(([to]) => nodeSet.add(to));
        });
        const nodeList = Array.from(nodeSet).sort((a, b) => a - b);
        const nodes = nodeList.map(id => ({ id }));

        const links: {
            source: number;
            target: number;
            weight: number;
            color: string;
        }[] = [];

        for (const fromStr in edges) {
            const from = Number(fromStr);
            for (const [to, weight] of edges[from]) {
                const isVisited =
                    visitedEdge && visitedEdge.from === from && visitedEdge.to === to;
                const color = isVisited ? "#f57f17" : "#78909c";
                links.push({ source: from, target: to, weight, color });
            }
        }

        const simulation = d3
            .forceSimulation(nodes as any)
            .force("charge", d3.forceManyBody().strength(-500))
            .force("center", d3.forceCenter(contentWidth / 2, contentHeight / 2))
            .force("link", d3.forceLink(links).id((d: any) => d.id).distance(160))
            .force("collision", d3.forceCollide(40))
            .stop();

        for (let i = 0; i < 500; ++i) simulation.tick();

        const g = svg
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const nodeRadius = 20;

        // --- 多颜色箭头定义 ---
        const uniqueColors = Array.from(new Set(links.map(d => d.color)));
        uniqueColors.forEach((color, index) => {
            svg
                .append("defs")
                .append("marker")
                .attr("id", `arrowhead-${index}`)
                .attr("viewBox", "0 -5 10 10")
                .attr("refX", 10)
                .attr("refY", 0)
                .attr("markerWidth", 6)
                .attr("markerHeight", 6)
                .attr("orient", "auto")
                .append("path")
                .attr("d", "M0,-5L10,0L0,5")
                .attr("fill", color);
        });
        const colorToMarker = new Map<string, string>();
        uniqueColors.forEach((color, i) => {
            colorToMarker.set(color, `url(#arrowhead-${i})`);
        });

        // --- 绘制边 ---
        g.selectAll("line.link")
            .data(links)
            .enter()
            .append("line")
            .attr("x1", d => {
                const sx = (d.source as any).x!;
                const sy = (d.source as any).y!;
                const tx = (d.target as any).x!;
                const ty = (d.target as any).y!;
                const dx = tx - sx;
                const dy = ty - sy;
                const len = Math.sqrt(dx * dx + dy * dy);
                return sx + (nodeRadius * dx) / len;
            })
            .attr("y1", d => {
                const sx = (d.source as any).x!;
                const sy = (d.source as any).y!;
                const tx = (d.target as any).x!;
                const ty = (d.target as any).y!;
                const dx = tx - sx;
                const dy = ty - sy;
                const len = Math.sqrt(dx * dx + dy * dy);
                return sy + (nodeRadius * dy) / len;
            })
            .attr("x2", d => {
                const sx = (d.source as any).x!;
                const sy = (d.source as any).y!;
                const tx = (d.target as any).x!;
                const ty = (d.target as any).y!;
                const dx = tx - sx;
                const dy = ty - sy;
                const len = Math.sqrt(dx * dx + dy * dy);
                return tx - (nodeRadius * dx) / len;
            })
            .attr("y2", d => {
                const sx = (d.source as any).x!;
                const sy = (d.source as any).y!;
                const tx = (d.target as any).x!;
                const ty = (d.target as any).y!;
                const dx = tx - sx;
                const dy = ty - sy;
                const len = Math.sqrt(dx * dx + dy * dy);
                return ty - (nodeRadius * dy) / len;
            })
            .attr("stroke", d => d.color)
            .attr("stroke-width", d => (d.color === "#f57f17" ? 3 : 1.5))
            .attr("marker-end", d => colorToMarker.get(d.color) || null);

        // --- 边权 ---
        g.selectAll("text.weight")
            .data(links)
            .enter()
            .append("text")
            .attr("x", d => ((d.source as any).x! + (d.target as any).x!) / 2)
            .attr("y", d => ((d.source as any).y! + (d.target as any).y!) / 2)
            .attr("dy", "-0.4em")
            .attr("text-anchor", "middle")
            .attr("fill", "#444")
            .style("font-size", "12px")
            .text(d => d.weight);

        // --- 节点绘制 ---
        const nodeGroup = g
            .selectAll("g.node")
            .data(nodes)
            .enter()
            .append("g")
            .attr("transform", d => `translate(${(d as any).x},${(d as any).y})`);

        nodeGroup
            .append("circle")
            .attr("r", nodeRadius)
            .attr("fill", d => (visited[d.id] === 1 ? "#4caf50" : "#b0bec5"))
            .attr("stroke", "#263238")
            .attr("stroke-width", 1.5);

        nodeGroup
            .append("text")
            .attr("dy", "0.35em")
            .attr("text-anchor", "middle")
            .attr("fill", "#fff")
            .style("font-size", "13px")
            .style("font-family", "serif")
            .text(d => `${d.id}`);

        // --- dis 显示 ---
        const disG = svg
            .append("g")
            .attr("transform", `translate(${margin.left},${size.height - 60})`);

        const cellWidth = 44;
        const cellHeight = 30;

        disG
            .selectAll("text.index")
            .data(nodes)
            .enter()
            .append("text")
            .attr("x", (_, i) => i * cellWidth + cellWidth / 2)
            .attr("y", 0)
            .attr("text-anchor", "middle")
            .attr("fill", "#37474f")
            .style("font-size", "14px")
            .text(d => `${d.id}`);

        const disGroup = disG
            .selectAll("g.disBox")
            .data(nodes)
            .enter()
            .append("g")
            .attr("transform", (_, i) => `translate(${i * cellWidth}, 10)`);

        disGroup
            .append("rect")
            .attr("width", cellWidth)
            .attr("height", cellHeight)
            .attr("fill", d => (visited[d.id] === 1 ? "#4caf50" : "#ffffff"))
            .attr("stroke", "#455a64")
            .attr("stroke-width", 1.5);

        disGroup
            .append("text")
            .attr("x", cellWidth / 2)
            .attr("y", 20)
            .attr("text-anchor", "middle")
            .attr("fill", "#263238")
            .style("font-size", "14px")
            .text(d =>
                dis[d.id] === 2147483647 || dis[d.id] === undefined ? "∞" : dis[d.id]
            );
    }, [edges, dis, visited, visitedEdges, size]);

    return (
        <div ref={containerRef} className={styles.dijkstraChart}>
            <svg ref={svgRef} />
        </div>
    );
};

export default Dijkstra;