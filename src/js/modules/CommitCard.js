export class CommitCard {
  constructor() { }

  create(date, authorPhoto, authorName, authorEmail, commitText) {
    let commitMarkup = 
    `<div class="carousel-cell">
      <p class="commits__date">${date}</p>
      <div class="commits__about-author">
        <img src="${authorPhoto}" alt="Фото" class="commits__author-photo">
        <div class="commits__header">
          <h3 class="commits__author-name">${authorName}</h3>
          <p class="commits__author-email">${authorEmail}</p>
        </div>
      </div>
      <p class="commits__text">${commitText}</p>
    </div>`
    
    return commitMarkup
  }
}