import { useEffect, useState, useRef } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

import request from '@/utils/request'
import styles from './style.module.less'

function Highlight (props) {
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState('');
  const [smallData, setSmallData] = useState([]);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const timerRef = useRef();
  const smallWrapperRef = useRef();

  const selectTab = (name) => {
    if (name !== activeTab) {
      clearEffect();
      setActiveTab(name);
    }
  }

  useEffect(() => {
    try {
      request('/backend/highlight/data.json', 'GET', res => {
        if (res.tabs) {
          setTabs(res.tabs);
          if (res.tabs.length) {
            setActiveTab(res.tabs[0].name);
          }
        }
      });
    } catch (e) {
      console.error(e);
    }

    return () => {
      clearEffect();
    }
  }, []);

  useEffect(() => {
    if (activeTab) {
      setSmallData(tabs.find(ele=> ele.name === activeTab)?.img);
      activeRef.current = 0;
      setActive(0);
      clearEffect();
    }
  }, [
    activeTab
  ]);

  useEffect(() => {
    clearEffect();
    timerRef.current = setInterval(() => {
      activeRef.current = activeRef.current < smallData.length - 1? activeRef.current + 1 : 0;
      go();
    }, 5000);
  }, [smallData?.[0]?.src]);

  function clearEffect () {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    activeRef.current = -1;
  }

  function go () {
    setActive(activeRef.current);
  }

  const onSelect = (ele, index) => {
    activeRef.current = index;
    go();
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    timerRef.current = setInterval(() => {
      activeRef.current = activeRef.current < smallData.length - 1? activeRef.current + 1 : 0;
      go();
    }, 5000);
  }

  const onClickIndicator = (index) => {
    if (activeRef.current + index < 0) {
      activeRef.current = smallData.length - 1;
    } else if (activeRef.current + index > smallData.length - 1) {
      activeRef.current = 0;
    } else {
      activeRef.current = activeRef.current + index;
    }
    go();
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    timerRef.current = setInterval(() => {
      activeRef.current = activeRef.current < smallData.length - 1? activeRef.current + 1 : 0;
      go();
    }, 5000);
  }

  return (
    <div className={styles.highlight}>
      <div className={styles.tabWrapper}>
        {tabs.map(tab => (
          <OverlayTrigger
            key={tab.name}
            placement={'bottom'}
            overlay={
              <Tooltip id={tab.name}>
                {tab.tooltip}
              </Tooltip>
            }
          >
            <div className={activeTab === tab.name? styles.activeTab : styles.tab} key={tab.name} onClick={()=>selectTab(tab.name)}>
              {tab.name}
            </div>
          </OverlayTrigger>
        ))}
      </div>
      <div className={styles.focusWrapper}>
        <div className={styles.leftWrapper}>
          <img className={styles.img} src={smallData.length && (active === 0? smallData?.[smallData.length - 1].src : smallData?.[active - 1].src)} />
        </div>
        <div className={styles.midWrapper}>
          <img className={styles.img} src={smallData.length && smallData?.[active].src} />
        </div>
        <div className={styles.rightWrapper}>
          <img className={styles.img} src={smallData.length && (active === smallData.length - 1? smallData?.[0].src : smallData?.[active + 1].src)} />
        </div>
      </div>
      <div className={styles.smallWrapper}>
        <div className={styles.smallCousal}>
          <div className={styles.lfIndicator} onClick={()=>onClickIndicator(-1)} />
          <div className={styles.contentWrapper} ref={smallWrapperRef} style={{transform: `translateX(${-176 * active}px)`}}>
            {smallData.map((ele, index) => (
              <div className={styles.smallImgWrapper} key={ele.key} onClick={()=>onSelect(ele, index)}>
                <img className={index === active? styles.activeImg :  styles.img} src={ele.src} />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.rtIndicator} onClick={()=>onClickIndicator(1)} />
      </div>
    </div>
  );
}

export default Highlight;
