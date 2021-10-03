import HTMLParser from 'node-html-parser';
import fetch from 'node-fetch'
import fs from 'fs'

const VISITED_LINKS = new Set()
const URL_TO_CHECK = 'http://91.210.252.240/broken-links/'
const VALID_STATUSES = [200, 201, 202, 203, 204, 205, 206, 207, 208, 229]
const POSSIBLE_LINK_TAGS = ['a', 'link', 'script', 'img', 'iframe', 'form']
const POSSIBLE_LINK_ATTRIBUTES = ['href', 'src', 'action']

const VALID_URLS_FILE_NAME = 'validUrls.txt'
const INVALID_URLS_FILE_NAME = 'invalidUrls.txt'
let validUrlsCount = 0
let invalidUrlsCount = 0

function writeValidUrl(validUrl, status) {
  fs.appendFileSync(VALID_URLS_FILE_NAME, validUrl + ' - ' + status + '\n')
  validUrlsCount++
}

function writeInvalidUrl(invalidUrl, status) {
  fs.appendFileSync(INVALID_URLS_FILE_NAME, invalidUrl + ' - ' + status + '\n')
  invalidUrlsCount++
}

async function checkLink(urlToCheck, ignoreProtocol) {
  const checkNestedLinks = !(urlToCheck.startsWith('http') || urlToCheck.startsWith('https') || urlToCheck.startsWith('ftp'))
  if (checkNestedLinks) {
    urlToCheck = URL_TO_CHECK + urlToCheck
  }

  if (VISITED_LINKS.has(urlToCheck)) {
    return
  }

  VISITED_LINKS.add(urlToCheck)
  const response = await fetch(urlToCheck)

  if (!checkNestedLinks && !ignoreProtocol) {
    if (VALID_STATUSES.includes(response.status)) {
      writeValidUrl(urlToCheck, response.status)
    } else {
      writeInvalidUrl(urlToCheck, response.status)
    }
    return
  }

  if (VALID_STATUSES.includes(response.status)) {
    writeValidUrl(urlToCheck, response.status)
    const html = await response.text()
    const document = HTMLParser.parse(html)

    const tags = document.querySelectorAll(POSSIBLE_LINK_TAGS.join(', '))

    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i]
      let urlPath
      POSSIBLE_LINK_ATTRIBUTES.forEach(attr => {
        if (tag.attributes[attr]) {
          urlPath = tag.attributes[attr]
        }
      })
      if (urlPath) {
        await checkLink(urlPath, false)
      }
    }
  } else {
    writeInvalidUrl(urlToCheck, response.status)
  }
}

async function startCheckingPage(url) {
  await checkLink(url, true)
  const date = new Date()
  fs.appendFileSync(VALID_URLS_FILE_NAME,
  `Links count: ${validUrlsCount}
Date: ${date}`)
  fs.appendFileSync(INVALID_URLS_FILE_NAME,
  `Links count: ${invalidUrlsCount}
Date: ${date}`)
}

startCheckingPage(URL_TO_CHECK)