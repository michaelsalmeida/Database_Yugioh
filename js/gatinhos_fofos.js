var abriu = 0;

async function catApi(){
    
    let y = Math.floor(Math.random() * 66)+1
    
    const response = await fetch('https://api.thecatapi.com/v1/breeds?limit=66&page=0')

    const data = await response.json()
 
    let procImg = data[y].reference_image_id
    
    const responseImg = await fetch(`https://api.thecatapi.com/v1/images/search?${procImg}`)
    
    const dataImg = await responseImg.json()
    
    // const imgCat = dataImg.json
    
    let nameCat = data[y].name
    
    let vidaCat = data[y].life_span
    
    let tempCat = data[y].temperament
    

    document.querySelector(".fotoCat").src = dataImg[0].url
    
    document.querySelector(".nameCat").innerHTML = "NOME: " + nameCat
    
    document.querySelector(".vidaCat").innerHTML = "VIDA: " + vidaCat
    
    document.querySelector(".tempCat").innerHTML = "TEMPERAMENTO: " + tempCat
    
}   


function modalGatinhos(){
    if (abriu == 0){
        document.getElementById('modalGatos').style.display = 'flex';
        abriu += 1;
    } else {
        document.getElementById('modalGatos').style.display = 'none';
        abriu -= 1;
    }
    catApi();
}