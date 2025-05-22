import { FC, useState, useRef, useEffect } from 'react';
import Split from 'react-split';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import MenuCard from '../../components/menucard';
import ConsoleCard from '../../components/consolecard';
import BubbleSort from '../../components/visualizationcard/bubblesort';
import MergeSort from "../../components/visualizationcard/mergesort"
import HeapSort from "../../components/visualizationcard/heapsort"
import QuickSort from '../../components/visualizationcard/quicksort';
import Search from "../../components/visualizationcard/search"
import Dijkstra from '../../components/visualizationcard/dijkstra';
import SpanningTree from '../../components/visualizationcard/spanningtree';
import { sendMergeSortData } from '../../api/algorithm/mergesort'
import { sendBubbleSortData } from '../../api/algorithm/bubblesort';
import { sendSearchData } from '../../api/algorithm/search';
import { sendDijkstraData } from '../../api/algorithm/dijkstra';
import { sendHeapSortData } from '../../api/algorithm/heapsort';
import { sendSpanningTreeData } from '../../api/algorithm/spanningtree';
import { sendQuickSortData } from '../../api/algorithm/quicksort';
import { algorithmDescriptions } from '../../utils/description';
import { parseInputForSearch, parseInputForShortestPath, parseInputForSort, parseInputForSpanningTree } from '../../utils/index';
import styles from './kaiwupo.module.scss';

