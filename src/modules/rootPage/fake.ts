const fakeSchools: {
  id: number;
  name: string;
  address: string;
  login: string;
  password: string;
  type: string;
}[] = [
  {
    id: 123213123,
    name: "МБОУ СШ №23",
    address: "г. Гуково, ул. Молодежная 17",
    login: "login1",
    password: "password",
    type: "school",
  },
  {
    id: 1,
    name: "Университет «Сириус»",
    address: "г. Сочи, ул. Олимпийский проспект, д. 1",
    login: "login1123",
    password: "12341234",
    type: "vuz",
  },
  {
    id: 2,
    name: "Сгутик",
    address: "г. Сочи, ул. Пушкина, дом Колотушкина",
    login: "login13",
    password: "password33",
    type: "suz",
  },
];

export const fakeRequestSchools = async () =>
  new Promise((res) => setTimeout(() => res(fakeSchools), 300));
