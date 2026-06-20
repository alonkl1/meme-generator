console.log('MEME CONTROLLER LOADED')
console.log('Canvas element:', canvas)

// const canvas = document.querySelector('canvas')
// const ctx = canvas.getContext('2d')

// ===== DATA =====
var gImgs = [
    { id: 1, url: 'meme-imgs/square/1.jpg', keywords: ['funny', 'trump'] },
    { id: 2, url: 'meme-imgs/square/2.jpg', keywords: ['cute', 'dog'] },
    { id: 3, url: 'meme-imgs/square/3.jpg', keywords: ['cute', 'baby'] },
    { id: 4, url: 'meme-imgs/square/4.jpg', keywords: ['cute', 'cat'] },
]
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: 'red',
            x: 0,      // Where it's drawn horizontally
            y: 0,      // Where it's drawn vertically
            width: 0,  // How wide the text is
            height: 0  // How tall the text is
        },
        {
            txt: '1/2 SHEKEL FOR COLA',
            size: 20,
            color: 'red',
            x: 0,
            y: 0,
            width: 0,
            height: 0
        }
    ]
}
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

// ===== EVENT LISTENERS =====



document.getElementById('text-input').addEventListener('input', (e) => {
    onTextInput(e.target.value)
})

document.getElementById('download-btn').addEventListener('click', (e) => {
    onDownloadMeme()
})


document.getElementById('color-input').addEventListener('change', (e) => {
    onColorChange(e.target.value)
})
document.
    getElementById('font-size-increase').
    addEventListener('click', onFontSizeIncrease)

document.
    getElementById('font-size-decrease').
    addEventListener('click', onFontSizeDecrease)

document.
    getElementById('switch-line-btn').
    addEventListener('click', onSwitchLine)

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const clickY = e.clientY - rect.top
    console.log("!!!!!!!!!")
    // Check which line was clicked
    for (let i = 0; i < gMeme.lines.length; i++) {
        const line = gMeme.lines[i]
        if (clickX >= line.x && clickX <= line.x + line.width &&
            clickY >= line.y && clickY <= line.y + line.height) {
            
            // Found the clicked line!
            gMeme.selectedLineIdx = i
            
            // Update UI
            document.getElementById('text-input').value = line.txt
            document.getElementById('color-input').value = line.color
            
            renderMeme()
            return
        }
    }
})

renderGallery()
renderMeme()