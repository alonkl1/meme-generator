const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

var gImgs = [{id: 1, url: 'https://placehold.co/600x400', keywords: ['funny', 'cat']}]
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