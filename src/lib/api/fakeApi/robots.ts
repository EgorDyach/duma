import { RobotFormPayload } from "@modules/robotForms/types";
import { Robot } from "@type/robots";

let fakeRobotsArr: Robot[] = [
  {
    id: 1,
    name: "robot 1",
    short_description:
      "Нейтральная, торговля только в лонг (на покупку) с элементами скальпинга. Сделки закрываются только по прибыли. В стратегии применяются фильтры для более стабильной торговли.",
    price: 10000,
  },
  {
    id: 2,
    name: "robot 2",
    short_description:
      "Нейтральная, торговля только в лонг (на покупку) с элементами скальпинга. Сделки закрываются только по прибыли. В стратегии применяются фильтры для более стабильной торговли.",
    price: 14000,
  },
  {
    id: 3,
    name: "robot 3",
    short_description:
      "Нейтральная, торговля только в лонг (на покупку) с элементами скальпинга. Сделки закрываются только по прибыли. В стратегии применяются фильтры для более стабильной торговли.",
    price: 3000,
  },
  {
    id: 4,
    name: "robot 4",
    short_description:
      "Нейтральная, торговля только в лонг (на покупку) с элементами скальпинга. Сделки закрываются только по прибыли. В стратегии применяются фильтры для более стабильной торговли.",
    price: 59900,
  },
  {
    id: 5,
    name: "robot 5",
    short_description:
      "Нейтральная, торговля только в лонг (на покупку) с элементами скальпинга. Сделки закрываются только по прибыли. В стратегии применяются фильтры для более стабильной торговли.",
    price: 25900,
  },
];

export const fakeRequestRobots = (isError?: boolean): Promise<Robot[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isError) reject("Ошибка в получении данных!");
      resolve(fakeRobotsArr);
    }, 1000);
  });
};

export const fakeRequestRemoveRobot = (id: string | number): Promise<void> => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      fakeRobotsArr = fakeRobotsArr.filter((el) => el.id !== id);
      resolve();
    }, 200);
  });
};

export const fakeRequestCreateRobot = (
  payload: RobotFormPayload,
): Promise<void> => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log(payload);
      resolve();
    }, 200);
  });
};
