import { PrintInfo } from "./type";

let printInfo: PrintInfo = {};
export const setPrintInfo = (newPrintInfo: PrintInfo) => {
  printInfo = {
    ...printInfo,
    ...newPrintInfo,
  }
}

export const getPrintInfo = () => {
  return printInfo;
}