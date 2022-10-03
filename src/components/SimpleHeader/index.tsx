import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React from 'react';
import { useLocation } from 'react-router-dom';
import GoBackBtn from '../GoBackBtn';
import GoToBtn from '../GoToBtn';

type Props = {
  title?: string;
  showPrintBtn?: boolean;
}

const orientationList = ['l', 'landscape'];

const SimpleHeader = ({ title, showPrintBtn }: Props) => {
  const location = useLocation();
  return (
    <header className="page-header">
      <h1 className="title">{title}</h1>

      <div hidden={location.pathname === '/'} className="control-wrap">
        <GoToBtn to="/">返回首页</GoToBtn>
        <GoBackBtn>返回</GoBackBtn>
        <button hidden={!showPrintBtn} onClick={
          async () => {
            const target = document.querySelector<HTMLElement>('.print-wrap');
            if (!target) {
              return;
            }

            const tempOrientation = target.dataset.orientation;
            const orientation = tempOrientation && orientationList.includes(tempOrientation) ? 'l' : 'p';
            const scale = window.devicePixelRatio > 1 ? window.devicePixelRatio : 2;
            const pdf = new jsPDF(orientation, 'mm', 'a4');
            let width = target.offsetWidth;
            let height = target.offsetHeight;

            const canvas = document.createElement('canvas');
            canvas.width = width * scale;
            canvas.height = height * scale;
            const pdfCanvas = await html2canvas(target, {
              useCORS: true,
              canvas,
              scale,
              width,
              height,
              x: 0,
              y: 0,
            });

            const imgDataUrl = pdfCanvas.toDataURL();

            if (height > 14400) {
              const ratio = 14400 / height;
              height = 14400;
              width = width * ratio;
            }

            height = height * pdf.internal.pageSize.getWidth() / width;
            width = pdf.internal.pageSize.getWidth();

            pdf.addImage(imgDataUrl, 'png', 0, 0, width, height);

            // await pdf.save('文件名', { returnPromise: true });
            const pdfUrl = pdf.output('bloburl');
            const win = window.open(pdfUrl);
            if (!win) {
              return;
            }
            win.print();
          }
        }>打印</button>
      </div>

    </header >
  )
}

export default SimpleHeader;