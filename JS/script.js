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

const displaySearchResult = data => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    data.forEach (phone =>{
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

            <button type="button" class="btn btn-outline-primary fs-6  fw-bold ">See Feature</button>

           </div>
        </div>
        `;
        searchResult.appendChild(div);

    })

}
