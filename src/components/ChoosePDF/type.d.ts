import { PDFDocument } from "pdf-lib";

export type PDFFile = {
  name: string;
  size: number;
} & PDFDocument