import { useEffect, useState } from 'react'
import leftImg from '@/assets/images/H003.png'
import rightImg from '@/assets/images/H001.jpg'
import request from '@/utils/request'
import './style.css'

function Update(props) {
  const [versionLogs, setVersionLogs] = useState([]);

  useEffect(() => {
    try {
      request('/backend/updatelogs/data.json', 'GET', v => setVersionLogs(v));
    } catch (e) {
      console.error(e);
    }
  }, []);
 
  function Version (props) {
    const { data: { version = '', updateInfo = [], releaseDate = '' } = {} } = props;
    return (
      <li>
        <div>
          <span>{version}</span>
          <span className="date">{releaseDate}</span>
        </div>
        <ul>
          {updateInfo.map((ele, index) => (
            <li key={ele}>{index + 1}. {ele}</li>  
          ))}
        </ul>
      </li>
    );
  }   
  // `((${document.body.clientWidth} - 980) / 2)px`

  return (
    <div className="update_doc">
      {/* <img className={'img left_img'} src={leftImg} alt={"林克"} />
      <img className={'img right_img'} src={rightImg} alt={"林可尔"} />  */}
      <div className="content">
        <div className="log">
          <p className="title">
            <span>更新日志</span>
            <span>Update log</span>
          </p>
          <ul className="version-list win-edition-version-list">
            {versionLogs.map((item, index) => <Version key={index} data={item}/>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Update;
