import { Robot } from "@type/robots";
import axios from "axios";

export const requestRobots$ = async (): Promise<Robot[]> => {
  const response = (
    await axios.get("https://trade-shop.onrender.com/shop/list/items")
  ).data.detail;
  const res: Robot[] = [];
  response.map((robot: Robot) => {
    if (!res.find((el) => el.id === robot.id)) {
      res.push(robot);
    }
  });
  return res;
};
