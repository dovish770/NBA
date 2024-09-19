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
let threePointsRange = document.querySelector(`#three-points-range`);
let threePointsSpan = document.querySelector(`#three-points-span`);
let fgRange = document.querySelector(`#fg-range`);
let fgSpan = document.querySelector(`#fg-span`);
let totalPointsRange = document.querySelector(`#total-points-range`);
let totalPointsSpan = document.querySelector(`#total-points-span`);
let baseURL = "https://nbaserver-q21u.onrender.com/api/filter";
let form = document.querySelector(`form`);
let selectPlayer = document.querySelector(`#select-player`);
function submitSearchForm(e) {
    e.preventDefault();
    let request = createRequest();
    console.log(fetchPlayers(request));
}
function createRequest() {
    let request = {
        position: selectPlayer.value,
        twoPercent: parseInt(fgRange.value),
        threePercent: parseInt(fgRange.value),
        points: parseInt(totalPointsRange.value)
    };
    return request;
}
function fetchPlayers(request) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(baseURL, {
                method: 'POST',
                body: JSON.stringify(request),
                headers: { "Content-Type": "application/json", }
            });
            return response.json();
        }
        catch (error) {
            console.error('Error searching:', error);
        }
    });
}
form.addEventListener(`submit`, submitSearchForm);
// function spamUpdate(){
//     console.log(threePointsRange.value)
//     threepointsSpam.innerHTML = threePointsRange.value;
// }
// threePointsRange.addEventListener(`change`, spamUpdate)
