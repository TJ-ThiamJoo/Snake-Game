const GRID_SIZE = 21;

// random XY position in the grid.
export function randomGridPosition(){
    return {
        x: Math.floor(Math.random() * GRID_SIZE) + 1,
        y: Math.floor(Math.random() * GRID_SIZE) + 1
    }
}

// Check for the position of snake head is over the minimum or maximum of grid size.
export function outsideGrid(position){
    return (
        position.x < 1 || position.x > GRID_SIZE || 
        position.y < 1 || position.y > GRID_SIZE
    );
}