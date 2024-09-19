interface Player {
    Player:string,
    TwoP: string,
    ThreeP: string,
    Points:number
}

interface RequestBody{
    position:string,
    twoPercent: Number,
    threePercent: Number,
    points: Number
}

let threePointsRange = document.querySelector(`#three-points-range`) as HTMLInputElement;
let threePointsSpan = document.querySelector(`#three-points-span`) as HTMLSpanElement;

let fgRange = document.querySelector(`#fg-range`) as HTMLInputElement;
let fgSpan = document.querySelector(`#fg-span`) as HTMLSpanElement;

let totalPointsRange = document.querySelector(`#total-points-range`) as HTMLInputElement;
let totalPointsSpan = document.querySelector(`#total-points-span`) as HTMLSpanElement;

let baseURL:string =  "https://nbaserver-q21u.onrender.com/api/filter";

let form = document.querySelector(`form`) as HTMLFormElement;
let selectPlayer = document.querySelector(`#select-player`) as HTMLSelectElement;

function submitSearchForm(e:Event){
    e.preventDefault();

    let request:RequestBody = createRequest();
    console.log(fetchPlayers(request));
     
    
}

function createRequest():RequestBody{
    let request:RequestBody = {
        position: selectPlayer.value,
        twoPercent: parseInt(fgRange.value),
        threePercent: parseInt(fgRange.value),
        points: parseInt(totalPointsRange.value)
    }
    return request;
}

async function fetchPlayers(request:RequestBody){
    try {
        const response = await fetch(baseURL, {
            method: 'POST',
            body: JSON.stringify(request),
            headers:{ "Content-Type": "application/json",}
        }) 

        return response.json();
    } catch (error) {
        console.error('Error searching:', error);
    }   
}


form.addEventListener(`submit`, submitSearchForm)


























// function spamUpdate(){
//     console.log(threePointsRange.value)
//     threepointsSpam.innerHTML = threePointsRange.value;
// }

// threePointsRange.addEventListener(`change`, spamUpdate)