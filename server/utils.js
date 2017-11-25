import fs from 'fs'
import path from 'path'
import log from 'fancy-log'

/**
 * Loads all the modules in the specified folder and
 * attaches them to the passed `state` object.
 *
 * @param {string} folder Folder where look at.
 * @param {object} state Object where save the loaded modules.
 *        Note that the `index.js` file is ignored (there's
 *        where you should use this function) and that you
 *        cannot load a module named `all`, or it will crash.
 *
 * @return {object} Resulting state object.
 */
export const loadDirectoryModules = (folder, state = {}) => {
  // eslint-disable-next-line
  let files = fs.readdirSync(folder)
  files = files.filter((file) => file !== 'index.js' && !file.match(/^[A-Z]/))

  files.forEach((file) => {
    try {
      // eslint-disable-next-line
      const Module = require(path.resolve(folder, file)).default
      // do not load if there's nothing in there
      if (typeof Module === 'undefined') {
        return false
      }
      // Remove the extension to get an internal name
      const moduleId = file.replace(/\.js$/, '')

      state[moduleId] = new Module()
      state.all.push(moduleId)
    } catch (error) {
      log.error(`Error loading module ${path.resolve(folder, file)}`, error)
    }
  })
}

/**
 * Helper method to easily compile
 * callback query data.
 *
 * @param {string} action The action name.
 * @param {string} data The additional data.
 *
 * @return {string} Object stringified.
 */
export const compileCallbackQuery = (action, data) => JSON.stringify({
  // eslint-disable-next-line
  a: action,
  // eslint-disable-next-line
  d: data,
})

/**
 * Converts a stringified callback query object
 * back to a real object again.
 *
 * @param {string} query The stringified object.
 *
 * @return {object} Deconstructed object.
 */
export const parseCallbackQuery = (query) => {
  const data = JSON.parse(query)

  return {
    action: data.a,
    data: data.d,
  }
}

/**
 * Removes array duplicates.
 *
 * @param {array} arr Array to be reduced.
 * @return {array} Resulting array
 * @link https://stackoverflow.com/a/9229821/407456
 */
export const uniq = (arr) => arr.sort().filter((item, pos, ary) =>
  !pos || item !== ary[pos - 1]
)
