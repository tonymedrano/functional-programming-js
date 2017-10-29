export const getPersons = (data, fn) => {
    let arr = []
    arr.push(JSON.stringify(data))
    arr.forEach((persona) => {
        let p = JSON.parse(persona)
        Object.keys(p).map((index) => {
            p[index].forEach((person) => {
                if (typeof fn === "function")
                    fn(person)
            })
        })
    })
}

//. Print
export const printer = (title, content) => {
    console.log(`---------------- ${title} --------------------`);
    console.log(content);
}

//. Traversing arrays
export const forEach = (array, fn) => {
    for (let i = 0; i < array.length; i++) {
        fn(array[i])
    }
}

//. Traversing objects
export const forEachObject = (obj, fn) => {
    for (let property in obj) {
        if (obj.hasOwnProperty(property)) {
            fn(property, obj[property])
        }
    }
}

//. If false execute the func
export const unless = (predicate, fn) => {
    if (!predicate)
        fn()
}

//. How many times a func is called
export const times = (times, fn) => {
    for (let i = 0; i < times; i++) {
        fn(i)
    }
}

//. To know if they are the same type of data
export const every = (arr, fn) => {
    let result = true
    for (const value of arr)
        result = result && fn(value)
    return result
}

//. To know if there some type of data
export const some = (arr, fn) => {
    let result = false
    for (const value of arr)
        result = result || fn(value)
    return result
}

//. Debugging tap func
export const tap = (value) => (fn) => (typeof(fn) === 'function' && fn(value), console.log(value))

export const sortBy = (property) => {
    return (a, b) => {
        let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0
        return result
    }
}

//. Utility for iterate correctly
export const unary = (fn) => fn.length === 1 ? fn : (arg) => fn(arg)

//. Executed just once
export const once = (fn) => {
    let done = false
    return () => {
        return done ? undefined : ((done = true), fn.apply(this, arguments))
    }
}

//. Memorizes
export const memoized = (fn) => {  
    const lookupTable = {}
    return (arg) => lookupTable[arg] || (lookupTable[arg] = fn(arg))
}