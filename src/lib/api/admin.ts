import { RobotFormPayload } from "@modules/robotForms/types";
import axios from "axios";

export const requestLogin = async (
  login: string,
  password: string,
): Promise<string> => {
  return await axios
    .get(`https://trade-shop.onrender.com/login/admin/${login}/${password}`)
    .then((data) => data.data.detail);
};

export const requestRemoveRobot = async (
  id: string | number,
): Promise<void> => {
  return await axios.delete(
    `https://trade-shop.onrender.com/shop/delete_item/${id}`,
    {
      data: {
        token: String(localStorage.getItem("accessJihu")),
      },
    },
  );
};

export const requestCreateRobot = async (
  robotPayload: RobotFormPayload,
): Promise<void> => {
  console.log(robotPayload);
  const formData = new FormData();
  robotPayload.photos.forEach((photo) => {
    formData.append("photos", photo);
  });
  formData.append(
    "request",
    JSON.stringify({
      name: robotPayload.name,
      short_description: robotPayload.short_description,
      full_description: robotPayload.full_description,
      price: robotPayload.price,
      contacts: robotPayload.contacts,
      token: String(localStorage.getItem("accessJihu")),
    }),
  );
  return await axios.post(
    "https://trade-shop.onrender.com/shop/new_item",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );
};

export const requestEditRobot = async (
  robotPayload: RobotFormPayload,
  id: string | number,
): Promise<void> => {
  console.log(robotPayload);
  const formData = new FormData();
  robotPayload.photos.forEach((photo) => {
    if (typeof photo !== "string") formData.append("new_photos", photo);
  });
  formData.append(
    "request",
    JSON.stringify({
      name: robotPayload.name,
      short_description: robotPayload.short_description,
      full_description: robotPayload.full_description,
      price: robotPayload.price,
      contacts: robotPayload.contacts,
      token: String(localStorage.getItem("accessJihu")),
      last_photos: robotPayload.photos.filter(
        (photo) => typeof photo === "string",
      ),
    }),
  );
  return await axios.put(
    `https://trade-shop.onrender.com/update/shop/item/${id}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );
};
