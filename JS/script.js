const searchResult = document.getElementById('search-result');
const detailsContainer = document.getElementById('details-container');
// Error Handling 
const error = (id, displayResult) => {
    document.getElementById(id).style.display = displayResult;
}

document.getElementById('search-button').addEventListener('click', function () {
    const searchText = (document.getElementById('search-box').value).toLowerCase();
    if (document.getElementById('search-box').value == '') {
        error('type-error', 'block')
        error('result-error', 'none');
        searchResult.textContent = '';
        detailsContainer.textContent = '';
     
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
            .then((response) => response.json())
            .then((data) => displaySearchResult(data.data))
        document.getElementById('search-box').value = '';
    }
})

// Display Search Result 
const displaySearchResult = (data) => {
    if (data.length == 0) {
        error('type-error', 'none');
        error('result-error', 'block')
        searchResult.textContent = '';
        detailsContainer.textContent = '';
        
    }
    else {
        error('result-error', 'none');
        error('type-error', 'none')

        searchResult.textContent = '';
        detailsContainer.textContent = '';

        const phones = data.slice(0, 20);
        for (const phone of phones) {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="p-2 shadow p-3 bg-body rounded card h-100">
              <img src="${phone.image}" class="card-img-top mt-3 w-50 m-auto" alt="">
          <div class="card-body">
              <h4 class="phone-name">${phone.phone_name}</h4>
              <p class="brand-name">${phone.brand}</p>
          </div>
          <div class="d-grid mx-auto w-75 my-3 ">
            <button onclick="featuresData('${phone.slug}')" type="button" class="btn btn-outline-primary fs-6  fw-bold ">See Features</button>
           </div>
        </div>
        `;
        searchResult.appendChild(div);
    };

    };


}

const featuresData = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id} `;
    fetch(url)
    .then ((responsea) => responsea.json())
    .then ((data) => displayPhoneDetails (data.data));
}

const others = object => {
    if (object == undefined) {
        return 'No results found'
    }
    else {
        let othersDetails = '';
        for (const element in object) {
            const pairStr = element + ':' + object[element] + "  ";
            othersDetails = othersDetails + pairStr;
        }
        return (othersDetails);
    }
}


const sensorNames = sensors => {
    let sensorNames = '';
    for (const sensor of sensors) {
        sensorNames = sensorNames + ', ' + sensor;
    }
    return sensorNames;
}

// Display details or features result 
const displayPhoneDetails = (infos) =>{
    document.getElementById("details-container").innerHTML = `
    <div class="p-2 shadow p-3 bg-body rounded card h-100">
              <img src="${infos.image}" class="card-img-top mt-3 w-25 m-auto" alt="">
          <div class="card-body">
             <h5 class="card-title">Phone Name: ${infos.name} </h5>
             <p class="card-text">Brand: ${infos.brand} </p>
             <p class="card-text">Chipset: ${infos.mainFeatures.chipSet}</p>
             <p class="card-text">Memory: ${infos.mainFeatures.memory}</p>
             <p class="card-text">Display Size: ${infos.mainFeatures.displaySize}</p>
             <p class="card-text">Sensors: ${sensorNames(infos.mainFeatures.sensors)}  </p>
             <p class="card-text">Others: ${others(infos.others)}  </p>
             <p class="card-text">Release Date: ${infos?.releaseDate ?? 'No Release Date Found'}</p>
          </div>
         
    </div>
    `;
}


