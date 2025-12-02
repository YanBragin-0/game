const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let counter = 0;
const score = document.getElementById("scoreCount");

function update(){
    score.textContent = counter;
}

let speed = 200; 
let delay = 1000; 
const step_speed = 10;
const step_delay = step_speed * 1.2;

function canvas_Size(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
canvas_Size();
window.addEventListener('resize', canvas_Size);
(async () => {

    const arr = [];
    const link_pumpkin = "images/pumpkin.png";
    for (let i = 0; i < 50; ++i) arr.push(link_pumpkin);


    await Pumpkin.Load(arr);
    let i = 0;
    function removePumpkinInstance(instance){
        const idx = pumpkins.indexOf(instance);
        if (idx !== -1) pumpkins.splice(idx, 1);
    }
    function timer_draw(){
        if (i >= Pumpkin.array_img.length){
            return;
        }
        const imageForThis = Pumpkin.array_img[i];
        const element = new Pumpkin(canvas.width, imageForThis);
        pumpkins.push(element);
        element.draw(ctx);
        element.fall(ctx, canvas, speed, removePumpkinInstance);
        if (speed >= 50) speed -= step_speed;
        if (delay >= 400) delay -= step_delay;
        ++i;
        setTimeout(timer_draw, delay);
    }
        
    timer_draw();
})();


canvas.addEventListener('click', (event) => {

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    for (const el of [...pumpkins]) {
        if (x >= el.x && x <= el.x + el.obj_width && y >= el.y && y <= el.y + el.obj_heigth) {
            console.log("Попадание по тыкве:", el.x, el.y);
            el.stopAndClear(ctx);
            const idx = pumpkins.indexOf(el);
            if (idx !== -1) pumpkins.splice(idx, 1);
            ++counter;
            update();
            if (counter == 15) {
                    ctx.fillStyle = "rgba(0,0,0,0.9)";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.fillStyle = "orange";
                    ctx.font = "bold 40px Arial";
                    ctx.textAlign = "center";
                    ctx.fillText("🎃 Вы выиграли, набрав 15 тыкв!", canvas.width/2, canvas.height/2 - 30);
                    ctx.fillText("Закройте страницу пожалуйста(или ждите 100 сек для продолжения) ", canvas.width/2, canvas.height/2 + 30);


                    setTimeout(() => {

                        const end = Date.now() + 100000; 
                        while (Date.now() < end) {
                            
                        }
                    }, 50); 
            }
        }
    }
});






