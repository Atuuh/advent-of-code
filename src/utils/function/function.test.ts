import { repeat } from './function'

describe('Utils | Function', () => {
    describe('repeat', () => {
        test('should concat strings the correct amount of times', () => {
            expect(repeat(5)((str: string) => str.concat('b'))('a')).toBe(
                'abbbbb'
            )
        })

        test('should multiply the correct amount of times', () => {
            expect(repeat(8)((value: number) => value * 2)(2)).toBe(512)
        })
    })
})
