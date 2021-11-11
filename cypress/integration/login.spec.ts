import { BasePage } from "../pageObjects/basePage";

describe("login into anfisa", () => {
  const login = new BasePage();
  it("Login with POM", () => {
    login.visit("https://anfisa.forome.dev/");
  });
});
