import { scoreYahtzee } from './yahtzee'

describe('Yahtzee', () => {
    describe('pair', () => {
        it('scores as the highest matching pair', () => {
            expect(scoreYahtzee([1, 2, 3, 4, 4]).pair).toBe(8)
            expect(scoreYahtzee([2, 2, 3, 4, 4]).pair).toBe(8)
            expect(scoreYahtzee([2, 2, 5, 5, 5]).pair).toBe(10)
        })

        it('scores 0 for no pairs', () => {
            expect(scoreYahtzee([2, 3, 4, 5, 6]).pair).toBe(0)
        })
    })

    describe('small straight', () => {
        it('scores 20 for large straight', () => {
            expect(scoreYahtzee([1, 2, 3, 4, 5]).smallStraight).toBe(15)
        })
        it('scores 0  for no large straight', () => {
            expect(scoreYahtzee([2, 3, 4, 5, 6]).smallStraight).toBe(0)
            expect(scoreYahtzee([3, 3, 4, 5, 6]).smallStraight).toBe(0)
        })
    })

    describe('large straight', () => {
        it('scores 20 for large straight', () => {
            expect(scoreYahtzee([2, 3, 4, 5, 6]).largeStraight).toBe(20)
        })
        it('scores 0  for no large straight', () => {
            expect(scoreYahtzee([1, 2, 3, 4, 5]).largeStraight).toBe(0)
            expect(scoreYahtzee([3, 3, 4, 5, 6]).largeStraight).toBe(0)
        })
    })

    describe('full house', () => {
        it('scores full house as sum of all dice', () => {
            expect(scoreYahtzee([1, 1, 2, 2, 2]).fullHouse).toBe(8)
            expect(scoreYahtzee([5, 5, 6, 6, 6]).fullHouse).toBe(28)
            expect(scoreYahtzee([2, 2, 4, 4, 4]).fullHouse).toBe(16)
        })
        it('scores 0 for no full house', () => {
            expect(scoreYahtzee([1, 1, 2, 2, 3]).fullHouse).toBe(0)
            expect(scoreYahtzee([1, 5, 6, 6, 6]).fullHouse).toBe(0)
            expect(scoreYahtzee([2, 4, 4, 4, 4]).fullHouse).toBe(0)
        })
    })

    describe('yahtzee', () => {
        it('scores 50 for a yahtzee', () => {
            expect(scoreYahtzee([1, 1, 1, 1, 1]).yahtzee).toBe(50)
            expect(scoreYahtzee([3, 3, 3, 3, 3]).yahtzee).toBe(50)
            expect(scoreYahtzee([6, 6, 6, 6, 6]).yahtzee).toBe(50)
        })
        it('scores 0 for no yahtzee', () => {
            expect(scoreYahtzee([1, 1, 2, 2, 3]).yahtzee).toBe(0)
            expect(scoreYahtzee([1, 5, 6, 6, 6]).yahtzee).toBe(0)
            expect(scoreYahtzee([2, 4, 4, 4, 4]).yahtzee).toBe(0)
        })
    })

    describe('chance', () => {
        it('always scores as the sum of all dice', () => {
            expect(scoreYahtzee([2, 4, 4, 4, 4]).chance).toBe(18)
            expect(scoreYahtzee([1, 2, 3, 4, 5]).chance).toBe(15)
            expect(scoreYahtzee([5, 5, 5, 5, 5]).chance).toBe(25)
            expect(scoreYahtzee([1, 1, 4, 4, 6]).chance).toBe(16)
        })
    })
})
