let left_click=(e)=>{
    try {
        switch(view) {
        case views.decks:
            switch(state) {
            case states.none:
                click_decks(e);
                click_outpost(e);
                click_button(e);
                break;
            case states.ships:
            case states.nebulae:
                pick_decks(e);
                reset_click(e);
                break;
            case states.stars:
                gaze_decks(e);
                reset_click(e);
                break;
            case states.planets:
                planet_click(e);
                reset_click(e);
                break;
            }
            break;
        case views.viewing:
            view =  views.decks;
            break;
        case views.picking:
            switch(state) {
            case states.nebulae:
                nebula_click(e);
                break;
            case states.ships:
                ship_click(e);
                break;
            }
            break;
        case views.gazing:
            star_click(e);
            break;
        }
        if(button.action.count == 0) {
            reset_button();
            state = states.none;
        }
    }
    catch(ouch) {
        alert(ouch);
    }
}

let ship_click=(e)=>{
    for(let i = 0; i < viewing.length; ++i) {
        if(in_rect(e.x, e.y, view_rect(i)) && !viewing[i].discarded) {
            let c = viewing[i].card;
            for(let i = 0; i < decks[viewing_kind][viewing_num].cards.length; ++i) {
                let card = decks[viewing_kind][viewing_num].cards[i];
                if(card.suit == c.suit && card.type == c.type) {
                    decks[viewing_kind][viewing_num].cards.splice(i, 1);
                    shuffle(decks[viewing_kind][viewing_num].cards);
                    decks[viewing_kind][viewing_num].cards.splice(0, 0, card);
                    break;
                }
            }
            decks[viewing_kind][viewing_num].hidden = 0;
            --button.action.count;
        }
    }
    view = views.decks;
}

let nebula_click=(e)=>{
    for(let i = 0; i < viewing.length; ++i) {
        if(in_rect(e.x, e.y, view_rect(i)) && viewing[i].discarded) {
            let c = viewing[i].card;
            for(let i = 0; i < discards[viewing_kind][viewing_num].length; ++i) {
                let card = discards[viewing_kind][viewing_num][i];
                if(card.suit == c.suit && card.type == c.type) {
                    discards[viewing_kind][viewing_num].splice(i, 1);
                    decks[viewing_kind][viewing_num].cards.push(card);
                    shuffle(decks[viewing_kind][viewing_num]);
                    break;
                }
            }
            decks[viewing_kind][viewing_num].hidden = 1;
            --button.action.count;
        }
    }
    view = views.decks;
}

let planet_click=(e)=>{
    for(let k = 0; k < 2; ++k) {
        for(let n = 0; n < 4; ++n) {
            if(in_rect(e.x, e.y, deck_rect(k, n)) && decks[k][n].cards.length > 0 && !decks[k][n].hidden) {
                if(outpost.length > 0) {
                    if(decks[k][n].cards[0].suit != outpost[0].suit) {
                        return;
                    }
                }
                for(let i = 0; i < outpost.length; ++i) {
                    if(decks[k][n].cards[0].type == outpost[i].type) {
                        return;
                    }
                }
                outpost.push(
                    decks[k][n].cards.splice(0, 1)[0]
                );
                decks[k][n].hidden = 1;
                --button.action.count;
            }
        }
    }
}

let star_click=(e)=>{
    for(let i = 0; i < 2; ++i) {
        if(in_rect(e.x, e.y, gaze_rect(i))) {
            decks[viewing_kind][viewing_num].cards.splice(0, 0, viewing[i]);
            decks[viewing_kind][viewing_num].cards.push(viewing[1-i]);
            viewing = [];
            decks[viewing_kind][viewing_num].hidden = 0;
            --button.action.count;
            view = views.decks;
        }
    }
}

let reset_click=(e)=>{
    if(in_rect(e.x, e.y, button_rect())) {
        reset_button();
        state = states.none;
    }
}

let right_click=(e)=>{
    view_decks(e);
}

addEventListener("mouseup", (e)=>{
    e.preventDefault();
    if(e.button == 0) {
        left_click(e);
    }
    else if(e.button == 2) {
        right_click(e);
    }
});

let click_decks=(e)=>{
    for(let k = 0; k < 2; ++k) {
        for(let n = 0; n < 4; ++n) {
            if(in_rect(e.x, e.y, deck_rect(k, n))) {
                decks[k][n].active = !decks[k][n].active;
                check_raised();
                break;
            }
        }
    }
}

let click_outpost=(e)=>{
    for(let i = outpost.length - 1; i >= 0; --i) {
        if(in_rect(e.x, e.y, outpost_rect(i))) {
            outpost[i].active = !outpost[i].active;
            check_raised();
            break;
        }
    }
}

