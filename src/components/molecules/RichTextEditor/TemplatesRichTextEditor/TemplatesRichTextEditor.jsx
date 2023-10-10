import dayjs from 'dayjs'

export const templates = {
    szanownyPanie: (data = {}) => {
        const name = 'Szanowny Panie...'

        const header = `<p><strong>Szanowny Panie</strong></p>`

        const html = `<p>podaję informacje dotyczące wskazanej we wniosku osoby: Pana/Pani XXXXX XXXXXXXXX</p>`

        return { html: html, header: header, name: name }
    },
    szanowniPanstwo: (data = {}) => {
        const name = 'Szanowni Państwo...'

        const header = `<p><strong>Szanowni Państwo</strong></p>`

        const html = `<p>podaję informacje dotyczące wskazanej we wniosku osoby: Pana/Pani XXXXX XXXXXXXXX</p>`

        return { html: html, header: header, name: name }
    },
    ubezpieczenieZdrowotne: (data = {}) => {
        const { imie, nazwisko, status_sl, msg_date } = data

        const emptyText = '...'

        const name = 'Info. ubez. zdr.'

        const header =
            '<p><strong>Informacja o ubezpieczeniu zdrowotnym</strong></p>'

        const html = `<p>Według stanu na dzień ${
            msg_date ? dayjs(msg_date).format('DD MMMM YYYY') : emptyText
        } r. status Pani/Pana ${imie ? imie : emptyText} ${
            nazwisko ? nazwisko : emptyText
        } to: ${status_sl ? status_sl.toUpperCase() : emptyText}.</p>
        <p>Udostępnione informacje podlegają ochronie.</p>`

        return { html: html, header: header, name: name }
    },

    ubezpieczenieZdrowotneBrak: (data = {}) => {
        const name = 'Info. ubez. zdr. - brak'

        const header =
            '<p><strong>Informacja o ubezpieczeniu zdrowotnym</strong></p>'

        const html = `<p>Brak jest informacji o świadczeniach zdrowotncyh udzielonych w okresie od ... r. do ... r..</p>`

        return { html: html, header: header, name: name }
    },
    daneAdresowe: (data = {}) => {
        const {
            adr_zam_kod_pocztowy,
            adr_zam_miejscowosc,
            adr_zam_nr_domu,
            adr_zam_nr_lokalu,
            adr_zam_ulica,
            adr_zam_telefon,
            adr_mel_kod_pocztowy,
            adr_mel_miejscowosc,
            adr_mel_nr_domu,
            adr_mel_nr_lokalu,
            adr_mel_ulica,
            adr_mel_telefon,
            adr_kor_kod_pocztowy,
            adr_kor_miejscowosc,
            adr_kor_nr_domu,
            adr_kor_nr_lokalu,
            adr_kor_ulica,
            adr_kor_telefon,
        } = data

        const emptyText = 'brak danych'
        const name = 'Dane adresowe/teleadresowe'
        const header = '<p><strong>Dane adresowe/teleadresowe</strong></p>'
        const html = `<p>W Centralnym Wykazie Ubezpieczonych widnieją następujące adresy ww. osoby: <p>
                    <p></p>
                    <dl>
                    <dt>adres zamieszkania:</dt>
                        <ul>
                            <li>ulica: ${adr_zam_ulica || emptyText}</li>
                            <li>nr domu: ${adr_zam_nr_domu || emptyText}</li>
                            <li>nr lokalu: ${
                                adr_zam_nr_lokalu || emptyText
                            }</li>
                            <li>kod pocztowy: ${
                                adr_zam_kod_pocztowy || emptyText
                            }</li>
                            <li>miejscowość: ${
                                adr_zam_miejscowosc || emptyText
                            }</li>
                            <li>telefon: ${adr_zam_telefon || emptyText}</li>
                        </ul>
    
                    <dt>adres zameldowania:</dt>
                        <ul>
                            <li>ulica: ${adr_mel_ulica || emptyText}</li>
                            <li>nr domu: ${adr_mel_nr_domu || emptyText}</li>
                            <li>nr lokalu: ${
                                adr_mel_nr_lokalu || emptyText
                            }</li>
                            <li>kod pocztowy: ${
                                adr_mel_kod_pocztowy || emptyText
                            }</li>
                            <li>miejscowość: ${
                                adr_mel_miejscowosc || emptyText
                            }</li> 
                            <li>telefon: ${
                                adr_mel_telefon || emptyText
                            }</li>           
                        </ul>
    
                    <dt>adres do korespondencji:</dt>
                        <ul>
                            <li>ulica: ${adr_kor_ulica || emptyText}</li>
                            <li>nr domu: ${adr_kor_nr_domu || emptyText}</li>
                            <li>nr lokalu: ${
                                adr_kor_nr_lokalu || emptyText
                            }</li>
                            <li>kod pocztowy: ${
                                adr_kor_kod_pocztowy || emptyText
                            }</li>
                            <li>miejscowość: ${
                                adr_kor_miejscowosc || emptyText
                            }</li>    
                            <li>telefon: ${
                                adr_kor_telefon || emptyText
                            }</li>          
                        </ul>
                    </dl>
        `
        return { html: html, header: header, name: name }
    },

    platnik: (data = {}) => {
        const name = 'Płatnik składek'

        const header = `<p><strong>Płatnik składek</strong></p>`

        const html = `<p>Płatnik składek na ubezpieczenie zdrowotne:<p/>
                      <p>od:   do: </p>
                      <ul>
                        <li>NIP:</li>
                        <li>Nazwa skrócona:</li>
                      </ul>
                    `

        return { html, header, name }
    },

    ekuz: (data = {}) => {
        const name = 'EKUZ'

        const header = `<p><strong>EKUZ</strong></p></br>`

        const html = `<p>Europejska Karta Ubezpieczenia Zdrowotnego: wydana/brak</p>
                      <p>ważność karty od:     do:</p>`

        return { html, header, name }
    },
    deklaracjaPOZ: (data = {}) => {
        const name = 'Deklaracja POZ'

        const header = `<p><strong>Deklaracja lekarza POZ</strong></p>`

        const html = `<p>Miejsce złożenia deklaracji wyboru lekarza pierwszego kontaktu: ....</p> `

        return { html, header, name }
    },
    deklaracjaPOZBrak: (data = {}) => {
        const name = 'Deklaracja POZ - brak'

        const header = `<p><strong>Deklaracja POZ - brak</strong></p>`

        const html = `<p>Pan XXXX XXXXX nie złożył deklaracji wyboru lekarza podstawowej opieki zdrowotnej.</p> `

        return { html, header, name }
    },
    ZUSKRUS: (data = {}) => {
        const name = 'ZUS/KRUS'

        const header = `<p><strong>ZUS/KRUS</strong></p>`

        const html = `<p>Dane adresowe przekazywane są do Centralnego Wykazu Ubezpieczonych bezpośrednio przez ZUS lub KRUS i nie są związane z faktem czy osoba ubezpieczona korzysta aktualnie ze świadczeń opieki zdrowotnej finansowanej przez NFZ. Nie jesteśmy w stanie zweryfikować, czy zawarty adres w systemie jest aktualny.</p>`

        return { html, header, name }
    },
    infoLeczeniePacjenta: (data = {}) => {
        const name = 'Leczenie Pacjenta '

        const header = `<p><strong>Informacja o leczeniu pacjenta</strong></p>`

        const html = `<p>Jako załącznik przekazujemy zestawienie dotyczące okresu i miejsc udzielonych świadczeń zdrowotnych w okresie od: ... r. do: ... r.</p>`

        return { html, header, name }
    },
    realizacjaRecept: (data = {}) => {
        const name = 'Realizacja recept'

        const header = `<p><strong>Informacja o realizacji recept</strong></p>`

        const html = `<p></p>`

        return { html, header, name }
    },
    realizacjaReceptBrak: (data = {}) => {
        const name = 'Realizacja recept - brak'

        const header = `<p><strong>Informacja o realizacji recept</strong></p>`

        const html = `<p>Brak jest informacji o zrealizowanych receptach refundowanych wystawionych w okresie od ………. r. do ……….. r.</p>
                      <p>Informacji na temat leków nierefundowanych udziela Centrum e-Zdrowia.</p>`

        return { html, header, name }
    },
    leczeniePrzed2008: (data = {}) => {
        const name = 'Leczenie przed 2008'

        const header = `<p><strong>Leczenie przed 2008</strong></p>`

        const html = `<p>Gromadzenie danych oświadczeniach opieki zdrowotnej w formie elektronicznej rozpoczęliśmy w 2008 r.. Przekazanie żądanych informacji przed tym okresem jest niemożliwe.</p>`

        return { html, header, name }
    },
}
