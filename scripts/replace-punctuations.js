import { recurLot }                   from '@iohub/iter'
import { exists }                     from '@iohub/pathinfo'
import { promptDirs, promptDocs }     from '@iohub/prompt'
import { decoPath, Fades }            from '@spare/deco-path'
import { says }                       from '@spare/logger'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join }                       from 'node:path'
import { convPuncs, convSigns }       from './utils/string-utils.js'

const UTF8 = { encoding: 'utf-8' }
async function modifyFile(source, target) {
  const fades = this
  try {
    const prev = await readFile(source, UTF8)
    let next = convPuncs(prev)
    next = convSigns(next)
    if (prev === next) return void (fades.deco(source))
    await writeFile(target ?? source, next, UTF8)
    console.log(`modified → ${fades.deco(source)}`)
  } catch (error) {
    console.error(`error processing ${source}:`, error)
  }
}

/**
 * Main function to listDeps the script.
 * @param {string} [source=process.cwd()] - The root directory to start the search.
 */
async function recurMod(source) {
  // const jsFiles = await findJsFiles(source)
  const CONF = {
    excl: [ '.idea', '.git', 'scripts', 'node_modules', 'dist' ],
    dir(x) { return !CONF.excl.includes(x) },
    doc(x) { return /\.md$/.test(x) },
  }
  for await (const items of recurLot.call(CONF, source)) {
    const fades = Fades.build(items.length)
    says.folder(decoPath(items.dir))
    for (const item of items) {
      await modifyFile.call(fades, item)
    }
  }
}


// if branch not defined, search files under base, traverse folder (as branch) under base
// if branch defined, mkdir branch if not exists, search files under base/branch, traverse folder (as deeper branch) under base/branch
async function recurAmend(base, dest, branch) {
  const record = this ?? []
  const curr = branch ? join(base, branch) : base
  const next = branch ? join(dest, branch) : dest
  let files, fades
  if (base && dest && branch) { // if branch is defined, copy a branch from base to dest
    const tar = join(dest, branch)
    if (!await exists(tar)) await mkdir(tar) // says.mkdir(`created ${acPath(tar)}\\src`)
  }
  if ((files = await promptDocs(curr))?.length && (fades = Fades.build(files.length))) {
    says.folder(decoPath(curr))
    for (const file of files) {
      await modifyFile.call(fades, join(curr, file), join(next, file))
    }
  }
  for (const folder of (await promptDirs(curr))) {
    await recurAmend.call(record, base, dest, branch ? join(branch, folder) : folder)
  }
  return record
}

// Run the script
await recurAmend(process.cwd(), process.cwd()) // join(process.cwd())