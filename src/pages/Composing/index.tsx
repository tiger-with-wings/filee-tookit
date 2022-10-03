import React from 'react';
import './index.scss';
import NavCard from '../../components/NavCard';
import SimpleHeader from '../../components/SimpleHeader';

const Composing = () => {
  return (
    <div className="page">
      <SimpleHeader title="打印排版" />
      <div className="content composing-page-content">
        <NavCard className="nav-card-btn" to="/composing/id-card/1">身份证或银行卡单面</NavCard>
        <NavCard className="nav-card-btn" to="/composing/id-card/2">身份证或银行卡双面</NavCard>
        <NavCard className="nav-card-btn" to="/composing/id-card/3">身份证或银行卡三面</NavCard>
        <NavCard className="nav-card-btn" to="/composing/id-card/4">身份证或银行卡四面</NavCard>
        <NavCard className="nav-card-btn" to="/composing/residence-booklet/1">户口簿单页</NavCard>
        <NavCard className="nav-card-btn" to="/composing/residence-booklet/2">户口簿双页</NavCard>
        <NavCard className="nav-card-btn" to="/composing/health-code/1">健康码</NavCard>
        <NavCard className="nav-card-btn" to="/composing/health-code/2">健康码+行程码</NavCard>
        <NavCard className="nav-card-btn" to="/composing/health-code/3">健康码+行程码+核酸检测结果</NavCard>
      </div>
    </div>
  )
}

export default Composing;