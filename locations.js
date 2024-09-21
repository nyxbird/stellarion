let make_rect=(x, y, w, h)=>{
    return {x:x, y:y, w:w, h:h};
};

let in_rect=(x, y, r)=>{
    return x>=r.x&&x<=(r.x+r.w)&&y>=r.y&&y<=(r.y+r.h);
}

let make_circ=(x, y, r)=>{
    return {x:x, y:y, r:r};
}

let fw, fh;
let dxo, dyo;
let cw, ch;
let dsp;
let vxo, vyo, voy;
let osp;
let ris;
let btw, bth;
let bgr;
let vixo, viyo;
let dfnt;

let resize=()=>{
    fw = canvas.width;
    fh = canvas.height;
    ch = fh*.35;
    cw = ch*.65;
    sp = fh*.05;
    
    dyo = fh-2*ch-2*sp;
    dxo = (fw-cw*5-sp*4)/2;
    vyo = dyo/2;
    voy = dyo*.6;
    vxo = (fw-sp*7-voy*7)/2;
    osp = sp*1.5;
    ris = sp/3;
    bth = ch/3;
    btw = cw;

    fnt = sp;
    bfnt = fnt*0.8;
    vfnt = fnt*1.6;
    dfnt = ch*0.4;

    bgr = fw*0.005;

    viyo = (fh-2*ch-sp)/2;
    vixo = (fw-4*cw-3*sp)/2;
};

let voyage_circ=(suit, i)=>make_circ(
    vxo+(voy+sp)*(2*suit+i), vyo,
    voy/2
);

let deck_rect=(kind, num)=>make_rect(
    dxo+num*(cw+sp), dyo+kind*(ch+sp),
    cw, ch
);

let outpost_rect=(i)=>make_rect(
    dxo+4*(cw+sp), dyo+osp*i,
    cw, ch
);

let button_rect=()=>make_rect(
    dxo+4*(cw+sp), dyo+2*ch+sp-bth,
    btw, bth
);

let raise_rect=(r, t)=>make_rect(
    r.x, step(r.y, r.y-ris, t),
    r.w, r.h
);

let raise_circ=(c, t)=>make_circ(
    c.x, step(c.y, c.y-ris, t),
    c.r
)

let outraise_rect=(r, t)=>make_rect(
    step(r.x, r.x+ris, t), r.y,
    r.w, r.h
);

let bgstar_circ=(s)=>make_circ(
    fw/2+Math.cos(s.a)*s.r*Math.sqrt(fw*fw+fh*fh)/2,
    fh/2+Math.sin(s.a)*s.r*Math.sqrt(fw*fw+fh*fh)/2,
    s.s*s.r*bgr
);

let view_rect=(i)=>make_rect(
    vixo+(i%4)*(cw+sp),
    viyo+Math.floor(i/4)*(ch+sp),
    cw, ch
);

let gaze_rect=(i)=>make_rect(
    (fw-3*cw-sp)/2+i*(cw+sp), (fh-ch)/2,
    cw, ch
);

let count_circ=(i, n)=>make_circ(
    dxo+4*(cw+sp)+cw/2+(i-(n-1)/2)*sp*3/4,
    dyo+2*ch+sp-bth-sp/2,
    sp/4
);