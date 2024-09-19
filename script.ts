
interface RequestBody{
    position:string,
    twoPercent: Number,
    threePercent: Number,
    points: Number
}

interface Player {
    Position:string,
    Player:string,
    TwoP: string,
    ThreeP: string,
    Points: string
}

let pointGuard = document.querySelector(`.PG`) as HTMLDivElement;
let pgH3 = document.querySelector(`#PG`) as HTMLElement;

let shootingGuard = document.querySelector(`.SG`) as HTMLDivElement;
let sgH3 = document.querySelector(`#SG`) as HTMLElement;

let smallForward = document.querySelector(`.SF`) as HTMLDivElement;
let sfH3 = document.querySelector(`#SF`) as HTMLElement;

let powerForward = document.querySelector(`.PF`) as HTMLDivElement;
let pfH3 = document.querySelector(`#PF`) as HTMLElement;

let center = document.querySelector(`.C`) as HTMLDivElement;
let cH3 = document.querySelector(`#C`) as HTMLElement;

const positions:HTMLDivElement[] = [pointGuard,shootingGuard,smallForward,powerForward,center]
const h3s = [pgH3,sgH3,sfH3,pfH3,cH3]

let threePointsRange = document.querySelector(`#three-points-range`) as HTMLInputElement;
let threePointsSpan = document.querySelector(`#three-points-span`) as HTMLSpanElement;

let fgRange = document.querySelector(`#fg-range`) as HTMLInputElement;
let fgSpan = document.querySelector(`#fg-span`) as HTMLSpanElement;

let totalPointsRange = document.querySelector(`#total-points-range`) as HTMLInputElement;
let totalPointsSpan = document.querySelector(`#total-points-span`) as HTMLSpanElement;

let baseURL:string =  "https://nbaserver-q21u.onrender.com/api/filter";

let form = document.querySelector(`form`) as HTMLFormElement;
let selectPlayer = document.querySelector(`#select-player`) as HTMLSelectElement;
let table = document.querySelector(`table`) as HTMLTableElement;
let th = document.querySelector(`#header-table`) as HTMLElement;

let myTeamPlayers:Player[] = []
let playersFromSearch:any[] = [];


async function submitSearchForm(e:Event){
    e.preventDefault();

    let request:RequestBody = createRequest();
    
    let result = await fetchPlayers(request);
    if(result){
        playersFromSearch = result;
        showResultsOnTable()    
    }  
}

function createRequest():RequestBody{
    let request:RequestBody = {
        position: selectPlayer.value,
        points: parseInt(totalPointsRange.value),
        twoPercent: parseInt(fgRange.value),
        threePercent: parseInt(threePointsRange.value),
    }
    return request;
}

async function fetchPlayers(request:RequestBody) : Promise<Player[] | null>{
    const response = await fetch(baseURL, {
        method: 'POST',
        body: JSON.stringify(request),
        headers:{ "Content-Type": "application/json",}
    })
    if (!response.ok){
        console.error(response);
        return null;
    }
    else{
        return await response.json();
    }
}

function showResultsOnTable(){
    table.innerHTML = "";
    table.append(th);
    playersFromSearch.forEach(player=>{
        let newPlayer:Player = createPlayer(player)
        addRow(newPlayer)
    })
}

function addRow(player:Player){
    let tr = document.createElement('tr');
    
    const tdPlayer = document.createElement('td');
    tdPlayer.innerText = player.Player;

    const tdPosition = document.createElement('td');
    tdPosition.innerText = player.Position;

    const tdPoints = document.createElement('td');
    tdPoints.innerText = player.Points.toString();

    const tdFG = document.createElement('td');
    tdFG.innerText = player.TwoP;
    
    const td3P = document.createElement('td');
    td3P.innerText = player.ThreeP;
    
    const tdActions = document.createElement('td');
    tdActions.append(createAction(player))

    tr.append(tdPlayer, tdPosition, tdPoints, tdFG, td3P, tdActions, tdActions);
    table.appendChild(tr);
}

function createAction(player:Player){
    let name = player.Player.split(" ");
    const btnAdd = document.createElement('button');
    btnAdd.innerHTML = `Add ${name[0]} Td Current Team`;
    btnAdd.addEventListener('click', () => addToTeam(player));
    return btnAdd;
}

function addToTeam(player:Player){
    
    let pName = document.createElement(`h4`);
    pName.innerText = player.Player;

    let p2P = document.createElement(`p`);
    p2P.innerText = `Three Percent: ${player.ThreeP}%`;

    let p3P = document.createElement(`p`);
    p3P.innerText = `Two Percent: ${player.TwoP}%`;

    let pPoints = document.createElement(`p`);
    pPoints.innerText = `Points: ${player.Points}`;
    
    let tempDiv = positions.find(div=> div.classList[1] == player.Position)
    


    if(tempDiv){
        tempDiv.innerHTML = "";
        let tempH3 = h3s.find(h3=>h3.id.toLocaleLowerCase()==player.Position.toLowerCase())
        if(tempH3){
            console.log(13);
            
            tempDiv.append(tempH3,pName, p3P, p2P, pPoints)
        }
    }
}

function createPlayer(rawPlayer:any):Player{
    let newPlayer:Player = {
        Player: rawPlayer.playerName,
        Points: rawPlayer.points,
        Position: rawPlayer.position,
        TwoP: rawPlayer.twoPercent,
        ThreeP: rawPlayer.threePercent
    }
    return newPlayer;
}

function changeDisplayOfSpanTP(){
    totalPointsSpan.innerText = totalPointsRange.value;
}

function changeDisplayOfSpanFP(){
    fgSpan.innerText = fgRange.value;
}

function changeDisplayOfSpan3P(){
    threePointsSpan.innerText = threePointsRange.value;
}


totalPointsRange.addEventListener(`input`, changeDisplayOfSpanTP)
fgRange.addEventListener(`input`, changeDisplayOfSpanFP)
threePointsRange.addEventListener(`input`, changeDisplayOfSpan3P)
form.addEventListener(`submit`, submitSearchForm)


























// function spamUpdate(){
//     console.log(threePointsRange.value)
//     threepointsSpam.innerHTML = threePointsRange.value;
// }

// threePointsRange.addEventListener(`change`, spamUpdate)