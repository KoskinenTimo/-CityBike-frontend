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