const FARBA = {
  WH: window.innerHeight,

  WW: document.documentElement.clientWidth,

  isTouch: 'ontouchstart' in window || navigator.msMaxTouchPoints,

  //lazy load для сторонних либ
  lazyLibraryLoad(scriptSrc, linkHref, callback) {
    let script;
    const domScript = document.querySelector(`script[src="${scriptSrc}"]`);
    const domLink = document.querySelector(`link[href="${linkHref}"]`);

    if (!domScript) {
      script = document.createElement("script");
      script.src = scriptSrc;
      document.querySelector("#wrapper").after(script);
    }

    if (linkHref !== "" && !domLink) {
      let style = document.createElement("link");
      style.href = linkHref;
      style.rel = "stylesheet";
      document.querySelector("link").before(style);
    }

    if (!domScript) {
      script.onload = callback;
    } else {
      domScript.onload = callback;
    }
  }
}

//делаем превьюшки фоток и навешиваем на них события
function buildPreviews(swiper) {
  const imgs = document.querySelectorAll('.benefits-slide-img img')
  const previews = document.querySelector('.benefits-slider-previews')
  if (!imgs.length || !previews) return

  
  document.querySelectorAll('.benefits-slide-img img').forEach((el,index) => {
    const clone = el.cloneNode()
    clone.removeAttribute('class')
    const preview = document.createElement('div')
    preview.className = index === 0 ? 'benefits-slider-preview active' : 'benefits-slider-preview'
    preview.appendChild(clone)
    previews.appendChild(preview)


    preview.addEventListener('click',(e) => {
      e.preventDefault()

      swiper.slideTo(index)
      document.querySelectorAll('.benefits-slider-preview').forEach(item => item.classList.remove('active'))
      preview.classList.add('active')
    })
  })

  
  swiper.on('slideChange', function(inst) {
    const current = inst.activeIndex
    document.querySelectorAll('.benefits-slider-preview').forEach(item => item.classList.remove('active'))
    document.querySelectorAll('.benefits-slider-preview')[current].classList.add('active')
  })
}

const benefitsSwiper = new Swiper('.benefits-slider', {
  autoHeight: true,
  navigation: {
    nextEl: '.benefits-slider-next',
    prevEl: '.benefits-slider-prev',
  },
});

buildPreviews(benefitsSwiper);

(function () {
  if (!document.querySelector('.screen-promo-appeal') || !document.querySelector('.screen-benefits')) return

  document.querySelector('.screen-promo-appeal').addEventListener('click', (e) => {
    e.preventDefault()

    document.querySelector('.screen-benefits').scrollIntoView({behavior: "smooth"})
  })
}());