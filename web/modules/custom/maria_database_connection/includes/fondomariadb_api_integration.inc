
<?php
/* :: Configuration vars ::
 * fondomaria_api_url: url for database api endpoint
 * fondomaria_api_key: api key for new database api endpoint authentification; corresponds to assigned web user token
 * fondomaria_api_uid: api user id for new database api endpoint authentification; corresponds to assigned web user id
 * 
 * Use: drush sset varname value
 * to configure the variables listed above in order to enable and authenticate the database connection.
 */

function fondomariadb_check_api_configuration() {
    $url = fondomariadb_var_get('fondomaria_api_url');
    return true;
}

function fondomariadb_var_get($varName) {
  global $conf;
  if(!isset($conf[$varName])) {
    \Drupal::messenger()->addError("No está configurada la variable $var_name, que es indispensable para el funcionamiento del sitio.");
  }

  $data = \Drupal::state()->get('test_content_types');
  
  return $data;
}
