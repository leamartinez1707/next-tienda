export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount)
}


export const getImagePath = (imagePath: string) => {
    const cloudinaryUrl = 'https://res.cloudinary.com'
    if (imagePath.startsWith(cloudinaryUrl)) {
        return imagePath
    } else {
        return `/products/${imagePath}.jpg`
    }
}