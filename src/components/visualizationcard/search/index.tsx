import { FC, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import styles from "./search.module.scss";

export interface GraphProps {
  nodes: number[]; // 0: 未访问, 1: 已访问
  edges: Record<number, number[]>; // 邻接表
  tempEdge?: [number, number] | null;
}

interface TreeNode {
  id: number;
  children: TreeNode[];
}

const Search: FC<GraphProps> = ({ nodes, edges, tempEdge }) => {
  console.log("nodes", nodes);
  console.log("edges", edges);
  console.log("tempEdge", tempEdge);
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

    const margin = { top: 40, right: 40, bottom: 40, left: 40 };
    const contentWidth = size.width - margin.left - margin.right;
    const contentHeight = size.height - margin.top - margin.bottom;
    const radius = 20;

    // 直接使用 edges (邻接表)
    // DFS 构建树（从节点 0 开始）
    const visited = new Set<number>();
    const buildTree = (node: number): TreeNode => {
      visited.add(node);
      return {
        id: node,
        children: (edges[node] || [])  // 注意这里用 edges 代替之前的 adjacency
          .filter((child) => !visited.has(child))
          .map((child) => buildTree(child)),
      };
    };

    const treeData = buildTree(0);

    const root = d3.hierarchy<TreeNode>(treeData, (d) => d.children);
    const treeLayout = d3.tree<TreeNode>().size([contentWidth, contentHeight]);
    const treeResult = treeLayout(root);

    // 定义箭头 marker
    const defs = svg.append("defs");

    defs.append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 10)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#78909c");

    defs.append("marker")
      .attr("id", "arrow-active")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 10)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#f57f17");

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const computePath = (source: d3.HierarchyPointNode<TreeNode>, target: d3.HierarchyPointNode<TreeNode>) => {
      const dx = target.x - source.x;
      const dy = target.y - source.y;
      const length = Math.sqrt(dx * dx + dy * dy);
      const unitX = dx / length;
      const unitY = dy / length;

      const startX = source.x + unitX * radius;
      const startY = source.y + unitY * radius;
      const endX = target.x - unitX * radius;
      const endY = target.y - unitY * radius;

      return `M${startX},${startY}L${endX},${endY}`;
    };

    // 绘制边
    g.selectAll("path.link")
      .data(treeResult.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("fill", "none")
      .attr("stroke", (d) =>
        tempEdge?.[0] === d.source.data.id && tempEdge?.[1] === d.target.data.id
          ? "#f57f17"
          : "#78909c"
      )
      .attr("stroke-width", 2)
      .attr("marker-end", (d) =>
        tempEdge?.[0] === d.source.data.id && tempEdge?.[1] === d.target.data.id
          ? "url(#arrow-active)"
          : "url(#arrow)"
      )
      .attr("d", (d) => computePath(d.source, d.target));

    // 绘制节点
    const nodesGroup = g
      .selectAll("g.node")
      .data(treeResult.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.x},${d.y})`);

    nodesGroup
      .append("circle")
      .attr("r", radius)
      .attr("fill", (d) => (nodes[d.data.id] === 1 ? "#4caf50" : "#b0bec5"))
      .attr("stroke", "#263238")
      .attr("stroke-width", 1.5);

    nodesGroup
      .append("text")
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .attr("fill", "#fff")
      .style("font-size", "13px")
      .style("font-family", "serif")
      .text((d) => `${d.data.id}`);
  }, [nodes, edges, tempEdge, size]);

  return (
    <div ref={containerRef} className={styles.graphChart}>
      <svg ref={svgRef} />
    </div>
  );
};

export default Search;