const KaiwupoPage: FC = () => {
  const [steps, setSteps] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [algorithm, setAlgorithm] = useState('bubble');
  const [inputText, setInputText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const navigate = useNavigate();

  const stopPlaying = () => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleSubmit = async () => {
    stopPlaying();

    const nums = inputText
      .split(',')
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n));

    if (nums.length === 0) {
      message.error('请输入有效的数字序列');
      return;
    }



    try {
      let result;
      if (algorithm === 'bubble') {
        const input = parseInputForSort(inputText);
        if (!input) {
          message.error('输入格式有误，请确保第一行为数字数量，第二行为空格分隔的数字');
          return;
        }
        const res = await sendBubbleSortData({ num: input.num, array: input.array });
        result = res.map((step: any) => ({
          array: step.array,
          curIndex: step.curIndex,
          sortedTailIndex: step.sortedTailIndex,
        }));
      } else if (algorithm === 'merge') {
        const input = parseInputForSort(inputText);
        if (!input) {
          message.error('输入格式有误，请确保第一行为数字数量，第二行为空格分隔的数字');
          return;
        }
        const res = await sendMergeSortData({ num: input.num, array: input.array });
        result = res.map((step: any) => ({
          array: step.array,
          tempArray: step.tempArray,
          comparing: step.comparing,
          mergeRange: step.mergeRange,
        }));
      } else if (algorithm === 'dfs') {
        const input = parseInputForSearch(inputText);
        if (!input) {
          message.error('输入格式有误,请确保第一行为顶点数量n,第二行到n-1行为空格分隔的边');
          return;
        }
        const res = await sendSearchData({ num: input.num, edges: input.edges, type: 1 });
        result = res.map((step: any) => ({
          visited: step.visited,
          edges: step.edges,
          tempEdge: step.tempEdge,
        }));
      } else if (algorithm === 'bfs') {
        const input = parseInputForSearch(inputText);
        if (!input) {
          message.error('输入格式有误,请确保第一行为顶点数量n,第二行到n-1行为空格分隔的边');
          return;
        }
        const res = await sendSearchData({ num: input.num, edges: input.edges, type: 2 });
        result = res.map((step: any) => ({
          visited: step.visited,
          edges: step.edges,
          tempEdge: step.tempEdge,
        }));
      } else if (algorithm === 'dij') {
        const input = parseInputForShortestPath(inputText);
        if (!input) {
          message.error('输入格式有误,请确保第一行为顶点数量n、边数量m、起点st,第二行到m行为空格分隔的边');
          return;
        }
        const res = await sendDijkstraData({ num: input.num, edges: input.edges, start: input.start });
        result = res.map((step: any) => ({
          edges: step.edges,
          dis: step.dis,
          visited: step.visited,
          visitedEdges: step.visitedEdges

        }));
      } else if (algorithm == 'heap') {
        const input = parseInputForSort(inputText);
        if (!input) {
          message.error('输入格式有误，请确保第一行为数字数量，第二行为空格分隔的数字');
          return;
        }
        const res = await sendHeapSortData({ num: input.num, array: input.array });
        result = res.map((step: any) => ({
          array: step.array,
          comparingId: step.comparingId,
          sortedIndex: step.sortedIndex
        }));
      } else if (algorithm == 'prim') {
        const input = parseInputForSpanningTree(inputText);
        if (!input) {
          message.error('输入格式有误，请确保第一行为点数量、边数量，第二行为空格分隔的数字');
          return;
        }
        const res = await sendSpanningTreeData({ num: input.num, edges: input.edges, type: 1 });
        result = res.map((step: any) => ({
          edges: step.edges,
          visited: step.visited,
          edgeStatus: step.edgeStatus,
          totalWeight: step.totalWeight
        }));
      } else if (algorithm == 'kruskal') {
        const input = parseInputForSpanningTree(inputText);
        if (!input) {
          message.error('输入格式有误，请确保第一行为点数量、边数量，第二行为空格分隔的数字');
          return;
        }
        const res = await sendSpanningTreeData({ num: input.num, edges: input.edges, type: 2 });
        result = res.map((step: any) => ({
          edges: step.edges,
          visited: step.visited,
          edgeStatus: step.edgeStatus,
          totalWeight: step.totalWeight
        }));
      } else if (algorithm == 'quick') {
        const input = parseInputForSort(inputText);
        if (!input) {
          message.error('输入格式有误，请确保第一行为数字数量，第二行为空格分隔的数字');
          return;
        }
        const res = await sendQuickSortData({ num: input.num, array: input.array });
        result = res.map((step: any) => ({
          array: step.array,
          status: step.status,
          index: step.index
        }));
      } else {
        message.warning('该算法暂不支持演示');
        return;
      }

      setSteps(result);
      setTotalSteps(result.length);
      setCurrentStep(0);

      if (result.length > 1) {
        setIsPlaying(true);
        intervalRef.current = setInterval(() => {
          setCurrentStep((prev) => {
            const nextStep = prev + 1;
            if (nextStep >= result.length) {
              stopPlaying();
              return result.length - 1;
            }
            return nextStep;
          });
        }, 800);
      }
    } catch (error) {
      console.error('出错信息:', error);
      message.error('算法执行失败');
    }
  };

  const handlePrev = () => {
    if (steps.length === 0) {
      message.info('请先输入数据');
      return;
    }

    stopPlaying();
    setCurrentStep((prev: number) => {
      const next = Math.max(0, prev - 1);
      if (prev === 0) {
        message.info('已经是第一步');
      }
      return next;
    });
  };

  const handleNext = () => {
    if (steps.length === 0) {
      message.info('请先输入数据');
      return;
    }

    stopPlaying();
    setCurrentStep((prev: number) => {
      const next = Math.min(totalSteps - 1, prev + 1);
      if (prev === totalSteps - 1) {
        message.info('已经是最后一步');
      }
      return next;
    });
  };

  const goHome = () => {
    navigate('/siguoya');
  };


  const renderVisualizer = () => {
    if (steps.length === 0) {
      const intro = algorithmDescriptions[algorithm];
      if (!intro) return <div className={styles.algorithmIntro}>请选择一种算法查看介绍</div>;

      return (
        <div className={styles.algorithmIntro}>
          <div className={styles.title}>{intro.title}</div>
          {intro.paragraphs.map((p, i) => (
            <div className={styles.paragraph} key={i}>
              {p}
            </div>
          ))}
        </div>
      );
    }
    const step = steps[currentStep];
    if (!step) return null;

    switch (algorithm) {

      case 'bubble':
        return (
          <BubbleSort
            array={step.array}
            curIndex={step.curIndex}
            sortedTailIndex={step.sortedTailIndex}
          />
        );
      case 'merge':
        return (
          <MergeSort
            array={step.array}
            tempArray={step.tempArray}
            comparing={step.comparing}
            mergeRange={step.mergeRange}
          />
        );
      case 'heap':
        return (
          <HeapSort
            array={step.array}
            comparingId={step.comparingId}
            sortedIndex={step.sortedIndex}
          />
        )
      case 'dfs':
        return (
          <Search
            nodes={step.visited}
            edges={step.edges}
            tempEdge={step.tempEdge}
          />
        );
      case 'bfs':
        return (
          <Search
            nodes={step.visited}
            edges={step.edges}
            tempEdge={step.tempEdge}
          />
        );
      case 'dij':
        return (
          <Dijkstra
            edges={step.edges}
            dis={step.dis}
            visited={step.visited}
            visitedEdges={step.visitedEdges}
          />
        );
      case 'prim':
        return (
          <SpanningTree
            edges={step.edges}
            visited={step.visited}
            edgeStatus={step.edgeStatus}
            totalWeight={step.totalWeight}
          />
        );
      case 'kruskal':
        return (
          <SpanningTree
            edges={step.edges}
            visited={step.visited}
            edgeStatus={step.edgeStatus}
            totalWeight={step.totalWeight}
          />
        );
      case 'quick':
        return (
          <QuickSort
            array={step.array}
            status={step.status}
            index={step.index}
          />
        );
      default:
        return <div style={{ color: '#fff', padding: 20 }}>该算法暂无可视化组件</div>;
    }
  };

  // 切换算法时清除状态
  useEffect(() => {
    stopPlaying();
    setSteps([]);
    setCurrentStep(0);
    setTotalSteps(0);
    setInputText('');
  }, [algorithm]);

  return (
    <div className={styles.kaiwupo}>
      <div className={styles.bg} />
      <div className={styles.content}>
        <Split
          className={styles.horizontalSplit}
          gutterSize={6}
          sizes={[25, 75]}
          minSize={200}
          direction="horizontal"
        >
          <div className={styles.sidebar}>
            <MenuCard onSelect={setAlgorithm} />
          </div>
          <Split
            className={styles.verticalSplit}
            gutterSize={6}
            sizes={[70, 30]}
            minSize={100}
            direction="vertical"
          >
            <div className={styles.visualizer}>
              {renderVisualizer()}
            </div>
            <div className={styles.console}>
              <ConsoleCard
                inputText={inputText}
                onInputChange={setInputText}
                onSubmit={handleSubmit}
                onPrev={handlePrev}
                onNext={handleNext}
                onGoHome={goHome}
                currentStep={currentStep}
                totalSteps={totalSteps}
              />
            </div>
          </Split>
        </Split>
      </div>
    </div>
  );
};

export default KaiwupoPage;