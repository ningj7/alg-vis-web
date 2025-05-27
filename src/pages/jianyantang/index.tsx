import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SuggestionCard, { Suggestion } from '../../components/suggestion';
import styles from './jianyantang.module.scss';
import { Button, message } from 'antd';
import { GetData, AddData } from '../../api/suggestion'; // 从接口模块引入

/**
 * 谏言堂视图
 */
const Page: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await GetData();
            setData(res || []);
        } catch (err) {
            message.error('获取留言失败');
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = (item: Pick<Suggestion, 'topic' | 'content'>) => {
        AddData(item).then((res) => {
            const newSuggestion: Suggestion = {
                id: res.id,
                topic: item.topic,
                content: item.content,
                creatorName: res.creatorName,
                createTime: res.createTime,
            };
            setData((prev) => [newSuggestion, ...prev]);
            message.success('留言成功');
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleReturnJianghu = () => {
        navigate('/');
    };

    return (
        <div className={styles.page}>
            <div className={styles.cardWrapper}>
                <SuggestionCard data={data} loading={loading} onAdd={handleAdd} />
            </div>
            <Button
                className={styles.returnBtn}
                onClick={handleReturnJianghu}
                icon={<i className="iconfont icon-sword" />}
            >
                重出江湖
            </Button>
        </div>
    );
};

export default Page;