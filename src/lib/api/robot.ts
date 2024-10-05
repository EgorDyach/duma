import { FullRobot } from "@type/robots";
import axios from "axios";

export const requestFullRobot = async (
  robotId: string | number,
): Promise<FullRobot> => {
  const response = await axios.get(
    `https://trade-shop.onrender.com/shop/item/${robotId}`,
  );
  return {
    ...response.data.detail[0],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    photos: response.data.detail.map((robot: any) => robot.photo_link),
  };
};
