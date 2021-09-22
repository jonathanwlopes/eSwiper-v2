export interface ESwiperConfigs {
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
	lazy?: boolean
  spaceBetween?: number
  thumbs?: boolean
  thumbsConfigs?: ThumbsConfigs
}

interface AutoPlayProps {
	delay: number
	disableOnInteraction?: boolean
}

interface ThumbsConfigs extends Partial<ESwiperConfigs> {
	thumbsContainer: string
}