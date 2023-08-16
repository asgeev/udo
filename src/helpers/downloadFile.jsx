import WP_Instance from '../services/WP_Instance'

export const downloadFile = (id, filename = 'Opowiedz dla wnioskodawcy') => {
    if (id && id > 0) {
        WP_Instance.get(`/udo/v1/generateWord?id=${id}`, {
            responseType: 'blob',
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', `${filename}.docx`) //or any other extension
            link.click()
            link.remove()
        })
    } else {
        console.error('Download file error! Passed file id are incorrect.')
    }
}
