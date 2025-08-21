<?php
/**
 * Plugin Name: CORS for REST only
 * Description: Устанавливает CORS заголовки только для REST API (wp-json).
 */
add_action('rest_api_init', function () {
  // свой белый список доменов фронта
  $allowed = [
    'http://localhost:4321',
    'https://your-frontend-domain.com',
  ];

  add_filter('rest_send_cors_headers', function ($value) use ($allowed) {
    $origin = get_http_origin();
    if ($origin && in_array($origin, $allowed, true)) {
      header('Access-Control-Allow-Origin: ' . $origin);
      header('Vary: Origin');
      header('Access-Control-Allow-Credentials: true');
      header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
      header('Access-Control-Allow-Headers: Content-Type, Authorization, X-WP-Nonce');
    }
    return $value;
  }, 15);

  // отвечаем на preflight (OPTIONS)
  add_action('rest_pre_serve_request', function ($served) {
    if ('OPTIONS' === $_SERVER['REQUEST_METHOD']) {
      status_header(200);
      exit;
    }
    return $served;
  });
});


if (function_exists('acf_add_options_page')) {

  acf_add_options_page(array(
    'page_title'   => 'Theme General Settings',
    'menu_title'  => 'Глобальные настройки',
    'menu_slug'   => 'theme-general-settings',
    'capability'  => 'edit_posts',
    'redirect'    => false
  ));
}