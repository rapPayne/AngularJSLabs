(function (note) {

  'use strict';
  angular.module("sharedModule")
    .factory('notifyFactory', notifyFactory);
  notifyFactory.$inject=[];
  function notifyFactory() {
    return {
      showSuccess: function (message, title) {
        note["success"](message, title);
      },
      showInfo: function (message, title) {
        note["info"](message, title);
      },
      showWarning: function (message, title) {
        note["warning"](message, title);
      },
      showError: function (message, title) {
        note["error"](message, title);
      }
    };
  }
  note.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  };

})(toastr);