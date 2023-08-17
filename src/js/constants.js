export const CONTENT_URL = 'content.json'
export const API_URL = 'https://api.github.com'
export const MANIFEST_FILE_NAME = 'portfolio-manifest.json'
export const DELAY_AFTER_PRELOADER = 2000
export const TYPING_EFFECT_DELAY = 40
export const INIT_NUMBER_WORK_CARDS = 6
export const MAX_REQUEST_ATTEMPTS = 10
export const REQUEST_DELAY = 1500

export const birthdate = new Date(2002, 1, 1)
export const customStandardObjects = ['I']

export const defaultContent = {
  github: {
    username: '',
    profile_url: ''
  },
  email: 'email@email.com',
  vk_url: '',
  telegram_url: '',
  code_templates: {
    hero: '',
    skills: '',
    contact: ''
  },
  skills: []
}

export const defaultManifest = {
  name: 'Название отсутствует',
  description: 'Описание отсутствует',
  pin: 0,
  image_url: '',
  website_url: '',
  github_url: '',
  tags: []
}
