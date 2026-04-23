import { test, expect } from "@playwright/test";

test.describe("Services page", () => {
  test.describe.configure({ timeout: 420000 })
  test.beforeEach(async ({ page }) => {
    // test.setTimeout(180000);
    await page.goto("https://staging.qtecsolution.com/");
  });

// 1️⃣. Menu Validation
  test("Header 👉 1. Verify Services Menu & Submenu  visibility & hover & Clickable state", async ({ page }) => {
    const servicesMenu = page.getByRole("link", { name: "Services" });

    await test.step("Verify Services Menu is visible", async () => {
      await expect(servicesMenu).toBeVisible();
    });

    await test.step("Hover on Services menu", async () => {
      await servicesMenu.hover();
    });

    const submenus = [
      { name: "Android", url: "/services/android" },
      { name: "Back End", url: "/services/back-end" },
      { name: "Cloud Application", url: "/services/cloud-application" },
      { name: "CMS", url: "/services/cms" },
      { name: "CRM", url: "/services/crm" },
      { name: "Custom Software", url: "/services/custom-software" },
      { name: "Database", url: "/services/database" },
      { name: "DevOps", url: "/services/devops" },
      { name: "Digital Transformation", url: "/services/digital-transformation" },
      { name: "Ecommerce", url: "/services/ecommerce" },
      { name: "ERP", url: "/services/erp" },
      { name: "Front End", url: "/services/front-end" },
      { name: "iOS", url: "/services/ios" },
      { name: "Legacy Application Modernization", url: "/services/legacy-application-modernization" },
      { name: "Machine Learning", url: "/services/machine-learning" },
      { name: "Mobile App", url: "/services/mobile-app" },
      { name: "QA", url: "/services/qa" },
      { name: "SaaS", url: "/services/saas" },
      { name: "Web Development", url: "/services/web-development" },
      { name: "Staff Augmentation", url: "/services/augmentation" },
      { name: "Software Development", url: "/services/software-development" },
      { name: "E-Commerce Development", url: "/services/e-commerce-development" },
      { name: "Partnerships", url: "/services/partnership" },
      { name: "All Services →", url: "/services" },
    ];

    const banner = page.getByRole('banner');

    for (const submenu of submenus) {
        const submenuLink = banner.getByRole('link', { name: submenu.name }).first();
          
        await test.step(`Verify submenu: ${submenu.name}`, async () => {
          await expect(submenuLink).toBeVisible();
        });

        await test.step(`hover submenu: ${submenu.name}`, async () => {
          await submenuLink.hover();
        });

        await test.step(`Click submenu: ${submenu.name}`, async () => {
          await submenuLink.click();
        });

        await test.step(`Verify URL: ${submenu.name}`, async () => {
          await expect.soft(page).toHaveURL(`https://staging.qtecsolution.com${submenu.url}`);
        });

        await test.step("Goback to Services Menu & Hover", async () => {
          await page.goto("https://staging.qtecsolution.com/");
          await servicesMenu.hover();
        });
  
    }
  });


// 2️⃣ Contact Form Validation
test("Header Contact Form  👉 2. Verify full flow", async ({ page }) => {

    await test.step("Verify homepage URL", async () => {
      await expect(page).toHaveURL("https://staging.qtecsolution.com/");
    });

    await test.step("Navigate to Contact Us page", async () => {
      const ContactForm = page.getByRole('banner').getByRole('link', { name: 'Contact Us', exact: true }).first();
      await expect.soft(ContactForm).toBeVisible();
      await ContactForm.hover();
      await ContactForm.click();
      await expect.soft(page).toHaveURL(/contact-us/);
    });

    await test.step("Submit empty form & validate Full Name", async () => {
      await page.getByRole('button', { name: 'Send Message' }).click();
      const FullNameField = page.getByRole('textbox', { name: 'Full Name' });
      const message = await FullNameField.evaluate(el => el.validationMessage);
      expect.soft(message).toBe("Please fill out this field.");
    });

    await test.step("Fill Full Name & validate Email", async () => {
      const FullNameField = page.getByRole('textbox', { name: 'Full Name' });
      await FullNameField.fill("Mr Alex");
      await page.getByRole('button', { name: 'Send Message' }).click();

      const EmailField = page.getByRole('textbox', { name: 'Email Address' });  
      const message = await EmailField.evaluate(el => el.validationMessage);
      expect.soft(message).toBe("Please fill out this field.");
    });

    await test.step("Fill Email & validate Subject", async () => {
      const EmailField = page.getByRole('textbox', { name: 'Email Address' });
      await EmailField.fill("test@example.com");
      await page.getByRole('button', { name: 'Send Message' }).click();

      const SubjectField = page.getByRole('textbox', { name: "Subject *" });
      const message = await SubjectField.evaluate(el => el.validationMessage);
      expect.soft(message).toBe("Please fill out this field.");
    });

    await test.step("Fill Subject & validate Company Name", async () => {
      const SubjectField = page.getByRole('textbox', { name: "Subject *" });
      await SubjectField.fill("Testing Subject");
      await page.getByRole('button', { name: 'Send Message' }).click();

      const CompanyField = page.getByRole('textbox', { name: 'Company Name *' });
      const message = await CompanyField.evaluate(el => el.validationMessage);
      expect.soft(message).toBe("Please fill out this field.");
    });

    await test.step("Fill Company Name & validate Message field", async () => {
      const CompanyField = page.getByRole('textbox', { name: 'Company Name *' });
      await CompanyField.fill("Testing Company Name");
      await page.getByRole('button', { name: 'Send Message' }).click();

      const MessageField = page.getByRole('textbox', { name: 'Message *' });
      const message = await MessageField.evaluate(el => el.validationMessage);
      expect.soft(message).toBe("Please fill out this field.");
    });

    await test.step("Fill Message & verify success message", async () => {
      const MessageField = page.getByRole('textbox', { name: 'Message *' });
      await MessageField.fill("Test Message for textarea");
      await page.getByRole('button', { name: 'Send Message' }).click();

      const successMessage = page.getByText("Your message has been sent successfully!");  // 
      await expect.soft(successMessage).toBeVisible();
      await expect.soft(successMessage).toBeHidden();
    });

  });

 // 3️⃣ Body
test("Body 👉 3. Verify All title of services Visibility ,hover & Clickable & redirection correct page", async ({ page }) => {

  const servicesMenu = page.getByRole('link', { name: 'Services', exact: true });

  await test.step("Open Services page", async () => {
    await expect.soft(servicesMenu).toBeVisible();
    await servicesMenu.click();
    await expect.soft(page).toHaveURL(/services/);
  });

  const submenus = [
    { name: 'Web Development', url: '/services/web-development' },
    { name: 'Mobile App', url: '/services/mobile-app' },  
    { name: 'Front End', url: '/services/front-end' },
    { name: 'Back End', url: '/services/back-end' },
    { name: 'Custom Software', url: '/services/custom-software' },
    { name: 'CMS', url: '/services/cms' },
    { name: 'QA', url: '/services/qa' },
    { name: 'Legacy Application Modernization', url: '/services/legacy-application-modernization' },
    { name: 'Cloud Application', url: '/services/cloud-application' },
    { name: 'DevOps', url: '/services/devops' },
    { name: 'Machine Learning', url: '/services/machine-learning' },
    { name: 'Digital Transformation', url: '/services/digital-transformation' },
    { name: 'ERP', url: '/services/erp' },
    { name: 'CRM', url: '/services/crm' },
    { name: 'SaaS', url: '/services/saas' },
    { name: 'Ecommerce', url: '/services/ecommerce' },
    { name: 'Database', url: '/services/database' },
    { name: 'Android', url: '/services/android' },
    { name: 'iOS', url: '/services/ios' },
  ];

  await test.step("Validate all services links", async () => {

    for (const submenu of submenus) {

      await test.step(`Check service: ${submenu.name}`, async () => {

        const submenuLink = page.getByRole('link', { name: submenu.name }).first();
        await submenuLink.scrollIntoViewIfNeeded();
        await expect.soft(submenuLink).toBeVisible();

        await test.step(`Hover on ${submenu.name}`, async () => {
          await submenuLink.hover();
        });

        await test.step(`Click and verify ${submenu.name}`, async () => {
          await submenuLink.click();
          await expect.soft(page).toHaveURL(`https://staging.qtecsolution.com${submenu.url}`);
        });

        await test.step("Navigate back to Services page", async () => {
          await page.goto("https://staging.qtecsolution.com/");
          await servicesMenu.click();
        });

      });

    }

  });

});

 // 4️⃣ Footer
  test("Footer 👉 4a. Verify Services Menu, Footer non-clickable Menu validation", async ({ page }) => {
    const servicesMenu = page.getByRole("link", { name: "Services", exact: true });

    
    await test.step("Verify Services Menu is visible", async () => {
      await expect(servicesMenu).toBeVisible();
    });

    await test.step("Hover on Services menu", async () => {
      await servicesMenu.hover();
    });

    await test.step("Click on Services menu", async () => {
      await servicesMenu.click();
    });

    await test.step("Verify Services Menu URL", async () => {
      await expect.soft(page).toHaveURL(/services/);
    });
  
 // ================= FOOTER =================
const footer = page.locator("footer");
//  LABELS (non-clickable)
const labels = [
      { type: "label", name: "Company" },
      { type: "label", name: "Services" },
      { type: "label", name: "Resources" },
    ];


    for (const label of labels) { 

      // 📍 Locate element once per iteration (avoid duplication)
      const el = footer.locator("p", { hasText: label.name });
      await el.scrollIntoViewIfNeeded();  //Optional: Delete it later 
      await page.waitForTimeout(2000);   //Optional: Delete it later 

      // ✅ Visibility Check
      await test.step(`Verify visibility: ${label.name}`, async () => {
        await expect(el).toBeVisible();  
      });

      // 🚫 Non-clickable Check
      await test.step(`Verify NON-clickable (no href): ${label.name}`, async () => {
        await expect.soft(el).not.toHaveAttribute("href");
      });
  

    }

  });


 //  Footer
  test("Footer 👉 4b.Verify Services Menu & Footer Menu  visibility & hover and with Clickable  state", async ({ page }) => {
    const servicesMenu = page.getByRole('link', { name: 'Services', exact: true });

    await test.step("Verify Services Menu is visible", async () => {
    await expect(servicesMenu).toBeVisible();
    });

    await test.step("Click on Services menu", async () => {
    await servicesMenu.click();

    });

// ================= LINKS =================
const footer_menus = [
  // Company 
    { type: "link", name: "About Us", url: "/about-us" },
    { type: "link", name: "Team", url: "/team" },
    { type: "link", name: "About The CEO", url: "/ceo-qtec" },
    { type: "link", name: "Partnership", url: "/services/partnership" },
    { type: "link", name: "Career", url: "https://hrm.qtecsolution.net/" },

  // Services
    { type: "link", name: "Software Development", url: "/services/software-development" },
    { type: "link", name: "Mobile App Development", url: "/services/mobile-app" },
    { type: "link", name: "Ecommerce", url: "/services/ecommerce" },
    { type: "link", name: "Staff Augmentation", url: "/services/augmentation" },

     // Services
    { type: "link", name: "Industries", url: "/industries" },
    { type: "link", name: "Blog", url: "/blog" },
    { type: "link", name: "Open Source Projects", url: "/open-source-projects" },
    { type: "link", name: "Case Studies", url: "/case-studies" },
];


    for (const submenu of footer_menus) {

      const submenuLink = page.getByRole('link', { name: submenu.name }).first();
      await submenuLink.scrollIntoViewIfNeeded();

       // ✅ Verify Visibility 
      await test.step(`Verify visibility: ${submenu.name}`, async () => {
          await expect(submenuLink).toBeVisible();
        });

         // ✅ Verify Hover on 
        await test.step(`hover on: ${submenu.name}`, async () => {
          await submenuLink.hover();
        });

        // ✅ Verify Click 
        await test.step(`verify Click : ${submenu.name}`, async () => {
          await submenuLink.click();
        });

         // ✅ Verify URL 
        await test.step(`Verify URL: ${submenu.name}`, async () => {
          await expect.soft(page).toHaveURL(`https://staging.qtecsolution.com${submenu.url}`);
        });

      
        await test.step("Navigate back to Services page", async () => {
          await page.goto("https://staging.qtecsolution.com/");
          await servicesMenu.click();
        });

    

    }

  });







});
