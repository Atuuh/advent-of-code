import { createDirectoryTree, getAllDirectoriesWithSize } from '.'

describe('2022 - Day 7', () => {
    describe('Part One', () => {
        test('example should work', () => {
            const directoryTree = createDirectoryTree(testInput)
            const directoriesWithSize = getAllDirectoriesWithSize(directoryTree)
            expect(directoriesWithSize['/a/e/']).toBe(584)
            expect(directoriesWithSize['/a/']).toBe(94853)
            expect(directoriesWithSize['/d/']).toBe(24933642)
            expect(directoriesWithSize['/']).toBe(48381165)
        })
    })

    describe('Part Two', () => {
        test.todo('example should work')
    })
})

const testInput = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`
