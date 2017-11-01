import data from "./data.json"
import books from "./apressbooks.json"
import {
    printer,
    getPersons,
    forEach,
    forEachObject,
    sortBy,
    memoized,
    unless,
    unary,
    times,
    every,
    some,
    tap,
    once
} from './lib/es6-functional'

import { arrayUtils } from './lib/arrayUtils'

//. Data
let array = [1, 2, 3, 4, 5, 6, 7, 8]
let fruit = ['cherries', 'apples', 'bananas']
let object = { a: 1, b: 2 }
let people = [    
    { firstname: "aaFirstName", lastname: "cclastName" },
    { firstname: "ccFirstName", lastname: "aalastName" },     
    { firstname: "bbFirstName", lastname: "bblastName" }
]

//. How to present the data to the user
let dataStructure = (person) => {
    return `${person.nombre} ${person.apellido} es ${person.profesion}. Tiene ${person.edad} años y le gusta ${person.hobbies.join()}.\n`
}

getPersons(data, (p) => {
    printer("Person", dataStructure(p))
})

// forEach(array, (data) => { console.log(2 * data) })

// forEachObject(object, (k, v) => console.log(k + ":" + v))

// forEach(array, (number) => {
//     unless((number % 2), () => {
//         console.log(number, " is even")
//     })
// })

// times(100, (n) => {
//     unless(n % 10, () => {
//         console.log(n, " is even")
//     })
// })

// console.log(every([NaN, NaN, 1], isNaN)) //. All type the same?, no

// console.log(some([2, 2, 2, NaN], isNaN)) //. Any coincidence?, yes

// console.log(fruit.sort())

// console.log(people.sort(sortBy("firstname")))

// tap("fun")((it) => {
//     console.log("value is ", it)
// })

// forEach([1, 2, 3], (a) => tap(a)(() => {
//     console.log(a * 1000)
// }))

printer("Parsing data", array.map(unary(parseInt)))

let num = 1
let doPayment = once(() => {
    printer("Payment is done", num++)

})

doPayment()
doPayment() //. not executed

let fastFactorial = memoized((n) => {
    if (n === 0) {
        return 1
    }  
    //. This is it! Recursion!!  
    return n * fastFactorial(n - 1)
})

printer("Factorial of 5", fastFactorial(5))

//. Map
arrayUtils.map([1, 2, 3], (x) => {
    printer("Mapping array", `${x * x}\n`)
})


arrayUtils.map(books.apressBooks, (book) => {        
    printer("Apress Book", `${book.title} written by ${book.author}.\n`)
})

// console.log(arrayUtils.filter(books.apressBooks, (book) => book.rating[0] > 4.5))

arrayUtils.map(arrayUtils.filter(books.apressBooks, (b) => b.rating[0] > 4.5), (book) => {        
    printer("Apress Book filtered by rating", `${book.title} written by ${book.author} with ${book.rating.join()} of rating. \n`)
})

//zip the results
printer("Reduce func multiplying all values", arrayUtils.reduce(array, (acc, val) => acc * val))

printer("Reduce func summing all values", arrayUtils.reduce(array, (acc, val) => acc + val))

let results = arrayUtils.reduce(books.apressBooks, (acc, bookDetail) => {        
    let goodReviews = bookDetail.reviews[0] != undefined ? bookDetail.reviews[0].good : 0        
    let excellentReviews = bookDetail.reviews[0] != undefined ? bookDetail.reviews[0].excellent : 0        
    return { good: acc.good + goodReviews, excellent: acc.excellent + excellentReviews }
}, { good: 0, excellent: 0 })

printer("Reduce results", results)

let zip = arrayUtils.zip([1, 2, 3, 0], [4, 5, 6, 9], (x, y) => x + y)

printer("Zip results", zip)

let mergedBookDetails = arrayUtils.zip(books.apressBooks, books.reviewDetails, (book, review) => {
    if (book.id === review.id) {
        let clone = Object.assign({}, book)
        clone.ratings = review  
        return clone  
    }
})

printer("Another Zip results", mergedBookDetails)

//. Logger Helper
printer("Logger Helper in action", '')
let log = arrayUtils.loggerHelper
log("ERROR", "Error At Stats.js", "Invalid argument passed", 23)
log("ERROR", "Error At Stats.js", "undefined argument", 223)
log("ERROR", "Error At Stats.js", "curry function is not defined", 3)
log("WARN", "Error At Stats.js", "slice is not defined", 31)

//. Currying 
let autoCurriedAdd = arrayUtils.curry((x, y, z, a) => x + y + z * a)
printer("First Curry results", autoCurriedAdd(2)(2)(5)(9))

printer("Currying in action", arrayUtils.curry((x, y, z) => x * y * z)(1, 2, 3))

let match = arrayUtils.curry((expr, str) => {
    return str.match(expr)
})

let filter = arrayUtils.curry((f, ary) => {  
    return ary.filter(f)
})

let hasNumber = match(/[0-9]+/)
let findNumbersInArray = filter(hasNumber)
printer("Currying in action", findNumbersInArray(["js", "number1"]))

let map = arrayUtils.curry((f, ary) => {  
    return ary.map(f)
})

let squareAll = map((x) => x * x)
printer("Currying square [1,2,3]", squareAll([1, 2, 3]))


const setTimeoutWrapper = (time, fn) => {  
    setTimeout(fn, time);
}

const delayTenMs = arrayUtils.curry(setTimeoutWrapper)(20)
delayTenMs(() => console.log("Do X task"))
delayTenMs(() => console.log("Do Y task"))

const addCurried = x => y => x + y //. => fn => 4 + y

/* const addCurried = (x) => {
    return (y) => {
        return x + y
    }
}*/

console.log("Simple curry: ", addCurried(4)(4))

const add = (x, y) => x + y
const myCurried = fn => a => b => fn(a, b) //.

let myCurriedAdd = myCurried(add)

console.log("My own curry: ", myCurriedAdd(2)(3))

//. Partial
let newDelayTenMs = arrayUtils.partial(setTimeout, undefined, 10)
newDelayTenMs(() => console.log("Do the task"))