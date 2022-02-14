(function ($, Drupal, once, paypal_subscription, paypal_orders) {
  Drupal.behaviors.mariaDonationBehavior = {
    attach: function (context, settings) {
      once('mariaDonationBehavior', '.webform-submission-donar-add-form', context).forEach(function(element) {
        var $form = $(element);

        // If the form changes, trigger a paypal button update
        $form.change(Drupal.behaviors.mariaDonationBehavior.triggerPayPalButtonUpdate);

        // If keys are pressed on the text and number inputs, trigger an update, too
        $form.find('input[type=text],input[type=number]').keyup(function() {
          $(this).closest('form').change();
        });

        Drupal.behaviors.mariaDonationBehavior.renderDisabledButton($form);

        // Get the elements that are of interest
        // Attach a function to the change event of the form
        // Write the change method to validate the form and get the values to build the PayPal buttons ********
        // Write the code to produce the PayPal button for different scenarios (amount, subscription) *********

      });
    },

    // Responds to a form change event
    // - validates the form values
    // - if valid values are found, a timeout is set to actually render the PayPal buttons
    // (using a timeout instead of rendering right away improves performance by avoiding
    // too frequent refreshes and api calls)
    triggerPayPalButtonUpdate: function(event) {
      console.log('triggerPayPalButtonUpdate');
      var $form = $(this);
      var donationData = Drupal.behaviors.mariaDonationBehavior.getDonationValues($form);

      // If the data entered is valid, cancel the previous timeout if it exists
      // and set a new one to render the buttons
      var oldDonationData = $form.data('donation-data');
      var hasSameData = (JSON.stringify(oldDonationData) == JSON.stringify(donationData));

      if(!hasSameData) {
        var existingTimerId = $form.data('paypal-timer-id');
        if(existingTimerId) {
          console.log('CANCELLING: ' + existingTimerId);
          clearTimeout(existingTimerId);
        }
      }

      if(donationData &&  !hasSameData) {
        $form.data('donation-data', donationData);
        var timerId = setTimeout(function() {
          Drupal.behaviors.mariaDonationBehavior.renderPayPalButton($form);
          Drupal.behaviors.mariaDonationBehavior.enablePayPalButton($form);
        }, 1000); // TODO: reduce time to 50ms
        $form.data('paypal-timer-id', timerId);
      }
    },

    // Validates the form input.
    // If valid, returns a hash with the values needed to
    // render the paypal button
    //
    // If it's not valid, returns false
    getDonationValues($form) {
      var is_subscription = ($form.find('#edit-donacion-recurrente input[name=donacion_recurrente]:checked').val() == 'recurrente')
      var amount_preset = $form.find('#edit-cantidad input:checked').val();
      var amount;

      if(amount_preset == 'otra') {
        amount = $form.find('#edit-otra-cantidad').val();
      }
      else {
        amount = amount_preset;
      }

      var name = $form.find('#edit-tu-nombre').val();
      var last_name = $form.find('#edit-tus-apellidos').val();
      var email = $form.find('#edit-tu-correo').val();
      var birthday = $form.find('#edit-tu-fecha-de-nacimiento').val();

      if(amount && name && last_name && email && birthday) {
        return {
          is_subscription: is_subscription,
          amount: amount,
        }
      }
      else {
        return false;
      }
    },

    renderDisabledButton: function($form) {
      $form.data('donation-data', {
        amount: 999,
        is_subscription: false
      });
      Drupal.behaviors.mariaDonationBehavior.renderPayPalButton($form);
      Drupal.behaviors.mariaDonationBehavior.disablePayPalButton($form);
    },

    disablePayPalButton: function($form) {
      var isDisabled = $form.data('is-disabled');

      if(!isDisabled) {
        $form.find('#paypal-button-container').css({
          'pointer-events': 'none',
          'cursor': 'default',
          'opacity': '0.25'
        });
        $form.data('is-disabled', true);
      }
    },
    enablePayPalButton: function($form) {
      var isDisabled = $form.data('is-disabled');
      if(isDisabled) {
        $form.find('#paypal-button-container').css({
          'pointer-events': 'auto',
          'cursor': 'auto',
          'opacity': '1'
        });
        $form.data('is-disabled', false);
      }
    },

    // Renders a subscription or order button depending on the data
    // stored in the form
    renderPayPalButton: function($form) {
      console.log('renderPayPalButton');
      var donationData = $form.data('donation-data');

      if(donationData.is_subscription) {
        Drupal.behaviors.mariaDonationBehavior.renderPayPalSubscriptionButton($form);
      }
      else {
        Drupal.behaviors.mariaDonationBehavior.renderPayPalOrderButton($form);
      }
    },

    buttonStyle: {
      shape: 'pill',
      color: 'blue',
      layout: 'horizontal',
      label: 'paypal',

    },

    renderPayPalSubscriptionButton: function($form) {
      var donationData = $form.data('donation-data');
      var $form = $form;
      var quantity = Math.floor(donationData.amount / 10);

      var button = paypal_subscription.Buttons({
        style: Drupal.behaviors.mariaDonationBehavior.buttonStyle,

        createSubscription: function(data, actions) {
          return actions.subscription.create({
            'plan_id': 'P-4GC99466955407033MIFIMCA',
            'quantity': quantity
          });
        },

        onApprove: function(data, actions) {
          Drupal.behaviors.mariaDonationBehavior.handleSuccess($form, data);
        },

        onError: function(err) {
          Drupal.behaviors.mariaDonationBehavior.handleError($form, err);
        }
      });

      $('#paypal-button-container').empty();
      button.render('#paypal-button-container');

    },

    renderPayPalOrderButton: function($form) {
      var donationData = $form.data('donation-data');
      var $form = $form;

      var button = paypal_orders.Buttons({
        style: Drupal.behaviors.mariaDonationBehavior.buttonStyle,

        createOrder: function(data, actions) {
          return actions.order.create({
            purchase_units: [{"description":"Donación a Fondo MARIA","amount":{"currency_code":"MXN","value":donationData.amount,"breakdown":{"item_total":{"currency_code":"MXN","value":donationData.amount}}},"items":[{"name":"item name","unit_amount":{"currency_code":"MXN","value":donationData.amount},"quantity":"1","category":"DONATION"}]}]
          });
        },

        onApprove: function(data, actions) {
          return actions.order.capture().then(function(orderData) {
            Drupal.behaviors.mariaDonationBehavior.handleSuccess($form, orderData);
          });
        },

        onError: function(err) {
          Drupal.behaviors.mariaDonationBehavior.handleError($form, err);
        }
      });

      $('#paypal-button-container').empty();
      button.render('#paypal-button-container');
    },
    handleSuccess: function($form, orderData) {
      console.log('The PayPal operation was a success');
      $form.find('#edit-paypal-error').addClass('hidden');

      $form.find('#edit-actions').css({
        opacity: 0.01,
        display: 'block',
        height: '1px',
        overflow: 'hidden'
      }).find('#edit-actions-submit').click();
      $form.submit();
    },
    handleError: function($form, err) {
      console.log('The PayPal operation failed');
      $form.find('#edit-paypal-error').removeClass('hidden');
      // TODO: show error message
    }
  }
})(jQuery, Drupal, once, paypal_subscription, paypal_orders);


// SIGUIENTES PASOS:
// - Crear un botón con el código de PayPal
// - Mostrar el botón debajo del formulario
// - Probar el botón con la cuenta de prueba (en este momento, sólo éxito)
// - Cablear las funciones de validación, extracción de valores y generación del botón
// - Agregar el markup necesario para mostrar que hubo un error con paypal (en webform?)
// - Cablear los eventos de éxito y fracaso de paypal con el submit o mostrar error
// - PROBAR EXTENSAMENTE EL FORMULARIO (VALORES NULOS, VALORES RAROS, ETC)
// - hacer el mapeo de webform a salesforce
// - Ocultar el botón submit
// - Probar en todos los navegadores conocidos por la humanidad, empezando por Mosaic
