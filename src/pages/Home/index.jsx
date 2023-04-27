import { useEffect, useState } from 'react'
import { Carousel } from 'react-bootstrap'

import Marquee from "react-fast-marquee"
import request from '@/utils/request'
import styles from './style.module.css'
import './reset.css';

function Home (props) {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    try {
      request('/backend/home/data.json', 'GET', v => setData(v));
    } catch (e) {
      console.error(e);
    }
  }, []);


  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const download = (url) => {
    window.open(url);
  }

  return (
    <div className={styles.home}>
      <section>
        <Carousel 
          activeIndex={index} 
          onSelect={handleSelect}
          className={styles.carousel}
        >
          {data?.carousels?.map(ele => (
            <Carousel.Item key={ele.url}>
              <img
                className="d-block w-100"
                src={ele.url}
                alt="First slide"
                style={{ height: '780px' }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
        <div className={styles.descWrapper}>
          <div className={styles.infoWrapper}>
            <img className={styles.title} src={'/images/hometitle.png'} />
            <p className={styles.p} dangerouslySetInnerHTML={{ __html: data?.content }} />
          </div>
          <div className={styles.btnWrapper}>
            <div className={styles.btnLeft}>
              一键下载
              <div className={styles.dropdown}>
                {data?.download?.tianyiyun?
                  <div className={styles.downloadBtn} onClick={()=>download(data?.download?.tianyiyun)}>
                    <img src="./tianyiyun.jpg" alt="天翼云logo" className={styles.btnLogo} />
                    天翼云网盘
                  </div> 
                : null}
                {data?.download?.baiduyun?
                  <div className={styles.downloadBtn} onClick={()=>download(data?.download?.baiduyun)}>
                    <img src="./baiduyun.jpeg" alt="百度云logo" className={styles.btnLogo} />
                    百度云网盘
                  </div>
                : null}
              </div>
            </div>
            <div className={styles.btnMid} onClick={()=>download(data?.tutorial)}>
              安装教程
            </div>
            <div className={styles.btnRight}>
              MOD下载
              <div className={styles.dropdown2}>
                {data?.modDownload?.tianyiyun?
                  <div className={styles.downloadBtn} onClick={()=>download(data?.modDownload?.tianyiyun)}>
                    <img src="./tianyiyun.jpg" alt="天翼云logo" className={styles.btnLogo} />
                    天翼云网盘
                  </div> : null
                }
                {data?.modDownload?.baiduyun?
                  <div className={styles.downloadBtn} onClick={()=>download(data?.modDownload?.baiduyun)}>
                    <img src="./baiduyun.jpeg" alt="百度云logo" className={styles.btnLogo} />
                    百度云网盘
                  </div> : null
                }
              </div>
            </div>
          </div>
        </div>
      </section>
      {data?.marquees?.map((child, index) => (
        <section key={index}>
          <div key={index} className={styles.marqueeWrapper}>
            <Marquee direction={index % 2? 'right' : 'left'}>
              {child?.map(ele => (
                <div className={styles.marqueeImgWrpper} key={ele.url}>
                  <img src={ele.url} className={styles.marqueeImg} />  
                </div>
              ))}
            </Marquee>
          </div>
        </section>
      ))}
      {data?.combines?.map((img, index) => (
        <section key={index}>
          <div className={styles.combineWrapper}>
            <img src={img.url} className={styles.combineImg} />
          </div>
        </section>
      ))}
    </div>
  );
}

export default Home;