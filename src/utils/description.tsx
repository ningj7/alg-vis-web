export const algorithmDescriptions: Record<string, { title: string; paragraphs: string[] }> = {
    bubble: {
        title: '冒泡排序',
        paragraphs: [
            '冒泡排序（英语：Bubble Sort）又称为泡式排序，是一种简单的排序算法。它重复地走访过要排序的数列，一次比较两个元素，如果它们的顺序错误就把它们交换过来。走访数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。这个算法的名字由来是因为越小的元素会经由交换慢慢“浮”到数列的顶端。冒泡排序对n个项目需要n^2的比较次数，且可以原地排序。',
            '说明：默认采用升序排序，输入格式为第一行输入一个整数n，表示数组的大小；第二行输入n个整数，以空格分隔表示数组的元素。',
            '测试示例：',
            '5',
            '5 4 3 2 1',
        ],
    },
    quick: {
        title: '快速排序',
        paragraphs: [
            '快速排序（Quick Sort）是一种高效的排序算法，基于分治法（Divide and Conquer）的思想。它的核心是通过选择一个基准元素（pivot），将列表分为两部分：一部分小于基准元素，另一部分大于基准元素，然后递归地对这两部分进行排序。快速排序的平均时间复杂度为 O(n log n)，在实际应用中性能优异。',
            '说明：对于基准元素的原则和划分列表有多种实现，本项目是选择了第一个元素为基准元素，并使用原地交换的方式进行划分，同时使用箭头标识待交换元素，以便理解。默认采用升序排序，输入格式为第一行输入一个整数n，表示数组的大小；第二行输入n个整数，以空格分隔表示数组的元素。',
            '测试数据示例：',
            '10',
            '4 5 3 2 1 5 6 8 9 3',
        ],
    },
    merge: {
        title: '归并排序',
        paragraphs: [
            '归并排序（Merge sort）是建立在归并操作上的一种有效、稳定的排序算法，该算法是采用分治法(Divide and Conquer）的一个非常典型的应用。将已有序的子序列合并，得到完全有序的序列；即先使每个子序列有序，再使子序列段间有序。若将两个有序表合并成一个有序表，称为二路归并。归并排序是稳定的排序算法，时间复杂度为 O(nlogn)。',
            '说明：默认采用升序排序，输入格式为第一行输入一个整数n，表示数组的大小；第二行输入n个整数，以空格分隔表示数组的元素。',
            '测试示例：',
            '5',
            '5 4 3 2 1',
        ],
    },
    heap: {
        title: '堆排序',
        paragraphs: [
            '堆排序（Heapsort）是指利用堆这种数据结构所设计的一种排序算法。堆积是一个近似完全二叉树的结构，并同时满足堆积的性质：即子结点的键值或索引总是小于（或者大于）它的父节点。堆排序可以说是一种利用堆的概念来排序的选择排序。堆排序的平均时间复杂度为 Ο(nlogn)。',
            '说明：默认采用升序排序，即小根堆。输入格式为第一行输入一个整数n，表示数组的大小；第二行输入n个整数，以空格分隔表示数组的元素。',
            '测试示例：',
            '10',
            '4 5 3 2 1 5 6 8 9 3',
        ],
    },
    dfs: {
        title: '深度优先搜索',
        paragraphs: [
            '深度优先搜索（英语：Depth-First Search，缩写为 DFS）是一种用于遍历或搜索树或图的算法。它从根节点开始，沿着树的深度遍历尽可能深的节点，然后回溯。',
            '说明：本项目采用树的形式进行演示，默认根节点为0。输入格式为第一行输入一个整数n，表示树的节点个数；第二行到第n行输入两个整数u v，表示节点u和节点v之间有一条边。注意：输入的树是无向图，且节点编号从0开始。',
            '测试数据示例：',
            '5',
            '0 1',
            '0 2',
            '1 3',
            '1 4',
        ],
    },
    bfs: {
        title: '广度优先搜索',
        paragraphs: [
            '广度优先搜索（英语：Breadth-First Search，缩写为 BFS）是一种用于遍历或搜索树或图的算法。它从根节点开始，首先访问所有相邻的节点，然后再访问这些节点的相邻节点。',
            '说明：本项目采用树的形式进行演示，默认根节点为0。输入格式为第一行输入一个整数n，表示树的节点个数；第二行到第n行输入两个整数u v，表示节点u和节点v之间有一条边。注意：输入的树是无向图，且节点编号从0开始。',
            '测试数据示例：',
            '5',
            '0 1',
            '0 2',
            '1 3',
            '1 4',
        ],
    },
    dij: {
        title: 'Dijkstra算法',
        paragraphs: [
            'Dijkstra算法（英语：Dijkstra\'s algorithm）是计算最短路径的一种贪心算法。它用于计算从一个节点到其他所有节点的最短路径。本项目使用小根堆优化，时间复杂度为O((V + E) log V)，其中V是节点数，E是边数。',
            '说明：输入格式为第一行输入三个整数n m s，表示节点数、边数和起始节点；后面m行输入三个整数u v w，表示节点u有一条指向节点v且权重为w的边。注意：输入的图是有向图，且节点编号从0开始。',
            '测试数据示例：',
            '4 4 0',
            '0 1 1',
            '0 2 4',
            '1 3 2',
            '2 3 5',
        ],
    },
    prim: {
        title: 'Prim算法',
        paragraphs: [
            '普里姆算法（Prim算法），图论中的一种算法，可在加权连通图里搜索最小生成树。意即由此算法搜索到的边子集所构成的树中，不但包括了连通图里的所有顶点（英语：Vertex (graph theory)），且其所有边的权值之和亦为最小。',
            '说明：输入格式为第一行输入两个整数n m，表示节点数和边数；后面m行输入三个整数u v w，表示节点u和节点v之间有一条权重为w的边。注意：输入的图是无向图，且节点编号从0开始。本项目采用了小根堆优化，时间复杂度为O((V + E) log V)，其中V是节点数，E是边数。',
            '测试数据示例：',
            '4 4',
            '0 1 1',
            '0 2 4',
            '1 3 2',
            '2 3 5',
        ],
    },
    kruskal: {
        title: 'Kruskal算法',
        paragraphs: [
            'Kruskal算法（英语：Kruskal\'s algorithm）是一种用于计算最小生成树的贪心算法。它从所有边开始，逐步添加最小边，判断是否添加可以使用并查集判断，直到所有节点都被包含在内。',
            '说明：输入格式为第一行输入两个整数n m，表示节点数和边数；后面m行输入三个整数u v w，表示节点u和节点v之间有一条权重为w的边。注意：输入的图是无向图，且节点编号从0开始。时间复杂度为O(E log E)，其中E是边数。',
            '测试数据示例：',
            '4 4',
            '0 1 1',
            '0 2 4',
            '1 3 2',
            '2 3 5',
        ],
    },
    // 其他算法继续添加...
};