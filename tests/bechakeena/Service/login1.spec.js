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
    await page.getByRole("button", { name: "Sign in" }).click();

    // Username required validation message
    const email_message = page.getByText("Please enter a valid email address.");
    await expect.soft(email_message).toBeVisible();
    await expect.soft(email_message).toHaveText("Please enter a valid email address.");

    // Password required validation message
    const pass_message = page.getByText("Please enter a password.");
    await expect.soft(pass_message).toBeVisible();
    await expect.soft(pass_message).toHaveText("Please enter a password.");
  });

  test("👉 3.Verify login with empty Username and valid Password", async ({page,}) => {
    await page.getByLabel("password").fill("pa$$word");
    await page.getByRole("button", { name: "Sign in" }).click();

    // Username required validation message
    const email_message = page.getByText("Please enter a valid email address.");
    await expect.soft(email_message).toBeVisible();
    await expect.soft(email_message).toHaveText("Please enter a valid email address.");
  });

  test("👉 4.Verify Login with valid Username and empty Password", async ({page, }) => {
    await page.getByLabel("email").fill("admin@example.com");
    await page.getByRole("button", { name: "Sign in" }).click();

    // Password required validation message
    const pass_message = page.getByText("Please enter a password.");
    await expect.soft(pass_message).toBeVisible();
    await expect.soft(pass_message).toHaveText("Please enter a password.");
  });

  test("👉 5.Verify Login with invalid Username and valid Password", async ({page,}) => {
    await page.getByLabel("email").fill("abc@def");
    await page.getByLabel("Password").fill("pa$$word");
    await page.getByRole("button", { name: "Sign in" }).click();
    // await expect(page.getByText("Your email is invalid!")).toBeVisible();

    // Password required validation message
    const email_invalid = page.getByText("Incorrect email or password");
    await expect.soft(email_invalid).toBeVisible();
    await expect.soft(email_invalid).toHaveText("Incorrect email or password");
  });

  test("👉 6.Verify Login with valid Username and invalid Password", async ({page,}) => {
    await page.getByLabel("email").fill("admin@example.com");
    await page.getByLabel("Password").fill("12");
    await page.getByRole("button", { name: "Sign in" }).click();

    // Password required validation message1
    const pass_invalid = page.getByText("Incorrect email or password");
    await expect.soft(pass_invalid).toBeVisible();
    await expect.soft(pass_invalid).toHaveText("Incorrect email or password");

    await page.getByLabel("Password").press("Control+A");
    await page.getByLabel("Password").press("Backspace");
    await page.getByLabel("Password").fill("000000");
    await page.waitForTimeout(3000); // 👉 3 seconds wait

     // Password required validation message2
    const pass_invalid2 = page.getByText("Incorrect email or password");
    await expect.soft(pass_invalid2).toBeVisible();
    await expect.soft(pass_invalid2).toHaveText("Incorrect email or password");
    await page.getByRole("button", { name: "Sign in" }).click();
  });

  test("👉 7.Verify Login with invalid Username and invalid Password", async ({page,}) => {
    await page.getByLabel("email").fill("test@company.");
    await page.getByLabel("Password").fill("123");
    await page.getByRole("button", { name: "Sign in" }).click();
    // Add validation message here
  });

  test("👉 8. Verify Show/Hide Password functionality", async ({ page }) => {

  // Step 1: Fill email and password
  await page.getByLabel("email").fill("admin@example.com");
  const passwordInput = page.getByLabel("Password");
  await passwordInput.fill("pa$$word");
  await page.waitForTimeout(4000); // 👉 2 seconds wait

  // Step 8a: Verify password is hidden by default
  await expect.soft(passwordInput).toHaveAttribute("type", "password");

  // Step 8b: Click the eye icon to show password
  await page.locator('svg:visible').nth(0).click();

  // Step 8c: Verify password is now visible
  await expect.soft(passwordInput).toHaveAttribute("type", "text");

  // Step 8d: Click the eye icon again to hide password
  await page.locator('svg:visible').nth(0).click();

  // Step 8e: Verify password is hidden again
  await expect.soft(passwordInput).toHaveAttribute("type", "password");
});

  test("👉 9. Verify Login & Logout with valid credentials", async ({page,}) => {
    //Login
    await page.getByLabel("email").fill("admin@example.com");
    await page.getByLabel("Password").fill("pa$$word");
    await page.getByRole("button", { name: "Sign in" }).click();

    //Logout
    await page.locator("li.nav-item.dropdown").nth(1).click();
    await page.getByText("Logout").click();
    // const toast = await page.locator("span").filter({ hasText: "Login Successful" });
    // await expect(toast).toBeVisible();
    // await expect(toast).toHaveText("Login Successful");
  });


});






