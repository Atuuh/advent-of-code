type BootCodeResult = {
    acc: number
    endReason: 'success' | 'loop' | 'out of bounds'
}

export const processBootCode = (input: string): BootCodeResult => {
    const instructions = input.split('\n')

    let index = 0
    let acc = 0
    const previousInstructions: number[] = []

    // eslint-disable-next-line no-constant-condition
    while (true) {
        if (previousInstructions.includes(index))
            return { acc, endReason: 'loop' }
        if (index === instructions.length) return { acc, endReason: 'success' }
        if (index >= instructions.length)
            return { acc, endReason: 'out of bounds' }

        previousInstructions.push(index)

        const [operation, valueString] = instructions[index].trim().split(' ')
        const value = Number.parseInt(valueString)

        switch (operation) {
            case 'nop':
                index += 1
                break
            case 'jmp':
                index += value
                break
            case 'acc':
                acc += value
                index += 1
                break
        }
    }
}

const modifyBootCode = (value: string, index: number, array: string[]) => {
    if (value.startsWith('nop') || value.startsWith('jmp')) {
        const before = array.slice(0, index)
        const after = array.slice(index + 1)
        return [
            [...before, value.replace('nop', 'jmp'), ...after].join('\n'),
            [...before, value.replace('jmp', 'nop'), ...after].join('\n'),
        ]
    }
    return [[...array].join('\n')]
}

export const repairBootCode = (input: string): BootCodeResult => {
    const allPossibleBootCodes = input
        .split('\n')
        .map((line) => line.trim())
        .flatMap(modifyBootCode)

    for (const bootCode of allPossibleBootCodes) {
        const result = processBootCode(bootCode)
        if (result.endReason === 'success') {
            return result
        }
    }

    throw new Error('Never resolved to successful bootcode')
}
