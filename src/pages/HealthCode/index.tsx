import React from 'react';
import './index.scss';
import { useParams } from 'react-router-dom';
import ChooseImg from '../../components/ChooseImg';
import SimpleHeader from '../../components/SimpleHeader';

type Props = {}

const HealthCode = (props: Props) => {
  const { type } = useParams();
  return (
    <div className="page">
      <SimpleHeader title="健康码打印排版" showPrintBtn />
      <div className="content print-page-content">
        <div
          className="print-paper-a4 horizontal print-common-horizontal print-wrap"
          data-orientation="l"
        >
          <ChooseImg
            style={{
              maxWidth: '80mm',
              minWidth: '60mm',
              height: '160mm',
              marginTop: '10mm',
            }}
            placeholder="选择第一张"
            autoWidth
          />
          {
            (type === '2' || type === '3') &&
            <ChooseImg
              style={{
                maxWidth: '80mm',
                minWidth: '60mm',
                height: '160mm',
                marginTop: '10mm',
                marginLeft: '10mm',
              }}
              placeholder="选择第二张"
              autoWidth
            />
          }
          {
            (type === '3') &&
            <ChooseImg
              style={{
                maxWidth: '80mm',
                minWidth: '60mm',
                height: '160mm',
                marginTop: '10mm',
                marginLeft: '10mm',
              }}
              placeholder="选择第三张"
              autoWidth
            />
          }
        </div>
      </div>
    </div>
  )
}

export default HealthCode;