const { chromium } = require('playwright')

const shops = [
    {
        name: 'Microsoft',
        url: 'https://www.xbox.com/es-es/configure/8WJ714N3RBTL',
        checkStock: async({page}) => {
            const content = await page.textContent('[aria-label="Finalizar la compra del pack"]')
            return content.includes('Sin existencias') === false
        }
    }
]

;(async () => {
    const browser = await chromium.launch()

    for(const shop of shops) {
        const { checkStock, name, url } = shop
        const page = await browser.newPage()
        await page.goto(url)
        const hasStock = await checkStock({page}) 
        console.log(`${name}: ${hasStock ? ' Has stock!!' : 'Out of Stock!!'}`)
        page.screenshot({ path: `screenshots/${vendor}.png`})
        await page.close()
    }

    await browser.close()
})()