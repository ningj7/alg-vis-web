import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Card, Drawer } from "antd";

import styles from "./mapcard.module.scss";

/**
 * 地图组件
 */
const Comp: FC = ()=>{
    const navigateTo = useNavigate();

    const [showDoor, setShowDoor] = useState<boolean>(true);
    const [showMap, setShowMap] = useState<boolean>(false);

    const open = ()=>{
        setShowDoor(false);
        setShowMap(true);
    };

    const close = ()=>{
        setShowMap(false);
        setShowDoor(true);
    }

    const move = (key: string)=>{
        close();
        navigateTo(key);
    }

    return (
        <div>
            {
                showDoor && 
                <Card
                    hoverable
                    className={styles.openmap}
                    onClick={open}
                >
                    <h2>打开地图</h2>
                </Card>
            }
            {
                showMap &&
                <Drawer
                    placement="right"
                    className={styles.map}
                    closable={false}
                    open={showMap}
                    onClose={close}
                >
                    <div
                        className={styles.itemlist}
                    >
                      <Card
                            hoverable
                            className={styles.item}
                            onClick={()=>{move("/kaiwupo")}}
                            cover={<img src="/img/kaiwupo.jpg"/>}
                        >
                            <h3>前往开悟坡</h3>
                        </Card>
                        <Card
                            hoverable
                            className={styles.item}
                            onClick={()=>{move("/tianjige")}}
                            cover={<img src="/img/tianjige.jpeg"/>}
                        >
                            <h3>前往天机阁</h3>
                        </Card>
                    </div>
                </Drawer>
            }
        </div>
    )
};

export default Comp;