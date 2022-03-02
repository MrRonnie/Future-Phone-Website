const searchPhone = () => {
    
    const searchField = document.getElementById("search-box")
    const searchText = searchField.value;

    // clear data 
    searchField.value = '';


    // load data 
    const url = `
    https://openapi.programming-hero.com/api/phones?search=${searchText}
    `;
    fetch(url)
    .then ((response) => response.json())
    .then ((data) => displaySearchResult(data.data));

}
// Display Search Result 
const displaySearchResult = (data) => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

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

    }

}

const featuresData = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id} `;
    fetch(url)
    .then ((responsea) => responsea.json())
    .then ((data) => displayPhoneDetails (data.data));
}

// Display details or features result 
const displayPhoneDetails = (infos) =>{
    document.getElementById("details-container").innerHTML = `
    <div class="p-2 shadow p-3 bg-body rounded card h-100">
              <img src="${infos.image}" class="card-img-top mt-3 w-50 m-auto" alt="">
          <div class="card-body">
              <h4 class="phone-name">${infos.name}</h4>
              <p class="brand-name">${infos.brand}</p>
          </div>
         
    </div>
    `;
}
