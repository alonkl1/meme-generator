const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')


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

            const spacing = canvas.height / (gMeme.lines.length + 1)
            const yPos = spacing * (idx + 1)

            // const yPos = idx === 0 ? 50 : 450
            ctx.fillText(line.txt, 150, yPos)

            //Store pos for click detection
            const textMetrics = ctx.measureText(line.txt)
            line.x = 150 
            line.y = yPos - line.size
            line.width = textMetrics.width
            line.height = line.size

            // Draw frame around selected line
            if (idx === gMeme.selectedLineIdx) {
                ctx.strokeStyle = 'yellow'
                ctx.lineWidth = 3
                ctx.strokeRect(line.x -5 , line.y - 5, line.width + 10, line.height +10)
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



function onAddLine() {
    const newLine = {
        txt: `New line #${gMeme.lines.length +1}`,
        size: 20,
        color: 'white',
        x: 0,
        y: 0,
        width: 0,
        height: 0
    }
    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    
    document.getElementById('text-input').value = 'New line'
    document.getElementById('color-input').value = 'white'
    
    renderMeme()
}

function onDeleteLine() {
    if (gMeme.lines.length === 1) {
        alert('You need at least one line')
        return
    }
    
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx = Math.max(0, gMeme.selectedLineIdx - 1)
    
    const currentLine = gMeme.lines[gMeme.selectedLineIdx]
    document.getElementById('text-input').value = currentLine.txt
    document.getElementById('color-input').value = currentLine.color
    
    renderMeme()
}



document.getElementById('add-line-btn').addEventListener('click', onAddLine)
document.getElementById('delete-line-btn').addEventListener('click', onDeleteLine)

