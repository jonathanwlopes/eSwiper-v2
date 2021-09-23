import { eSwiper } from './modules/eSwiper/index'

eSwiper({
	configs: {
		swiperContainer: 'first__container',
		direction: 'horizontal',
		loop: true,
    arrows: true,
		lazy: true,
		thumbsConfigs: { isActive: true, thumbsContainer: 'first__container--thumbs', direction: 'vertical', slidesPerView: 4, loop: true, arrows: true }
	}
})

/*
direction: 'horizontal' | 'vertical'
loop: boolean
arrows: boolean
scrollbar: boolean
pagination: boolean
dynamicBullets: boolean
paginationType: 'bullets' | 'fraction' | 'progressbar' | 'custom' | undefined
clickable: boolean
slidesPerView: number | 'auto' | undefined
rows: number
mousewheel: boolean
autoplay: boolean | AutoPlayProps
lazy: boolean
spaceBetween: number
thumbsConfigs: { isActive: boolean, thumbsContainer: string, ...configs}
*/
