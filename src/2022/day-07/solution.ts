import { sum } from '#utils/array/reducers'
import { ascending } from '#utils/array/sorting'
import { parseAndSolve } from '#utils/solve'
import { createDirectoryTree, getAllDirectoriesWithSize } from '.'

const solve = parseAndSolve(2022, 7, (input) => input)

// Part One
solve((input) => {
    const tree = createDirectoryTree(input)
    const directories = getAllDirectoriesWithSize(tree)
    return Object.values(directories)
        .filter((size) => size <= 100000)
        .reduce(sum)
}, 'Part One:')

// Part Two
solve((input) => {
    const tree = createDirectoryTree(input)
    const directories = getAllDirectoriesWithSize(tree)
    const targetSize = 30000000 - (70000000 - directories['/'])
    return Object.values(directories)
        .filter((size) => size >= targetSize)
        .sort(ascending)[0]
}, 'Part Two:')
