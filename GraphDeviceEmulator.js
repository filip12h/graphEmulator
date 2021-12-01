var graph = {
    nodes: [
    "Adam",
    "Bob",
    "Carrie",
    "Donovan",
    "Edward",
    "Felicity",
    "George",
    "Hannah",
    "Iris",
    "Jerry",
    "Nada",
    "Sindibad"
    ],
    edges: [
        {name: "Adam", lubi: "Felicity"},
        {name: "Adam", lubi: "Hannah"},
        {name: "Adam", lubi: "Bob"},
        {name: "Bob", lubi: "Felicity"},
        {name: "Carrie", lubi: "Nada"},
        {name: "Carrie", lubi: "Donovan"},
        {name: "Edward", lubi: "Felicity"},
        {name: "Edward", lubi: "Carrie"},
        {name: "Felicity", lubi: "Bob"},
        {name: "George", lubi: "Hannah"},
        {name: "George", lubi: "Iris"},
        {name: "George", lubi: "Carrie"},
        {name: "Hannah", lubi: "Adam"},
        {name: "Iris", lubi: "Eddward"},
        {name: "Jerry", lubi: "Bob"},
        {name: "Jerry", lubi: "Donnovan"},
        {name: "Jerry", lubi: "Sindibad"},
        {name: "Nada", lubi: "Sindibad"},
        {name: "Sindibad", lubi: "Nada"},
        {name: "Adam", nepozna: "Nada"},
        {name: "Bob", nepozna: "Carrie"},
        {name: "Carrie", nepozna: "Bob"},
        {name: "Edward", nepozna: "Iris"},
        {name: "Felicity", nepozna: "Sindibad"},
        {name: "George", nepozna: "Jerry"},
        {name: "Hannah", nepozna: "Nada"},
        {name: "Jerry", nepozna: "Felicity"},
        {name: "Sindibad", nepozna: "Felicity"},
    ]
};

function getNeighbors(name, predicate){
    return new Promise((resolve, reject)=> {
        var result = `${name} ${predicate}:\n<ul>`;
        for (var object in graph.edges){
            if (graph.edges[object].name === name && graph.edges[object][predicate]){
                result += `<li>${graph.edges[object][predicate]}</li>`;
            }
        }
        return result+`</ul>`;

        const error = false;
    });
}

document.body.innerHTML += getNeighbors("Adam", "lubi");
document.body.innerHTML += getNeighbors("Carrie", "nepozna");
document.body.innerHTML += getNeighbors("Sindibad", "lubi");

