/**
 * Prepare JSON files of content, that are generated by reading JSON files that are created by the
 * CMS. For example, the content of the home page is generated by getting the latest articles.
 */
const dateParse = require('date-fns/parse')
const fse = require('fs-extra')
const globCb = require('glob')
const path = require('path')
const util = require('util')

const glob = util.promisify(globCb)

async function prepareGeneratedContent () {
  try {
    const jsonPaths = getJsonPaths(process.env.NODE_ENV)

    const articles = await getArticles(jsonPaths.articleFolder)

    await prepareHomePages(articles, jsonPaths.homeFolder)
    for (const category of ['MIXES', 'MUSINGS', 'PLAYLISTS']) {
      await prepareCategoryPages(category, articles, jsonPaths.categoryFolder)
    }

    await prepareArticleRelatedData(articles, jsonPaths.articleRelatedFolder)
  } catch (err) {
    console.error('FAILED prepareGeneratedContent', err)
  }
}

/** Get the file/folder paths we need, based on our NODE_ENV */
function getJsonPaths (NODE_ENV) {
  const basePath = path.resolve(
    __dirname,
    '..',
    'public',
    (NODE_ENV === 'production') ? 'cms-content' : 'cms-dev-content'
  )

  return {
    articleFolder: `${basePath}/articles`,
    articleRelatedFolder: `${basePath}/generated/article-related`,
    categoryFolder: `${basePath}/generated/category`,
    homeFolder: `${basePath}/generated/home`
  }
}

/**
 * Return an array with the contents of all articles + the url for each article,
 * sorted from most recent to oldest
 */
async function getArticles (articleFolder) {
  const articlePaths = await glob(`${articleFolder}/**.json`)

  let articles = []
  for (const articlePath of articlePaths) {
    const name = path.parse(articlePath).name

    articles.push({
      ...(await fse.readJson(articlePath)),
      name,
      urlPath: `/article/${name}`
    })
  }

  articles = articles.sort((a, b) => {
    return dateParse(b.publicationDate).getTime() - dateParse(a.publicationDate).getTime()
  })

  return articles
}

/** Prepare the content of the pages that list all the articles, starting at the home page */
async function prepareHomePages (articles, homeFolder) {
  await splitArticlesIntoPages({
    articles,
    ARTICLES_PER_PAGE: 10,
    jsonFolder: homeFolder,
    urlPrefix: '/page/'
  })
}

/** Prepare the content of the category pages by getting all articles for that category */
async function prepareCategoryPages (category, articles, categoryFolder) {
  const categoryArticles = articles.filter(article => article.category === category)

  await splitArticlesIntoPages({
    articles: categoryArticles,
    ARTICLES_PER_PAGE: 10,
    jsonFolder: `${categoryFolder}/${category.toLowerCase()}`,
    urlPrefix: `/category/${category.toLowerCase()}`
  })
}

/**
 * Take an array of articles, and split the contents across multiple JSON files,
 * each representing a different file. Also, set metadata for links between the pages.
 */
async function splitArticlesIntoPages ({ articles, ARTICLES_PER_PAGE, jsonFolder, urlPrefix }) {
  const numPages = Math.ceil(articles.length / ARTICLES_PER_PAGE)

  for (let i = 1; i <= numPages; i++) {
    const startIndex = Math.round(ARTICLES_PER_PAGE * (i - 1))
    const pageArticles = articles.slice(startIndex, startIndex + ARTICLES_PER_PAGE)

    const links = {
      previousPage: (i > 1) ? `${urlPrefix}${i - 1}` : null,
      nextPage: (i < numPages) ? `${urlPrefix}${i + 1}` : null
    }

    const filePath = `${jsonFolder}/${i}.json`
    await fse.outputJson(filePath, { pageArticles, links })
  }
}

/**
 * For each article, save a data file about with content related to that article.
 * This is where we indicate which article is next (if any), and which one precedes it (if any).
 */
async function prepareArticleRelatedData (articles, jsonFolder) {
  for (let i = 0; i < articles.length; i++) {
    const nextArticle = (i > 0)
      ? { title: articles[i - 1].title, urlPath: articles[i - 1].urlPath }
      : null

    const previousArticle = (i + 1 < articles.length)
      ? { title: articles[i + 1].title, urlPath: articles[i + 1].urlPath }
      : null

    const filePath = `${jsonFolder}/${articles[i].name}.json`
    await fse.outputJson(filePath, { nextArticle, previousArticle })
  }
}

module.exports = prepareGeneratedContent
if (require.main === module) module.exports()