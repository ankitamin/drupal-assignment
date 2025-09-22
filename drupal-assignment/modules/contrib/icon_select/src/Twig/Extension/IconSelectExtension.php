<?php

namespace Drupal\icon_select\Twig\Extension;

use Drupal\Component\Utility\Html;
use Drupal\Core\Template\Attribute;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

/**
 * Twig extension for icon rendering.
 */
class IconSelectExtension extends AbstractExtension {

  /**
   * {@inheritdoc}
   */
  public function getFunctions() {
    return [
      new TwigFunction('svg_icon', $this->iconSelectRender(...)),
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getName() {
    return 'icon_select';
  }

  /**
   * Returns an icon for a symbol id.
   *
   * @return array
   *   A render array of an icon.
   */
  public function iconSelectRender($symbol_id, $classes = []) {
    /** @var \Drupal\Core\Template\Attribute $attributes */
    $attributes = new Attribute();
    $classes = is_string($classes) ? [$classes] : $classes;
    // Prepare classes.
    $classes = array_merge($classes, [
      'icon',
      Html::getClass('icon--' . $symbol_id),
    ]);
    $attributes->addClass(...$classes);

    $build = [
      '#theme' => 'icon_select_svg_icon',
      '#attributes' => $attributes,
      '#symbol_id' => $symbol_id,
    ];

    return $build;
  }

}
