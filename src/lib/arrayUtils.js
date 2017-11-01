//. Returns result in a new array
const map = (array, fn) => {        
    let results = []        
    for (const value of array)                  
        results.push(fn(value))        
    return results
}

const filter = (array, fn) => {  
    let results = []  
    for (const value of array)
        (fn(value)) ? results.push(value) : undefined
    return results;
}

const concatarr = (array, fn) => {  
    let results = []  
    for (const value of array)
        results.push.apply(results, value);  
    return results;
}

const reduce = (array, fn, initialValue) => {        
    let accumlator
    if (initialValue != undefined)
        accumlator = initialValue
    else
        accumlator = array[0]

    if (initialValue === undefined)                
        for (let i = 1; i < array.length; i++)
            accumlator = fn(accumlator, array[i])        
    else                
        for (const value of array)
            accumlator = fn(accumlator, value)

    return [accumlator]
}

const zip = (leftArr, rightArr, fn) => {        
    let index, results = []        
    for (index = 0; index < Math.min(leftArr.length, rightArr.length); index++)
        results.push(fn(leftArr[index], rightArr[index]))     
    return results
}

const curry = (fn) => {    
    if (typeof fn !== 'function') {        
        throw Error('No function provided')
    }    
    return function curriedFn(...args) {
        if (args.length < fn.length) {  
            return function() {    
                return curriedFn.apply(null, args.concat([].slice.call(arguments)))
            }
        }
        return fn.apply(null, args);    
    }
}

const loggerHelper = (mode, initialMessage, errorMessage, lineNo) => {        
    if (mode === "DEBUG")
        console.debug(initialMessage, errorMessage + "at line: " + lineNo)        
    else if (mode === "ERROR")
        console.error(initialMessage, errorMessage + "at line: " + lineNo)        
    else if (mode === "WARN")
        console.warn(initialMessage, errorMessage + "at line: " + lineNo)        
    else
        throw "Wrong mode"
}

const partial = function(fn, ...partialArgs) {   //. fn is setTimeout and spreads the rest as partialArgs
    let args = partialArgs   //. partialArgs is now args = [undefined,10] assigned to args (for closures stuff)
        //. newDelayTenMs is this returning function
    return function(...fullArguments) { //. fullArguments now is () => printer("First Partial", "Do Y task")
        let arg = 0 //. counter for args and index for fullArguments
        for (let i = 0; i < args.length && arg < fullArguments.length; i++) {
            if (args[i] === undefined) {  
                args[i] = fullArguments[arg++] //. args is [() => printer("First Partial", "Do Y task"),10]
            }
        }
        return fn.apply(null, args)  // we call setTimeout via fn.apply(null, args)
            // The same stuff as setTimeout(() => console.log("Do other task"), 100)
    }
}

const arrayUtils = {
    map: map,
    filter: filter,
    concatarr: concatarr,
    reduce: reduce,
    zip: zip,
    curry: curry,
    loggerHelper: loggerHelper,
    partial: partial
}

export { arrayUtils }