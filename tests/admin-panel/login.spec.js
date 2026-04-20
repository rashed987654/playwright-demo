import { test, expect } from "@playwright/test";

test.describe("Login page", () => {
  test.beforeEach(async ({ page }) => {
    await test.step("Navigate to login page", async () => {
      await page.goto("https://devcore.bechakeena.com/login");
    });
  });

  test("👉 1.Verify WebURL is correct or Not", async ({ page }) => {
    await test.step("Check current URL", async () => {
      await expect(page).toHaveURL("https://devcore.bechakeena.com/login");
    });
  });

  test("👉 2.Check Login button without data & username & Password required validation message", async ({ page }) => {
    await test.step("Click Sign in without input", async () => {
      await page.getByRole("button", { name: "Sign in" }).click();
    });

    await test.step("Validate email required message", async () => {
      const email_message = page.getByText("Please enter a valid email address.");
      await expect(email_message).toBeVisible();
      await expect(email_message).toHaveText("Please enter a valid email address.");
    });

    await test.step("Validate password required message", async () => {
      const pass_message = page.getByText("Please enter a password.");
      await expect(pass_message).toBeVisible();
      await expect(pass_message).toHaveText("Please enter a password.");
    });
  });

  test("👉 3.Verify login with empty Username and valid Password", async ({ page }) => {
    await test.step("Enter only password", async () => {
      await page.getByLabel("password").fill("pa$$word");
    });

    await test.step("Click Sign in", async () => {
      await page.getByRole("button", { name: "Sign in" }).click();
    });

    await test.step("Validate email required message", async () => {
      const email_message = page.getByText("Please enter a valid email address.");
      await expect(email_message).toBeVisible();
      await expect(email_message).toHaveText("Please enter a valid email address.");
    });
  });

  test("👉 4.Verify Login with valid Username and empty Password", async ({ page }) => {
    await test.step("Enter email only", async () => {
      await page.getByLabel("email").fill("admin@example.com");
    });

    await test.step("Click Sign in", async () => {
      await page.getByRole("button", { name: "Sign in" }).click();
    });

    await test.step("Validate password required message", async () => {
      const pass_message = page.getByText("Please enter a password.");
      await expect(pass_message).toBeVisible();
      await expect(pass_message).toHaveText("Please enter a password.");
    });
  });

  test("👉 5.Verify Login with invalid Username and valid Password", async ({ page }) => {
    await test.step("Enter invalid email and valid password", async () => {
      await page.getByLabel("email").fill("abc@def");
      await page.getByLabel("Password").fill("pa$$word");
    });

    await test.step("Click Sign in", async () => {
      await page.getByRole("button", { name: "Sign in" }).click();
    });

    await test.step("Validate error message", async () => {
      const email_invalid = page.getByText("Incorrect email or password");
      await expect(email_invalid).toBeVisible();
      await expect(email_invalid).toHaveText("Incorrect email or password");
    });
  });

  test("👉 6.Verify Login with valid Username and invalid Password", async ({ page }) => {
    await test.step("Enter valid email and invalid password", async () => {
      await page.getByLabel("email").fill("admin@example.com");
      await page.getByLabel("Password").fill("12");
    });

    await test.step("Click Sign in", async () => {
      await page.getByRole("button", { name: "Sign in" }).click();
    });

    await test.step("Validate error message", async () => {
      const pass_invalid = page.getByText("Incorrect email or password");
      await expect(pass_invalid).toBeVisible();
      await expect(pass_invalid).toHaveText("Incorrect email or password");
    });
  });

  test("👉 7.Verify Login with invalid Username and invalid Password", async ({ page }) => {
    await test.step("Enter invalid credentials", async () => {
      await page.getByLabel("email").fill("test@company.");
      await page.getByLabel("Password").fill("123");
    });

    await test.step("Click Sign in", async () => {
      await page.getByRole("button", { name: "Sign in" }).click();
    });

    await test.step("Validate response (to be added)", async () => {
      // Add validation message here
    });
  });

  test("👉 8. Verify Show/Hide Password functionality", async ({ page }) => {
    const passwordInput = page.getByLabel("Password");

    await test.step("Fill email and password", async () => {
      await page.getByLabel("email").fill("admin@example.com");
      await passwordInput.fill("pa$$word");
    });

    await test.step("Verify password is hidden by default", async () => {
      await expect(passwordInput).toHaveAttribute("type", "password");
    });

    await test.step("Show password", async () => {
      await page.locator("svg:visible").nth(0).click();
      await expect(passwordInput).toHaveAttribute("type", "text");
    });

    await test.step("Hide password again", async () => {
      await page.locator("svg:visible").nth(0).click();
      await expect(passwordInput).toHaveAttribute("type", "password");
    });
  });

  test("👉 9. Verify Login & Logout with valid credentials", async ({ page }) => {
    await test.step("Login", async () => {
      await page.getByLabel("email").fill("admin@example.com");
      await page.getByLabel("Password").fill("pa$$word");
      await page.getByRole("button", { name: "Sign in" }).click();
    });

    await test.step("Logout", async () => {
      await page.locator("li.nav-item.dropdown").nth(1).click();
      await page.getByText("Logout").click();
    });
  });
});