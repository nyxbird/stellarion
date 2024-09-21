let shuffle=(a)=>{
    for(let i = a.length-1; i > 0; --i) {
        r = Math.floor(Math.random()*i);
        [a[r], a[i]] = [a[i], a[r]];
    }
};

let step=(a, b, t)=>{
    return a+(b-a)*(t*t*(3-2*t));
}

let update_raise=(card)=>{
    if(card.active) {
        card.raised = Math.min(1, card.raised+0.25);
    }
    else {
        card.raised = Math.max(0, card.raised-0.25);
    }
};

const colors = {
    bg: "#111",
    alpha: "#88b",
    beta: "#f95",
    gamma: "#bde",
    delta: "#f8e",
    gray: "#333",
    lgray: "#666",
    white: "#fff"
};

const suit_colors = [
    colors.alpha,
    colors.beta,
    colors.gamma,
    colors.delta
];

const states = {
    none: 0,
    ships: 1,
    nebulae: 2,
    stars: 3,
    planets: 4
};

const views = {
    decks: 0,
    viewing: 1,
    picking: 2,
    gazing: 3
};