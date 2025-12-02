const pumpkins = [];
class Pumpkin {
    static array_img = [];
    static Load(array){
        const promises = array.map(link => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = () => {
                    console.warn("Не удалось загрузить изображение:", link);
                    resolve(img); 
                };
                img.src = link;
            });
        });
        return Promise.all(promises).then(imgs => {
            this.array_img = imgs;
            return imgs;
        });
    }

    constructor(horizontal, img){
        this.img = img; 
        this.speed = 30; 
        this.obj_width = 100;
        this.obj_heigth = 100;
        this.x = Math.random() * (horizontal - this.obj_width);
        this.y = 50;
        this._timerId = null;
    }

    draw(ctx){

        if (this.img && this.img.complete && this.img.naturalWidth !== 0) {
            ctx.drawImage(this.img, this.x, this.y, this.obj_width, this.obj_heigth);
        } else {
            ctx.fillStyle = "orange";
            ctx.fillRect(this.x, this.y, this.obj_width, this.obj_heigth);
        }
    }

    fall(ctx, canvas, intervalMs, onRemove){
        this._timerId = setInterval(() => {
            ctx.clearRect(this.x, Math.max(0, this.y - this.speed - 2), this.obj_width, this.obj_heigth + this.speed + 4);
            this.y += this.speed;
            if (this.y > canvas.height - this.obj_heigth) {
                clearInterval(this._timerId);
                this._timerId = null;

                ctx.clearRect(this.x, this.y, this.obj_width, this.obj_heigth);
                if (typeof onRemove === "function") onRemove(this);
                return;
            }
            this.draw(ctx);
        }, intervalMs);
    }

    stopAndClear(ctx){
        if (this._timerId !== null) {
            clearInterval(this._timerId);
            this._timerId = null;
        }
        ctx.clearRect(this.x, Math.max(0, this.y - this.speed - 2), this.obj_width, this.obj_heigth + this.speed + 4);
    }
}