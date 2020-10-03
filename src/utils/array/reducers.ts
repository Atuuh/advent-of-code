export const min = (acc: number, next: number): number =>
    next < acc ? next : acc

export const max = (acc: number, next: number): number =>
    next > acc ? next : acc

export const sum = (acc: number, next: number): number => acc + next

export const multiply = (acc: number, next: number): number => acc * next
