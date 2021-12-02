type position = {
    horizontal: number
    vertical: number
}

type positionWithAim = position & {
    aim: number
}

const move = (position: position, move: string): position => {
    const [direction, stringAmount] = move.split(' ')
    const amount = Number(stringAmount)

    switch (direction) {
        case 'forward':
            return {
                ...position,
                horizontal: position.horizontal + amount,
            }
        case 'down':
            return {
                ...position,
                vertical: position.vertical + amount,
            }
        case 'up':
            return {
                ...position,
                vertical: position.vertical - amount,
            }
        default:
            throw new Error(`Direction ${direction} makes no sense!`)
    }
}

const moveWithAim = (
    position: positionWithAim,
    move: string
): positionWithAim => {
    const [direction, stringAmount] = move.split(' ')
    const amount = Number(stringAmount)

    switch (direction) {
        case 'forward':
            return {
                ...position,
                horizontal: position.horizontal + amount,
                vertical: position.vertical + position.aim * amount,
            }
        case 'down':
            return {
                ...position,
                aim: position.aim + amount,
            }
        case 'up':
            return {
                ...position,
                aim: position.aim - amount,
            }
        default:
            throw new Error(`Direction ${direction} makes no sense!`)
    }
}

type startingPosition = position & Partial<Pick<positionWithAim, 'aim'>>

const hasAim = (position: startingPosition): position is positionWithAim =>
    position.aim !== undefined

export const getPosition =
    (startingPosition: startingPosition) => (moves: string[]) =>
        hasAim(startingPosition)
            ? moves.reduce(moveWithAim, startingPosition)
            : moves.reduce(move, startingPosition)
