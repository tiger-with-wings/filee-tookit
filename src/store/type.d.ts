export type PrintInfo = {
  fileName?: string;
  orientation?: "p" | "l" | "landscape" | "portrait";
  unit?: "em" | "pt" | "px" | "in" | "mm" | "cm" | "ex" | "pc";
  format?: string | number[];
}
