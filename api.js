async function Dog()
{
    try{
        const response = await fetch("https://dog.ceo/api/breeds/image/random");
        const Dogs = await response.json();
        document.getElementById("dog").src = Dogs.message;
    }
    catch(error)
    {
        console.error(error);
    }
}