import fullscreen from './fullscreen'

const install = function (Vue) {
  Vue.directive('fullscreen', fullscreen)
}

if (window.Vue) {
  window.fullscreen = fullscreen
  Vue.use(install); // eslint-disable-line
}

fullscreen.install = install
export default fullscreen
