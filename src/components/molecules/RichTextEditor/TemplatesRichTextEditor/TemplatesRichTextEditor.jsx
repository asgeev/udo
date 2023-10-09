import dayjs from 'dayjs'

export const templates = {
    szanownyPanie: (data = {}) => {
        const name = 'Szanowny Panie...'

        const header = `<p><strong>Szanowny Panie</strong></p>`

        const html = `m e<p>podaję informacje dotyczące wskazanej we wniosku osoby: Pana/Pani XXXXX XXXXXXXXX</p>`

        return { html: html, header: header, name: name }
    },
    szanowniPanstwo: (data = {}) => {
        const name = 'Szanowni Państwo...'

        const header = `<p><strong>Szanowni Państwo...</strong></p>`

        const html = `<p>podaję informacje dotyczące wskazanej we wniosku osoby: Pana/Pani XXXXX XXXXXXXXX</p>`

        return { html: html, header: header, name: name }
    },
    daneAdresowe: (data = {}) => {
        const {
            adr_zam_kod_pocztowy = '',
            adr_zam_miejscowosc = '',
            adr_zam_nr_domu = '',
            adr_zam_nr_lokalu = '',
            adr_zam_ulica = '',
            adr_zam_telefon = '',
            adr_mel_kod_pocztowy = '',
            adr_mel_miejscowosc = '',
            adr_mel_nr_domu = '',
            adr_mel_nr_lokalu = '',
            adr_mel_ulica = '',
            adr_mel_telefon = '',
            adr_kor_kod_pocztowy = '',
            adr_kor_miejscowosc = '',
            adr_kor_nr_domu = '',
            adr_kor_nr_lokalu = '',
            adr_kor_ulica = '',
            adr_kor_telefon = '',
        } = data
        const name = 'Dane adresowe/teleadresowe'
        const header = '<p><strong>Dane adresowe/teleadresowe</strong></p></br>'
        const html = `<p>W Centralnym Wykazie Ubezpieczonych widnieją następujące adresy ww. osoby: <p>
                    <p></p>
                    <dl>
                    <dt>adres zamieszkania:</dt>
                        <ul>
                            <li>ulica: ${adr_zam_ulica}</li>
                            <li>nr domu: ${adr_zam_nr_domu}</li>
                            <li>nr lokalu: ${adr_zam_nr_lokalu}</li>
                            <li>kod pocztowy: ${adr_zam_kod_pocztowy}</li>
                            <li>miejscowość: ${adr_zam_miejscowosc}</li>
                            <li>telefon: ${adr_zam_telefon}</li>
                        </ul>
    
                    <dt>adres zameldowania:</dt>
                        <ul>
                            <li>ulica: ${adr_mel_ulica}</li>
                            <li>nr domu: ${adr_mel_nr_domu}</li>
                            <li>nr lokalu: ${adr_mel_nr_lokalu}</li>
                            <li>kod pocztowy: ${adr_mel_kod_pocztowy}</li>
                            <li>miejscowość: ${adr_mel_miejscowosc}</li> 
                            <li>telefon: ${adr_mel_telefon}</li>           
                        </ul>
    
                    <dt>adres do korespondencji:</dt>
                        <ul>
                            <li>ulica: ${adr_kor_ulica}</li>
                            <li>nr domu: ${adr_kor_nr_domu}</li>
                            <li>nr lokalu: ${adr_kor_nr_lokalu}</li>
                            <li>kod pocztowy: ${adr_kor_kod_pocztowy}</li>
                            <li>miejscowość: ${adr_kor_miejscowosc}</li>    
                            <li>telefon:${adr_kor_telefon}</li>          
                        </ul>
                    </dl>
       
        `

        return { html: html, header: header, name: name }
    },
    ubezpieczenieZdrowotne: (data = {}) => {
        const { imie, nazwisko, status_sl, msg_date } = data

        const name = 'Informacja o ubezpieczeniu zdrowotnym'
        const header =
            '<p><strong>Informacja o ubezpieczeniu zdrowotnym</strong></p></br>'
        const html = `<p>Według stanu na dzień ${
            msg_date ? dayjs(msg_date).format('DD MMMM YYYY') : '...'
        } r. status Pani/Pana ${imie ? imie : '...'} ${
            nazwisko ? nazwisko : '...'
        } to: ${status_sl ? status_sl.toUpperCase() : '...'}.</p>
        <p>Udostępnione informacje podlegają ochronie.</p>`

        return { html: html, header: header, name: name }
    },
}

