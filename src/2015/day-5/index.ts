import { log } from '#utils/console'
import { filter, map } from 'fp-ts/lib/Array'
import { pipe } from 'fp-ts/lib/function'
import { input } from './input'

const filterVowels = (letter: string) => 'aeiou'.includes(letter)

type Rule = (input: string) => boolean

const vowelRule: Rule = (input: string) =>
    pipe(
        input,
        (s) => s.split(''),
        filter(filterVowels),
        (vowels) => vowels.length >= 3
    )

const doubleLetterRule: Rule = (input: string) => /([a-z])\1/.test(input)

const excludeStringsRule: Rule = (input: string) => !/ab|cd|pq|xy/.test(input)

const doublePairRule: Rule = (input: string) => /(..).*\1/.test(input)

const repeatedLetterWithGapRule: Rule = (input: string) => /(.).\1/.test(input)

export const partARules: Rule[] = [
    vowelRule,
    doubleLetterRule,
    excludeStringsRule,
]

export const partBRules: Rule[] = [doublePairRule, repeatedLetterWithGapRule]

export const isNiceString = (testFns: ((input: string) => boolean)[]) => (
    input: string
): boolean => testFns.map((fn) => fn(input)).every((result) => result)

const split = (splitParams: string | RegExp) => (value: string) =>
    value.split(splitParams)

const getLength = <T extends unknown>(array: T[]): number => array.length

const partA = () =>
    pipe(
        input,
        split('\n'),
        map(isNiceString(partARules)),
        filter((result) => result),
        getLength
    )

const partB = () =>
    pipe(
        input,
        split('\n'),
        map(isNiceString(partBRules)),
        filter((result) => result),
        getLength
    )

log('Part A', partA())
log('Part ', partB())
