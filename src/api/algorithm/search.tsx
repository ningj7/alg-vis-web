import axios from "axios";

export interface GraphAlgorithmRequest {
    count: number;
    edges: number[][];
    type: number;
}

export interface GraphStepResult {
    nodes: number[]; // 0: 未访问, 1: 已访问
    edges: number[][]; // 0: 无边, 1: 已访问
    tempEdge?: [number, number] | null; // 当前尝试访问的边

}

export const sendGraphAlgorithm = async (
    params: GraphAlgorithmRequest
): Promise<GraphStepResult[]> => {
    // 模拟数据
    const mockSteps0: GraphStepResult[] = [
        { nodes: [1, 0, 0, 0], edges: [[0, 1, 1, 0], [0, 0, 0, 1], [0, 0, 0, 0], [0, 0, 0, 0]], tempEdge: null },
        { nodes: [1, 0, 0, 0], edges: [[0, 1, 1, 0], [0, 0, 0, 1], [0, 0, 0, 0], [0, 0, 0, 0]], tempEdge: [0, 1] },
        { nodes: [1, 1, 0, 0], edges: [[0, 1, 1, 0], [0, 0, 0, 1], [0, 0, 0, 0], [0, 0, 0, 0]], tempEdge: null },
        { nodes: [1, 1, 0, 0], edges: [[0, 1, 1, 0], [0, 0, 0, 1], [0, 0, 0, 0], [0, 0, 0, 0]], tempEdge: [1, 3] },
        { nodes: [1, 1, 0, 1], edges: [[0, 1, 1, 0], [0, 0, 0, 1], [0, 0, 0, 0], [0, 0, 0, 0]], tempEdge: null },
        { nodes: [1, 1, 0, 1], edges: [[0, 1, 1, 0], [0, 0, 0, 1], [0, 0, 0, 0], [0, 0, 0, 0]], tempEdge: [0, 2] },
        { nodes: [1, 1, 1, 1], edges: [[0, 1, 1, 0], [0, 0, 0, 1], [0, 0, 0, 0], [0, 0, 0, 0]], tempEdge: null },
    ];

    const mockSteps1: GraphStepResult[] = [
        { nodes: [1, 0, 0, 0], edges: [[0, 1, 1, 0], [0, 0, 0, 1], [0, 0, 0, 0], [0, 0, 0, 0]], tempEdge: null },
        { nodes: [1, 0, 0, 0], edges: [[0, 1, 1, 0], [0, 0, 0, 1], [0, 0, 0, 0], [0, 0, 0, 0]], tempEdge: [0, 1] },
        { nodes: [1, 1, 0, 0], edges: [[0, 1, 1, 0], [0, 0, 0, 1], [0, 0, 0, 0], [0, 0, 0, 0]], tempEdge: null },
        { nodes: [1, 1, 0, 0], edges: [[0, 1, 1, 0], [0, 0, 0, 1], [0, 0, 0, 0], [0, 0, 0, 0]], tempEdge: [0, 2] },
        { nodes: [1, 1, 1, 0], edges: [[0, 1, 1, 0], [0, 0, 0, 1], [0, 0, 0, 0], [0, 0, 0, 0]], tempEdge: null },
        { nodes: [1, 1, 1, 0], edges: [[0, 1, 1, 0], [0, 0, 0, 1], [0, 0, 0, 0], [0, 0, 0, 0]], tempEdge: [1, 3] },
        { nodes: [1, 1, 1, 1], edges: [[0, 1, 1, 0], [0, 0, 0, 1], [0, 0, 0, 0], [0, 0, 0, 0]], tempEdge: null },
    ];
    return new Promise((resolve) => {
        if (params.type === 0) setTimeout(() => resolve(mockSteps0), 300);
        else setTimeout(() => resolve(mockSteps1), 300);
    });

    // 真正请求时用下面这段
    // const response = await axios.post('/api/graph/execute', params);
    // return response.data.steps;
};