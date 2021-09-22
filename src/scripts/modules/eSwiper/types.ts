export interface ESwiperConfigs {
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
  thumbs?: boolean
  thumbsContainer?: string
}

interface AutoPlayProps {
	delay: number
	disableOnInteraction?: boolean
}