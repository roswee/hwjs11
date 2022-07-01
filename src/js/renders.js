function renderGallery(data) {
    const markup = data
    .map(({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
    `<div class="photo-card">
    <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
    <div class="info">
      <p class="info-item">
        <b>Likes</b><span class="info-data">${likes}</span>
      </p>
      <p class="info-item">
        <b>Views</b><span class="info-data">${views}</span>
      </p>
      <p class="info-item">
        <b>Comments</b><span class="info-data">${comments}</span>
      </p>
      <p class="info-item">
        <b>Downloads</b><span class="info-data">${downloads}</span>
        </p>
    </div>
  </div>`)
      .join('');
      galleryBox.insertAdjacentHTML('beforeend', markup)
  }

  const galleryBox = document.querySelector('.gallery');

  export {galleryBox, renderGallery}