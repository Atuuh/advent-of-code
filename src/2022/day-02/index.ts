export const getIncorrectScoreForRound = (round: [string, string]): number => {
    const [a, b]: [Selection, Selection] = [
        selectionMap[round[0]],
        selectionMap[round[1]],
    ]
    return getScore(b, a)
}

export const getCorrectScoreForRound = ([a, b]: [string, string]): number => {
    const theirSelection = selectionMap[a]
    const desiredOutcome = outcomeMap[b]
    const ourSelection = getSelectionForOutcome(theirSelection, desiredOutcome)

    return getScore(ourSelection, theirSelection)
}

const getScore = (ours: Selection, theirs: Selection): number => {
    const selectionScore = selectionScoreMap[ours]
    if (isDraw(ours, theirs)) {
        return roundResultMap['DRAW'] + selectionScore
    } else if (isWin(ours, theirs)) {
        return roundResultMap['WIN'] + selectionScore
    } else {
        return roundResultMap['LOSS'] + selectionScore
    }
}

const getSelectionForOutcome = (
    theirs: Selection,
    outcome: Result
): Selection => {
    if (outcome === 'DRAW') {
        return theirs
    } else if (outcome === 'LOSS') {
        if (theirs === 'PAPER') {
            return 'ROCK'
        } else if (theirs === 'ROCK') {
            return 'SCISSORS'
        } else {
            return 'PAPER'
        }
    } else {
        if (theirs === 'PAPER') {
            return 'SCISSORS'
        } else if (theirs === 'SCISSORS') {
            return 'ROCK'
        } else {
            return 'PAPER'
        }
    }
}

type Selection = 'ROCK' | 'PAPER' | 'SCISSORS'

const selectionMap: Record<string, Selection> = {
    A: 'ROCK',
    B: 'PAPER',
    C: 'SCISSORS',
    X: 'ROCK',
    Y: 'PAPER',
    Z: 'SCISSORS',
}

const isDraw = (ours: Selection, theirs: Selection) => ours === theirs

const isWin = (ours: Selection, theirs: Selection) =>
    (ours === 'ROCK' && theirs === 'SCISSORS') ||
    (ours === 'SCISSORS' && theirs === 'PAPER') ||
    (ours === 'PAPER' && theirs === 'ROCK')

const selectionScoreMap: Record<Selection, number> = {
    ROCK: 1,
    PAPER: 2,
    SCISSORS: 3,
}

type Result = keyof typeof roundResultMap

const roundResultMap = {
    LOSS: 0,
    DRAW: 3,
    WIN: 6,
}

const outcomeMap: Record<string, Result> = {
    X: 'LOSS',
    Y: 'DRAW',
    Z: 'WIN',
}
