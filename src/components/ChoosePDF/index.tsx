import React, { useCallback, useRef, useState } from 'react';
import './index.scss';
import { PDFDocument } from 'pdf-lib';
import { formatFileSize } from '../../utils/fileUtils';
import { PDFFile } from './type';

type Props = {
  onChange?: (pdfFiles: PDFFile[]) => void;
}
const enableFileList = ['application/pdf'];

const readFileAsync = async (file: Blob): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as ArrayBuffer);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  })
}

const ChoosePDF = ({ onChange }: Props) => {
  const inpRef = useRef<HTMLInputElement>(null);
  const [pdfFiles, setPdfFiles] = useState<PDFFile[]>([]);

  const setFilesAndInform = useCallback((pdfFiles: PDFFile[]) => {
    setPdfFiles(pdfFiles);
    onChange && onChange(pdfFiles);
  }, [onChange, setPdfFiles]);

  return (
    <div className="choose-pdf-file-label">
      <label className="placeholder">
        <input ref={inpRef} hidden multiple type="file" accept=".pdf" onChange={
          async (e) => {
            const tempFiles = e.target.files;
            if (!tempFiles || tempFiles.length <= 0) {
              return;
            }

            const pdfFileList: PDFFile[] = [];
            for (let i = 0, limit = tempFiles.length; i < limit; i++) {
              const file = tempFiles[i];
              const pdfDoc = await parsePdfInfo(file);
              if (!pdfDoc) {
                continue;
              }
              const pdfFile = (pdfDoc as PDFFile);
              pdfFile.name = file.name;
              pdfFile.size = file.size;
              pdfFileList.push(pdfFile);
            }

            setFilesAndInform([...pdfFiles, ...pdfFileList]);

            if (inpRef.current) {
              inpRef.current.value = '';
            }
          }
        } />
        <span>选择需要打印的PDF文件</span>
      </label>
      <div hidden={pdfFiles.length <= 0} className="file-list">
        {
          pdfFiles.map((pdfFile, index) => {
            return (
              <div key={index} className="file">
                <span className="file-name">{pdfFile.name}</span>
                <span className="file-size">{formatFileSize(pdfFile.size)}</span>
                <span className="file-page">{pdfFile.getPageCount()}页</span>
                <i
                  className="icon-font delete-btn"
                  onClick={
                    () => {
                      if (index >= pdfFiles.length || index < 0) {
                        return;
                      }
                      const newFiles = [...pdfFiles.slice(0, index), ...pdfFiles.slice(index + 1, pdfFiles.length)];
                      setFilesAndInform(newFiles);
                    }
                  }
                >&#xe67e;</i>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default ChoosePDF;

async function parsePdfInfo(file: Blob): Promise<PDFDocument | null> {
  if (!enableFileList.includes(file.type)) {
    return null;
  }
  const fileBytes = await readFileAsync(file);
  return await PDFDocument.load(fileBytes);
}