const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

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
            color: 'red'
        },
        {
            txt: '1/2 SHEKEL FOR COLA',
            size: 20,
            color: 'red'
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

renderGallery()
renderMeme()