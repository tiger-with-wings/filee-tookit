import React, { useEffect, useState } from 'react';
import './index.scss';
import SimpleHeader from '../../components/SimpleHeader';
import ChoosePDF from '../../components/ChoosePDF';
import { PDFFile } from '../../components/ChoosePDF/type';
import Button from '../../components/Button';
import { PDFDocument } from 'pdf-lib';
import { downloadFromUrl } from '../../utils/fileUtils';
import { createOrderId, createPickupCode } from '../../utils/orderUtils';
import Input from '../../components/Input';
import fontkit from "@pdf-lib/fontkit";
import simsunUrl from '../../assets/font/HanYiQiHei-40Jian-Regular-2.ttf';

type Props = {}

async function printAll(pdfFiles: PDFFile[], orderId: string, pickupCode: string, type: 'print' | 'export') {
  const countFile = pdfFiles.length;
  let countPages = 0;
  pdfFiles.forEach(item => countPages += item.getPageCount());
  const printInfo = `飞鲤打印\n\n订单号：${orderId}\n取货码：${pickupCode}\n文件数量：${countFile}个\n合计页数：${countPages}页`;
  console.log(printInfo);
  const mergedPdf = await PDFDocument.create();
  const firstPage = mergedPdf.addPage();
  const { height } = firstPage.getSize();

  const simsunFontBuffer = await fetch(simsunUrl).then(res => {
    console.log(res.blob())
    return res.arrayBuffer();
  });

  console.log(simsunFontBuffer);
  mergedPdf.registerFontkit(fontkit);
  const simsunFont = await mergedPdf.embedFont(simsunFontBuffer);

  firstPage.drawText(printInfo, {
    x: 20,
    y: height - 20,
    size: 22,
    font: simsunFont,
  });

  for (let i = 0, iLimit = pdfFiles.length; i < iLimit; i++) {
    const pdfFile = pdfFiles[i];
    const pages = await mergedPdf.copyPages(pdfFile, pdfFile.getPageIndices());
    pages.forEach((page) => {
      mergedPdf.addPage(page);
    });
  }

  const mergedPdfFile = await mergedPdf.save();
  const blob = new Blob([mergedPdfFile], { type: 'application/pdf' });
  const url = window.URL.createObjectURL(blob);
  if (type === 'export') {
    downloadFromUrl(url, '合并后的文件.pdf');
    return;
  }
  const win = window.open(url);
  win?.print();
}

const CreatePrintOrder = (props: Props) => {
  const [pdfFiles, setPdfFiles] = useState<PDFFile[]>([]);
  const [countFiles, setCountFiles] = useState(0);
  const [countPages, setCountPages] = useState(0);
  const [orderId, setOrderId] = useState('');
  const [pickupCode, setPickupCode] = useState('');
  const [price, setPrice] = useState(1.00);

  useEffect(() => {
    setOrderId(createOrderId());
    setPickupCode(createPickupCode());
    return () => {
      setOrderId(createOrderId());
      setPickupCode(createPickupCode());
    }
  }, []);

  return (
    <div className="page">
      <SimpleHeader title="打印订单生成器" >
        <Button
          styleType="success"
          hidden={countFiles === 0 || countPages === 0}
          onClick={
            () => {
              printAll(pdfFiles, orderId, pickupCode, 'export');
            }
          }
        >导出为PDF</Button>
        <Button
          styleType="success"
          hidden={countFiles === 0 || countPages === 0}
          className="print-btn"
          onClick={
            () => {
              printAll(pdfFiles, orderId, pickupCode, 'print');
            }
          }
        >打印全部</Button>
      </SimpleHeader>

      <div className="content">
        <div className="order-wrap">
          <span className="order-id">订单号：{orderId}</span>
          <span className="pickup-code">取货码：{pickupCode}</span>
          <label className="price-inp-wrap">
            单价：
            <Input className="price-inp" type="number" value={price} placeholder="请输入每页单价" onChange={(e) => {
              let newPrice = parseFloat(e.target.value);
              if (Number.isNaN(newPrice)) {
                newPrice = 0;
              }
              if (newPrice < 0) {
                newPrice = 0;
              }
              setPrice(newPrice);
            }} /> 元/页
          </label>
          <div className="statistical-info">
            共 {countFiles} 个文件，共 {countPages} 页，预估总价 {(price * countPages).toFixed(2)} 元
          </div>
        </div>

        <ChoosePDF onChange={
          (pdfFiles) => {
            setPdfFiles(pdfFiles);
            setCountFiles(pdfFiles.length);
            let count = 0;
            pdfFiles.forEach(item => count += item.getPageCount());
            setCountPages(count);
            setOrderId(createOrderId());
            setPickupCode(createPickupCode());
          }
        } />
      </div>
    </div>
  )
}

export default CreatePrintOrder;