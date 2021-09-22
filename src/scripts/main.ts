import { eSwiper } from './modules/eSwiper/index'

eSwiper({
	swiperContainer: 'first__container',
	configs: {
		direction: 'horizontal',
		loop: true,
    arrows: true,
		thumbs: true,
		thumbsConfigs: { thumbsContainer: 'first__container--thumbs', slidesPerView: 4 }
	}
})

/*
direction: 'horizontal' | 'vertical'
loop?: boolean
arrows?: boolean
scrollbar?: boolean
pagination?: boolean
dynamicBullets?: boolean
paginationType?: 'bullets' | 'fraction' | 'progressbar' | 'custom' | undefined
clickable?: boolean
slidesPerView?: number | 'auto' | undefined
rows?: number
mousewheel?: boolean
autoplay?: boolean | AutoPlayProps
lazy?: boolean
spaceBetween?: number
thumbs: boolean
thumbsConfigs: {container: string}
*/
