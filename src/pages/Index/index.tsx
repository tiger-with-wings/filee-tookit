import React from 'react';
import './index.scss';
import NavCard from '../../components/NavCard';
import SimpleHeader from '../../components/SimpleHeader';

type Props = {}

const Index = (props: Props) => {
  return (
    <div className="page">
      <SimpleHeader title="欢迎使用飞鲤高效工具" />
      <div className="content">
        <NavCard className="fluid-layout-item" to="/composing">打印排版</NavCard>
        <NavCard className="fluid-layout-item" to="/create-print-order">打印订单生成器</NavCard>
      </div>
    </div>
  )
}

export default Index;