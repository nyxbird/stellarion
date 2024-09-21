addEventListener("load", ()=>{
    canvas = document.getElementById("c");
    ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
    resize();
    main();
});

addEventListener("resize", ()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    resize();
});

let main=(t)=>{
    try {
        draw();
    }
    catch(e) {
        alert(e);
    }
    requestAnimationFrame(main);
}

// let main=()=>draw();