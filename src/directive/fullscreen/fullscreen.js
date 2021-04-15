import {
  addClass,
  hasClass,
  removeClass,
  getScrollBarWidth,
} from '@/utils/index'

const scrollBarWidth = getScrollBarWidth()
let elFull, elWrap

function handleClick() {
  if (hasClass(elWrap, 'content-screenfull')) {
    removeClass(elWrap, 'content-screenfull')
    document.documentElement.style.overflow = ''
    document.body.style.borderRight = ''
    const callback = elWrap._v_fullscreen_normal
    callback && callback() // eslint-disable-line
  } else {
    addClass(elWrap, 'content-screenfull')
    document.documentElement.style.overflow = 'hidden'
    document.body.style.borderRight = scrollBarWidth + 'px solid transparent'
    const callback = elWrap._v_fullscreen_big
    callback && callback() // eslint-disable-line
  }
}

export default {
  mounted(el, binding) {
    elWrap = el
    elFull = document.createElement('i')
    elFull.className = 'el-icon-full-screen absolute-wrap'
    switch (binding.arg) {
      case 'top':
        elFull.style.top = binding.value + 'px'
        addClass(el, 'relative-wrap')
        el.appendChild(elFull)
        elFull.addEventListener('click', handleClick, false)
        break
      case 'big':
        elWrap._v_fullscreen_big = binding.value
        break
      case 'normal':
        elWrap._v_fullscreen_normal = binding.value
        break

      default:
        break
    }
  },
  unmounted() {
    if (!elFull) return
    elFull.removeEventListener('click', handleClick, false)
    elFull = null
  },
}
