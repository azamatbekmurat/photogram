const fetch = require('node-fetch');

export async function print_unicode_message(docUrl) {
    try {
        // Fetch the document data
        const response = await fetch(docUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch data. HTTP status: ${response.status}`);
        }
        const rawData = await response.text();

        // Parse the CSV data
        const gridData = [];
        const rows = rawData.split('\n');
        rows.forEach(row => {
            const [char, x, y] = row.split(',');
            if (char && x && y) {
                gridData.push({ char, x: parseInt(x, 10), y: parseInt(y, 10) });
            }
        });

        // Determine grid dimensions
        const maxX = Math.max(...gridData.map(item => item.x));
        const maxY = Math.max(...gridData.map(item => item.y));

        // Create and populate the grid
        const grid = Array.from({ length: maxY + 1 }, () => Array(maxX + 1).fill(' '));
        gridData.forEach(({ char, x, y }) => {
            grid[y][x] = char;
        });

        // Print the grid
        grid.forEach(row => console.log(row.join('')));
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Example usage
const docUrl = 'https://docs.google.com/document/d/e/2PACX-1vQGUck9HIFCyezsrBSnmENk5ieJuYwpt7YHYEzeNJkIb9OSDdx-ov2nRNReKQyey-cwJOoEKUhLmN9z/pub';
// const temp = print_unicode_message(docUrl);


