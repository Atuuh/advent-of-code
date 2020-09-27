import { Day } from '#models/solution';
import { sum } from '#utils/array/reducers';

export const DayFourteen: Day = () => {
    const partOne = 0;
    const partTwo = 0;

    return { partOne, partTwo };
};

export const getOreRequired = (reactions: Reaction[]): number => {
    let totalChemicals: Chemical[] = [{ name: 'FUEL', amount: 1 }];

    while (filterOre(totalChemicals).length > 0) {
        const newChemicals = getRequiredChemicals(
            filterOre(totalChemicals),
            reactions
        );
        totalChemicals = newChemicals.concat(filterNotOre(totalChemicals));
    }

    return totalChemicals.map(c => c.amount).reduce(sum);
};

export const filterOre = (array: Chemical[]) =>
    array.filter(c => c.name !== 'ORE');
export const filterNotOre = (array: Chemical[]) =>
    array.filter(c => c.name === 'ORE');

export const getRequiredChemicals = (
    chemicals: Chemical[],
    reactions: Reaction[]
): Chemical[] => {
    return chemicals
        .map(chemical => {
            const reaction = reactions.find(
                r => r.OutputChemical.name === chemical.name
            );
            if (reaction === undefined) return [];
            const reactionAmount = Math.ceil(
                chemical.amount / reaction.OutputChemical.amount
            );
            return reaction.InputChemicals.map<Chemical>(input => ({
                ...input,
                amount: input.amount * reactionAmount,
            }));
        })
        .filter(i => i !== undefined)
        .flat();
};

export interface Chemical {
    name: string;
    amount: number;
}

export interface Reaction {
    InputChemicals: Chemical[];
    OutputChemical: Chemical;
}

export const parseInput = (input: string): Reaction => {
    const [inputs, output] = input.split('=>').map(trim);

    const inputChemicals = inputs
        .split(',')
        .map(trim)
        .map(stringToChemical);
    const outputChemical = stringToChemical(output);

    return {
        InputChemicals: inputChemicals,
        OutputChemical: outputChemical,
    };
};

const stringToChemical = (value: string): Chemical => {
    const [amount, name] = value.split(' ');
    return {
        amount: +amount,
        name,
    };
};

const trim = (value: string) => value.trim();
