let data = require("./data.json");
let lopp = require('./lib/es6-functional.js');

let personas = [];
personas.push(JSON.stringify(data));

const gestorPersonas = (data, fn) => {
    data.forEach(persona => {
        let p = JSON.parse(persona);
        let tempData;
        Object.keys(p).map(index => {
            tempData = p[index];
            p[index].forEach(person => {
                if (typeof fn === "function") fn(person);
            });
        });
    });
};

gestorPersonas(personas, person => {
    return console.log(`${person.nombre} ${person.apellido} es ${person.profesion}. Tiene ${person.edad}`);
});