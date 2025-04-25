import { FC } from "react";
import { Card } from "antd";
import styles from "./titlecard.module.scss";

/**
 * 藏经阁标题组件
 */
const Comp: FC = ()=>{
    // 设置动画平滑过渡效果
    return (
        <div >
            <Card 
                className={styles.card}
            >
                <h2>藏经阁</h2>
                <p>大藏五千卷，万法还归一 ——藏经阁</p>
            </Card>
        </div>
    )
};

export default Comp;