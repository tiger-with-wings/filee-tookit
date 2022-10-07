import React from 'react';
import { useParams } from 'react-router-dom';
import ChooseImg from '../../../components/ChooseImg';

type Props = {}

const PrintHealthCode = (props: Props) => {
  const { type } = useParams();
  return (
    <div className="content print-page-content">
      <div className="print-paper-a4 horizontal print-common-horizontal print-wrap">
        <ChooseImg
          style={{
            width: '80mm',
            height: '160mm',
            marginTop: '10mm',
          }}
          placeholder="选择第一张"
          autoSize
        />
        {
          (type === '2' || type === '3') &&
          <ChooseImg
            style={{
              width: '80mm',
              height: '160mm',
              marginTop: '10mm',
              marginLeft: '10mm',
            }}
            placeholder="选择第二张"
            autoSize
          />
        }
        {
          (type === '3') &&
          <ChooseImg
            style={{
              width: '80mm',
              height: '160mm',
              marginTop: '10mm',
              marginLeft: '10mm',
            }}
            placeholder="选择第三张"
            autoSize
          />
        }
      </div>
    </div>
  )
}

export default PrintHealthCode;