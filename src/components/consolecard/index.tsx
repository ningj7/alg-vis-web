import React from 'react';
import { Button, Input, Progress } from 'antd';
import styles from './consolecard.module.scss';

interface Props {
  inputText: string;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
  onPrev: () => void;
  onNext: () => void;
  onGoHome: () => void;
  currentStep: number;
  totalSteps: number;
}

const ConsoleCard: React.FC<Props> = ({
  inputText,
  onInputChange,
  onSubmit,
  onPrev,
  onNext,
  onGoHome,
  currentStep,
  totalSteps,
}) => {
  return (
    <div className={styles.consolePanel}>
      <div className={styles.inputArea}>
        <Input.TextArea
          placeholder="请在此输入你要演示的数据，例如：1, 2, 3, 4"
          rows={3}
          value={inputText}
          onChange={(e) => onInputChange(e.target.value)}
          className={styles.textarea}
        />
      </div>

      <div className={styles.buttonGroup}>
        <Button className={styles.wuxiaBtn} onClick={onSubmit}>开始演示</Button>
        <Button className={styles.wuxiaBtn} onClick={onPrev}>上一步</Button>
        <Button className={styles.wuxiaBtn} onClick={onNext}>下一步</Button>
        <Button className={styles.wuxiaBtn} onClick={onGoHome}>返回首页</Button>
      </div>

      <div className={styles.progressBar}>
        {totalSteps > 0 && (
          <Progress
            percent={((currentStep + 1) / totalSteps) * 100}
            status="active"
            format={() => `第 ${currentStep + 1} 步 / 共 ${totalSteps} 步`}
            strokeColor={{ from: '#8c4a2f', to: '#d4af6f' }}
          />
        )}
      </div>
    </div>
  );
};

export default ConsoleCard;