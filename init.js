let decks;
let discards;
let voyages;
let outpost;
let button;
let screen;

let bgstars;
let bgspeed = 1;
let voyagespeed = 1;
let state, view;
let viewing = [];

let init=()=>{
    decks = [[], []];
    discards = [[], []];
    for(let k = 0; k < 2; ++k) {
        for(let n = 0; n < 4; ++n) {
            decks[k].push(make_deck(k, n));
            discards[k].push([]);
        }
    }
    voyages = [0, 0, 0, 0];
    outpost = [];

    button = {
        text: "???",
        raised: 0,
        active: 0,
        action: {
            kind: -1,
            num: -1,
            major: -1,
            count: 0
        },
        color: colors.lgray
    };

    bgstars = [];
    for(let i = 0; i < 40; ++i) {
        bgstars.push({
            a: Math.random()*Math.PI*2,
            r: Math.random(),
            s: Math.random()+.5
        })
    }

    state = states.none;
    view = views.decks;
};