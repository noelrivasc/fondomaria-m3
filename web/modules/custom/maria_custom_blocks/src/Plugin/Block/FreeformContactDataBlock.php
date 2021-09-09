<?php

namespace Drupal\maria_custom_blocks\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'Contact Data' Block code to implement freeform based blocks.
 *
 * @Block(
 *   id = "freeform_contact_data_block",
 *   admin_label = @Translation("Contact Data"),
 *   category = @Translation("Maria Custom Blocks"),
 * )
 */
class FreeformContactDataBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $code = 'contactdata';
    return array(
      '#theme' => 'freeform',
      '#code' => $code,
    );
  }

}
