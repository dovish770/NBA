"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let pointGuard = document.querySelector(`.PG`);
let pgH3 = document.querySelector(`#PG`);
let shootingGuard = document.querySelector(`.SG`);
let sgH3 = document.querySelector(`#SG`);
let smallForward = document.querySelector(`.SF`);
let sfH3 = document.querySelector(`#SF`);
let powerForward = document.querySelector(`.PF`);
let pfH3 = document.querySelector(`#PF`);
let center = document.querySelector(`.C`);
let cH3 = document.querySelector(`#C`);
const positions = [pointGuard, shootingGuard, smallForward, powerForward, center];
const h3s = [pgH3, sgH3, sfH3, pfH3, cH3];
let threePointsRange = document.querySelector(`#three-points-range`);
let threePointsSpan = document.querySelector(`#three-points-span`);
let fgRange = document.querySelector(`#fg-range`);
let fgSpan = document.querySelector(`#fg-span`);
let totalPointsRange = document.querySelector(`#total-points-range`);
let totalPointsSpan = document.querySelector(`#total-points-span`);
let baseURL = "https://nbaserver-q21u.onrender.com/api/filter";
let form = document.querySelector(`form`);
let selectPlayer = document.querySelector(`#select-player`);
let table = document.querySelector(`table`);
let th = document.querySelector(`#header-table`);
let myTeamPlayers = [];
let playersFromSearch = [];
function submitSearchForm(e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        let request = createRequest();
        let result = yield fetchPlayers(request);
        if (result) {
            playersFromSearch = result;
            showResultsOnTable();
        }
    });
}
function createRequest() {
    let request = {
        position: selectPlayer.value,
        points: parseInt(totalPointsRange.value),
        twoPercent: parseInt(fgRange.value),
        threePercent: parseInt(threePointsRange.value),
    };
    return request;
}
function fetchPlayers(request) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(baseURL, {
            method: 'POST',
            body: JSON.stringify(request),
            headers: { "Content-Type": "application/json", }
        });
        if (!response.ok) {
            console.error(response);
            return null;
        }
        else {
            return yield response.json();
        }
    });
}
function showResultsOnTable() {
    table.innerHTML = "";
    table.append(th);
    playersFromSearch.forEach(player => {
        let newPlayer = createPlayer(player);
        addRow(newPlayer);
    });
}
function addRow(player) {
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
    tdActions.append(createAction(player));
    tr.append(tdPlayer, tdPosition, tdPoints, tdFG, td3P, tdActions, tdActions);
    table.appendChild(tr);
}
function createAction(player) {
    let name = player.Player.split(" ");
    const btnAdd = document.createElement('button');
    btnAdd.innerHTML = `Add ${name[0]} Td Current Team`;
    btnAdd.addEventListener('click', () => addToTeam(player));
    return btnAdd;
}
function addToTeam(player) {
    let pName = document.createElement(`h4`);
    pName.innerText = player.Player;
    let p2P = document.createElement(`p`);
    p2P.innerText = `Three Percent: ${player.ThreeP}%`;
    let p3P = document.createElement(`p`);
    p3P.innerText = `Two Percent: ${player.TwoP}%`;
    let pPoints = document.createElement(`p`);
    pPoints.innerText = `Points: ${player.Points}`;
    let tempDiv = positions.find(div => div.classList[1] == player.Position);
    if (tempDiv) {
        tempDiv.innerHTML = "";
        let tempH3 = h3s.find(h3 => h3.id.toLocaleLowerCase() == player.Position.toLowerCase());
        if (tempH3) {
            console.log(13);
            tempDiv.append(tempH3, pName, p3P, p2P, pPoints);
        }
    }
}
function createPlayer(rawPlayer) {
    let newPlayer = {
        Player: rawPlayer.playerName,
        Points: rawPlayer.points,
        Position: rawPlayer.position,
        TwoP: rawPlayer.twoPercent,
        ThreeP: rawPlayer.threePercent
    };
    return newPlayer;
}
function changeDisplayOfSpanTP() {
    totalPointsSpan.innerText = totalPointsRange.value;
}
function changeDisplayOfSpanFP() {
    fgSpan.innerText = fgRange.value;
}
function changeDisplayOfSpan3P() {
    threePointsSpan.innerText = threePointsRange.value;
}
totalPointsRange.addEventListener(`input`, changeDisplayOfSpanTP);
fgRange.addEventListener(`input`, changeDisplayOfSpanFP);
threePointsRange.addEventListener(`input`, changeDisplayOfSpan3P);
form.addEventListener(`submit`, submitSearchForm);
// function spamUpdate(){
//     console.log(threePointsRange.value)
//     threepointsSpam.innerHTML = threePointsRange.value;
// }
// threePointsRange.addEventListener(`change`, spamUpdate)
