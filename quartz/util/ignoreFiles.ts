import _ from "lodash/fp.js"

export const filterPrivatePages = (pages: string[]) =>
  pages.filter(
    (page) =>
      !page
        .split("/")
        // e.g. _stubs/file.md or _file.md
        .some(_.ary(1, isIgnoredFile)),
  )

export const isIgnoredFile = _.overSome([
  _.startsWith("."),
  _.startsWith("_"),
  _.endsWith(".png"),
  _.endsWith(".jpeg"),
  _.endsWith(".jpg"),
])
