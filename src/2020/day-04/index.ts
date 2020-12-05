export const isPassportValid = (
    passportString: string,
    useValidation = false
): boolean => {
    const fields = mapPassportString(passportString)

    const isValid = useValidation
        ? requiredFields.every((fieldName) => {
              const value = fields.get(fieldName)
              return value === undefined
                  ? false
                  : fieldValidationRules[fieldName](value)
          })
        : requiredFields.every((field) => fields.has(field))

    return isValid
}

const mapPassportString = (passportString: string) => {
    const fields = passportString
        .split(/[\s,\n]/)

        .map((field) => field.trim().split(':') as [string, string])

    return new Map<string, string>(fields)
}

const fourDigitRegex = /^\d{4}$/

const fieldValidationRules = {
    byr: (value: string) => {
        const year = Number(value)
        return fourDigitRegex.test(value) && year >= 1920 && year <= 2002
    },
    iyr: (value: string) => {
        const year = Number(value)
        return fourDigitRegex.test(value) && year >= 2010 && year <= 2020
    },
    eyr: (value: string) => {
        const year = Number(value)
        return fourDigitRegex.test(value) && year >= 2020 && year <= 2030
    },
    hgt: (value: string) => {
        const [heightString, measurement] = value
            .split(/(\d+)/)
            .filter(emptyStringFilter)
        const height = Number(heightString)

        if (measurement === 'cm') return height >= 150 && height <= 193
        else if (measurement === 'in') return height >= 59 && height <= 76
        else return false
    },
    hcl: (value: string) => /^#[0-9a-fA-F]{6}/.test(value),
    ecl: (value: string) =>
        ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value),
    pid: (value: string) => /^\d{9}$/.test(value),
}

const requiredFields = [
    'byr',
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid',
] as const

const emptyStringFilter = (value: string) => value !== ''
