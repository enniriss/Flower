// Fonction pour obtenir la météo
async function getWeather() {
    const apiUrl = `https://api.weatherbit.io/v2.0/current?lat=48.82642500591707&lon=2.229354452274757&include=alerts&postal_code=92310&country=FR&key=12eb724c74194c0abb3c2aa053922486`;

    const datas = await fetch(apiUrl).then(
        response => {
        return response.json();
    }).then(
        data => {
            const info = {
                'température' : data.data[0].temp,
                'temps' : data.data[0].weather.description
            }
        return  info;
    }); 

    return datas    
}

// Appelle la fonction avec le nom de la ville que tu souhaites

async function changeHTML(coldest, hotest, bloom, bloomConsigne, beforeBloom) {
    const weather = await getWeather();    

    document.getElementById('temperature').textContent = `${weather.température}°C`;
    
    const consignes =  document.getElementById('consignes')

    
    const currentMonth = new Date().getMonth() + 1;
     
    

    if (bloom.includes(currentMonth)) {

        bloomConsigne.forEach(item => {
            const nouvelElement = document.createElement('li');
            nouvelElement.textContent = item;
            consignes.appendChild(nouvelElement);
        });
    } else {
        beforeBloom.forEach(item => {
            const nouvelElement = document.createElement('li');
            nouvelElement.textContent = item;
            consignes.appendChild(nouvelElement);
        });
    }
    const saison = document.getElementById('saison');
    const action = document.getElementById('action');
    // Changer le texte en fonction de la température
    if (weather.température > hotest) {
        action.src = '../assets/arroser.png';

        saison.textContent = "Il faut rafraichir la zone.";

        
    } else if (weather.température < coldest) {

        action.src = '../assets/bache.png';

        saison.textContent = 'Il faut rajouter du paillage ou une bâche.';

    }
     else {
        action.src = '../assets/bloom.png';

        saison.textContent = "Il fait bon.";
    }
    
    // Modifier le contenu en fonction de la description du temps
    if (weather.temps.includes('cloudy')) {
        document.getElementById('description').textContent += " - C'est nuageux.";
    }

}

