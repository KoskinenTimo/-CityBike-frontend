import { Order } from "../types";

export const compareStrings = (
    firstString:string,
    secondString:string, 
    order: Order
): number => {
  firstString = firstString.toLowerCase();
  secondString= secondString.toLowerCase();
  if (order === Order.Ascending) {
    if(firstString < secondString) return -1;
    if(firstString > secondString) return 1;
    return 0;
  } else {
    if(firstString > secondString) return -1;
    if(firstString < secondString) return 1;
    return 0;
  }
};

export const compareNumbers = (
  firstNumber:number,
  secondNumber:number, 
  order: Order
): number => {
  if (order === Order.Ascending) {
    return firstNumber - secondNumber;
  } else {
    return secondNumber - firstNumber;
  }
};

export const parseHexColorToRGBA = (hex:string,opacity:number) => {
  let r = "0", g = "0", b = "0";
  if (hex.length == 4) {
    r = "0x" + hex[1] + hex[1];
    g = "0x" + hex[2] + hex[2];
    b = "0x" + hex[3] + hex[3];

  } else if (hex.length == 7) {
    r = "0x" + hex[1] + hex[2];
    g = "0x" + hex[3] + hex[4];
    b = "0x" + hex[5] + hex[6];
  }
  return "rgba("+ +r + "," + +g + "," + +b + "," + opacity + ")";
};
