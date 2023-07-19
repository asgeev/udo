export const messageResponse = (itemsArray) => {
    let text = 'Twoje dane zostały zapisane prawidłowo!'
    let index = 0

    while (index < itemsArray.length) {
        if (itemsArray[index].status === 'error') {
            text =
                'Twoje dane zostały zapisane do bazy. Jednak część operacji się nie powiodła. Możesz je ponowić, wystarczy, że klikniesz przycisk edycji poniżej. '
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
