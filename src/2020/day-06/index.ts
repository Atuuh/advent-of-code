export const getGroupAnswers = (
    groupResponses: string,
    filter: 'everyone' | 'anyone' = 'anyone'
): string[] =>
    filter === 'anyone'
        ? groupResponses.replace(/\n/g, '').split('').filter(arrayUnique)
        : groupResponses
              .split('\n')
              .map((answer) => answer.split(''))
              .reduce((acc, current) =>
                  acc.filter((value) => current.includes(value))
              )

const arrayUnique = <T extends unknown>(value: T, index: number, array: T[]) =>
    array.indexOf(value) === index
