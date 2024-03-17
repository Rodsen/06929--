import React, {useEffect, useState} from 'react';
import {Select, Table} from 'antd';
import './index.scss'
import topics from './topics.json'
const Home = () => {
  const allList = topics.data.reduce((last,item)=>{
    return [...last,...item.exerList]
  },[])
  const allSinge = allList.filter(item=>item.keyType==='单选')
  
  const [showList, setShowList] = useState([])
  const [typeValue, setTypeValue] = useState('名词解释题')
  const [isLongPressing, setIsLongPressing] = useState(false);
  const [bgInfo, setBgInfo] = useState()
  /*  methods */
  const dealSelectAnswer = (item) => {
    console.log('单项',item)
    const rightList = item?.rightKey?.split('')
    const strList = rightList?.map(i=>{
      return `${i}.${item[i?.toLowerCase()]}`
    })
    return strList
  }
  let pressTimer;

  const startPress = () => {
    pressTimer = setTimeout(() => {
      setIsLongPressing(true);
    }, 200); // 设置长按时间
  };

  const endPress = () => {
    clearTimeout(pressTimer);
    setIsLongPressing(false);
  };

  const onKeyPress = (item) => {
    console.log('点击',item)
    setBgInfo(item)
  }
  const typeOnChange = (value) => {
    setTypeValue(value)
  }

  useEffect(()=>{
    const list = allList.filter(item=>item.keyType===typeValue)
    setShowList(list)
  },[typeValue])
  
  return (
    <div className={'home'}>
      <div className={'head-top'}>
        <Select
          value={typeValue}
          style={{width: '200px'}}
          onChange={typeOnChange}
          options={[
            {
              value: '单选'
            },
            {
              value: '多选'
            },
            {
              value: '名词解释题'
            },
            {
              value: '判断改错题'
            },
            {
              value: '简答题'
            },
            {
              value: '综合分析题'
            },
          ]}
        />
      </div>
      <div className={'bg-board'}>
        {/* 单选，多选 */}
        {['单选','多选'].includes(bgInfo?.keyType) ? (
          <div className={'select-type'}>
            <span className={'select-answer'}>
              {dealSelectAnswer(bgInfo)?.map(item => {
                return (
                  <span style={{margin: '4px'}} key={Math.random()} dangerouslySetInnerHTML={{__html: item}}/>)
              })}
            </span>
            <span
              className={'analyze'}
              style={{fontWeight:500,fontSize:'16px'}}
              dangerouslySetInnerHTML={{__html: bgInfo?.analyze}}
            />
          </div>
        ) : (
          <span
            className={'analyze'}
            dangerouslySetInnerHTML={{__html: bgInfo?.analyze}}
          />
        )}
        {/*/!* 名词解释题，判断改错，简答，综合题 *!/*/}
        {/*<span*/}
        {/*  className={'analyze'}*/}
        {/*  dangerouslySetInnerHTML={{__html: bgInfo?.analyze}}*/}
        {/*/>*/}

      </div>
      <div
        onMouseDown={startPress}
        onMouseUp={endPress}
        onMouseLeave={endPress} // 如果鼠标离开按钮，也结束长按
        className={'exer-list'} style={{opacity:isLongPressing ? 0.1 : 1}}>
        {showList.map((item, index) => {
          return (
            <div className={'list-item'} key={Math.random()}>
              <div className="list-item-title">
                <div className="item-title-num">{(String(index+1)).length < 2 ? `0${index+1}`:`${index+1}`}</div>
                <div className="item-title-type">{item.keyType}</div>
                <div className="item-title-text" onMouseDown={()=>onKeyPress(item)} dangerouslySetInnerHTML={{__html:item.title}}/>
              </div>
              {/* 单选/多选 */}
              {['单选','多选'].includes(item.keyType) && (
                <div className={'select-list'}>
                  {item.a && (
                    <span className={'select-item'}>A.<span dangerouslySetInnerHTML={{__html: item.a}}/></span>
                  )}
                  {item.b && (
                    <span className={'select-item'}>B.<span dangerouslySetInnerHTML={{__html: item.b}}/></span>
                  )}
                  {item.c && (
                    <span className={'select-item'}>C.<span dangerouslySetInnerHTML={{__html: item.c}}/></span>
                  )}
                  {item.d && (
                    <span className={'select-item'}>D.<span dangerouslySetInnerHTML={{__html: item.d}}/></span>
                  )}
                  {item.e && (
                    <span className={'select-item'}>E.<span dangerouslySetInnerHTML={{__html: item.e}}/></span>
                  )}
                  {item.f && (
                    <span className={'select-item'}>F.<span dangerouslySetInnerHTML={{__html: item.f}}/></span>
                  )}
                  {item.g && (
                    <span className={'select-item'}>G.<span dangerouslySetInnerHTML={{__html: item.g}}/></span>
                  )}
                  {item.h && (
                    <span className={'select-item'}>H.<span dangerouslySetInnerHTML={{__html: item.h}}/></span>
                  )}
                </div>
              )}
            </div>
          )
        })}

      </div>
    </div>
  )
};

export default Home;
