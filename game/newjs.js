let img = document.getElementById("img");
let btn = document.getElementById("btn");
const apiGet = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

const getImage = async () => {
    try {
        const response = await fetch(apiGet);
        const data = await response.json();
        console.log(data); 

        const drink = data.drinks[0];
        img.src = drink.strDrinkThumb; 
    } catch (error) {
        console.error("Ошибка при получении данных:", error);
    }
};

btn.addEventListener('click', getImage);