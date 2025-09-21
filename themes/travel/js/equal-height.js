(function (Drupal) {
  Drupal.behaviors.equalizeTestimonialCards = {
    attach: function (context, settings) {

      function equalizeSliderItemHeights(wrapperSelector, itemSelector, cardSelector) {
        const wrappers = context.querySelectorAll(wrapperSelector);
        if (!wrappers.length) return;

        wrappers.forEach(wrapper => {
          const items = Array.from(wrapper.querySelectorAll(itemSelector));
          if (!items.length) return;

          // Reset heights first
          items.forEach(item => {
            item.style.height = "auto";
          });

          // Find max card height
          let maxHeight = 0;
          items.forEach(item => {
            const card = item.querySelector(cardSelector);
            if (card) {
              const cardHeight = card.scrollHeight;
              if (cardHeight > maxHeight) maxHeight = cardHeight;
            }
          });

          // Apply max height to all slider items
          items.forEach(item => {
            item.style.height = maxHeight + "px";
          });
        });
      }

      const wrapperSelector = ".testimonial-slider__wrapper";
      const itemSelector = ".testimonial-slider__item";
      const cardSelector = ".testimonial-card";

      // Dynamic once: query all wrappers in context and apply once individually
      const wrappers = context.querySelectorAll(wrapperSelector);
      wrappers.forEach(wrapper => {
        if (!wrapper.hasAttribute('data-equalize')) {
          wrapper.setAttribute('data-equalize', 'true');

          // Wait until slider is fully initialized
          function onSliderInit() {
            const images = wrapper.querySelectorAll('img');
            if (images.length) {
              let loadedCount = 0;
              images.forEach(img => {
                if (img.complete) {
                  loadedCount++;
                } else {
                  img.addEventListener('load', () => {
                    loadedCount++;
                    if (loadedCount === images.length) equalizeSliderItemHeights(wrapperSelector, itemSelector, cardSelector);
                  });
                  img.addEventListener('error', () => {
                    loadedCount++;
                    if (loadedCount === images.length) equalizeSliderItemHeights(wrapperSelector, itemSelector, cardSelector);
                  });
                }
              });
              if (loadedCount === images.length) equalizeSliderItemHeights(wrapperSelector, itemSelector, cardSelector);
            } else {
              equalizeSliderItemHeights(wrapperSelector, itemSelector, cardSelector);
            }
          }

          if (wrapper.classList.contains('is-initialized')) {
            onSliderInit();
          } else {
            const observer = new MutationObserver((mutations, obs) => {
              if (wrapper.classList.contains('is-initialized')) {
                onSliderInit();
                obs.disconnect();
              }
            });
            observer.observe(wrapper, { attributes: true, attributeFilter: ['class'] });
          }

          // Recalculate on window resize
          window.addEventListener('resize', () => {
            equalizeSliderItemHeights(wrapperSelector, itemSelector, cardSelector);
          });
        }
      });
      
      // Initial call for existing wrappers
      equalizeSliderItemHeights(wrapperSelector, itemSelector, cardSelector);
    }
  };
})(Drupal);
