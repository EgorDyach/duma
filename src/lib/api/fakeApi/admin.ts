export const fakeRequestLogin = (
  login: string,
  password: string,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (login === "1" && password === "1") {
        resolve("wonvon]ivjqe]rovqsjqqwh103h4f1eo[nf]1on");
      } else {
        reject("");
      }
    }, 300);
  });
};
