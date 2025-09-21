Custom Contact Form module
-------------------------
Installation:
1. Copy the 'custom_contact_form' folder to your Drupal site's modules/custom directory.
2. Run `drush en custom_contact_form -y` or enable via the Extend admin UI.
3. Create a Paragraph type (e.g., 'Contact Form Section') with fields:
   - field_title (Text)
   - field_description (Text long, formatted)
   - field_bg_image (Media -> Image)
4. In your paragraph twig (paragraph--contact-form-section.html.twig) render the form with:
   {{ drupal_form('Drupal\\custom_contact_form\\Form\\ContactForm') }}
5. Add the Paragraph to a layout or node to display.

Note: This module provides a simple email field demo. Replace submitForm() logic with your
desired storage/email behavior for production use.
