export const messageResponse = (itemsArray) => {
    let text = 'Gratulacje! udało Twoje dane zostały zapisane prawidłowo!'
    let index = 0

    while (index < itemsArray.length) {
        if (itemsArray[index].status === 'error') {
            text =
                'Gratulacje! Twoje dane zostały zapisane do bazy.<br /> Jednak część operacji się nie powiodła. Możesz je ponowić w zakładce WPROWADZONE DANE.'
            break
        }
        index++
    }

    // items?.map((element) => {
    //     console.log(element)
    //     if (element.status == 'error') {

    //     } else {
    //     }
    // })

    return text
}
