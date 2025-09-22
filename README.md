
# Drupal Assignment

This repository contains the code for the Drupal assignment. Follow the steps below to set up the project locally.

---

## **Prerequisites**

Before setting up the project, make sure you have the following installed:

- [Git](https://git-scm.com/)
- [DDEV](https://ddev.readthedocs.io/)
- [Docker](https://www.docker.com/)
- [Node.js & npm](https://nodejs.org/)
- [Gulp CLI](https://gulpjs.com/) (globally installed via `npm install --global gulp-cli`)

---

## **Local Setup Steps**

1. **Navigate to the project folder**

   Make sure you are in the `drupal-assignment` folder:

   ```bash
   cd path/to/drupal-assignment
   ```

2. **Import the database**

   Import the provided database `drupal-assignment.sql.gz`:

   ```bash
   ddev import-db --src=drupal-assignment.sql.gz
   ```

3. **Start DDEV**

   Inside the project folder, run:

   ```bash
   ddev start
   ```

4. **Navigate to the theme folder**

   ```bash
   cd themes/custom/travel
   ```

5. **Build SCSS files**

   Make sure Gulp is installed globally. Then run:

   ```bash
   npm install
   npm run build
   ```

6. **Clear Drupal cache**

   You can clear the cache via Drush:

   ```bash
   ddev drush cr
   ```

   Or clear it from the Drupal admin interface.

7. **Access the site**

   Open the following URL in your browser:

   ```
   https://drupal-assignment.ddev.site/
   ```

---

Now your Drupal assignment should be running locally.