let click_button=(e)=>{
    if(in_rect(e.x, e.y, button_rect()) && button.active) {
        button.active = 0;
        for(let k = 0; k < 2; ++k) {
            for(let n = 0; n < 4; ++n) {
                if(decks[k][n].active) {
                    discards[k][n].push(
                        decks[k][n].cards.splice(0, 1)[0]
                    )
                    decks[k][n].active = 0;
                    decks[k][n].hidden = 1;
                }
            }
        }
        for(let i = 0; i < outpost.length; ++i) {
            if(outpost[i].active) {
                let c = outpost.splice(i, 1)[0];
                discards[c.deck_kind][c.deck_num].push(c);
                --i;
            }
        }
        switch(button.action.kind) {
        case kinds.suit:
            ++voyages[button.action.num];
            voyagespeed *= 1.2;
            bgspeed = 12;
            reset_button();
            break;
        case kinds.type:
            switch(button.action.num) {
            case types.ship:
                button.action.count = button.action.major?2:1;
                state = states.ships;
                break;
            case types.nebula:
                button.action.count = button.action.major?2:1;
                state = states.nebulae;
                break;
            case types.star:
                button.action.count = button.action.major?4:2;
                state = states.stars;
                break;
            case types.planet:
                button.action.count = button.action.major?2:1;
                state = states.planets;
                break;
            }
            break;
        }
    }
}

let reset_button=()=>{
    button.color = colors.lgray;
    button.text = "???";
    button.action = {
        kind: -1,
        num: -1,
        major: -1,
        count: 0
    }
    for(let k = 0; k < 2; ++k) {
        for(let n = 0; n < 4; ++n) {
            decks[k][n].hidden = 0;
        }
    }
}

let check_raised=()=>{
    let count = 0;
    let ss = [], ts = [];
    for(let k = 0; k < 2; ++k) {
        for(let n = 0; n < 4; ++n) {
            if(decks[k][n].active && decks[k][n].cards.length > 0) {
                ++count;
                let c = decks[k][n].cards[0];
                if(!ss.includes(c.suit)) ss.push(c.suit);
                if(!ts.includes(c.type)) ts.push(c.type);
            }
        }
    }
    for(let i = 0; i < outpost.length; ++i) {
        if(outpost[i].active) {
            ++count;
            let c = outpost[i];
            if(!ss.includes(c.suit)) ss.push(c.suit);
            if(!ts.includes(c.type)) ts.push(c.type);
        }
    }

    if(count == 2 && ts.length == 1) {
        button.text = ["SHIPS", "NEBULAE", "STARS", "PLANETS"][ts[0]];
        button.color = colors.white;
        button.action = {
            kind: kinds.type,
            num: ts[0],
            major: 0
        };
        if(ss.length == 1) {
            button.text += "!";
            button.color = suit_colors[ss[0]];
            button.action.major = 1;
        }
        button.active = 1;
    }
    else if(count == 4 && ss.length == 1 && ts.length == 4) {
        button.text = "LAUNCH!";
        button.color = suit_colors[ss[0]];
        button.action = {
            kind: kinds.suit,
            num: ss[0]
        };
        button.active = 1;
    }
    else {
        button.text = "???";
        button.color = colors.lgray;
        button.active = 0;
    }
}

let pick_decks=(e)=>{
    for(let k = 0; k < 2; ++k) {
        for(let n = 0; n < 4; ++n) {
            if(in_rect(e.x, e.y, deck_rect(k, n))) {
                view_deck(k, n);
                view = views.picking;
            }
        }
    }
}

let view_decks=(e)=>{
    for(let k = 0; k < 2; ++k) {
        for(let n = 0; n < 4; ++n) {
            if(in_rect(e.x, e.y, deck_rect(k, n))) {
                view_deck(k, n);
                view = views.viewing;
            }
        }
    }
}

let gaze_decks=(e)=>{
    for(let k = 0; k < 2; ++k) {
        for(let n = 0; n < 4; ++n) {
            if(in_rect(e.x, e.y, deck_rect(k, n)) && decks[k][n].cards.length >= 2) {
                gaze_deck(k, n);
                view = views.gazing;
            }
        }
    }
}

let view_deck=(k, n)=>{
    viewing_kind = k; viewing_num = n;
    viewing = [];
    for(let i = 0; i < 4; ++i) {
        let count = 0;
        for(let card of decks[k][n].cards) {
            if([card.type, card.suit][k] == i) {
                ++count;
            }
        }
        for(let c = 0; c < count; ++c) {
            viewing.push({
                card: make_card(
                    k==kinds.suit?n:i,
                    k==kinds.type?n:i,
                    k, n
                ),
                discarded: 0
            });
        }
    }
    for(let i = 0; i < 4; ++i) {
        let count = 0;
        for(let card of discards[k][n]) {
            if([card.type, card.suit][k] == i) {
                ++count;
            }
        }
        for(let c = 0; c < count; ++c) {
            viewing.push({
                card: make_card(
                    k==kinds.suit?n:i,
                    k==kinds.type?n:i,
                    k, n
                ),
                discarded: 1
            });
        }
    }
}

let gaze_deck=(k, n)=>{
    viewing_kind = k; viewing_num = n;
    shuffle(decks[k][n].cards);
    viewing = [];
    viewing.push(decks[k][n].cards.pop());
    viewing.push(decks[k][n].cards.pop());
    decks[k][n].hidden = 1;
}