import { useEffect, useState, useRef } from 'react'
import { Button, Carousel } from 'react-bootstrap'
import H001 from '@/assets/images/H001.jpg'
import H002 from '@/assets/images/H002.png'
import H003 from '@/assets/images/H003.png'
import H004 from '@/assets/images/H004.jpg'
import H005 from '@/assets/images/H005.jpg'
import H006 from '@/assets/images/H006.jpg'
import H007 from '@/assets/images/H007.jpg'

import styles from './style.module.less'

function Highlight (props) {
  const [tabs, setTabs] = useState([{
    name: '武器',
  }, {
    name: '服饰',
  }, {
    name: '坐骑',
  }]);
  const [smallData, setSmallData] = useState([{
    src: H001,
    key: 0,
  }, {
    src: H002,
    key: 1,
  }, {
    src: H003,
    key: 2,
  }, {
    src: H004,
    key: 3,
  }, {
    src: H005,
    key: 4,
  }, {
    src: H006,
    key: 5,
  }, {
    src: H007,
    key: 6,
  }]);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const timerRef = useRef();
  const smallWrapperRef = useRef();

  useEffect(() => {
    // if (smallWrapperRef.current) {
    //   if (Math.floor(smallWrapperRef.current.offsetWidth / 176) > 0) {
    //     setSmallData([
    //       ...smallData, 
    //       ...smallData.slice(0, Math.floor(smallWrapperRef.current.offsetWidth / 176)).map((ele, index) => ({ ...ele, key: (index + smallData.length), reset: smallData.length }))
    //     ]);
    //   }
    // }

    timerRef.current = setInterval(() => {
      // if (smallData?.[activeRef.current]?.reset) {
      //   activeRef.current = activeRef.current - smallData[activeRef.current].reset + 1;
      // } else if (!smallData?.[activeRef.current]) {
      //   activeRef.current = activeRef.current - smallData.length + 1;
      // } else {
      // }
      activeRef.current = activeRef.current < smallData.length - 1? activeRef.current + 1 : 0;
      go();
    }, 5000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      activeRef.current = -1;
    }
  }, []);

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
      {/* <div className={styles.tabWrapper}>
        {tabs.map(tab => (
          <div className={styles.tab} key={tab.name}>{tab.name}</div>
        ))}
      </div> */}
      <div className={styles.focusWrapper}>
        <div className={styles.leftWrapper}>
          <img className={styles.img} src={active === 0? smallData[smallData.length - 1].src : smallData[active - 1].src} />
        </div>
        <div className={styles.midWrapper}>
          <img className={styles.img} src={smallData[active].src} />
        </div>
        <div className={styles.rightWrapper}>
          <img className={styles.img} src={active === smallData.length - 1? smallData[0].src : smallData[active + 1].src} />
        </div>
      </div>
      <div className={styles.smallWrapper}>
        <div className={styles.lfIndicator} onClick={()=>onClickIndicator(-1)} />
        <div className={styles.contentWrapper} ref={smallWrapperRef} style={{transform: `translateX(${-176 * active}px)`}}>
          {smallData.map((ele, index) => (
            <div className={styles.smallImgWrapper} key={ele.key} onClick={()=>onSelect(ele, index)}>
              <img className={index === active? styles.activeImg :  styles.img} src={ele.src} />
            </div>
          ))}
        </div>
        <div className={styles.rtIndicator} onClick={()=>onClickIndicator(1)} />
      </div>
    </div>
  );
}

export default Highlight;
