import React, { useState, useEffect, useRef } from 'react';
import { Button, Input, Progress, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { sendAlgorithmData, StepResult } from '../../api/algorithm/bubblesort';
import styles from './consolecard.module.scss';

interface Props {
  algorithm: string;
  onStepsChange: (steps: StepResult[]) => void;
  onStepChange: (step: number) => void;
}

const ConsoleCard: React.FC<Props> = ({ algorithm, onStepsChange, onStepChange }) => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [steps, setSteps] = useState<StepResult[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopPlaying = () => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handlePlay = () => {
    if (steps.length === 0) {
      message.warning('请先输入数据并点击开始演示');
      return;
    }

    if (currentStep >= totalSteps - 1) {
      message.warning('已到最后一步');
      return;
    }

    setIsPlaying(true);
    intervalRef.current = setInterval(() => {
      setCurrentStep((prev: number) => {
        const nextStep = prev + 1;
        if (nextStep >= totalSteps) {
          stopPlaying();
          return totalSteps - 1;
        }
        onStepChange(nextStep);
        return nextStep;
      });
    }, 800);
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
      onStepChange(next);
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
      onStepChange(next);
      return next;
    });
  };

  const goHome = () => {
    navigate('/siguoya');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
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
      const result = await sendAlgorithmData({ algorithm, data: nums });
      if (result.length === 0) {
        message.warning('算法未返回任何步骤');
        return;
      }

      setSteps(result);
      setTotalSteps(result.length);
      setCurrentStep(0);
      onStepsChange(result);
      onStepChange(0);

      setTimeout(() => {
        if (result.length > 1) {
          setIsPlaying(true);
          intervalRef.current = setInterval(() => {
            setCurrentStep((prev) => {
              const nextStep = prev + 1;
              if (nextStep >= result.length) {
                stopPlaying();
                return result.length - 1;
              }
              onStepChange(nextStep);
              return nextStep;
            });
          }, 800);
        }
      }, 0);
    } catch (error) {
      message.error('算法执行失败');
    }
  };

  return (
    <div className={styles.consolePanel}>
      <div className={styles.inputArea}>
        <Input.TextArea
          placeholder="请在此输入你要演示的数据，例如：1, 2, 3, 4"
          rows={3}
          value={inputText}
          onChange={handleInputChange}
          className={styles.textarea}
        />
      </div>

      <div className={styles.buttonGroup}>
        <Button className={styles.wuxiaBtn} onClick={handleSubmit}>开始演示</Button>
        <Button className={styles.wuxiaBtn} onClick={handlePrev}>上一步</Button>
        <Button className={styles.wuxiaBtn} onClick={handleNext}>下一步</Button>
        <Button className={styles.wuxiaBtn} onClick={goHome}>返回首页</Button>
      </div>

      <div className={styles.progressBar}>
        {totalSteps > 0 && (
          <Progress
            percent={((currentStep + 1) / (totalSteps || 1)) * 100}
            status="active"
            format={() => `第 ${currentStep + 1} 步 / 共 ${totalSteps} 步`}
            strokeColor={{
              from: '#8c4a2f',
              to: '#d4af6f',
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ConsoleCard;