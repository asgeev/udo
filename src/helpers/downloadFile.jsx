import WP_Instance from '../services/WP_Instance'

const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64Data)
    const byteArrays = []

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize)

        const byteNumbers = new Array(slice.length)
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i)
        }

        const byteArray = new Uint8Array(byteNumbers)
        byteArrays.push(byteArray)
    }

    const blob = new Blob(byteArrays, { type: contentType })
    return blob
}

export const downloadFile = (id, filename = 'Opowiedz dla wnioskodawcy') => {
    console.log(id)
    if (id && id > 0) {
        WP_Instance.get(`/udo/v1/generateWord?id=${id}`).then((response) => {
            const blob = b64toBlob(
                response.data,
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            )
            const blobUrl = URL.createObjectURL(blob)
            const link = document.createElement('a')

            link.href = blobUrl
            link.setAttribute('download', `${filename}.docx`) //or any other extension
            link.click()
            link.remove()
        })
    } else {
        console.error('Download file error! Passed file id is incorrect.')
    }
}
