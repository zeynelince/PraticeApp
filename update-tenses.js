// Sayfa yüklendiğinde tüm script'in çalışmasını bekle
document.addEventListener('DOMContentLoaded', () => {

    // DOM elementlerini seç
    const tenseSelector = document.getElementById('tenseSelector');
    const examplesBox = document.getElementById('tense-examples-box');

    // Her bir Tense için gösterilecek HTML içeriği
    const tenseData = {
        'simple_present': `
            <p class="structure-title">Temel A1 Kalıpları (Geniş Zaman)</p>
            <ul>
                <li>
                    <b>"be" (Olmak):</b> Özne + (am/is/are) + Sıfat/İsim
                    <br>
                    <span class="example-text">Örn: I am happy / She is a doctor</span>
                </li>
                <li>
                    <b>"have" (Sahip Olmak):</b> Özne + (have/has) + İsim
                    <br>
                    <span class="example-text">Örn: We have a car / He has a cat</span>
                </li>
                <li>
                    <b>Diğer Fiiller:</b> Özne + Fiil (yalın / +s) + Nesne
                    <br>
                    <span class="example-text">Örn: I like coffee / She likes tea</span>
                </li>
                <li>
                    <b>Varlık Belirtme:</b> There is / There are + İsim
                    <br>
                    <span class="example-text">Örn: There is a book on the table</span>
                </li>
            </ul>
        `,
        'simple_past': `
            <p class="structure-title">Temel A1 Kalıpları (Geçmiş Zaman)</p>
            <ul>
                <li>
                    <b>"be" (Olmak):</b> Özne + (was/were) + Sıfat/İsim
                    <br>
                    <span class="example-text">Örn: I was tired / They were at home</span>
                </li>
                <li>
                    <b>Düzenli Fiiller:</b> Özne + Fiil (+ed) + Nesne
                    <br>
                    <span class="example-text">Örn: She watched a movie</span>
                </li>
                <li>
                    <b>Düzensiz Fiiller:</b> Özne + Fiil (V2) + Nesne
                    <br>
                    <span class="example-text">Örn: We went to the cinema / He ate an apple</span>
                </li>
            </ul>
        `,
        'simple_future': `
            <p class="structure-title">Temel A1 Kalıpları (Gelecek Zaman)</p>
            <ul>
                <li>
                    <b>"will" (Ecek/Acak):</b> Özne + will + Fiil (yalın) + Nesne
                    <br>
                    <span class="example-text">Örn: I will call you / He will come</span>
                </li>
                <li>
                    <b>"be going to":</b> Özne + (am/is/are) + going to + Fiil (yalın)
                    <br>
                    <span class="example-text">Örn: She is going to learn / We are going to eat</span>
                </li>
            </ul>
        `
    };

    // Kalıp kutusunu güncelleyen fonksiyon
    function updateExamples() {
        // Seçili olan option'ın 'value' değerini al
        const selectedTense = tenseSelector.value;
        
        // Data objesinden ilgili HTML'i al
        const htmlToDisplay = tenseData[selectedTense];

        if (htmlToDisplay) {
            // HTML'i kutunun içine bas
            examplesBox.innerHTML = htmlToDisplay;
            // Kutuyu görünür yap (CSS'te 'display: none' idi)
            examplesBox.classList.add('visible');
        } else {
            // Eğer bir sebepten veri bulunamazsa kutuyu gizle
            examplesBox.innerHTML = '';
            examplesBox.classList.remove('visible');
        }
    }

    // 1. Açılır liste (select) her değiştiğinde fonksiyonu çalıştır
    tenseSelector.addEventListener('change', updateExamples);

    // 2. Sayfa ilk yüklendiğinde de fonksiyonu çalıştır (default seçili olanı göstermek için)
    updateExamples();

    // --- API ile ilgili kodlar buraya gelecek ---

});