<?php


// ** MySQL settings ** //
/** The name of the database for WordPress */
define('DB_NAME', '7475fbe40d2b3e71');

/** MySQL database username */
define('DB_USER', '7475fbe40d2b3e71');

/** MySQL database password */
define('DB_PASSWORD', '5d687e27612142d85a9e07d697305568bf50a74de4dc4f94');

/** MySQL hostname */
define('DB_HOST', 'mysql:3306');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

define('AUTH_KEY',         'y4lpYZraQtVwNX6bRKOllcmr9ruq4pz3xaaPgNs77cIlQhXMGkoL3ITPOC1V3PNV');
define('SECURE_AUTH_KEY',  '6bq5aZzuDxa8pO3aUBa7oBMNpNfSM6lKJfF6NaAJYfFTQuXxDOkGRGdfHGqI55y8');
define('LOGGED_IN_KEY',    'G0Wf0Ec1nqahYzQFg5mywh7eTSlR8Sx1sYTHqFR1v8GDVYa7JSXZ0lmFM0zLYBOt');
define('NONCE_KEY',        'i7A9J3YakNpmP0X6HNO7qT2YwuV0DwwcWgKXvgSklTv7o55lDSfoJVFZw2TNbpXc');
define('AUTH_SALT',        'jxONHDtu3dB9NUBJETFPVSh4yLIogzAYxmQhPBU687yTjIJLRNEU8aHWGo2CNNM6');
define('SECURE_AUTH_SALT', 'y1BZPp5GD1iw2YAG0grRBCcklhfOLTYZoZllIetBc9AZnFzfMCcUs2UrvHLgbsyd');
define('LOGGED_IN_SALT',   '8ccCuSz9GJCxPHcf31q6kWBXEmnDJQpLGtPDdfpvOSacTW6zLzYXmYMGRSIcgMcb');
define('NONCE_SALT',       'uglRsolCJ8K08odO9hKnp087vL6EEXbUV4XdBtjfq6I6ZwV3hZygk9yJLdnI5q9E');

// prevent user from changing the Settings->General, WordPress and Blog address values.
define('WP_HOME', 'https://kitchen.alxdr.ca');
define('WP_SITEURL', 'https://kitchen.alxdr.ca');

define('WP_CONTENT_URL', getenv('CLOUDRON_APP_ORIGIN') . '/wp-content');
define('WP_PLUGIN_URL', getenv('CLOUDRON_APP_ORIGIN') . '/wp-content/plugins');
define('WP_CONTENT_DIR', '/app/data/wp-content');
define('WP_PLUGIN_DIR', '/app/data/wp-content/plugins');

// disable built-in page load based cron (https://developer.wordpress.org/plugins/cron/)
define('DISABLE_WP_CRON', true);

// Enable WP_DEBUG mode
define('WP_DEBUG', false);

// Enable Debug logging to the /wp-content/debug.log file
define('WP_DEBUG_LOG', false);

/*
 http://cmanios.wordpress.com/2014/04/12/nginx-https-reverse-proxy-to-wordpress-with-apache-http-and-different-port/
 http://wordpress.org/support/topic/compatibility-with-wordpress-behind-a-reverse-proxy
 https://wordpress.org/support/topic/wp_home-and-wp_siteurl
 */
// If WordPress is behind reverse proxy which proxies https to http
if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $_SERVER['HTTP_HOST'] = $_SERVER['HTTP_X_FORWARDED_HOST'];

    if ($_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https')
        $_SERVER['HTTPS']='on';
}

$table_prefix = 'wp_';
/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
    define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');

