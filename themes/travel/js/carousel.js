(function (Drupal) {
  Drupal.behaviors.customSlider = {
    attach: function (context) {
      const sliders = once('custom-slider', 'div.testimonial-slider, .js-slider', context);

      sliders.forEach((slider) => {
        const baseClass = slider.classList.contains('testimonial-slider')
          ? 'testimonial-slider'
          : 'slider';

        const wrapper = slider.querySelector(`.${baseClass}__wrapper`);
        const items = Array.from(slider.querySelectorAll(`.${baseClass}__item`));
        const prevBtn = slider.querySelector(`.${baseClass}__arrow--prev`);
        const nextBtn = slider.querySelector(`.${baseClass}__arrow--next`);
        const pagination = slider.querySelector(`.${baseClass}__pagination`);

        if (!wrapper || !items.length || !prevBtn || !nextBtn || !pagination) return;

        // Visible mapping from data-visible
        const visibleMap = slider.dataset.visible
          ? JSON.parse(slider.dataset.visible)
          : { 1280: 3, 1024: 3, 768: 2, 0: 1 };

        let currentIndex = 0;
        let visibleItems = getVisibleItems();
        let totalItems = items.length;

        // totalSteps = number of shifts possible
        let totalSteps = Math.max(0, totalItems - Math.floor(visibleItems));

        pagination.setAttribute('role', 'tablist');
        wrapper.setAttribute('aria-live', 'polite');

        function getVisibleItems() {
          const width = window.innerWidth;
          const keys = Object.keys(visibleMap)
            .map((k) => parseInt(k, 10))
            .sort((a, b) => b - a);
          for (let k of keys) {
            if (width >= k) return visibleMap[k];
          }
          return 1;
        }

        function computeSizes() {
          const wrapperStyle = getComputedStyle(wrapper);
          const gap = parseFloat(wrapperStyle.gap || wrapperStyle.columnGap) || 0;
          const usableWidth =
            wrapper.parentElement.clientWidth ||
            wrapper.parentElement.getBoundingClientRect().width ||
            window.innerWidth;

          const itemWidth =
            visibleItems > 0
              ? Math.max(0, (usableWidth - gap * (visibleItems - 1)) / visibleItems)
              : 0;

          items.forEach((item) => {
            item.style.boxSizing = 'border-box';
            item.style.flex = `0 0 ${itemWidth}px`;
            item.style.width = `${itemWidth}px`;
          });

          slider.style.setProperty(`--${baseClass}-item-width`, `${itemWidth}px`);
          slider.style.setProperty(`--${baseClass}-gap`, `${gap}px`);

          return { gap, itemWidth, itemFull: itemWidth + gap, usableWidth };
        }

        function createDots() {
          pagination.innerHTML = '';
          visibleItems = getVisibleItems();
          totalSteps = Math.max(0, totalItems - Math.floor(visibleItems));

          for (let i = 0; i <= totalSteps; i++) {
            const dot = document.createElement('button');
            dot.className = `${baseClass}__dot`;
            dot.setAttribute('role', 'tab');
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.dataset.index = i;
            if (i === currentIndex) {
              dot.classList.add(`${baseClass}__dot--active`);
              dot.setAttribute('aria-selected', 'true');
              dot.tabIndex = 0;
            } else {
              dot.setAttribute('aria-selected', 'false');
              dot.tabIndex = -1;
            }
            pagination.appendChild(dot);
          }
          addDotEvents();
        }

        function updateButtons() {
          prevBtn.disabled = currentIndex === 0;
          nextBtn.disabled = currentIndex >= totalSteps;
        }

        function updateSlider() {
          const { itemFull } = computeSizes();
          const offset = -(currentIndex * itemFull);
          wrapper.style.transform = `translateX(${offset}px)`;

          const dots = Array.from(pagination.querySelectorAll(`.${baseClass}__dot`));
          dots.forEach((dot, i) => {
            const active = i === currentIndex;
            dot.classList.toggle(`${baseClass}__dot--active`, active);
            dot.setAttribute('aria-selected', active ? 'true' : 'false');
            dot.tabIndex = active ? 0 : -1;
          });

          updateButtons();
        }

        function goNext() {
          if (currentIndex < totalSteps) {
            currentIndex++;
            updateSlider();
            nextBtn.blur();
          }
        }

        function goPrev() {
          if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
            prevBtn.blur();
          }
        }

        function addDotEvents() {
          const dots = Array.from(pagination.querySelectorAll(`.${baseClass}__dot`));
          dots.forEach((dot) => {
            dot.onclick = () => {
              currentIndex = parseInt(dot.dataset.index, 10);
              updateSlider();
              dot.focus();
            };
            dot.onkeydown = (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                currentIndex = parseInt(dot.dataset.index, 10);
                updateSlider();
                dot.focus();
              }
            };
          });
        }

        prevBtn.addEventListener('click', goPrev);
        nextBtn.addEventListener('click', goNext);

        window.addEventListener('resize', () => {
          visibleItems = getVisibleItems();
          totalSteps = Math.max(0, totalItems - Math.floor(visibleItems));
          if (currentIndex > totalSteps) currentIndex = totalSteps;
          createDots();
          requestAnimationFrame(updateSlider);
        });

        // Init
        createDots();
        updateSlider();
        slider.classList.add('is-initialized');
      });
    },
  };
})(Drupal);


