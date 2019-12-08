export const chunk = (array: any[], length: number) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += length) {
        chunks.push(array.slice(i, i + length));
    }
    return chunks;
};

export const transpose = (array: any[][]) =>
    array[0].map((column, index) => array.map(row => row[index]));
