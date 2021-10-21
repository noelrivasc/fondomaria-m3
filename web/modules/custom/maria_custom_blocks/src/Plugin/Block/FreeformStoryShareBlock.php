<?php

namespace Drupal\maria_custom_blocks\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'Story Share CTA' Block code to implement a freeform based block for Suscribe form.
 *
 * @Block(
 *   id = "freeform_story_share_block",
 *   admin_label = @Translation("Story Share CTA"),
 *   category = @Translation("Maria Custom Blocks"),
 * )
 */
class FreeformStoryShareBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $code = 'storyshare';
    return array(
      '#theme' => 'freeform',
      '#code' => $code,
    );
  }

}
