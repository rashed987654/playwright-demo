import { test, expect } from "@playwright/test";

// this is test alpha 
test.describe("Login page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://devcore.bechakeena.com/login");
  });

  test("👉 1.Verify WebURL is correct or Not", async ({ page }) => {
    await expect.soft(page).toHaveURL("https://devcore.bechakeena.com/login");
  });

  test("👉 2.Check Login button without data & username & Password required validation message", async ({page,}) => {
    // await page.getByRole("button", { name: "Sign in" }).click();

const cases = [
  { name: "Validate Login button without data ", email: "", password: "", errors: ["Email required", "Password required"]},
  { name: "Invalid email format", email: "abc", password: "123", errors: ["Invalid email"]},
  { name: "Empty password", email: "admin@example.com", password: "", errors: ["Password required"]}
];

test.describe('Login validation scenarios', () => {

  for (const data of cases) {

    test(`Login validation: ${data.email || 'empty email'} / ${data.password || 'empty password'}`, async ({ page }) => {

      await page.goto('https://your-app-url.com/login');

      // Clear and fill fields (even if empty)
      await page.fill('#email', data.email);
      await page.fill('#password', data.password);

      // Click login
      await page.click('#loginButton');

      // Validate all expected errors
      for (const error of data.errors) {
        await expect(page.locator(`text=${error}`)).toBeVisible();
      }

    });

  }

});










    // // Username required validation message
    // const email_message = page.getByText("Please enter a valid email address.");
    // await expect.soft(email_message).toBeVisible();
    // await expect.soft(email_message).toHaveText("Please enter a valid email address.");

    // // Password required validation message
    // const pass_message = page.getByText("Please enter a password.");
    // await expect.soft(pass_message).toBeVisible();
    // await expect.soft(pass_message).toHaveText("Please enter a password.");
  });





});






