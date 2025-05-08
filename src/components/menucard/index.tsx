import React, { useEffect } from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import styles from './menucard.module.scss';

const items: MenuProps['items'] = [
  {
    label: '排序算法',
    key: 'sorting',
    children: [
      { label: '冒泡排序', key: 'bubble' },
      { label: '快速排序', key: 'quick' },
      { label: '归并排序', key: 'merge' },
    ],
  },
  {
    label: '搜索算法',
    key: 'searching',
    children: [
      { label: '深度优先搜索', key: 'dfs' },
      { label: '广度优先搜索', key: 'bfs' },
    ],
  },
  {
    label: '最短路算法',
    key: 'shortest path',
    children: [
      { label: 'Dijkstra', key: 'dij' },
      { label: 'Bellman-Ford', key: 'bf' },
    ],
  },
];

interface Props {
  onSelect: (key: string) => void;
}

const App: React.FC<Props> = ({ onSelect }) => {
  useEffect(() => {
    // 默认选中冒泡排序
    onSelect('bubble');
  }, [onSelect]);

  return (
    <div className={styles.menuPanel}>
      <h2 className={styles.title}>算法列表</h2>
      <Menu
        mode="inline"
        items={items}
        defaultOpenKeys={['sorting']}
        defaultSelectedKeys={['bubble']}
        onClick={({ key }) => onSelect(key)}
      />
    </div>
  );
};

export default App;