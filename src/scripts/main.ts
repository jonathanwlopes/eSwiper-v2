import { eSwiper } from './modules/eSwiper/index'

eSwiper({
  swiperContainer: "first__container",
  configs: {
    direction: "horizontal",
    loop: true,
    autoplay: {delay: 2500, disableOnInteraction: true}
    // arrows: true,
    // lazy: true,
    // slidesPerView: 2,
    
  },
})
