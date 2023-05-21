import { Order } from "@prisma/client";

const numberToWord = (number: number) => {
  switch (number) {
    case 1:
      return "first";
    case 2:
      return "second";
    case 3:
      return "third";
    case 4:
      return "fourth";
    case 5:
      return "fifth";
    case 6:
      return "sixth";
    case 7:
      return "seventh";
    case 8:
      return "eighth";
    case 9:
      return "ninth";
    case 10:
      return "tenth";
    case 11:
      return "eleventh";
    case 12:
      return "twelfth";
    case 13:
      return "thirteenth";
    case 14:
      return "fourteenth";
    default:
      return number.toString();
  }
};

export const orderToTime = (orderList: Order[]) => {
  let orderTime = {};

  for (let i = 0; i < orderList.length; i++) {
    const elem = orderList[i];
    if (elem) {
      Object.defineProperty(orderTime, numberToWord(elem?.order), {
        value: `${elem?.timeStart} — ${elem?.timeEnd}`,
        writable: true,
      });
    }
  }

  return orderTime;
};