const template2 = () => {
    const name = 'Płatnik'

    const header = `<p><strong>Informacja o leczeniu pacjenta</strong><p/>`

    const html = `<p>Brak jest informacji o udzielonych świadczeniach zdrowotnych w rodzaju opieka psychiatryczna i leczenie uzależnień w okresie od  .....r.<p/>`

    return { html, header, name }
}

const template3 = () => {
    const name = 'Ubezpieczenie zdrowotne'

    const header = `<p><strong>Płatnik</strong></p>`

    const html = `<p><strong>Ubezpieczenie zdrowotne</strong><p/>
    <p>Według stanu na .... czerwca 2023 r. Pani/Pan XXX XXXXXX podlega/nie podlega ubezpieczeniu zdrowotnemu w Rzeczypospolitej Polskiej z tytułu pobierania emerytury lub renty<p/>
    <p>Udostępnione informacje podlegają ochronie<p/>`

    return { html, header, name }
}

const template5 = () => {
    const name = 'Płatnik'

    const header = `<p><strong>Płatnik</strong></p>`

    const html = ` <p><strong>Informacja o leczeniu pacjenta</strong></p>
    <p>Brak jest informacji o świadczeniach zdrowotnych udzielonych w okresie od ……….. r. do ……… r.</p>`

    return { html, header, name }
}

const template6 = () => {
    const name = 'Płatnik'

    const header = `<p><strong>Płatnik</strong></p>`

    const html = `<p><strong>Informacja  o realizacji recept</strong></p> 
    <p>Brak jest informacji o zrealizowanych receptach refundowanych wystawionych w okresie od ………. r. do ……….. r.</p>
    <p>Informacji na temat leków nierefundowanych udziela Centrum e-Zdrowia.</p>`

    return { html, header, name }
}

const template8 = () => {
    const name = 'Płatnik'

    const header = `<p><strong>Płatnik</strong></p>`

    const html = ` <p><strong>Informacja o deklaracji lekarza podstawowej opieki zdrowotnej</strong></p> 
    <p>Pan XXXX XXXXX nie złożył deklaracji wyboru lekarza podstawowej opieki zdrowotnej.</p> `

    return { html, header, name }
}

const template9 = () => {
    const name = 'Płatnik'

    const header = `<p><strong>Płatnik</strong></p>`

    const html = ` <p><strong>Informacja o leczeniu pacjenta</strong></p>
    <p>Jako załącznik przekazujemy zestawienie dotyczące okresu i miejsc udzielonych świadczeń zdrowotnych w okresie od ………. r.</p>`

    return { html, header, name }
}

const template10 = () => {
    const name = 'Płatnik'

    const header = `<p><strong>Płatnik</strong></p>`

    const html = `<p>Dane adresowe przekazywane są do Centralnego Wykazu Ubezpieczonych bezpośrednio przez ZUS lub KRUS i nie są związane z faktem czy osoba ubezpieczona korzysta aktualnie ze świadczeń opieki zdrowotnej finansowanej przez NFZ.</p>`

    return { html, header, name }
}

const template11 = () => {
    const name = 'Płatnik'

    const header = `<p><strong>Płatnik</strong></p>`

    const html = `<p>Dane zostały zweryfikowane w naszych systemach informatycznych ..... 2023r.</p>`

    return { html, header, name }
}

const template12 = () => {
    const name = 'Płatnik'

    const header = `<p><strong>Płatnik</strong></p>`

    const html = `<p>Narodowy Fundusz Zdrowia nie monitoruje świadczeń opieki zdrowotnej wykonywanych na bieżąco, lecz przetwarza dane dotyczące udzielonych świadczeń na podstawie raportów przekazywanych do OW przez świadczeniodawców. Zgodnie z §23 ust.3 załącznika do rozporządzenia Ministra Zdrowia z dnia 8 września 2015 r. w sprawie ogólnych warunków umów o udzielanie świadczeń opieki zdrowotnej (Dz.U. z 2022 r. poz. 787, z późn. zm.) dokumenty rozliczeniowe świadczeniodawca składa OW w terminie do 10 dnia każdego miesiąca, za miesiąc poprzedni.</p>
    `

    return { html, header, name }
}

const template13 = () => {
    const name = 'Płatnik'

    const header = `<p><strong>Płatnik</strong></p>`

    const html = `<p>Dane zostały zweryfikowane w naszych systemach informatycznych ..... 2023r.</p>`

    return { html, header, name }
}

// export const getSelectedTemplates = () => {
//     let templatesArray = []
//     const templatesName = ['daneAdresowe', 'ubezpieczenieZdrowotne']

//     templatesName.forEach((templateName) => {
//         let element = `${templateName}`

//         templatesArray.push(element)
//     })

//     return templatesArray
// }
