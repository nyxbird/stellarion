const suits = {
    alpha: 0,
    beta: 1,
    gamma: 2,
    delta: 3
};

const types = {
    ship: 0,
    nebula: 1,
    star: 2,
    planet: 3
};

const kinds = {
    suit: 0,
    type: 1
};

let make_card=(suit, type, deck_kind, deck_num)=>{
    return {
        suit: suit,
        type: type,
        deck_kind: deck_kind,
        deck_num: deck_num,
        raised: 0,
        active: 0
    };
};

let make_deck=(kind, num)=>{
    let cards = [];
    for(let i = 0; i < 4; ++i) {
        for(let j = 0; j < 2; ++j) {
            if(kind == kinds.suit) {
                cards.push(make_card(num, i, kind, num));
            }
            else {
                cards.push(make_card(i, num, kind, num));
            }
        }
    }
    shuffle(cards);
    return {
        kind: kind,
        num: num,
        cards: cards,
        hidden: 0,
        raised: 0,
        active: 0
    };
};