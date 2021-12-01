
<?php
/* :: Configuration vars ::
 * fondomaria_api_url: url for database api endpoint.
 * fondomaria_api_key: api key for database api endpoint authentification; corresponds to assigned web user token.
 * fondomaria_api_uid: api user id for database api endpoint authentification; corresponds to assigned web user id.
 * 
 * Use: drush sset varname value
 * to configure the variables listed above in order to enable and authenticate the database connection.
 */

function fondomariadb_get_api_configuration() {
    $url = fondomariadb_var_get('fondomaria_api_url');
    $key = fondomariadb_var_get('fondomaria_api_key');
    $uid = fondomariadb_var_get('fondomaria_api_uid');
    if($url && $key && $uid) {
        return array(
            'url' => base64_encode($url),
            'key' => base64_encode($key),
            'uid' => base64_encode($uid)
        );
    }
    return false;
}

function fondomariadb_var_get($varName) {
  $data = \Drupal::state()->get($varName);
  if(is_null($data)) {
    \Drupal::messenger()->addError("No está configurada la variable $varName, que es indispensable para el funcionamiento del sitio.");
  }
  return $data;
}

function fondomariadb_get_form_data($form, &$form_state) {
    $values = $form_state->cleanValues()->getValues();
    $values = json_encode($values);
    return $values;
}

function fondomariadb_send_data($form, &$form_state) {
    // Make db connection here
    $api = $form['#api'];
    $api['url'] = base64_decode($api['url']);
    $api['key'] = base64_decode($api['key']);
    $api['uid'] = base64_decode($api['uid']);

    // Get form submited data
    $record = fondomariadb_get_form_data($form, $form_state);

    $client = Drupal::httpClient();
    // $clientFactory = \Drupal::service('http_client_factory');
    // $client = $clientFactory->fromOptions(['verify' => FALSE]);
    $response = $client->post($api['url'], [
        'verify' => false,
        'headers' => [
            'Content-Type'     => 'application/json',
            'Authorization-Id' => $api['uid'],
            'Authorization'    => $api['key']
        ],
        'json' => [
            'record' => $record
        ]
    ]);

    // $header = $response->getHeader('content-type')[0];

    // $body = $response->getBody();
}