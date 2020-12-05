import { log } from '#utils/console'
import { getLowestNumber, input } from '.'

export const partATest = (hash: string): boolean => hash.startsWith('00000')
const partBTest = (hash: string) => hash.startsWith('000000')

const partA = () => getLowestNumber(partATest)(input)
const partB = () => getLowestNumber(partBTest)(input)

log('Part A', partA())
log('Part B', partB())
