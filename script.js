const clavePublica = '044481774e507935fa529cf323114711'; 
const clavePrivada = '4a9e854ce661724d41d3beaa6c3b162b65cf7eec'; 

document.getElementById('fetch-button').onclick = function() {
    const nombrePersonaje = document.getElementById('character-name').value;
    const timestamp = Date.now(); 
    const hash = CryptoJS.MD5(timestamp + clavePrivada + clavePublica).toString(); 

    const url = `https://gateway.marvel.com/v1/public/characters?name=${encodeURIComponent(nombrePersonaje)}&ts=${timestamp}&apikey=${clavePublica}&hash=${hash}`;

    fetch(url)
        .then(respuesta => {
            if (!respuesta.ok) {
                throw new Error('La respuesta de la red no fue correcta');
            }
            return respuesta.json();
        })
        .then(datos => {
            const personaje = datos.data.results[0];
            if (personaje) {
                document.getElementById('character-info').innerHTML = `
                    <h2>${personaje.name}</h2>
                    <p>${personaje.description || 'No hay descripción disponible.'}</p>
                    <img src="${personaje.thumbnail.path}.${personaje.thumbnail.extension}" alt="${personaje.name}">
                `;
            } else {
                document.getElementById('character-info').innerHTML = `<p>Personaje no encontrado.</p>`;
            }
        })
        .catch(error => {
            console.error('Ha habido un problema con la operación fetch:', error);
        });
};
