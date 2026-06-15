const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

// ===== DATA =====
var gImgs = [
  {id: 1, url: 'meme-imgs/square/1.jpg', keywords: ['funny', 'trump']},
  {id: 2, url: 'meme-imgs/square/2.jpg', keywords: ['cute', 'dog']},
  {id: 3, url: 'meme-imgs/square/3.jpg', keywords: ['cute', 'baby']},
  {id: 4, url: 'meme-imgs/square/4.jpg', keywords: ['cute', 'cat']},
]
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: 'red'
        }
    ]
}
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

// ===== MEME CONTROLLER =====

function renderMeme() {
    
    const line = gMeme.lines[gMeme.selectedLineIdx]
    
    // Get the current image ID from gMeme
    const imgId = gMeme.selectedImgId


    // Find that image in gImgs array (hint: look for the image where id === imgId)
    const img = gImgs.find(imgObj => imgObj.id === imgId) // YOUR CODE: find the right image object

    const imgEl = new Image()
    imgEl.src = img.url
    imgEl.onload = function () {
        ctx.drawImage(imgEl, 0, 0, canvas.width, canvas.height)
        
        ctx.fillStyle = line.color
        ctx.font = line.size + 'px Arial'
        ctx.fillText (line.txt, 50, 50)
    }

    // Get the current text line from gMeme

}

function onDownloadMeme() {
    console.log('ONDOWNLOADMEME')

    const link = document.createElement('a')
    link.href = canvas.toDataURL()
    link.download = 'meme.jpg'
    link.click()
}
function onTextInput(txt) {
  // Update the data
  setLineTxt(txt)
  
  // Redraw
  renderMeme()
}

function setLineTxt(txt){
    gMeme.lines[gMeme.selectedLineIdx].txt=txt
}

document.getElementById('text-input').addEventListener('input', (e) => {
  onTextInput(e.target.value)
})

document.getElementById('download-btn').addEventListener('click', (e) => {
  onDownloadMeme()
})

// ===== MEME SERVICE =====


// ===== GALLERY SERVICE =====
function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

// ===== GALLERY CONTROLLER =====
function renderGallery() {
    const galleryEl = document.getElementById('gallery')
    let html = ''
    
    gImgs.forEach(img => {
        html += `<img src="${img.url}" onclick="onImgSelect(${img.id})">`
    })
    
    galleryEl.innerHTML = html
}

function onImgSelect(imgId) {
    setImg(imgId)
    renderMeme()
}


renderGallery()
renderMeme()