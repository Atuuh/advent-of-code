import { log } from '#utils/console'
import md5 from 'md5'

const input = `ckczppom`

const generateHash = (value: string) => md5(value)

export const getLowestNumber = (testFn: testFn) => (secret: string): number => {
    let tail = 0
    let hash: string

    do {
        tail = tail + 1
        hash = generateHash(secret + tail)
    } while (!testFn(hash))

    return tail
}

type testFn = (hash: string) => boolean

export const partATest = (hash: string): boolean => hash.startsWith('00000')
const partBTest = (hash: string) => hash.startsWith('000000')

const partA = () => getLowestNumber(partATest)(input)
const partB = () => getLowestNumber(partBTest)(input)

log('Part A', partA())
log('Part B', partB())
