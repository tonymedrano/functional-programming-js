import data from "./data.json"
import books from "./addressbook.json"
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

console.log(array.map(unary(String)))

let num = 1
let doPayment = once(() => {
    console.log("Payment is done", num++)
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

console.log(fastFactorial(5))

console.log(arrayUtils.map([1, 2, 3], (x) => x * x))

let addressBook = books.apressBook

arrayUtils.map(addressBook, (book) => {        
    return { title: book.title, author: book.author }
})

forEach(arrayUtils.map(addressBook, (book) => {        
    return { title: book.title, author: book.author }
}), (data) => {
    printer("Apress Book", `${data.title} written by ${data.author}.\n`)
})