import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useCallback } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Button from '../../components/Button';
import NavCard from '../../components/NavCard';
import SimpleHeader from '../../components/SimpleHeader';

const funcList: {
  orientation: 'l' | 'p';
  title: string;
  to: string;
  showPrintBtn: boolean;
}[] = [
    {
      title: '身份证或银行卡单面',
      to: '/composing/id-card/1',
      showPrintBtn: true,
      orientation: "p",
    },
    {
      title: '身份证或银行卡双面',
      to: '/composing/id-card/2',
      showPrintBtn: true,
      orientation: "p",
    },
    {
      title: '身份证或银行卡三面',
      to: '/composing/id-card/3',
      showPrintBtn: true,
      orientation: "p",
    },
    {
      title: '身份证或银行卡四面',
      to: '/composing/id-card/4',
      showPrintBtn: true,
      orientation: "p",
    },
    {
      title: '户口簿单页',
      to: '/composing/residence-booklet/1',
      showPrintBtn: true,
      orientation: "p",
    },
    {
      title: '户口簿双页',
      to: '/composing/residence-booklet/2',
      showPrintBtn: true,
      orientation: "p",
    },
    {
      title: '健康码',
      to: '/composing/health-code/1',
      showPrintBtn: true,
      orientation: "l",
    },
    {
      title: '健康码+行程码',
      to: '/composing/health-code/2',
      showPrintBtn: true,
      orientation: "l",
    },
    {
      title: '健康码+行程码+核酸检测结果',
      to: '/composing/health-code/3',
      showPrintBtn: true,
      orientation: "l",
    },
  ];

const Composing = () => {

  const location = useLocation();
  const func = funcList.find(item => item.to === location.pathname);
  const fileName = (func?.title || '打印文件') + '.pdf';
  const orientation = func?.orientation || 'p';
  const unit = 'mm';
  const format = 'a4';

  const handleExport = useCallback(async (type: 'print' | 'export') => {
    const target = document.querySelector<HTMLElement>('.print-wrap');
    if (!target) {
      return;
    }
    const scale = window.devicePixelRatio > 1 ? window.devicePixelRatio : 2;
    const pdf = new jsPDF(orientation, unit, format);
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

    const imgDataUrl = pdfCanvas.toDataURL('image/jpeg');

    if (height > 14400) {
      const ratio = 14400 / height;
      height = 14400;
      width = width * ratio;
    }

    height = height * pdf.internal.pageSize.getWidth() / width;
    width = pdf.internal.pageSize.getWidth();

    pdf.addImage(imgDataUrl, 'png', 0, 0, width, height);

    if (type === 'print') {
      const pdfUrl = pdf.output('bloburl');
      const win = window.open(pdfUrl);
      if (!win) {
        return;
      }
      win.document.title = fileName;
      win.print();
      return;
    }

    await pdf.save(fileName, { returnPromise: true });
  }, [fileName, orientation, unit, format]);

  return (
    <div className="page">
      <SimpleHeader
        title={
          func?.title || '打印排版'
        }
      >
        <Button
          hidden={location.pathname === '/composing'}
          styleType="success"
          onClick={
            () => {
              handleExport('export')
            }
          }
        >导出PDF</Button>
        <Button
          hidden={location.pathname === '/composing'}
          styleType="success"
          onClick={
            () => {
              handleExport('print')
            }
          }>打印</Button>
      </SimpleHeader>
      <div hidden={location.pathname !== '/composing'} className="content">
        {
          funcList.map(item => {
            return <NavCard key={item.to} className="fluid-layout-item" to={item.to}>{item.title}</NavCard>
          })
        }
      </div>
      <Outlet />
    </div>
  )
}

export default Composing;