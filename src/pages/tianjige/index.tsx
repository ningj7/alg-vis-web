import { FC } from "react";
import { useNavigate } from 'react-router-dom';
import UserTableCard from "../../components/usertablecard";
import styles from "./tianjige.module.scss";
import { Button } from 'antd';

/**
 * 天机阁视图
 */
const Page: FC = () => {
    const navigate = useNavigate();

    const handleReturnJianghu = () => {
        navigate('/');
    };

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>天机阁</h1>
            <div className={styles.cardWrapper}>
                <UserTableCard />
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