//. Returns result in a new array
const map = (array, fn) => {        
    let results = []        
    for (const value of array)                  
        results.push(fn(value))        
    return results
}

const arrayUtils = {
    map: map
}

export { arrayUtils }