import { FC, useState, useRef, useEffect } from 'react';
import Split from 'react-split';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import MenuCard from '../../components/menucard';
import ConsoleCard from '../../components/consolecard';
import BubbleSort from '../../components/visualizationcard/bubblesort';
import MergeSort from "../../components/visualizationcard/mergesort"
import Search from "../../components/visualizationcard/search"
import Dijkstra from '../../components/visualizationcard/dijkstra';
import { sendMergeSortData } from '../../api/algorithm/mergesort'
import { sendAlgorithmData } from '../../api/algorithm/bubblesort';
import { sendGraphAlgorithm } from '../../api/algorithm/search';
import { sendDijkstra } from '../../api/algorithm/dijkstra';
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
        const res = await sendAlgorithmData({ algorithm: 'bubble', data: nums });
        result = res.map((step: any) => ({
          values: step.values,
          curIndex: step.curIndex,
          sortedTailIndex: step.sortedTailIndex,
        }));
      } else if (algorithm === 'merge') {
        const res = await sendMergeSortData({ data: nums });
        result = res.map((step: any) => ({
          data: step.data,
          tempData: step.tempData,
          comparing: step.comparing,
          mergeRange: step.mergeRange,
        }));
      } else if (algorithm === 'dfs') {
        const res = await sendGraphAlgorithm({ count: 1, edges: [[1]], type: 0 });
        result = res.map((step: any) => ({
          nodes: step.nodes,
          edges: step.edges,
          tempEdge: step.tempEdge,
        }));
      } else if (algorithm === 'bfs') {
        const res = await sendGraphAlgorithm({ count: 1, edges: [[1]], type: 1 });
        result = res.map((step: any) => ({
          nodes: step.nodes,
          edges: step.edges,
          tempEdge: step.tempEdge,
        }));
      } else if (algorithm === 'dij') {
        const res = await sendDijkstra({ count: 1, edges: [[1]], start: 0 });
        result = res.map((step: any) => ({
          edges: step.edges,
          dis:step.dis,
          visited:step.visited,
          visitedEdges:step.visitedEdges

        }));
      }
      else {
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
    const step = steps[currentStep];
    if (!step) return null;

    switch (algorithm) {

      case 'bubble':
        return (
          <BubbleSort
            values={step.values}
            curIndex={step.curIndex}
            sortedTailIndex={step.sortedTailIndex}
          />
        );
      case 'merge':
        return (
          <MergeSort
            data={step.data}
            tempData={step.tempData}
            comparing={step.comparing}
            mergeRange={step.mergeRange}
          />
        );
      case 'dfs':
        return (
          <Search
            nodes={step.nodes}
            edges={step.edges}
            tempEdge={step.tempEdge}
          />
        );
      case 'bfs':
        return (
          <Search
            nodes={step.nodes}
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
        )
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