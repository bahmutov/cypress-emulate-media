// use Lodash _.camelCase to support both "backgroundColor" and "background-color"
const { camelCase } = Cypress._
export const getComputedProperty = (property) => ($el) =>
  window.getComputedStyle($el[0])[camelCase(property)]
