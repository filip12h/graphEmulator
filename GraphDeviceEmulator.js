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
        {name: "Jerry", lubi: "Donovan"},
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

var lists = [];
var confirmBtn = document.getElementById("confirm");
var rejectBtn = document.getElementById("reject");
var okBtn = document.getElementById("ok");
var testBtn = document.getElementById("test");

function enableButtons(bool){
    document.getElementById("confirm").disabled = !bool;
    document.getElementById("reject").disabled = !bool;
}
function enableInputs(bool){
    document.getElementById("nodeInput").disabled = !bool;
    document.getElementById("edgeInput").disabled = !bool;
}

okBtn.onclick = () => {
    var node = document.getElementById("nodeInput").value;
    var edge = document.getElementById("edgeInput").value;
    var countNeighbors = 0;
    if (graph.nodes.includes(node)){
        if (edge === ""){
            document.getElementById("message").innerHTML = "the edge is necessary to input";
            enableButtons(false);
            return 0;
        }
        graph.edges.forEach((val) => {
            if (val.name === node || val.lubi === node || val.nepozna === node){
                countNeighbors++;
            }
        })
        enableInputs(false);
        document.getElementById("message").innerHTML = "node info: " + node + " has " + countNeighbors + " neighbors. Do you wish to confirm your action?";    
        enableButtons(true);
    } else {
        document.getElementById("message").innerHTML = "no such node as: " + node;
        enableButtons(false);
        return 0;
    }
}

confirmBtn.onclick = async () => {
    var node = document.getElementById("nodeInput").value;
    var edge = document.getElementById("edgeInput").value;
    await getNeighbors(node, edge);
    showLists();
    enableButtons(false);
    enableInputs(true);
    return true;
}
rejectBtn.onclick = () => {
    enableButtons(false);
    enableInputs(true);
    return false;
}


function showLists(){
    let result = "";
    lists.forEach((statement) => {
        result = `<li>${statement.name} ${statement.predicate}: ${statement.list}</li>` + result;
        // we want newer statements on the top
    });
    document.getElementById("list").innerHTML = result;
}

function getNeighbors(_name, _predicate){
    return new Promise((resolve, reject)=> {
        setTimeout(() => {
            let result = [];
            for (let object in graph.edges){
                if (graph.edges[object].name === _name && graph.edges[object][_predicate]){
                    result.push(graph.edges[object][_predicate])
                }
            }
            if (result.length){
                //lists.push({name: _name, predicate: _predicate, list: result});
                lists.push({name: _name, predicate: _predicate, list: result});
            }
            const error = false;
            if (error){
                reject(console.log("Rejected"));
            } else {
                resolve();
            }
        }, 1); //for testing set 3000 i.e.
    });
    
}

// -------------------------- INTEGRATION TEST ---------------------------------


testBtn.onclick = async () => {
    //test 1
    document.getElementById("testMessage").innerHTML = "";
    lists = [];
    await getNeighbors("Adam", "lubi");
    await getNeighbors("Bob", "nepozna");
    await getNeighbors("Jerry", "lubi");
    if (lists[0].list[0] != "Felicity" || lists[0].list[1] != "Hannah" || lists[0].list[2] != "Bob"
        || lists[1].list[0] != "Carrie"
        || lists[2].list[0] != "Bob" || lists[2].list[1] != "Donovan" || lists[2].list[2] != "Sindibad"){
            document.getElementById("testMessage").innerHTML += "TEST 1: FAILED<br>";
    } else {
        document.getElementById("testMessage").innerHTML += "TEST 1: OK<br>";
    }
    // test 2
    lists = [];
    document.getElementById("nodeInput").value = "Adam";
    document.getElementById("edgeInput").value = "lubi";
    okBtn.click();
    rejectBtn.click();
    if (document.getElementById("message").innerHTML != "node info: Adam has 5 neighbors. Do you wish to confirm your action?"
        || lists.length){
            document.getElementById("testMessage").innerHTML += "TEST 2: FAILED<br>";
        } else {
            document.getElementById("testMessage").innerHTML += "TEST 2: OK<br>";
        }
    // test 3
    getNeighbors("Filip", "nepozna");
    if (lists.length){
        document.getElementById("testMessage").innerHTML += "TEST 3: FAILED<br>";
    } else {
        document.getElementById("testMessage").innerHTML += "TEST 3: OK<br>";
    }
    document.getElementById("nodeInput").value = "";
    document.getElementById("edgeInput").value = "";
    document.getElementById("message").innerHTML = "";
}