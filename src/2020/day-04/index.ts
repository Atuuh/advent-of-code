import { input } from './input'

export const isPassportValid = (passportString: string): boolean => {
    const fields = mapPassportString(passportString)

    const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

    return requiredFields.every((field) => fields.has(field))
}

const mapPassportString = (passportString: string) => {
    const fields = passportString
        .split(/[\s,\n]/)

        .map((field) => field.trim().split(':') as [string, string])

    return new Map<string, string>(fields)
}

const partOne = () => {
    const passports = input.split('\n\n')

    return passports.map(isPassportValid).filter((valid) => valid === true)
        .length
}

console.log('Part One:', partOne())
