import { existsSync } from 'fs'
import { mkdir, writeFile } from 'fs/promises'
import { resolve } from 'path'

const testFile = `describe('{year} - Day {day}', () => {
    describe('Part One', () => {
        test.todo('example should work')
    })

    describe('Part Two', () => {
        test.todo('example should work')
    })
})
`

const solutionFile = `import { parseAndSolve } from '#utils/solve'

const solve = parseAndSolve({year}, {day}, (input) => input)

// Part One
solve(() => 0, 'Part One:')

// Part Two
solve(() => 0, 'Part Two:')
`

const yearArgIndex = process.argv.indexOf('-y')
if (yearArgIndex === -1) {
    console.error('No year arg specified. Example "-y 2022".')
    process.exit(1)
}

const year = Number(process.argv[yearArgIndex + 1])
if (!year || Number.isNaN(year) || year < 2015) {
    console.error(`Invalid year arg specified. Example "-y 2022".`)
    process.exit(1)
}

const dayArgIndex = process.argv.indexOf('-d')
if (dayArgIndex === -1) {
    console.error('No day arg specified. Example "-d 2".')
    process.exit(1)
}

const day = Number(process.argv[dayArgIndex + 1])
if (!day || Number.isNaN(day) || day < 1) {
    console.error(`Invalid day arg specified. Example "-d 2".`)
    process.exit(1)
}

const path = resolve(
    'src',
    year.toString(),
    `day-${day.toString().padStart(2, '0')}`
)

const replacePlaceholderText = (year: number, day: number, fileText: string) =>
    fileText
        .replace(/{year}/g, year.toString())
        .replace(/{day}/g, day.toString())

const writeFiles = async () => {
    await mkdir(path)

    await writeFile(resolve(path, 'index.ts'), '\n')
    await writeFile(resolve(path, 'input.txt'), '\n')
    await writeFile(
        resolve(path, 'solution.ts'),
        replacePlaceholderText(year, day, solutionFile)
    )
    await writeFile(
        resolve(path, 'index.test.ts'),
        replacePlaceholderText(year, day, testFile)
    )
}

if (existsSync(path)) {
    console.error(`Day folder already exists.`)
    process.exit(1)
}

writeFiles()
