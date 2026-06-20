
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
        gMeme.lines.forEach((line,idx ) => {

            ctx.fillStyle = line.color
            ctx.font = line.size + 'px Arial'
            const yPos = idx === 0 ? 50 : 450
            console.log ("idx:", idx, "pos: ", yPos)
            ctx.fillText(line.txt, 150, yPos)
        })
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


function onColorChange(color) {
    setLineColor(color)
    renderMeme()
}

function onFontSizeIncrease() {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    line.size += 5
        renderMeme()
}
function onFontSizeDecrease() {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    line.size -= 5
        renderMeme()

}

function onImgSelect(imgId) {
    setImg(imgId)
    renderMeme()
}
