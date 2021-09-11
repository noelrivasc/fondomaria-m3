<?php

namespace Drupal\maria_custom_blocks\Form;

use \Drupal;
use \Exception;
use \Drupal\Core\Form\FormBase;
use \Drupal\Core\Form\FormStateInterface;

class SuscribeForm extends FormBase {
  public function buildForm(array $form, FormStateInterface $form_state) {
    $form = [];
    $form['#prefix'] = '<div id="suscribe-form-wrapper">';
    $form['#suffix'] = '</div>';

    $form['fields'] = [
      '#type' => 'container',
      '#attributes' => [
        'class' => ['fields-container'],
      ]
    ];

    $form['actions'] = [
      '#type' => 'container',
      '#attributes' => [
        'class' => ['actions-container'],
      ]
    ];

    $fields = &$form['fields'];
    $actions = &$form['actions'];

    $fields['email'] = [
      '#type' => 'email',
      '#title' => $this->t('Email'),
      '#placeholder' => $this->t('Correo electrónico...'),
      '#required' => TRUE
    ];

    $actions['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Suscríbete'),
    ];

    return $form;
  }

  public function getFormId() {
    return 'maria_custom_blocks_suscribe_form';
  }

  public function submitForm(array &$form, FormStateInterface $form_state) {
    return $form;
  }
}

