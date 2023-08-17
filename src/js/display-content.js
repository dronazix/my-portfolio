import {
  code,
  caretBlinking,
  caretUnfocus
} from './code.js'
import {typingEffect} from './typing-effect.js'
import {
  TYPING_EFFECT_DELAY,
  birthdate,
  customStandardObjects
} from './constants.js'

const githubLinks = document.querySelectorAll('.js-github-link')
const emails = document.querySelectorAll('.js-email')
const vkLinks = document.querySelectorAll('.js-vk-link')
const telegramLinks = document.querySelectorAll('.js-tg-link')
const ageList = document.querySelectorAll('.js-age')
const heroCode = document.querySelector('#hero-code')
const skillsCode = document.querySelector('#skills-code')
const lastLineTerminalSkills = document.querySelector('#last-line-terminal-skills')
const skillListItemTemplate = document.querySelector('#skill-list-item-template')
const skillList = document.querySelector('#skill-list .skill-list__list')
const yearList = document.querySelectorAll('.js-year')
const contactCode = document.querySelector('#contact-code')

const REGEX_AGE = /@__%(.*?)%__AGE__%(.*?)%__@/g
const REGEX_SKILLS = /@__%(.*?)%__SKILLS__%(.*?)%__@/g
const REGEX_YEAR = /@__%(.*?)%__YEAR__%(.*?)%__@/g
const REGEX_EMAIL = /@__%(.*?)%__EMAIL__%(.*?)%__@/g
const REGEX_VK = /@__%(.*?)%__VK__%(.*?)%__@/g
const REGEX_TELEGRAM = /@__%(.*?)%__TELEGRAM__%(.*?)%__@/g

function calcAge(date1, date2) {
  date2 = date2 || new Date()

  const difference = date2.getTime() - date1.getTime()

  return Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25))
}

export function displayContent(content) {
  Array.from(githubLinks).forEach(function (github) {
    if (content.github.profile_url === '') {
      github.classList.add('help-link-disabled')
    }

    github.setAttribute('href', content.github.profile_url)
  })

  Array.from(emails).forEach(function (email) {
    email.innerText = content.email
  })

  Array.from(vkLinks).forEach(function (vk) {
    if (content.vk_url === '') {
      vk.classList.add('help-link-disabled')
    }

    vk.setAttribute('href', content.vk_url)
  })

  Array.from(telegramLinks).forEach(function (telegram) {
    if (content.telegram_url === '') {
      telegram.classList.add('help-link-disabled')
    }

    telegram.setAttribute('href', content.telegram_url)
  })

  const years = calcAge(birthdate) || 0

  Array.from(ageList).forEach(function (age) {
    let text = age.textContent || age.innerText

    text = text.replace(REGEX_AGE, (match, p1, p2) => p1 + years + p2)

    age.innerText = text
  })

  content.code_templates.hero = content.code_templates.hero
    .replace(REGEX_AGE, (match, p1, p2) => p1 + years + p2)
    .replace(REGEX_SKILLS, function (match, p1, p2) {
      const skills = content.skills
        .map((skill) => p1 + skill + p2)
        .join(',\n')

      return skills
    })

  code(heroCode)

  heroCode.addEventListener('animationend', function () {
    typingEffect(content.code_templates.hero, TYPING_EFFECT_DELAY, function (str) {
      code(heroCode, str, customStandardObjects)
    }, function () {
      caretBlinking(heroCode)
    })
  })

  code(skillsCode, content.code_templates.skills, customStandardObjects)
  caretUnfocus(skillsCode)

  content.skills.forEach(function (skill) {
    const codeTerminalLine = document.createElement('p')

    codeTerminalLine.classList.add('code__terminal-line')

    codeTerminalLine.innerText = skill

    lastLineTerminalSkills.before(codeTerminalLine)

    const cloneSkillListItemTemplate = skillListItemTemplate.cloneNode(true)

    cloneSkillListItemTemplate.id = ''
    cloneSkillListItemTemplate.style.display = ''

    cloneSkillListItemTemplate.querySelector('.skill-list__text').innerText = skill

    skillList.append(cloneSkillListItemTemplate)
  })

  Array.from(yearList).forEach(function (year) {
    let text = year.textContent || year.innerText

    text = text.replace(REGEX_YEAR, function (match, p1, p2) {
      const currentYear = new Date().getFullYear()

      return p1 + currentYear + p2
    })

    year.innerText = text
  })

  content.code_templates.contact = content.code_templates.contact
    .replace(REGEX_EMAIL, (match, p1, p2) => p1 + content.email + p2)
    .replace(REGEX_VK, (match, p1, p2) => p1 + content.vk_url + p2)
    .replace(REGEX_TELEGRAM, (match, p1, p2) => p1 + content.telegram_url + p2)

  code(contactCode, content.code_templates.contact)
  caretBlinking(contactCode)
}
