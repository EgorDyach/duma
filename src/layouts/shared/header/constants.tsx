import FacebookIcon from "@components/icons/FacebookIcon";
import InstIcon from "@components/icons/InstIcon";
import TelegramIcon from "@components/icons/TelegramIcon";
import VkIcon from "@components/icons/VkIcon";

export const headerLinks = [
  {
    path: "/about",
    title: "О нас",
  },
  {
    path: "/shop",
    title: "Роботы",
  },
  {
    path: "/screeners",
    title: "Скринеры акций",
  },
  {
    path: "/posts",
    title: "Материалы и посты",
  },
  {
    path: "/crypto",
    title: "Криптовалюты",
  },
];

export const headerContacts = [
  {
    link: "tel:+79999999999",
    label: "+7 (999) 999-99-99",
  },
  {
    link: "mailto:example@gmail.com",
    label: "example@gmail.com",
  },
  {
    link: "https://instagram.com/",
    label: <InstIcon size={20} />,
  },
  {
    link: "https://telegram.org/",
    label: <TelegramIcon size={20} />,
  },
  {
    link: "https://vk.company/",
    label: <VkIcon size={20} />,
  },
  {
    link: "https://facebook.com/",
    label: <FacebookIcon size={20} />,
  },
];
