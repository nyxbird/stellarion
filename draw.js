let canvas, ctx;

let draw=()=>{
    draw_bg();
    draw_voyages();
    draw_decks();
    draw_outpost();
    draw_button();
    switch(view) {
        case views.viewing:
        case views.picking:
            draw_viewer();
            break;
        case views.gazing:
            draw_gazer();
    }
};

let draw_bg=()=>{
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = colors.bg;
    ctx.fill();

    ctx.fillStyle = colors.white;
    for(let s of bgstars) {
        if(s.r >= 1) {
            s.r = 0;
            s.a = Math.random()*2*Math.PI,
            s.s = Math.random() + .5;
        }
        s.r += 0.003*s.s*(1+s.r)*bgspeed*voyagespeed;
        ctx.beginPath();
        draw_circ(bgstar_circ(s));
        ctx.fill();
    }
    bgspeed = Math.max(1, bgspeed*.955);
};

let draw_voyages=()=>{
    for(let s = 0; s < 4; ++s) {
        for(let i = 0; i < 2; ++i) {
            let circ = voyage_circ(s, i);
            ctx.beginPath();
            ctx.fillStyle = (i<voyages[s]?suit_colors[s]:colors.gray);
            draw_circ(circ);
            ctx.fill();

            ctx.fillStyle = colors.bg;
            ctx.font = vfnt+"px \"M PLUS Rounded 1c\"";
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.fillText("ΑΒΓΔ"[s], circ.x, circ.y);
        }
    }
}

let draw_decks=()=>{
    for(let k = 0; k < 2; ++k) {
        for(let n = 0; n < 4; ++n) {
            draw_deck(k, n);
        }
    }
};

let draw_outpost=()=>{
    draw_blank(outpost_rect(0));
    for(let i = 0; i < outpost.length; ++i) {
        update_raise(outpost[i]);
        draw_card(
            outpost[i],
            outraise_rect(outpost_rect(i), outpost[i].raised)
        );
    }
}

let draw_button=()=>{
    // check_raised();
    update_raise(button);

    draw_blank(button_rect());

    let rect = raise_rect(button_rect(), button.raised);
    ctx.fillStyle = button.color;
    ctx.beginPath();
    draw_roundrect(rect, sp*.5);
    ctx.fill();
    ctx.fillStyle = colors.bg;
    ctx.font = bfnt+"px \"M PLUS Rounded 1c\"";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    ctx.fillText(button.text, rect.x+rect.w/2, rect.y+rect.h/2);

    for(let i = 0; i < button.action.count; ++i) {
        ctx.fillStyle = button.color;
        ctx.beginPath();
        draw_circ(raise_circ(count_circ(i, button.action.count), button.raised));
        ctx.fill();
    }
}

let draw_viewer=()=>{
    ctx.beginPath();
    ctx.rect(0, 0, fw, fh);
    ctx.fillStyle = "#0008";
    ctx.fill();
    for(let i = 0; i < viewing.length; ++i) {
        draw_card(viewing[i].card, view_rect(i));
        if(viewing[i].discarded) {
            ctx.beginPath();
            ctx.fillStyle = "#0006";
            draw_roundrect(view_rect(i), sp*.5);
            ctx.fill();
        }
    }
}

let draw_gazer=()=>{
    ctx.beginPath();
    ctx.rect(0, 0, fw, fh);
    ctx.fillStyle = "#0008";
    ctx.fill();
    for(let i = 0; i < 2; ++i) {
        draw_card(viewing[i], gaze_rect(i));
    }
}

let draw_deck=(kind, num)=>{
    draw_blank(deck_rect(kind, num));
    update_raise(decks[kind][num]);
    let rect = raise_rect(deck_rect(kind, num), decks[kind][num].raised);
    if(decks[kind][num].cards.length > 0) {
        if(decks[kind][num].hidden) {
            draw_back(kind, num, rect);
        }
        else {
            draw_card(decks[kind][num].cards[0], rect);
        }
    }
};

let draw_card=(card, rect)=>{
    ctx.beginPath();
    ctx.fillStyle = suit_colors[card.suit];
    draw_roundrect(rect, sp*.5);
    ctx.fill();

    ctx.fillStyle = colors.bg;
    ctx.font = fnt+"px \"M PLUS Rounded 1c\"";
    ctx.textBaseline = "top";
    ctx.textAlign = "left";
    ctx.fillText("ΑΒΓΔ"[card.suit], rect.x+sp*.25, rect.y+sp*.25);
    ctx.textAlign = "right";
    ctx.fillText("▲◆★●"[card.type], rect.x+rect.w-sp*.25, rect.y+sp*.25);
};

let draw_back=(kind, num, rect)=>{
    ctx.beginPath();
    ctx.fillStyle = colors.white;
    draw_roundrect(rect, sp*.5);
    ctx.fill();

    ctx.fillStyle = colors.bg;
    ctx.font = dfnt+"px \"M PLUS Rounded 1c\"";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText(["ΑΒΓΔ", "▲◆★●"][kind][num], rect.x+cw/2, rect.y+ch/2);
}

let draw_blank=(rect)=>{
    ctx.beginPath();
    ctx.fillStyle = colors.gray;
    draw_roundrect(rect, sp*.5);
    ctx.fill();
}

let draw_rect=(r)=>{
    ctx.rect(r.x, r.y, r.w, r.h);
};

let draw_roundrect=(r, rad)=>{
    ctx.roundRect(r.x, r.y, r.w, r.h, rad);
}

let draw_circ=(c)=>{
    ctx.arc(c.x, c.y, c.r, 0, Math.PI*2);
}