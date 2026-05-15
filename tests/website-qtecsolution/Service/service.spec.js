import { test, expect } from "@playwright/test";
//import { openServicesPage,reloadServicesPage } from "../../helpers/openServicesPage";
const BASE_URL = "https://staging.qtecsolution.com";

test.describe("Services page", () => {
  test.describe.configure({ timeout: 1000000 })
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
});

//This is Test 3

// 1️⃣ Header: 
test("Header 👉 1a. Verify Services Menu & Submenu (Visibility, Hover, Click & URL)", async ({ page }) => {
  // Header Services Menu
    const servicesMenu = page.getByRole("link", { name: "Services", exact: true  });

    //Services Menu visibility 
    await test.step("Services Menu → Verify visibility ", async () => {
      await expect(servicesMenu).toBeVisible();
    });

    //Services Menu Hover 
    await test.step("Services Menu → Verify Hover ", async () => {
      await servicesMenu.hover();
    });

    // All submenu items
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
      { name: "All Services →", url: "/services" },

      // Left Sidebar
      { name: "Machine Learning", url: "/services/machine-learning" },
      { name: "Mobile App", url: "/services/mobile-app" },
      { name: "QA", url: "/services/qa" },
      { name: "SaaS", url: "/services/saas" },
      { name: "Web Development", url: "/services/web-development" },
      { name: "Staff Augmentation", url: "/services/augmentation" },
      { name: "Mobile App Development", url: "/services/mobile-app" },
      { name: "Software Development", url: "/services/software-development" },
      { name: "E-Commerce Development", url: "/services/e-commerce-development" },
      { name: "Partnerships", url: "/services/partnership" },
    
    ];

    // Loop through all submenu items
    const banner = page.getByRole('banner');

    for (const submenu of submenus) {
        const submenuLink = banner.getByRole('link', { name: submenu.name,  exact: true });

        // 🔍 Visibility
        await test.step(`🔎 ${submenu.name} → Verify visibility`, async () => {
          await expect.soft(submenuLink, `${submenu.name} icon should be visible`).toBeVisible();
        });

        // 🖱️ Hover
        await test.step(`🖱️ ${submenu.name} → Verify hover`, async () => {
          await submenuLink.hover();
        });

        // 🔗 Href validation
        await test.step(`🔗 ${submenu.name} → Verify href`, async () => {
         await expect.soft(submenuLink, `${submenu.name} href mismatch`).toHaveAttribute('href',new RegExp(`${submenu.url}$`));     // The $ symbol = end of string
        });

        // 🚀 Click 
        await test.step(`🚀 ${submenu.name} → Verify click `, async () => {
          await submenuLink.click();
        });
        
        // 📍 URL
        await test.step(`📍 ${submenu.name} → Verify URL `, async () => {
          await expect.soft(page).toHaveURL(new RegExp(`${submenu.url}$`));  // ${variable} Means: insert variable value
        });
        // ↩️ Goback Services Menu
        await test.step("  Goback to Services Menu & Hover", async () => { 
          await page.goto(BASE_URL);  
          await servicesMenu.hover();
          
        });

  
    }

  });

