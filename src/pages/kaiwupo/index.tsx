import { FC, useState } from 'react';
import Split from 'react-split';
import MenuCard from '../../components/menucard';
import ConsoleCard from '../../components/consolecard';
import BubbleSort from '../../components/visualizationcard/bubblesort';
import styles from './kaiwupo.module.scss';
import type { StepResult } from '../../api/algorithm/bubblesort';

// 未来会实现的可视化组件（可先留空或占位）
// import QuickSort from '../../components/visualizationcard/quicksort';
// import MergeSort from '../../components/visualizationcard/mergesort';
// import BinarySearch from '../../components/visualizationcard/binarysearch';

const KaiwupoPage: FC = () => {
  const [steps, setSteps] = useState<StepResult[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [algorithm, setAlgorithm] = useState('bubble'); // 默认算法为冒泡排序

  const current = steps[currentStep] ?? { values: [], curIndex: null, sortedTailIndex: -1 };

  const renderVisualizer = () => {
    switch (algorithm) {
      case 'bubble':
        return (
          <BubbleSort
            values={current.values}
            curIndex={current.curIndex}
            sortedTailIndex={current.sortedTailIndex}
          />
        );
      // case 'quick':
      //   return <QuickSort {...current} />;
      // case 'merge':
      //   return <MergeSort {...current} />;
      // case 'binary':
      //   return <BinarySearch {...current} />;
      default:
        return <div style={{ color: '#fff', padding: 20 }}>该算法暂无可视化组件</div>;
    }
  };

  return (
    <div className={styles.kaiwupo}>
      <div className={styles.bg} /> {/* 背景层 */}
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
                algorithm={algorithm}
                onStepsChange={setSteps}
                onStepChange={setCurrentStep}
              />
            </div>
          </Split>
        </Split>
      </div>
    </div>
  );
};

export default KaiwupoPage;