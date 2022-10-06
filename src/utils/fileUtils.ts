export function formatFileSize(size: number) {
  if (Number.isNaN(size)) {
    return size;
  }
  let unit = '';
  const units = ['B', 'K', 'M', 'G', 'TB'];
  while ((units.length > 0 && (unit = units.shift() || '')) && size >= 1024) {
    size = size / 1024;
  }
  return (unit === 'B' ? size : size.toFixed(2)) + unit;
}

export function downloadFromUrl(url: string, fileName: string) {
  const a = document.createElement('a');
  a.href = url;
  a.setAttribute('download', fileName);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}