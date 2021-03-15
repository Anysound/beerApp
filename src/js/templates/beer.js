export const renderBeerTemplate = (beer) => {
  const {id, imageUrl, name, contributedBy,
      firstBrewed, ibu, abv, description} = beer;
  return (`
      <div class="col-md-4 col-sm-6 card border-light" style="width:18rem;">
          <div class="container mt-3">
              <div class="row">
                  <div class="col-md-4"></div>
                  <div class="col-md-4" style="display:flex; align-items: flex-end;">
                      <img src="${imageUrl}" class="card-img-top" alt="${name}" style="width: 70%; height: auto">
                  </div>
                  <div class="col-md-4"></div>
              </div>
          </div>
          <div class="card-body">
              <h5 class="card-title">${name}</h5>
              <ul class="list-group">
                  <li class="list-group-item">Поставщик: ${contributedBy}</li>
                  <li class="list-group-item">Впервые сварено: ${firstBrewed}</li>
                  <li class="list-group-item">Горечь IBU: ${ibu}</li>
                  <li class="list-group-item">Алкоголь ${abv}%</li>
              </ul>
              <h6 class="mt-2">Описание</h6>
              <div class="overflow-auto" style="max-height: 150px">
                  <p class="card-text p-2">${description}</p>
              </div>
              <button data-favorites ="${id}" class="btn btn-block btn btn-secondary">
              ${(!beer.favorites)
                  ?'<i class="far fa-heart"></i>'
                  :'<i class="fas fa-heart"></i>'}
              В избранное</button>
          </div>
      </div>
      `)
};