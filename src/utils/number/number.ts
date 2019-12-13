export const isInRange = (
    target: number,
    min: number,
    max: number,
    { inclusiveStart = true, inclusiveEnd = true } = {}
): boolean => {
    return (
        (target > min && target < max) ||
        (inclusiveStart && target === min) ||
        (inclusiveEnd && target === max)
    );
};

export const getPrimeDecomposition = (value: number): number[] => {
    if (value < 2) return [];

    const primeFactors: number[] = [];

    for (let i = 2; i <= value; i++) {
        while (value % i === 0) {
            primeFactors.push(i);
            value /= i;
        }
    }

    return primeFactors;
};

export const lowestCommonMultiple = (array: number[]): number => {
    const primeFactors = array.map(getPrimeDecomposition);
    const distinctPrimes = [...new Set(primeFactors.flat())];

    return distinctPrimes.reduce((total, prime) => {
        const maxPrimeCount = primeFactors.reduce((acc, value) => {
            const primes = value.filter(p => p === prime);
            return primes.length > acc.length ? primes : acc;
        }, []).length;
        return total * Math.pow(prime, maxPrimeCount);
    }, 1);
};
