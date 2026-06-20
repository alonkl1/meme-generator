function renderGallery() {
    const galleryEl = document.getElementById('gallery')
    let html = ''

    gImgs.forEach(img => {
        html += `<img src="${img.url}" onclick="onImgSelect(${img.id})">`
    })

    galleryEl.innerHTML = html
}
