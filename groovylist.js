document.addEventListener("DOMContentLoaded", function() {

  var groovyList = {

    frame: {},

    start: function() {
      this.frame.iframe = document.getElementsByTagName('iframe')[0];
      this.frame.iframe.onload = this._iframeOnLoad.bind(this);
    },

    _iframeOnLoad: function() {
      this.frame.box = this.frame.iframe.getBoundingClientRect();
      this.frame.document = this.frame.iframe.contentWindow.document;
      this.frame.window = this.frame.iframe.contentWindow;

      this.frame.list = this.frame.document.getElementsByTagName('li');
      this.frame.list = Array.prototype.slice.call(this.frame.list);

      this.bindScrollEvents.call(this);
      this.markAsRead.call(this);
    },

    bindScrollEvents: function() {
      this.frame.window.addEventListener('scroll', this.markAsRead.bind(this));
      window.addEventListener('scroll', this.markAsRead.bind(this));
    },

    markAsRead: function() {
      var self = this;
      this.frame.list.forEach(function(item) {
        if (self.isSeen(item)) {
          return;
        }

        if (self.inView.call(self, item)) {
          self.markItem(item);
        };
      });
    },

    inView: function(item) {
      var elementBox = item.getBoundingClientRect();

      return  elementBox.top    >= 0 &&
              elementBox.left   >= 0 &&
              elementBox.bottom <= this.frame.window.innerHeight &&
              elementBox.right  <= this.frame.window.innerWidth &&
              (elementBox.top + this.frame.iframe.offsetTop)    > window.pageYOffset &&
              (elementBox.bottom + this.frame.iframe.offsetTop) < (window.pageYOffset + window.innerHeight)
    },

    markItem: function(item) {
      item.style.webkitTransition = 'opacity 2s, background-color 2s';
      item.style.opacity = '0.9';
      item.style.border = '1px';
      item.style.borderColor = 'black';
      item.style.backgroundColor = '#1ABBE4';
      item.setAttribute('data-status', 'read');
    },

    isSeen: function(item) {
      return item.getAttribute('data-status');
    }
  };

  groovyList.start();

});