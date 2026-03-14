import { OrderStatus } from "@/type";

export const renderOrderStatusText = (status: OrderStatus) => {
  switch (status) {
    case "confirmed":
      return "Confirmed";
    case "preparing":
      return "Preparing";
    case "on_the_way":
      return "On the Way";
    case "delivered":
      return "Delivered";
  }
};
