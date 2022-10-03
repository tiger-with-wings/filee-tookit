import React from 'react';
import './index.scss';
import { useParams } from 'react-router-dom';
import ChooseImg from '../../components/ChooseImg';
import SimpleHeader from '../../components/SimpleHeader';

type Props = {}

const PrintResidenceBooklet = (props: Props) => {
  const { type } = useParams();
  return (
    <div className="page">
      <SimpleHeader title="身份证打印排版" showPrintBtn />
      <div className="content print-page-content">
        <div className="print-paper-a4 vertical print-common-vertical print-wrap">
          <ChooseImg
            style={{
              width: '143mm',
              height: '105mm',
              marginTop: '15mm',
            }}
            placeholder="选择第一页"
          />
          {
            type === '2' &&
            <ChooseImg
              style={{
                width: '143mm',
                height: '105mm',
                marginTop: '10mm',
              }}
              placeholder="选择第二页"
            />
          }
        </div>
      </div>
    </div>
  )
}

export default PrintResidenceBooklet;