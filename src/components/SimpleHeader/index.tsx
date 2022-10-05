import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../Button';
import GoBackBtn from '../GoBackBtn';
import GoToBtn from '../GoToBtn';

type Props = {
  title?: string;
  showPrintBtn?: boolean;
}

const orientationList = ['l', 'landscape'];

const SimpleHeader = ({ title, showPrintBtn }: Props) => {
  const location = useLocation();

  const handleExport = useCallback(async (type: 'print' | 'export') => {
    const target = document.querySelector<HTMLElement>('.print-wrap');
    if (!target) {
      return;
    }
    const exportInfo = target.dataset;
    const tempOrientation = exportInfo.orientation;
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

    const filename = exportInfo.filename || '导出文件.pdf';

    if (type === 'print') {
      const pdfUrl = pdf.output('bloburl');
      const win = window.open(pdfUrl);
      if (!win) {
        return;
      }
      win.document.title = filename;
      win.print();
      return;
    }

    await pdf.save(filename, { returnPromise: true });
  }, []);

  return (
    <header className="page-header">
      <h1 className="title">{title}</h1>

      <div hidden={location.pathname === '/'} className="control-wrap">
        <GoToBtn to="/">返回首页</GoToBtn>
        <GoBackBtn>返回</GoBackBtn>
        <Button
          styleType="success"
          hidden={!showPrintBtn}
          onClick={
            () => {
              handleExport('export')
            }
          }
        >导出PDF</Button>
        <Button
          styleType="success"
          hidden={!showPrintBtn}
          onClick={
            () => {
              handleExport('print')
            }
          }>打印</Button>
      </div>

    </header >
  )
}

export default SimpleHeader;