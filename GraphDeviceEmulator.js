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

var lists = [
    {name:"Adam", predicate:"lubi", list: ["Felicity", "Hannah", "Bob"]},
    {name:"Jerry", predicate:"nepozna", list: ["Felicity"]}
];

//function pressButton(event) {
//    
//}

function showLists(){
    let result = `<ul>`;
    lists.forEach((statement, index) => {
        result += `<li>${statement.name} ${statement.predicate}: ${statement.list}</li>`;
    });
    document.body.innerHTML += result + `</ul>`;
}

function getNeighbors(_name, _predicate){
    return new Promise((resolve, reject)=> {
        let result = [];
        for (let object in graph.edges){
            if (graph.edges[object].name === _name && graph.edges[object][_predicate]){
                result.push(graph.edges[object][_predicate])
            }
        }
        lists.push({name: _name, predicate: _predicate, list: result})

        const error = false;
        if (error){
            reject("Error")
        } else {
            resolve();
        }
    });
}

//document.body.innerHTML += getNeighbors("Adam", "lubi");
//document.body.innerHTML += getNeighbors("Carrie", "nepozna");
//document.body.innerHTML += getNeighbors("Sindibad", "lubi");

getNeighbors("Felicity", "lubi").then(showLists);

//showLists();
