const parks = [
    {
      id: 1,
      name: "Acadia",
      areaInSquareKm: 198.6,
      location: { state: "Maine" },
    },
    {
      id: 2,
      name: "Canyonlands",
      areaInSquareKm: 1366.2,
      location: { state: "Utah" },
    },
    {
      id: 3,
      name: "Crater Lake",
      areaInSquareKm: 741.5,
      location: { state: "Oregon" },
    },
    {
      id: 4,
      name: "Lake Clark",
      areaInSquareKm: 10602,
      location: { state: "Alaska" },
    },
    {
      id: 5,
      name: "Kenai Fjords",
      areaInSquareKm: 2710,
      location: { state: "Alaska" },
    },
    {
      id: 6,
      name: "Zion",
      areaInSquareKm: 595.9,
      location: { state: "Utah" },
    },
];

const users = {
    "karah.branch3": {
      visited: [1],
      wishlist: [4, 6],
    },
    "dwayne.m55": {
      visited: [2, 5, 1],
      wishlist: [],
    },
    thiagostrong1: {
      visited: [5],
      wishlist: [6, 3, 2],
    },
    "don.kim1990": {
      visited: [6, 2, 3, 4],
      wishlist: [1],
    }
};

function getParksByState(parks, stateInput) {
    return parks.filter((e,i) => {
      const {id, name, areaInSuareKm, location} = e;
      const {state} = location;
      return stateInput === state
    })
}

function getWishlistParksForUser(parks = [], users ={}, username) {
    const targetWishlist = users[username].wishlist;
    return parks.filter((park, index) => {
      const {id, name, areaInSuareKm, location} = park;
      return users[username].wishlist.some(e => e === id)
    })
}

function userHasVisitedAllParksInState(parks, users, stateInput, username) {
    //first create new array with filtered parks by state
    let filteredParkArray = parks.filter((e,i) => {
        const {id, name, areaInSuareKm, location} = e;
        const {state} = location;
        return stateInput === state
    });

    //.map to mutate filtered array into array of just the id's
    let isolatedIDs = filteredParkArray.map(park =>{
        return park.id
    })

    //access array of visited parks. put in new variable
    let visitedParks = users[username].visited;

    //loop through isolated park IDs
    for(let i = 0; i < isolatedIDs.length; i++){
        //if park ID isnt included users' visited parks. false
        if(visitedParks.includes(isolatedIDs[i])===false){
            return false
        }
    }

    //else, true
    return true
}


//2 users, if User A has visited ANY park in userB's wishlist. return true.
//.some method will work here
function userHasVisitedParkOnWishlist(users, userA, userB) {
    //isolate visitedA and wishlistB arrays
    let visitedA = users[userA].visited;
    let wishlistB = users[userB].wishlist;

    //.some method.
    return wishlistB.some(id=>{
        //if userA's visited list includes the value in userB's wishlist. true. else false
        return visitedA.includes(id)
    })
}


//return the users who have visited the parks on the input username's wishlist
function getUsersForUserWishlist(users, inputUsername) {
    //create result array
    let result = [];

    //access user wishlist as an array
    const {wishlist} = users[inputUsername];
    console.log(wishlist)

    //loop through object
    for(let usernames in users){
        //console.log (users[usernames]);
        for(let i = 0; i < inputUsername.length; i++){
            if(users[usernames].visited.includes(wishlist[i])){
                result.push(usernames)
            }
        }
    }

    //return result while eliminating duplicates
    return [...new Set(result)];
}

// do this last one again. need to use array methods


console.log(getUsersForUserWishlist(users, "thiagostrong1"))
