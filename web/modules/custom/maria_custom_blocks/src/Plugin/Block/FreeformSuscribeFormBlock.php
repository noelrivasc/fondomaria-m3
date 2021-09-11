<?php

namespace Drupal\maria_custom_blocks\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'Suscribe Form' Block code to implement a freeform based block for Suscribe form.
 *
 * @Block(
 *   id = "freeform_suscribe_form_block",
 *   admin_label = @Translation("Suscribe Form"),
 *   category = @Translation("Maria Custom Blocks"),
 * )
 */
class FreeformSuscribeFormBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $code = 'suscribeform';
    return array(
      '#theme' => 'freeform',
      '#code' => $code,
    );
  }

}
