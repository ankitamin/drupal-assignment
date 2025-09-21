(function (Drupal) {
  Drupal.behaviors.hamburgerMenu = {
    attach: function (context) {
      const MOBILE_BREAKPOINT = 992; // px
      const hamburgers = context.querySelectorAll('.menu--main__hamburger');

      hamburgers.forEach((hamburger) => {
        if (hamburger.dataset.initialized) return; 
        hamburger.dataset.initialized = true;

        const region = hamburger.closest('.region-primary-menu');
        const menu = region.querySelector('ul.menu');

        if (!menu) return;

        // Function to close menu
        const closeMenu = () => {
          menu.classList.remove('menu--open');
          hamburger.setAttribute('aria-expanded', false);
          document.body.classList.remove('menu-open');
        };

        // Toggle menu on click
        hamburger.addEventListener('click', function () {
          const expanded = this.getAttribute('aria-expanded') === 'true' || false;
          this.setAttribute('aria-expanded', !expanded);
          menu.classList.toggle('menu--open');
          document.body.classList.toggle('menu-open'); // disable/enable scroll
        });

        // Close menu when any link is clicked
        menu.querySelectorAll('a').forEach((link) => {
          link.addEventListener('click', closeMenu);
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
          if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
            closeMenu();
          }
        });

        // Close menu automatically on window resize if switching to desktop
        window.addEventListener('resize', () => {
          if (window.innerWidth > MOBILE_BREAKPOINT) {
            closeMenu();
          }
        });
      });
    },
  };
})(Drupal);
