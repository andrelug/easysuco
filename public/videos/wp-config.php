<?php
/** 
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information by
 * visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'cachacasja_4');

/** MySQL database username */
define('DB_USER', 'cachacasja_4');

/** MySQL database password */
define('DB_PASSWORD', 'TO94gERaUy');

/** MySQL hostname */
define('DB_HOST', '187.17.103.153:');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link http://api.wordpress.org/secret-key/1.1/ WordPress.org secret-key service}
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '^9oxXxFrCE1^N$N)mmFVc!TZ1GsnQHnPr6U!)ZQ8m(wja9BgUyRHasvBJTnDsr%f');
define('SECURE_AUTH_KEY',  ')kFSj%p@QUfsEor(hqFP&Uw#66jocz0eKD8cU2P8oFz&yDa2*qEo(6uKht)CLvKJ');
define('LOGGED_IN_KEY',    'L7EEk#jZQ&UnmL@Fp0FQaB1@z@gHU)kHXH(J00(V9Rvf%8H7vqHOCB)Ar%CqUjzE');
define('NONCE_KEY',        '4%AjaQm&BEfWS3xj^KzYQWP*gwEFqzZCY^B&HAq#5S9Rgzi^5^4&ztHNp^OqdZK@');
define('AUTH_SALT',        'y6!O17fRBzXrreeHHes&^IndYwn3bN0SeBthZHCl5yKlFR%4dKkWJfy)n9SgQnjH');
define('SECURE_AUTH_SALT', ')WVSYlhlw(L0%EIeMZW9rqLW0V(YhDUDB8IKtAq)C0NFDL4H8jE3oA7knmdnmuOk');
define('LOGGED_IN_SALT',   '&tqbLD3lHrJ&^xpXk2GXwxTknf8NxM$vlfgbbehwr19xr92nbyGNO70TAgpW8y^6');
define('NONCE_SALT',       'h(g^ne8@j#zY(&W(3VJpA9J*8u3BDAdx#EO$esRyimfsf@NUSgaggYlsh1ZhmHo!');
/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'apswp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress.  A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de.mo to wp-content/languages and set WPLANG to 'de' to enable German
 * language support.
 */
define ('WPLANG', 'pt_BR');

define ('FS_METHOD', 'direct');

define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** WordPress absolute path to the Wordpress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');

?>
