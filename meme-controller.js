
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
        gMeme.lines.forEach((line, idx) => {

            ctx.fillStyle = line.color
            ctx.font = line.size + 'px Arial'

            const yPos = idx === 0 ? 50 : 450
            ctx.fillText(line.txt, 150, yPos)

            // Draw frame around selected line
            if (idx === gMeme.selectedLineIdx) {
                ctx.strokeStyle = 'yellow'
                ctx.lineWidth = 3
                ctx.strokeRect(100, yPos - 30, 300, 40)
            }

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


function onSwitchLine() {
    gMeme.selectedLineIdx = (gMeme.selectedLineIdx + 1) %
        gMeme.lines.length

    const currentLine = gMeme.lines[gMeme.selectedLineIdx]
    document.getElementById('text-input').value = currentLine.txt
    document.getElementById('color-input').value = currentLine.color

    renderMeme()
}