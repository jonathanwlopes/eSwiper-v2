import { LazyOptions } from 'swiperTypes'

export interface ESwiperConfigs {
	swiperContainer: string
	direction: 'horizontal' | 'vertical'
	loop?: boolean
	arrows?: boolean
	scrollbar?: boolean
	pagination?: boolean
	paginationType?: 'bullets' | 'fraction' | 'progressbar' | 'custom' | undefined
	dynamicBullets?: boolean
	clickable?: boolean
	slidesPerView?: number | 'auto'
	rows?: number
	mousewheel?: boolean
	autoplay?: boolean | AutoPlayProps
	lazy?: boolean | LazyOptions
  spaceBetween?: number
  thumbsConfigs?: ThumbsConfigs
}

interface AutoPlayProps {
	delay: number
	disableOnInteraction?: boolean
}

interface ThumbsConfigs extends Partial<ESwiperConfigs> {
	isActive: boolean
	thumbsContainer: string
}