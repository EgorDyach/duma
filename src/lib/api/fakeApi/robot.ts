import { FullRobot } from "@type/robots";

const fakeData: FullRobot = {
  id: 1,
  name: 'Торговый робот "На старт"',
  short_description:
    "Нейтральная, торговля только в лонг (на покупку) с элементами скальпинга. Сделки закрываются только по прибыли. В стратегии применяются фильтры для более стабильной торговли.",
  full_description: `<p>Список того, что может наш робот:</p>
<ul>
<li style="margin-left:1.5em;">Действия</li>
<ul>
<li style="margin-left:3em;">покупать акции</li>
<li style="margin-left:3em;">продавать акции</li>
</ul>
<li style="margin-left:1.5em;">Приносить доход<br></li>
</ul>
`,
  contacts: "Телеграмм: @example_nick",
  price: 15000,
  photos: [
    "https://www.tslab.pro/pictures/chart_3.jpg",
    "https://www.finam.ru/img/htt/tslab/3D_light.png",
    "https://fsr-develop.ru/wp-content/uploads/2023/10/image-509.png",
  ],
};

export const fakeRequestFullRobot = (
  robotId: string | number,
  isError?: boolean,
): Promise<FullRobot> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isError) reject("Ошибка в получении робота");
      robotId;
      resolve({ ...fakeData, id: Number(robotId) });
    }, 500);
  });
};
