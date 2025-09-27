<?php

/**
 * Plugin Name: My React Plugin
 */

function enqueue_react_app()
{
    $asset_file = plugin_dir_path(__FILE__) . 'build/index.asset.php';
    $asset = file_exists($asset_file) ? require($asset_file) : array();

    wp_enqueue_script(
        'my-react-app',
        plugin_dir_url(__FILE__) . 'build/index.js',
        $asset['dependencies'] ?? array('wp-element'),
        $asset['version'] ?? '1.0.0',
        true
    );

    // REST APIのURLをJavaScriptに渡す
    wp_localize_script('my-react-app', 'typingGameAPI', array(
        'categoriesUrl' => get_rest_url(null, 'typing-game/v1/categories'),
        'commandsBaseUrl' => get_rest_url(null, 'typing-game/v1/commands/')
    ));

    wp_enqueue_style(
        'my-react-app-style',
        plugin_dir_url(__FILE__) . 'build/style-index.css',
        array(),
        $asset['version'] ?? '1.0.0'
    );
}
add_action('wp_enqueue_scripts', 'enqueue_react_app');

// ショートコード追加
function react_shortcode()
{
    return '<div id="react-root"></div>';
}
add_shortcode('my_react_app', 'react_shortcode');

include_once plugin_dir_path(__FILE__) . 'include/admin-command-registration.php';
