import dayjs from 'dayjs'

//Templates for buttons

export const template1 = `
    <p>Szanowny Panie,</p>
    <p>podaję informacje dotyczące wskazanej we wniosku osoby: Pana/Pani XXXXX XXXXXXXXX</p>
`

export const template2 = `
    <p><strong>Informacja o leczeniu pacjenta</strong><p/>
    <p>Brak jest informacji o udzielonych świadczeniach zdrowotnych w rodzaju opieka psychiatryczna i leczenie uzależnień w okresie od  .....r.<p/>
    `
export const template3 = `
    <p><strong>Ubezpieczenie zdrowotne</strong><p/>
    <p>Według stanu na .... czerwca 2023 r. Pani/Pan XXX XXXXXX podlega/nie podlega ubezpieczeniu zdrowotnemu w Rzeczypospolitej Polskiej z tytułu pobierania emerytury lub renty<p/>
    <p>Udostępnione informacje podlegają ochronie<p/>
`

export const template4 = (data = {}) => {
    const {
        adr_zam_kod_pocztowy,
        adr_zam_miejscowosc,
        adr_zam_nr_domu,
        adr_zam_nr_lokalu,
        adr_zam_ulica,
        adr_mel_kod_pocztowy,
        adr_mel_miejscowosc,
        adr_mel_nr_domu,
        adr_mel_nr_lokalu,
        adr_mel_ulica,
        adr_kor_kod_pocztowy,
        adr_kor_miejscowosc,
        adr_kor_nr_domu,
        adr_kor_nr_lokalu,
        adr_kor_ulica,
    } = data
    const html = `
    <p>W Centralnym Wykazie Ubezpieczonych widnieją następujące adresy ww. osoby: <p>
    <dl>

      <dt>adres zamieszkania:</dt>
        <ul>
            <li>ulica: ${adr_zam_ulica ? adr_zam_ulica : ''}</li>
            <li>nr domu: ${adr_zam_nr_domu ? adr_zam_nr_domu : ''}</li>
            <li>nr lokalu: ${adr_zam_nr_lokalu ? adr_zam_nr_lokalu : ''}</li>
            <li>kod pocztowy: ${
                adr_zam_kod_pocztowy ? adr_zam_kod_pocztowy : ''
            }</li>
            <li>miejscowość: ${
                adr_zam_miejscowosc ? adr_zam_miejscowosc : ''
            }</li>
        </ul>

      <dt>adres zameldowania:</dt>
        <ul>
            <li>ulica: ${adr_mel_ulica ? adr_mel_ulica : ''}</li>
            <li>nr domu: ${adr_mel_nr_domu ? adr_mel_nr_domu : ''}</li>
            <li>nr lokalu: ${adr_mel_nr_lokalu ? adr_mel_nr_lokalu : ''}</li>
            <li>kod pocztowy: ${
                adr_mel_kod_pocztowy ? adr_mel_kod_pocztowy : ''
            }</li>
            <li>miejscowość: ${
                adr_mel_miejscowosc ? adr_mel_miejscowosc : ''
            }</li>            
        </ul>

      <dt>adres do korespondencji:</dt>
        <ul>
            <li>ulica: ${adr_kor_ulica ? adr_kor_ulica : ''}</li>
            <li>nr domu: ${adr_kor_nr_domu ? adr_kor_nr_domu : ''}</li>
            <li>nr lokalu: ${adr_kor_nr_lokalu ? adr_kor_nr_lokalu : ''}</li>
            <li>kod pocztowy: ${
                adr_kor_kod_pocztowy ? adr_kor_kod_pocztowy : ''
            }</li>
            <li>miejscowość: ${
                adr_kor_miejscowosc ? adr_kor_miejscowosc : ''
            }</li>              
        </ul>
    </dl>
   
    `

    return html
}

export const template5 = `
    <p><strong>Informacja o leczeniu pacjenta</strong></p>
    <p>Brak jest informacji o świadczeniach zdrowotnych udzielonych w okresie od ……….. r. do ……… r.</p>
`
export const template6 = `
    <p><strong>Informacja  o realizacji recept</strong></p> 
    <p>Brak jest informacji o zrealizowanych receptach refundowanych wystawionych w okresie od ………. r. do ……….. r.</p>
    <p>Informacji na temat leków nierefundowanych udziela Centrum e-Zdrowia.</p>
`

export const template7 = (data = {}) => {
    const { imie, nazwisko, status_sl } = data
    const html = `
        <p>Według stanu na dzień ${dayjs().format('DD MMMM YYYY')} r. status
                    ubezpieczenia Pani/Pana ${imie ? imie : '...'} ${
        nazwisko ? nazwisko : '...'
    } to: ${
        status_sl ? status_sl.toUpperCase() : '...'
    } . \n Tytuł ubezpieczenia: ${status_sl ? status_sl : '...'}.
                    Udostępnione informacje podlegają ochronie.</p>`

    return html
}

export const template8 = `
    <p><strong>Informacja o deklaracji lekarza podstawowej opieki zdrowotnej</strong></p> 
    <p>Pan XXXX XXXXX nie złożył deklaracji wyboru lekarza podstawowej opieki zdrowotnej.</p>   

`
export const template9 = `
    <p><strong>Informacja o leczeniu pacjenta</strong></p>
    <p>Jako załącznik przekazujemy zestawienie dotyczące okresu i miejsc udzielonych świadczeń zdrowotnych w okresie od ………. r.</p>
`

export const template10 = `
    <p>Dane adresowe przekazywane są do Centralnego Wykazu Ubezpieczonych bezpośrednio przez ZUS lub KRUS i nie są związane z faktem czy osoba ubezpieczona korzysta aktualnie ze świadczeń opieki zdrowotnej finansowanej przez NFZ.</p>
    
`

export const template11 = `
    <p>Dane zostały zweryfikowane w naszych systemach informatycznych ..... 2023r.</p>
`
export const template12 = `
    <p>Narodowy Fundusz Zdrowia nie monitoruje świadczeń opieki zdrowotnej wykonywanych na bieżąco, lecz przetwarza dane dotyczące udzielonych świadczeń na podstawie raportów przekazywanych do OW przez świadczeniodawców. Zgodnie z §23 ust.3 załącznika do rozporządzenia Ministra Zdrowia z dnia 8 września 2015 r. w sprawie ogólnych warunków umów o udzielanie świadczeń opieki zdrowotnej (Dz.U. z 2022 r. poz. 787, z późn. zm.) dokumenty rozliczeniowe świadczeniodawca składa OW w terminie do 10 dnia każdego miesiąca, za miesiąc poprzedni.</p>
`