// 2️⃣ Header:  Contact Form 
test("Header 👉 1b. Verify Contact Form ", async ({ page }) => {

    const servicesMenu = page.getByRole("link", { name: "Services", exact: true });

     //Services Menu visibility
      await test.step("Verify Services menu is visible", async () => {
        await expect(servicesMenu).toBeVisible();
      });

      //Services Menu Hover
      await test.step("Hover on Services menu", async () => {
        await servicesMenu.hover();
      });

       // Step 3️⃣ Verify Services Menu href
      await test.step("Services Menu → Verify Href", async () => {
        await expect(servicesMenu).toHaveAttribute("href","https://staging.qtecsolution.com/services");
      });

      //Services Menu Click
      await test.step("Click on Services menu", async () => {
        await servicesMenu.click();
      });

      //Services Menu URL
      await test.step("Verify Services page URL", async () => {
          await expect(page).toHaveURL(/\/services\/?$/);
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
  

// 3️⃣ Body: CardsSection
test("Body 👉 2a. Verify CardsSection Title (Visibility, Hover, Href, Click & URL)", async ({ page }) => {

  const servicesMenu = page.getByRole('link', { name: 'Services', exact: true  });  //exact: true 

  //Services Menu visibility 
    await test.step("Services Menu → Verify visibility", async () => {
      await expect(servicesMenu).toBeVisible();
    });

  //Services Menu Hover 
    await test.step("Services Menu → Verify Hover", async () => {
      await servicesMenu.hover();
    });

  //Services Menu href 
      await test.step("Services Menu → Verify href", async () => {
      await expect(servicesMenu).toHaveAttribute('href', "https://staging.qtecsolution.com/services");
    });

  //Services Menu Click 
    await test.step("Services Menu → Verify Click ", async () => {
      await servicesMenu.click();
    });

  //Services Menu URL 
    await test.step("Services Menu → Verify URL", async () => {
        await expect(page).toHaveURL(/\/services\/?$/);
    });


  const serviceCards = [
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

    // Loop through all items
    for (const serviceCard of serviceCards) {
      const serviceLink = page.locator('h3.qtec-ind-title a').filter({ hasText: serviceCard.name });

        // 🔍 Visibility
        await test.step(`🔎 ${serviceCard.name} → Verify visibility`, async () => {        
          await expect.soft(serviceLink, `${serviceCard.name} icon should be visible`).toBeVisible();
        });

        // 🖱️ Hover
        await test.step(`🖱️ ${serviceCard.name} → Verify hover`, async () => { 
          await serviceLink.scrollIntoViewIfNeeded(); await page.waitForTimeout(1000);   // only for Debug purpose
          await serviceLink.hover();
        });


        // 🔗 Href validation
        await test.step(`🔗 ${serviceCard.name} → Verify href`, async () => {
         await expect.soft(serviceLink, `${serviceCard.name} href mismatch`).toHaveAttribute('href',new RegExp(`${serviceCard.url}$`));     // The $ symbol = end of string
        });

        // 🚀 Click 
        await test.step(`🚀 ${serviceCard.name} → Verify click `, async () => {
          await serviceLink.click();
        });
        
        // 📍 URL
        await test.step(`📍 ${serviceCard.name} → Verify URL `, async () => {  
          await expect.soft(page).toHaveURL(new RegExp(`${serviceCard.url}$`));  // ${variable} Means: insert variable value
        });

        // ↩️ Goback Services Menu
        await test.step("  Goback to Services Menu & Hover", async () => { 
          await page.goto(BASE_URL);  
          await servicesMenu.hover();
          await servicesMenu.click();
        });
        
  
    }


  });


// 4️⃣ Body: Marquee Effect
test("Body 👉 2b.Verify Marquee Effect (Visibility, Hover, Href, Click & URL)", async ({ page }) => {

    // Services menu
    const servicesMenu = page.getByRole("link", {name: "Services",exact: true});

    // Services Menu visibility
    await test.step("Services Menu → Verify Visibility", async () => {
      await expect(servicesMenu).toBeVisible();
    });

    // Services Menu Hover 
    await test.step("Services Menu → Verify Hover", async () => {
      await servicesMenu.hover();
    });

    // Services Menu href
    await test.step("Services Menu → Verify Href", async () => {
      await expect(servicesMenu).toHaveAttribute("href","https://staging.qtecsolution.com/services");
    });

    // Services Menu Click 
    await test.step("Services Menu → Verify Click", async () => {
      await servicesMenu.click();
    });

    //Services Menu URL 
    await test.step("Services Menu → Verify URL", async () => {
        await expect(page).toHaveURL(/\/services\/?$/);
    });

 // 🛑 Disable marquee animation globally
    await test.step(" 🛑 Marquee → Disable Animation", async () => {

        await page.addStyleTag({
          content: `.qtec-tech-slider-track,.qtec-tech-slider-track * {
              animation: none !important;
              transition: none !important;
              transform: translateX(0) !important;
            }
          `
        });


    });

    // Array items
    const serviceCards = [
      { name: '.NET', url: '/technologies/net' },
      { name: 'Adobe InDesign', url: '/technologies/adobe-indesign' },
      { name: 'Angular Js', url: '/technologies/angular-js' },
      { name: 'Apache Cassandra', url: '/technologies/apache-cassandra' },
      { name: 'AWS', url: '/technologies/aws' },
      { name: 'Azure', url: '/technologies/azure' },
      { name: 'C#', url: '/technologies/c' },
      { name: 'C++', url: '/technologies/c-1756270078' },
      { name: 'CI/CD', url: '/technologies/cicd' },
      { name: 'CSS', url: '/technologies/css' },
      { name: 'Digital Ocean', url: '/technologies/digital-ocean' },
      { name: 'Django', url: '/technologies/django' },
      { name: 'Docker', url: '/technologies/docker' },
      { name: 'Drupal', url: '/technologies/drupal' },
      { name: 'Express.js', url: '/technologies/expressjs' },
      { name: 'Figma', url: '/technologies/figma' },
      { name: 'Firebase', url: '/technologies/firebase' },
      { name: 'Flutter', url: '/technologies/flutter' },
      { name: 'Golang', url: '/technologies/golang' },
      { name: 'Google Clouds', url: '/technologies/google-clouds' },
      { name: 'HTML', url: '/technologies/html' },
      { name: 'Ionic', url: '/technologies/ionic' },
      { name: 'Java', url: '/technologies/java' },
      { name: 'JavaScript', url: '/technologies/javascript' },
      { name: 'Joomla', url: '/technologies/joomla' },
      { name: 'Kotlin', url: '/technologies/kotlin' },
      { name: 'Kubernetes', url: '/technologies/kubernetes' },
    ];


    // Loop through all items
    for (const serviceCard of serviceCards) {

      // Locate marquee item
      const marqueeEffect = page.locator('.qtec-tech-slider-track.slider-ltr a').filter({ hasText: serviceCard.name }).first();

      // 🔍 Visibility
      await test.step(`🔎 ${serviceCard.name} → Verify Visibility`, async () => {        
          await expect.soft(marqueeEffect, `${serviceCard.name} element should be visible`).toBeVisible();
        });

      // 🖱️ Hover
      await test.step(`🖱️ ${serviceCard.name} → Verify Hover`, async () => {
        await marqueeEffect.scrollIntoViewIfNeeded();await page.waitForTimeout(300);
        await marqueeEffect.hover();
      });

       // 🔗 Href 
      await test.step(`🔗 ${serviceCard.name} → Verify Href`, async () => {
         await expect.soft(marqueeEffect, `${serviceCard.name} href mismatch`).toHaveAttribute('href',new RegExp(`${serviceCard.url}$`));     // The $ symbol = end of string
      });

      // 🚀 Click 
        await test.step(`🚀 ${serviceCard.name} → Verify Click `, async () => {
          await marqueeEffect.click();
      });


      // 📍 URL
        await test.step(`📍 ${serviceCard.name} → Verify URL `, async () => {  
          await expect.soft(page).toHaveURL(new RegExp(`${serviceCard.url}$`));  // ${variable} Means: insert variable value
        });


      // 🔁 Go back  Services Menu
      await test.step("🔁 Go back  Services Menu", async () => {
        await page.goto(BASE_URL);
        await servicesMenu.hover();
        await servicesMenu.click();
      });


     // ♻️ Marquee: stop animation after navigation
      await test.step("♻️ Marquee: Stop animation after navigation", async () => {

          await page.addStyleTag({
            content: `.qtec-tech-slider-track,.qtec-tech-slider-track * {
                animation: none !important;
                transition: none !important;
                transform: translateX(0) !important;
              }
            `
          });
      });

    }

  });

  
// 5️⃣ Body:  Message send Form 
test("Body 👉 2c. Verify Message Send  Form", async ({ page }) => {

  const servicesMenu = page.getByRole("link", { name: "Services", exact: true });

     //Services Menu visibility
      await test.step("Verify Services menu is visible", async () => {
        await expect(servicesMenu).toBeVisible();
      });

      //Services Menu Hover
      await test.step("Hover on Services menu", async () => {
        await servicesMenu.hover();
      });

       //  Verify Services Menu href
      await test.step("Services Menu → Verify Href", async () => {
        await expect(servicesMenu).toHaveAttribute("href","https://staging.qtecsolution.com/services");
      });

      //Services Menu Click
      await test.step("Click on Services menu", async () => {
        await servicesMenu.click();
      });

      //Services Menu URL
      await test.step("Verify Services page URL", async () => {
          await expect(page).toHaveURL(/\/services\/?$/);
      });


    await test.step("Send Message empty data & validate Full Name", async () => {
      await page.getByRole('button', { name: 'Send Message →' }).click();

      const FullNameField = page.getByRole('textbox', { name: 'Full Name' });
      const message = await FullNameField.evaluate(el => el.validationMessage);
      expect.soft(message).toBe("Please fill out this field.");
    });

    await test.step("Fill Full Name & validate Email", async () => {
      const FullNameField = page.getByRole('textbox', { name: 'Full Name' });
      await FullNameField.fill("Mr Jonson");
      await page.getByRole('button', { name: 'Send Message →' }).click();

      const EmailField = page.getByRole('textbox', { name: 'Email Address' });  
      const message = await EmailField.evaluate(el => el.validationMessage);
      expect.soft(message).toBe("Please fill out this field.");
    });

    await test.step("Fill Email & validate Subject", async () => {
      const EmailField = page.getByRole('textbox', { name: 'Email Address' });
      await EmailField.fill("test@example.com");
      await page.getByRole('button', { name: 'Send Message →' }).click();

      const SubjectField = page.getByRole('textbox', { name: "Subject *" });
      const message = await SubjectField.evaluate(el => el.validationMessage);
      expect.soft(message).toBe("Please fill out this field.");
    });

    await test.step("Fill Subject & validate Company Name", async () => {
      const SubjectField = page.getByRole('textbox', { name: "Subject *" });
      await SubjectField.fill("Testing Subject");
      await page.getByRole('button', { name: 'Send Message →' }).click();

      const CompanyField = page.getByRole('textbox', { name: 'Company Name *' });
      const message = await CompanyField.evaluate(el => el.validationMessage);
      expect.soft(message).toBe("Please fill out this field.");
    });

    await test.step("Fill Company Name & validate Message field", async () => {
      const CompanyField = page.getByRole('textbox', { name: 'Company Name *' });
      await CompanyField.fill("Testing Company Name");
      await page.getByRole('button', { name: 'Send Message →' }).click();

      const MessageField = page.getByRole('textbox', { name: 'Message *' });
      const message = await MessageField.evaluate(el => el.validationMessage);
      expect.soft(message).toBe("Please fill out this field.");
    });

    await test.step("Fill Message & verify success message", async () => {
      const MessageField = page.getByRole('textbox', { name: 'Message *' });
      await MessageField.fill("Test Message for textarea");
      await page.getByRole('button', { name: 'Send Message →' }).click();

      const successMessage = page.getByText("Your message has been sent successfully!");  // 
      await expect.soft(successMessage).toBeVisible();
      await expect.soft(successMessage).toBeHidden();
    });

  });

  
// 6️⃣ Footer:   Menu Non-clickable
test("Footer 👉 3a. Verify Non-Clickable Menu", async ({ page }) => {

    const servicesMenu = page.getByRole("link", { name: "Services", exact: true });

     //Services Menu visibility
      await test.step("Verify Services menu is visible", async () => {
        await expect(servicesMenu).toBeVisible();
      });

      //Services Menu Hover
      await test.step("Hover on Services menu", async () => {
        await servicesMenu.hover();
      });

       //  Verify Services Menu href
      await test.step("Services Menu → Verify Href", async () => {
        await expect(servicesMenu).toHaveAttribute("href","https://staging.qtecsolution.com/services");
      });

      //Services Menu Click
      await test.step("Click on Services menu", async () => {
        await servicesMenu.click();
      });

      //Services Menu URL
      await test.step("Verify Services page URL", async () => {
          await expect(page).toHaveURL(/\/services\/?$/);
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

      // Visibility Check
      await test.step(`Verify visibility: ${label.name}`, async () => {
        await expect.soft(el).toBeVisible();  
      });

      // 🚫 Non-clickable Check
      await test.step(`Verify NON-clickable (no href): ${label.name}`, async () => {
        await expect.soft(el).not.toHaveAttribute("href");
      });
  
      // ↩️ Goback Services Menu
      await test.step("Goback to Services Menu & Click", async () => {
        await page.goto(BASE_URL);  
        await servicesMenu.hover();
        await servicesMenu.click();
      });


    }

  });

// 7️⃣ Footer:  Clickable Menu 
test("Footer 👉 3b.Verify All Footer Menu (Visibility, Hover, Href, Click & URL) ", async ({ page }) => {
    
    const servicesMenu = page.getByRole("link", { name: "Services", exact: true });

     //Services Menu visibility
      await test.step("Verify Services menu is visible", async () => {
        await expect(servicesMenu).toBeVisible();
      });

      //Services Menu Hover
      await test.step("Hover on Services menu", async () => {
        await servicesMenu.hover();
      });

       // Verify Services Menu href
      await test.step("Services Menu → Verify Href", async () => {
        await expect(servicesMenu).toHaveAttribute("href","https://staging.qtecsolution.com/services");
      });

      //Services Menu Click
      await test.step("Click on Services menu", async () => {
        await servicesMenu.click();
      });

      //Services Menu URL
      await test.step("Verify Services page URL", async () => {
          await expect(page).toHaveURL(/\/services\/?$/);
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

  // Resources
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
          await expect.soft(submenuLink).toBeVisible();
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

    // ↩️ Goback Services Menu
      await test.step("Goback to Services Menu & Click", async () => {
        await page.goto(BASE_URL);  
        await servicesMenu.hover();
        await servicesMenu.click();
      });



    

    }

  });

// 8️⃣ Footer:  Social Icons
test("Footer  👉 3c.Verify all Social Icons (Visibility, Hover, Href, Click & URL)", async ({ page }) => {
    
  const servicesMenu = page.getByRole("link", { name: "Services", exact: true });

     //Services Menu visibility
      await test.step("Verify Services menu is visible", async () => {
        await expect(servicesMenu).toBeVisible();
      });

      //Services Menu Hover
      await test.step("Hover on Services menu", async () => {
        await servicesMenu.hover();
      });

       // Verify Services Menu href
      await test.step("Services Menu → Verify Href", async () => {
        await expect(servicesMenu).toHaveAttribute("href","https://staging.qtecsolution.com/services");
      });

      //Services Menu Click
      await test.step("Click on Services menu", async () => {
        await servicesMenu.click();
      });

      //Services Menu URL
      await test.step("Verify Services page URL", async () => {
          await expect(page).toHaveURL(/\/services\/?$/);
      });
  
    // 🔹 Social icons (external + SVG)
      const socialLinks = [
        { type: "social", name: "Facebook", key: "facebook", url: "https://www.facebook.com/QtecSolution" },
        { type: "social", name: "Twitter", key: "twitter", url: "https://twitter.com/qtec_solution" },
        { type: "social", name: "LinkedIn", key: "linkedin", url: "https://www.linkedin.com/company/qtec-solution/" },
        { type: "social", name: "Instagram", key: "instagram", url: "https://www.instagram.com/qtecsolution/" },
        { type: "social", name: "GitHub", key: "github", url: "https://github.com/qtecsolution" },
        { type: "social", name: "YouTube", key: "youtube", url: "https://www.youtube.com/@qtecsolutionlimited" }
      ];
  
  
      for (const item of socialLinks) {
  
        const icon = page.locator(`.sociallist a[href*="${item.key}"]`);
  
        // 🔍 Visibility
        await test.step(`🔎 ${item.name} → visibility`, async () => {
          await expect.soft(icon, `${item.name} icon should be visible`).toBeVisible();
        });
  
        // 🖱️ Hover
        await test.step(`🖱️ ${item.name} → hover`, async () => {
          await icon.hover();
        });
  
        // 🔗 Href validation
        await test.step(`🔗 ${item.name} → validate href`, async () => {
          await expect.soft(icon, `${item.name} href mismatch`).toHaveAttribute('href', item.url);
        });
  
  
        // 🚀 Click + validation URL
        await test.step(`🚀 ${item.name} → click & verify URL`, async () => {
  
          const [newPage] = await Promise.all([
            page.context().waitForEvent('page'),
            icon.click()
          ]);
          await newPage.waitForLoadState();
  
          await expect.soft(newPage, `${item.name} URL mismatch`).toHaveURL(item.url);
          await newPage.close(); // cleanup
        });
      }
  });








});
