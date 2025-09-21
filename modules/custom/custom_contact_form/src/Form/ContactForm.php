<?php

namespace Drupal\custom_contact_form\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;

class ContactForm extends FormBase {

  public function getFormId() {
    return 'custom_contact_form';
  }

  public function buildForm(array $form, FormStateInterface $form_state) {
    $form['email'] = [
      '#type' => 'email',
      '#title' => $this->t('Your Email'),
      '#title_display' => 'invisible',
      '#attributes' => [
        'placeholder' => 'name@domain.com',
        'class' => ['contact-email-field'],
      ],
      '#required' => TRUE,
    ];

    $form['actions'] = [
      '#type' => 'actions',
    ];
    $form['actions']['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Send'),
      '#button_type' => 'primary',
      '#attributes' => [
        'class' => ['contact-send-btn'],
      ],
    ];

    // Allow the form to render without automatic container,
    // so it can be embedded in a paragraph template cleanly.
    $form['#attributes'] = ['class' => ['custom-contact-form']];

    return $form;
  }

  public function validateForm(array &$form, FormStateInterface $form_state) {
    $email = $form_state->getValue('email');
    if (!\filter_var($email, FILTER_VALIDATE_EMAIL)) {
      $form_state->setErrorByName('email', $this->t('Please enter a valid email address.'));
    }
  }

  public function submitForm(array &$form, FormStateInterface $form_state) {
    // For demo: simply show a message. Replace with email or storage logic.
    \Drupal::messenger()->addStatus($this->t('Email submitted: @email', [
      '@email' => $form_state->getValue('email'),
    ]));
  }

}
