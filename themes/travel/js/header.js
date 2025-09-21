(function (Drupal, once) {
  Drupal.behaviors.deepLinkNavigation = {
    attach: function (context, settings) {
      // Only attach once
      const menuLinks = once('deep-link-menu', '.menu a', context);

      menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();

          const targetId = this.getAttribute('href').substring(1); // Remove #
          const targetElement = document.getElementById(targetId);

          if (targetElement) {
            // Smooth scroll
            targetElement.scrollIntoView({ behavior: 'smooth' });

            // Update URL hash without jumping
            history.pushState(null, null, `#${targetId}`);
          }
        });
      });

      // Optional: scroll to hash on page load if URL has one
      if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };
})(Drupal, once);
