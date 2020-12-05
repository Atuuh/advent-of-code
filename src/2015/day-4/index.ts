import md5 from 'md5'

export const input = `ckczppom`

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
