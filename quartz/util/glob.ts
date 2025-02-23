import path from "path"
import { FilePath } from "./path"
import { globby } from "globby"
import { filterPrivatePages } from "./ignoreFiles"

export function toPosixPath(fp: string): string {
  return fp.split(path.sep).join("/")
}

export async function glob(
  pattern: string,
  cwd: string,
  ignorePatterns: string[],
): Promise<FilePath[]> {
  const fps = (
    await globby(pattern, {
      cwd,
      ignore: ignorePatterns,
      gitignore: true,
    })
  ).map(toPosixPath)
  const filteredFPs = filterPrivatePages(fps)
  return filteredFPs as FilePath[]
}
