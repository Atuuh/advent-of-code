import { log } from '#utils/console'
import md5 from 'md5'

const input = `ckczppom`

const generateHash = (value: string) => md5(value)

export const getLowestNumber = (secret: string): number => {
    let tail = 0
    let hash: string

    do {
        tail = tail + 1
        hash = generateHash(secret + tail)
    } while (!testHash(hash))

    return tail
}

const testHash = (hash: string) => hash.startsWith('00000')

const partA = () => getLowestNumber(input)

log('Part A', partA())
