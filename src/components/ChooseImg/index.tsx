import React, { useCallback, useState } from 'react';
import contextMenu from '../../ui/contextMenu';
import Button from '../Button';
import './index.scss';

type Props = {
  placeholder?: string;
  accept?: string;
  style?: React.CSSProperties;
  autoWidth?: boolean;
  autoHeight?: boolean;
}

const enableImgList = ['image/jpg', 'image/jpeg', 'image/png'];

const ChooseImg = ({ placeholder, accept, style, autoWidth, autoHeight }: Props) => {
  const [src, setSrc] = useState('');

  const setFileToSrc = useCallback((file: Blob) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (typeof fileReader.result !== 'string') {
        return;
      }
      setSrc(fileReader.result);
    }
    fileReader.readAsDataURL(file);
  }, []);

  return (
    <div
      className={`choose-img ${src === '' ? 'show-border' : ''}`}
      style={style}
    >
      <i
        style={{
          display: src === '' ? 'none' : undefined
        }}
        className="delete-btn icon-font"
        onClick={
          () => {
            setSrc('');
          }
        }
      >&#xe67e;</i>
      <label
        className="choose-img-label"
        onPaste={
          (e) => {
            if (e.clipboardData.items) {
              const items = e.clipboardData.items;
              for (let i = 0, limit = items.length; i < limit; i++) {
                const item = items[i];
                if (item.kind === 'file' && enableImgList.includes(item.type)) {
                  const file = item.getAsFile();
                  if (!file) {
                    return;
                  }
                  setFileToSrc(file);
                }
              }
            }
          }
        }
        onContextMenu={
          (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
            contextMenu.show(
              <Button
                onClick={
                  () => {
                    window.navigator.clipboard.read().then(async (clipboardDataItems) => {
                      for (let i = 0, limit = clipboardDataItems.length; i < limit; i++) {
                        const item = clipboardDataItems[i];
                        for (let j = 0, jLimit = item.types.length; j < jLimit; j++) {
                          const fileType = item.types[i];
                          if (enableImgList.includes(fileType)) {
                            try {
                              const file = await item.getType(fileType);
                              setFileToSrc(file);
                              break;
                            } catch (err) {
                              console.error(err);
                            }
                          }
                        }
                      }
                    });
                  }
                }
              >粘贴 Ctrl + V</Button>,
              e.clientX,
              e.clientY,
            )
            e.preventDefault();
          }
        }
      >
        <img
          hidden={src === ''}
          className={`preview ${autoHeight ? 'auto-height' : ''} ${autoWidth ? 'auto-width' : ''}`}
          src={src}
          title={`${placeholder}，点击重新选择`}
          alt="图片"
        />
        <div
          className="placeholder"
          style={{
            display: src !== '' ? 'none' : undefined,
          }}
        >
          <input hidden type="file" placeholder={placeholder} accept={accept} onChange={
            (e) => {
              const files = e.target.files;
              if (!files || files.length <= 0) {
                return;
              }
              const file = files[0];
              setFileToSrc(file);
            }
          } />
          <i className="icon-font placeholder-icon">&#xe6a5;</i>
          <span className="placeholder-text">{placeholder}</span>
        </div>
      </label >
    </div >
  )
}

export default ChooseImg;