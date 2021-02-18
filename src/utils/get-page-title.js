import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Vue Element-plus Admin'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
