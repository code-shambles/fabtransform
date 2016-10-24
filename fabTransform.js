(function ($) {

  var FAB = function($button, options) {

    this.open = function() {
      var me = this;

      me.options.willOpen(me.$button, me.$pane);
      me.$button.removeClass('fabtransform--closed').addClass('fabtransform--opening');
      me.$pane.removeClass('fabtransform--closed').addClass('fabtransform--opening');
      window.setTimeout(function() {
        me.$button.removeClass('fabtransform--opening').addClass('fabtransform--open');
        me.$pane.removeClass('fabtransform--opening').addClass('fabtransform--open');
        me.options.didOpen(me.$button, me.$pane);
      }, me.options.transitionMS)
    };

    this.close = function() {
      var me = this;

      me.options.willClose(me.$button, me.$pane);
      me.$button.removeClass('fabtransform--open').addClass('fabtransform--closing');
      me.$pane.removeClass('fabtransform--open').addClass('fabtransform--closing');
      window.setTimeout(function() {
        me.$button.removeClass('fabtransform--closing').addClass('fabtransform--closed');
        me.$pane.removeClass('fabtransform--closing').addClass('fabtransform--closed');
        me.options.didClose(me.$button, me.$pane);
      }, me.options.transitionMS)
    };

    this.addListeners = function() {
      var me = this;

      me.$button.on('click', function(event) {
        event.preventDefault();
        if (me.$button.hasClass('fabtransform--closed')) {
          me.open();
        }
      });
      me.$pane.find('.fabtransform--close').on('click', function(event) {
        event.preventDefault();
        if (me.$pane.hasClass('fabtransform--open')) {
          me.close();
        }
      });
    };

    this.init = function () {
      var defaults = {
        pane: '#fabtransform--pane',
        transitionMS: 400,
        willOpen: function() {},
        didOpen: function() {},
        willClose: function() {},
        didClose: function() {}
      };

      // apply defaults
      if (typeof options !== 'undefined') {
          this.options = $.extend(defaults, options);
      }
      else {
          this.options = defaults;
      }

      this.$button = $button.addClass('fabtransform--closed');
      this.$pane = $(this.options.pane).addClass('fabtransform--closed');

      this.addListeners();
    };

    this.init();
  };



  FABTransform = new function () {

    this.methods = {
      init: function (options) {
        var me = this;
        me.FABs = [];

        return me.each(function (i, item) {
          me.FABs[i] = new FAB($(item), options);
          me.FABs[i].init();
        });
      },

      close: function () {
        var me = this;

        return me.each(function (i, item) {
          me.FABs[i].close();
        });
      }
    };
    /**
     * Define the basic plugin
     * @param methodOrOptions A plugin method to call or options to initialize the plugin
     * @returns {*}
     */
    this.plugin = function (methodOrOptions) {
      if (FABTransform.methods[methodOrOptions]) {
        return FABTransform.methods[ methodOrOptions ].apply(this, Array.prototype.slice.call(arguments, 1));
      }
      else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
        // Default to "init"
        return FABTransform.methods.init.apply(this, arguments);
      }
      else {
        console.error('Method ' + methodOrOptions + ' does not exist in jQuery.FABTransform');
        return false;
      }
    }
  };
  /**
   * Actually initialize plugin
   */
  $.fn.FABTransform = FABTransform.plugin;
}(jQuery));


jQuery(document).ready(function() {
  var $button = jQuery('#fabtransform--button');
  $button.FABTransform();
});
