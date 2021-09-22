import { ESwiperConfigs } from './types'
declare const Swiper: any
interface ESwiperProps {
	swiperContainer?: string
	_swiperContainer?: any
	configs: ESwiperConfigs
}

interface ElementProps {
	type: string
	classList: string[]
}

export const eSwiper = ({ swiperContainer, configs }: ESwiperProps) => {
	const _swiperContainer = swiperStructure(swiperContainer, configs)
	eSwiperGenerate({
		_swiperContainer,
		configs
	})
}

export const swiperStructure = (
	swiperContainer: string,
	configs: ESwiperConfigs
) => {
	const { scrollbar, arrows, pagination, lazy } = configs

	const _swiperContainer = document.querySelector(`.${swiperContainer}`)
	_swiperContainer.classList.add('swiper')

	const _wrapperSwiper = Element({ type: 'div', classList: ['swiper-wrapper'] })

	const _slides = [..._swiperContainer.children]
	_slides.forEach((_slide) => {
		_slide.classList.add('swiper-slide')
		_wrapperSwiper.appendChild(_slide)

		if (lazy) {
			const _image = _slide.querySelector('img')
			_image.classList.add('swiper-lazy')
			_image.setAttribute('data-src', _image.src)
			_image.removeAttribute('src')
		}
	})

	_swiperContainer.appendChild(_wrapperSwiper)

	if (scrollbar) {
		const _scrollbar = Element({ type: 'div', classList: ['swiper-scrollbar'] })
		_swiperContainer.appendChild(_scrollbar)
	}

	if (arrows) {
		const _buttonNext = Element({
			type: 'div',
			classList: ['swiper-button-next']
		})
		const _buttonPrev = Element({
			type: 'div',
			classList: ['swiper-button-prev']
		})
		_swiperContainer.appendChild(_buttonNext)
		_swiperContainer.appendChild(_buttonPrev)
	}

	if (pagination) {
		const _pagination = Element({
			type: 'div',
			classList: ['swiper-pagination']
		})
		_swiperContainer.appendChild(_pagination)
	}

	return _swiperContainer
}

export const eSwiperGenerate = ({
	_swiperContainer,
	configs
}: ESwiperProps) => {
	const {
		direction,
		loop,
		arrows,
		dynamicBullets,
		pagination,
		paginationType = 'bullets',
		clickable,
		slidesPerView = 1,
		spaceBetween = 2,
		rows = 1,
		mousewheel,
		autoplay,
		scrollbar,
		lazy,
		thumbs
	} = configs

	let swiper = new Swiper(_swiperContainer, {
		direction: direction,
		loop: loop,
		slidesPerView,
		spaceBetween,
		grid: {
			rows: rows ? rows : '1'
		},
		mousewheel,
		autoplay,
		lazy,

		pagination: {
			el: pagination ? '.swiper-pagination' : '',
			dynamicBullets,
			pagination,
			type: paginationType,
			clickable
		},

		navigation: {
			nextEl: arrows ? '.swiper-button-next' : '',
			prevEl: arrows ? '.swiper-button-prev' : ''
		},

		scrollbar: {
			el: scrollbar ? '.swiper-scrollbar' : ''
		}
	})

	if (thumbs) thumbsGenerate(swiper, configs)
}

export const thumbsGenerate = (swiper: any, configs: ESwiperConfigs) => {
	const { thumbsConfigs, lazy } = configs
	const { slidesPerView, spaceBetween = 2 } = thumbsConfigs

	const _thumbsContainer = thumbsStructure(configs)

	new Swiper(_thumbsContainer, {
		loop: true,
		spaceBetween,
		lazy,
		slidesPerView,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},

		thumbs: {
			swiper
		}
	})
}

export const thumbsStructure = (configs: ESwiperConfigs) => {
	const { thumbsConfigs, lazy } = configs
	const { thumbsContainer } = thumbsConfigs

	const _thumbsContainer = document.querySelector(`.${thumbsContainer}`)
	_thumbsContainer.classList.add('swiper')
	_thumbsContainer.setAttribute('thumbsSlider', '')

	const _wrapperSwiper = Element({ type: 'div', classList: ['swiper-wrapper'] })

	const _slides = [..._thumbsContainer.children]
	_slides.forEach((_slide) => {
		_slide.classList.add('swiper-slide')
		_wrapperSwiper.appendChild(_slide)

		if (lazy) {
			const _image = _slide.querySelector('img')
			_image.classList.add('swiper-lazy')
			_image.setAttribute('data-src', _image.src)
			_image.removeAttribute('src')
		}
	})

	_thumbsContainer.appendChild(_wrapperSwiper)

	return _thumbsContainer
}

export const Element = ({ type, classList }: ElementProps) => {
	const _element = document.createElement(type)
	for (let i = 0; i < classList.length; i++) {
		_element.classList.add(classList[i])
	}
	return _element
}
