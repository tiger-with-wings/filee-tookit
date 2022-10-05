import React from 'react';
import { useParams } from 'react-router-dom';
import ChooseImg from '../../components/ChooseImg';
import SimpleHeader from '../../components/SimpleHeader';

type Props = {}

const PrintIdCard = (props: Props) => {
  const { type } = useParams();
  return (
    <div className="page">
      <SimpleHeader title="身份证或银行卡打印排版" showPrintBtn />
      <div className="content print-page-content">
        <div
          className="print-paper-a4 vertical print-common-vertical print-wrap"
          data-filename="身份证或银行卡.pdf"
        >
          <ChooseImg
            style={{
              width: '85.6mm',
              height: '54mm',
              borderRadius: '3.18mm',
              marginTop: '15mm',
            }}
            placeholder="选择第一面"
          />
          {
            (type === '2' || type === '3' || type === '4') &&
            <ChooseImg
              style={{
                width: '85.6mm',
                height: '54mm',
                borderRadius: '3.18mm',
                marginTop: '10mm',
              }}
              placeholder="选择第二面"
            />
          }
          {
            (type === '3' || type === '4') &&
            <ChooseImg
              style={{
                width: '85.6mm',
                height: '54mm',
                borderRadius: '3.18mm',
                marginTop: '10mm',
              }}
              placeholder="选择第三面"
            />
          }
          {
            type === '4' &&
            <ChooseImg
              style={{
                width: '85.6mm',
                height: '54mm',
                borderRadius: '3.18mm',
                marginTop: '10mm',
              }}
              placeholder="选择第四面"
            />
          }
        </div>
      </div>
    </div>
  )
}

export default PrintIdCard;