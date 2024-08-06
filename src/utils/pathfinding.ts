enum TILE_TYPE {
  NULL = -1,
  FLOOR = 0,
  WALL = 1,
  DOOR = 2,
}

// Initialize the room 2d array
function init_room(size: number): [TILE_TYPE, number][][] {
  const room_arr: [TILE_TYPE, number][][] = new Array(size);

  for (let i = 0; i < size; i++) {
    room_arr[i] = [];

    for (let j = 0; j < size; j++) {
      room_arr[i][j] = [TILE_TYPE.FLOOR, 1];
    }
  }

  // for (let i = 0; i < size; i++) {
  //   console.log(room_arr[i]);
  // }

  return room_arr;
}

let size: number = 5

const room: [TILE_TYPE, number][][] = init_room(size);

console.log(room);




// Initialize path dictionary interface
interface Path_Dict {
  [dest_key: string]: [number, number][]
}
// Function to add a new path to the dictionary (dictionary, key and value), via function interface
const add_new_path = (dict: Path_Dict, dest_key: string, tuple_values: [number, number][]): void => {
  dict[dest_key] = tuple_values
}

//Initilize explore dictionary interface
interface Explore_Dict {
  [dest_key: string]: [number, number]
}
// Function to add a new position (dicitonary, key and value), via function interface
const add_dict = (dict: Explore_Dict, dest_key: string, tuple_value: [number, number] | any): void => {
  dict[dest_key] = tuple_value
}



// Funciton to find a path taking in the tuple of current player location, the room state, and the path dictionary to be filled, given current AP
function find_paths(player_loc: [number, number], room: [TILE_TYPE, number][][], AP: number): Path_Dict { // player_loc is starting coordinate
  let dir: [number, number][] = [
    [0, 1], // Right
    [0, -1], // Left
    [1, 0],  // Down
    [-1, 0], // Up
    [-1, 1], // Up-Right Diagonal
    [-1, -1], // Up-Left Diagonal
    [1, -1], // Down-Left Diagonal
    [1, 1] // Down-Right Diagonal
  ] // (vertical is tuple[0], horizontal is tuple[1])

  let path_dict: Path_Dict = {} // Initialize path dictionary

  let frontier_queue: [number, number][] = [] // Initialize frontier queue
  frontier_queue.push(player_loc) // Push start coordinate to frontier

  let explored: Explore_Dict = {} // Initialize explored dictionary
  add_dict(explored, `[${player_loc[0]}, ${player_loc[1]}]`, null) // Add start coordinate to explored dict
  
  // Explore room
  while (frontier_queue.length > 0) { // While frontier isnt empty
    let current: [number, number] = frontier_queue[0] // Get current from frontier
    frontier_queue.shift() // And pop first element in frontier
    
    // Get neighbors from current
    for (let i = 0; i < dir.length; i++) {
      let a: number = current[0] + dir[i][0] // Row
      let b: number = current[1] + dir[i][1] // Col
      
      // If a and b are valid and within the room space, and isnt in explored, and if its tile type floor
      if (a >= 0 && b >= 0 && a < room[0].length && b < room.length && !explored.hasOwnProperty(`[${a}, ${b}]`) && room[a][b][0] == TILE_TYPE.FLOOR && room[a][b][1] == 1 ) {
        frontier_queue.push([a, b]) // Push [a, b] location to frontier
        add_dict(explored, `[${a}, ${b}]`, current) // Add current to explored
        // console.log(explored)
      }
    }
  }
  // console.log(explored)

  // Find path
  let goal: [number, number][] = [] // Intialize goal coordinates

  // Get goal coordinates
  for (let i = 0; i < room.length; i++) { 
    for (let j = 0; j < room[0].length; j++) {
      if (player_loc[0] == i && player_loc[1] == j) {
        continue
      }
      if (room[i][j][0] == TILE_TYPE.FLOOR && room[i][j][1] == 1) {
        goal.push([i, j])
      }
    }
  }
  // console.log(goal[0][1])

  while (goal.length > 0) { // While goal is not empty
    let current: [number, number] = goal[0] // Set current position as the goal
    let key: [number, number] = goal[0]
    goal.shift() // Pop the first element in goal

    let pathway: [number, number][] = [] // Initialize pathway array
    while (current != player_loc) { // Until we reach back to the beginning
      pathway.push(current) // Push current coordinate to pathway list
      if (current.length > 1) {
        current = explored[`[${current[0]}, ${current[1]}]`]; // Update new current
      }
    }
    pathway.reverse() // Reverse order of path from beginning to goal/end 

    if ((pathway.length/2) <= AP) {
      add_new_path(path_dict, `[${key[0]}, ${key[1]}]`, pathway);
    }

  }

  return path_dict
}

interface AP_dict {
  [key: string]: number
}

function AP_cost (paths: Path_Dict): AP_dict {
  let AP: AP_dict = {}
  
  for (let key in paths) {
    AP[key] = paths[key].length
  }

  return AP
}

let get_path: Path_Dict = find_paths([0,0], room, 3)
let AP: AP_dict = AP_cost(get_path)
console.log(get_path)
console.log(AP)