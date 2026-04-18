document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('enquiryForm');
    const uploadChoiceRadios = document.querySelectorAll('input[name="uploadChoice"]');
    const uploadDocumentInput = document.getElementById('uploadDocument');

    // Toggle file input based on radio
    function toggleFileInput() {
        if (document.querySelector('input[name="uploadChoice"]:checked').value === 'Yes') {
            uploadDocumentInput.disabled = false;
            uploadDocumentInput.parentElement.style.opacity = 1;
        } else {
            uploadDocumentInput.disabled = true;
            uploadDocumentInput.value = '';
            uploadDocumentInput.parentElement.style.opacity = 0.5;
        }
    }
    uploadChoiceRadios.forEach(radio => {
        radio.addEventListener('change', toggleFileInput);
    });
    toggleFileInput();

    form.addEventListener('submit', function(e) {
        // Only prevent default if the form is invalid
        if (!form.checkValidity()) {
            e.preventDefault();
            form.reportValidity();
            return;
        }
        // Otherwise, let the form submit to Formspree
        // Optionally, you can show a loading spinner here
    });

    // --- Country/State Dynamic Dropdown Logic ---
    const countryStateData = {
        "Afghanistan": ["Badakhshan", "Badghis", "Baghlan", "Balkh", "Bamian", "Farah", "Faryab", "Ghazni", "Ghowr", "Helmand", "Herat", "Jowzjan", "Kabul", "Kandahar", "Kapisa", "Khost", "Konar", "Kondoz", "Laghman", "Lowgar", "Nangarhar", "Nimruz", "Oruzgan", "Paktia", "Paktika", "Parvan", "Samangan", "Sar-e Pol", "Takhar", "Vardak", "Zabol"],
        "Albania": ["Berat", "Diber", "Durres", "Elbasan", "Fier", "Gjirokaster", "Korce", "Kukes", "Lezhe", "Shkoder", "Tirane", "Vlore"],
        "Algeria": ["Adrar", "Ain Defla", "Ain Temouchent", "Alger", "Annaba", "Batna", "Bechar", "Bejaia", "Biskra", "Blida", "Bordj Bou Arreridj", "Bouira", "Boumerdes", "Chlef", "Constantine", "Djelfa", "El Bayadh", "El Oued", "El Tarf", "Ghardaia", "Guelma", "Illizi", "Jijel", "Khenchela", "Laghouat", "Mascara", "Medea", "Mila", "Mostaganem", "M'Sila", "Naama", "Oran", "Ouargla", "Oum el Bouaghi", "Relizane", "Saida", "Setif", "Sidi Bel Abbes", "Skikda", "Souk Ahras", "Tamanghasset", "Tebessa", "Tiaret", "Tindouf", "Tipaza", "Tissemsilt", "Tizi Ouzou", "Tlemcen"],
        "Argentina": ["Buenos Aires", "Catamarca", "Chaco", "Chubut", "Cordoba", "Corrientes", "Entre Rios", "Formosa", "Jujuy", "La Pampa", "La Rioja", "Mendoza", "Misiones", "Neuquen", "Rio Negro", "Salta", "San Juan", "San Luis", "Santa Cruz", "Santa Fe", "Santiago del Estero", "Tierra del Fuego", "Tucuman"],
        "Australia": ["Australian Capital Territory", "New South Wales", "Northern Territory", "Queensland", "South Australia", "Tasmania", "Victoria", "Western Australia"],
        "Austria": ["Burgenland", "Carinthia", "Lower Austria", "Salzburg", "Styria", "Tyrol", "Upper Austria", "Vienna", "Vorarlberg"],
        "Bangladesh": ["Barisal", "Chittagong", "Dhaka", "Khulna", "Rajshahi", "Rangpur", "Sylhet"],
        "Belgium": ["Antwerp", "East Flanders", "Flemish Brabant", "Hainaut", "Liege", "Limburg", "Luxembourg", "Namur", "Walloon Brabant", "West Flanders"],
        "Brazil": ["Acre", "Alagoas", "Amapa", "Amazonas", "Bahia", "Ceara", "Distrito Federal", "Espirito Santo", "Goias", "Maranhao", "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Para", "Paraiba", "Parana", "Pernambuco", "Piaui", "Rio de Janeiro", "Rio Grande do Norte", "Rio Grande do Sul", "Rondonia", "Roraima", "Santa Catarina", "Sao Paulo", "Sergipe", "Tocantins"],
        "Canada": ["Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Northwest Territories", "Nova Scotia", "Nunavut", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Yukon"],
        "Chile": ["Aisen del General Carlos Ibanez del Campo", "Antofagasta", "Araucania", "Atacama", "Bio-Bio", "Coquimbo", "Libertador General Bernardo O'Higgins", "Los Lagos", "Los Rios", "Magallanes y de la Antartica Chilena", "Maule", "Metropolitana de Santiago", "Tarapaca", "Valparaiso"],
        "China": ["Anhui", "Beijing", "Chongqing", "Fujian", "Gansu", "Guangdong", "Guangxi", "Guizhou", "Hainan", "Hebei", "Heilongjiang", "Henan", "Hong Kong", "Hubei", "Hunan", "Inner Mongolia", "Jiangsu", "Jiangxi", "Jilin", "Liaoning", "Macau", "Ningxia", "Qinghai", "Shaanxi", "Shandong", "Shanghai", "Shanxi", "Sichuan", "Tianjin", "Tibet", "Xinjiang", "Yunnan", "Zhejiang"],
        "Colombia": ["Amazonas", "Antioquia", "Arauca", "Atlantico", "Bolivar", "Boyaca", "Caldas", "Caqueta", "Casanare", "Cauca", "Cesar", "Choco", "Cordoba", "Cundinamarca", "Guainia", "Guaviare", "Huila", "La Guajira", "Magdalena", "Meta", "Narino", "Norte de Santander", "Putumayo", "Quindio", "Risaralda", "San Andres y Providencia", "Santander", "Sucre", "Tolima", "Valle del Cauca", "Vaupes", "Vichada"],
        "Denmark": ["Capital Region", "Central Jutland", "North Jutland", "Region Zealand", "South Denmark"],
        "Egypt": ["Alexandria", "Aswan", "Asyut", "Beheira", "Beni Suef", "Cairo", "Dakahlia", "Damietta", "Faiyum", "Gharbia", "Giza", "Ismailia", "Kafr El Sheikh", "Luxor", "Matruh", "Minya", "Monufia", "New Valley", "North Sinai", "Port Said", "Qalyubia", "Qena", "Red Sea", "Sharqia", "Sohag", "South Sinai", "Suez"],
        "Finland": ["Ahvenanmaa", "Etela-Karjala", "Etela-Pohjanmaa", "Etela-Savo", "Etela-Suomen Laani", "Ita-Suomen Laani", "Keski-Pohjanmaa", "Keski-Suomi", "Kymenlaakso", "Lansi-Suomen Laani", "Lappi", "Oulun Laani", "Paijat-Hame", "Pirkanmaa", "Pohjanmaa", "Pohjois-Karjala", "Pohjois-Pohjanmaa", "Pohjois-Savo", "Satakunta", "Uudenmaan Laani", "Varsinais-Suomi"],
        "France": ["Alsace", "Aquitaine", "Auvergne", "Basse-Normandie", "Bourgogne", "Bretagne", "Centre", "Champagne-Ardenne", "Corse", "Franche-Comte", "Haute-Normandie", "Ile-de-France", "Languedoc-Roussillon", "Limousin", "Lorraine", "Midi-Pyrenees", "Nord-Pas-de-Calais", "Pays de la Loire", "Picardie", "Poitou-Charentes", "Provence-Alpes-Cote d'Azur", "Rhone-Alpes"],
        "Germany": ["Baden-Wurttemberg", "Bayern", "Berlin", "Brandenburg", "Bremen", "Hamburg", "Hessen", "Mecklenburg-Vorpommern", "Niedersachsen", "Nordrhein-Westfalen", "Rheinland-Pfalz", "Saarland", "Sachsen", "Sachsen-Anhalt", "Schleswig-Holstein", "Thuringen"],
        "Greece": ["Attica", "Central Greece", "Central Macedonia", "Crete", "East Macedonia and Thrace", "Epirus", "Ionian Islands", "North Aegean", "Peloponnese", "South Aegean", "Thessaly", "West Greece", "West Macedonia"],
        "India": ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"],
        "Indonesia": ["Aceh", "Bali", "Bangka Belitung", "Banten", "Bengkulu", "Central Java", "Central Kalimantan", "Central Sulawesi", "East Java", "East Kalimantan", "East Nusa Tenggara", "Gorontalo", "Jakarta", "Jambi", "Lampung", "Maluku", "Maluku Utara", "North Kalimantan", "North Maluku", "North Sulawesi", "North Sumatra", "Papua", "Riau", "Riau Islands", "Southeast Sulawesi", "South Kalimantan", "South Sulawesi", "South Sumatra", "West Java", "West Kalimantan", "West Nusa Tenggara", "West Papua", "West Sulawesi", "West Sumatra", "Yogyakarta"],
        "Iran": ["Alborz", "Ardabil", "Bushehr", "Chaharmahal and Bakhtiari", "East Azerbaijan", "Esfahan", "Fars", "Gilan", "Golestan", "Hamadan", "Hormozgan", "Ilam", "Kerman", "Kermanshah", "Khorasan, North", "Khorasan, Razavi", "Khorasan, South", "Kohgiluyeh and Boyer-Ahmad", "Kurdistan", "Lorestan", "Markazi", "Mazandaran", "Qazvin", "Qom", "Semnan", "Sistan and Baluchestan", "Tehran", "West Azerbaijan", "Yazd", "Zanjan"],
        "Iraq": ["Al Anbar", "Al Basrah", "Al Muthanna", "Al-Qādisiyyah", "An Najaf", "Arbil", "As Sulaymaniyah", "Babil", "Baghdad", "Dhi Qar", "Diyala", "Karbala'", "Kirkuk", "Maysan", "Ninawa", "Salah ad Din", "Wasit"],
        "Ireland": ["Carlow", "Cavan", "Clare", "Cork", "Donegal", "Dublin", "Galway", "Kerry", "Kildare", "Kilkenny", "Laois", "Leitrim", "Limerick", "Longford", "Louth", "Mayo", "Meath", "Monaghan", "Offaly", "Roscommon", "Sligo", "Tipperary", "Waterford", "Westmeath", "Wexford", "Wicklow"],
        "Israel": ["Central", "Haifa", "Jerusalem", "Northern", "Southern", "Tel Aviv"],
        "Italy": ["Abruzzo", "Basilicata", "Calabria", "Campania", "Emilia-Romagna", "Friuli-Venezia Giulia", "Lazio", "Liguria", "Lombardia", "Marche", "Molise", "Piemonte", "Puglia", "Sardegna", "Sicilia", "Toscana", "Trentino-Alto Adige", "Umbria", "Valle d'Aosta", "Veneto"],
        "Japan": ["Aichi", "Akita", "Aomori", "Chiba", "Ehime", "Fukui", "Fukuoka", "Fukushima", "Gifu", "Gunma", "Hiroshima", "Hokkaido", "Hyogo", "Ibaraki", "Ishikawa", "Iwate", "Kagawa", "Kagoshima", "Kanagawa", "Kochi", "Kumamoto", "Kyoto", "Mie", "Miyagi", "Miyazaki", "Nagano", "Nagasaki", "Nara", "Niigata", "Oita", "Okayama", "Okinawa", "Osaka", "Saga", "Saitama", "Shiga", "Shimane", "Shizuoka", "Tochigi", "Tokushima", "Tokyo", "Tottori", "Toyama", "Wakayama", "Yamagata", "Yamaguchi", "Yamanashi"],
        "Malaysia": ["Johor", "Kedah", "Kelantan", "Kuala Lumpur", "Labuan", "Melaka", "Negeri Sembilan", "Pahang", "Perak", "Perlis", "Pulau Pinang", "Putrajaya", "Sabah", "Sarawak", "Selangor", "Terengganu", "WP Kuala Lumpur", "WP Labuan", "WP Putrajaya"],
        "Mexico": ["Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas", "Chihuahua", "Coahuila", "Colima", "Distrito Federal", "Durango", "Estado de Mexico", "Guanajuato", "Guerrero", "Hidalgo", "Jalisco", "Michoacan", "Morelos", "Nayarit", "Nuevo Leon", "Oaxaca", "Puebla", "Queretaro", "Quintana Roo", "San Luis Potosi", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatan", "Zacatecas"],
        "Netherlands": ["Drenthe", "Flevoland", "Friesland", "Gelderland", "Groningen", "Limburg", "Noord-Brabant", "Noord-Holland", "Overijssel", "Utrecht", "Zeeland", "Zuid-Holland"],
        "New Zealand": ["Auckland", "Bay of Plenty", "Canterbury", "Gisborne", "Hawke's Bay", "Manawatu-Wanganui", "Marlborough", "Nelson", "Northland", "Otago", "Southland", "Taranaki", "Waikato", "Wellington", "Westland"],
        "Nigeria": ["Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Federal Capital Territory", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"],
        "Norway": ["Akershus", "Aust-Agder", "Buskerud", "Finnmark", "Hedmark", "Hordaland", "More og Romsdal", "Nordland", "Nord-Trondelag", "Oppland", "Oslo", "Ostfold", "Rogaland", "Sogn og Fjordane", "Sor-Trondelag", "Telemark", "Troms", "Vest-Agder", "Vestfold"],
        "Pakistan": ["Azad Kashmir", "Balochistan", "Federally Administered Tribal Areas", "Gilgit-Baltistan", "Islamabad Capital Territory", "Khyber Pakhtunkhwa", "Punjab", "Sindh"],
        "Philippines": ["Abra", "Agusan del Norte", "Agusan del Sur", "Aklan", "Albay", "Antique", "Apayao", "Aurora", "Basilan", "Bataan", "Batanes", "Batangas", "Benguet", "Biliran", "Bohol", "Bukidnon", "Bulacan", "Cagayan", "Camarines Norte", "Camarines Sur", "Camiguin", "Capiz", "Catanduanes", "Cavite", "Cebu", "Cotabato", "Davao del Norte", "Davao del Sur", "Davao Oriental", "Davao Occidental", "Dinagat Islands", "Eastern Samar", "Guimaras", "Ifugao", "Ilocos Norte", "Ilocos Sur", "Iloilo", "Isabela", "Kalinga", "La Union", "Laguna", "Lanao del Norte", "Lanao del Sur", "Leyte", "Maguindanao", "Marinduque", "Masbate", "Metro Manila", "Misamis Occidental", "Misamis Oriental", "Mountain Province", "Negros Occidental", "Negros Oriental", "Northern Samar", "Nueva Ecija", "Nueva Vizcaya", "Occidental Mindoro", "Oriental Mindoro", "Palawan", "Pampanga", "Pangasinan", "Quezon", "Quirino", "Rizal", "Romblon", "Samar", "Sarangani", "Siquijor", "Sorsogon", "South Cotabato", "Southern Leyte", "Sultan Kudarat", "Sulu", "Surigao del Norte", "Surigao del Sur", "Tarlac", "Tawi-Tawi", "Zambales", "Zamboanga del Norte", "Zamboanga del Sur", "Zamboanga Sibugay"],
        "Poland": ["Dolnoslaskie", "Kujawsko-Pomorskie", "Lubelskie", "Lubuskie", "Lodzkie", "Malopolskie", "Mazowieckie", "Opolskie", "Podkarpackie", "Podlaskie", "Pomorskie", "Slaskie", "Swietokrzyskie", "Warminsko-Mazurskie", "Wielkopolskie", "Zachodniopomorskie"],
        "Portugal": ["Acores", "Alentejo", "Algarve", "Centro", "Lisboa", "Madeira", "Norte"],
        "Qatar": ["Ad Dawhah", "Al Ghuwayriyah", "Al Jumayliyah", "Al Khawr", "Al Wakrah", "Ar Rayyan", "Ash Shamal", "Umm Salal"],
        "Romania": ["Alba", "Arad", "Arges", "Bacau", "Bihor", "Bistrita-Nasaud", "Botosani", "Braila", "Brasov", "Bucuresti", "Buzau", "Calarasi", "Caras-Severin", "Cluj", "Constanta", "Covasna", "Dambovita", "Dolj", "Galati", "Giurgiu", "Gorj", "Harghita", "Hunedoara", "Ialomita", "Iasi", "Ilfov", "Maramures", "Mehedinti", "Mures", "Neamt", "Olt", "Prahova", "Salaj", "Satu Mare", "Sibiu", "Suceava", "Teleorman", "Timis", "Tulcea", "Valcea", "Vaslui", "Vrancea"],
        "Russia": ["Adygeya", "Altai", "Altayskiy Kray", "Amur", "Arkhangel'sk", "Astrakhan'", "Bashkortostan", "Belgorod", "Bryansk", "Buryat", "Chechnya", "Chelyabinsk", "Chita", "Chukotka", "Chuvashia", "Dagestan", "Evenk", "Ingushetiya", "Irkutsk", "Ivanovo", "Kabardin-Balkar", "Kaliningrad", "Kalmyk", "Kaluga", "Kamchatka", "Karachay-Cherkess", "Karelia", "Kemerovo", "Khabarovsk", "Khakass", "Khanty-Mansiy", "Kirov", "Komi", "Komi-Permyak", "Koryak", "Kostroma", "Krasnodar", "Krasnoyarsk", "Kurgan", "Kursk", "Leningrad", "Lipetsk", "Magadan", "Mariy-El", "Mordovia", "Moscow City", "Moscow", "Murmansk", "Nenets", "Nizhegorod", "Novgorod", "Novosibirsk", "Omsk", "Orenburg", "Orel", "Penza", "Perm'", "Primor'ye", "Pskov", "Rostov", "Ryazan'", "Sakha", "Sakhalin", "Samara", "Saint Petersburg City", "Saratov", "Smolensk", "Stavropol'", "Sverdlovsk", "Tambov", "Tatarstan", "Taymyr", "Tomsk", "Tula", "Tver'", "Tyumen'", "Tyva", "Udmurt", "Ulyanovsk", "Vladimir", "Volgograd", "Vologda", "Voronezh", "Yamal-Nenets", "Yaroslavl'", "Yevrey"],
        "Saudi Arabia": ["Al Bahah", "Al Hudud ash Shamaliyah", "Al Jawf", "Al Madinah", "Al Qasim", "Ar Riyad", "Ash Sharqiyah", "Asir", "Ha'il", "Jizan", "Makkah", "Najran", "Tabuk"],
        "Singapore": ["Central Singapore", "North East", "North West", "South East", "South West"],
        "South Africa": ["Eastern Cape", "Free State", "Gauteng", "KwaZulu-Natal", "Limpopo", "Mpumalanga", "Northern Cape", "North West", "Western Cape"],
        "South Korea": ["Busan", "Chungcheongbuk-do", "Chungcheongnam-do", "Daegu", "Daejeon", "Gangwon-do", "Gwangju", "Gyeonggi-do", "Gyeongsangbuk-do", "Gyeongsangnam-do", "Incheon", "Jeju-do", "Jeollabuk-do", "Jeollanam-do", "Seoul", "Ulsan"],
        "Spain": ["Andalucia", "Aragon", "Asturias", "Baleares", "Canarias", "Cantabria", "Castilla y Leon", "Castilla-La Mancha", "Cataluna", "Comunidad Valenciana", "Extremadura", "Galicia", "La Rioja", "Madrid", "Murcia", "Navarra", "Pais Vasco"],
        "Sweden": ["Blekinge", "Dalarna", "Gotland", "Halland", "Jamtland", "Jonkoping", "Kalmar", "Kronoberg", "Norrbotten", "Orebro", "Ostergotland", "Skane", "Sodermanland", "Stockholm", "Uppsala", "Varmland", "Vasterbotten", "Vasternorrland", "Vastmanland", "Vastra Gotaland"],
        "Switzerland": ["Aargau", "Appenzell Ausser-Rhoden", "Appenzell Inner-Rhoden", "Basel-Landschaft", "Basel-Stadt", "Bern", "Fribourg", "Genf", "Glarus", "Graubunden", "Jura", "Luzern", "Neuenburg", "Nidwalden", "Obwalden", "Sankt Gallen", "Schaffhausen", "Schwyz", "Solothurn", "Thurgau", "Ticino", "Uri", "Valais", "Vaud", "Zug", "Zurich"],
        "Thailand": ["Amnat Charoen", "Ang Thong", "Buri Ram", "Chachoengsao", "Chai Nat", "Chaiyaphum", "Chanthaburi", "Chiang Mai", "Chiang Rai", "Chon Buri", "Chumphon", "Kalasin", "Kamphaeng Phet", "Kanchanaburi", "Khon Kaen", "Krabi", "Krung Thep Mahanakhon", "Lampang", "Lamphun", "Loei", "Lop Buri", "Mae Hong Son", "Maha Sarakham", "Mukdahan", "Nakhon Nayok", "Nakhon Pathom", "Nakhon Phanom", "Nakhon Ratchasima", "Nakhon Sawan", "Nakhon Si Thammarat", "Nan", "Narathiwat", "Nong Bua Lam Phu", "Nong Khai", "Nonthaburi", "Pathum Thani", "Pattani", "Phangnga", "Phatthalung", "Phayao", "Phetchabun", "Phetchaburi", "Phichit", "Phra Nakhon Si Ayutthaya", "Phrae", "Phuket", "Prachin Buri", "Prachuap Khiri Khan", "Ranong", "Ratchaburi", "Rayong", "Roi Et", "Sa Kaeo", "Sakon Nakhon", "Samut Prakan", "Samut Sakhon", "Samut Songkhram", "Saraburi", "Satun", "Si Sa Ket", "Sing Buri", "Songkhla", "Sukhothai", "Suphan Buri", "Surat Thani", "Surin", "Tak", "Trang", "Trat", "Ubon Ratchathani", "Udon Thani", "Uthai Thani", "Uttaradit", "Yala", "Yasothon"],
        "Turkey": ["Adana", "Adiyaman", "Afyonkarahisar", "Agri", "Aksaray", "Amasya", "Ankara", "Antalya", "Ardahan", "Artvin", "Aydin", "Balikesir", "Bartin", "Batman", "Bayburt", "Bilecik", "Bingol", "Bitlis", "Bolu", "Burdur", "Bursa", "Canakkale", "Cankiri", "Corum", "Denizli", "Diyarbakir", "Duzce", "Edirne", "Elazig", "Erzincan", "Erzurum", "Eskisehir", "Gaziantep", "Giresun", "Gumushane", "Hakkari", "Hatay", "Igdir", "Isparta", "Istanbul", "Izmir", "Kahramanmaras", "Karabuk", "Karaman", "Kars", "Kastamonu", "Kayseri", "Kilis", "Kirikkale", "Kirklareli", "Kirsehir", "Kocaeli", "Konya", "Kutahya", "Malatya", "Manisa", "Mardin", "Mersin", "Mugla", "Mus", "Nevsehir", "Nigde", "Ordu", "Osmaniye", "Rize", "Sakarya", "Samsun", "Sanliurfa", "Siirt", "Sinop", "Sirnak", "Sivas", "Tekirdag", "Tokat", "Trabzon", "Tunceli", "Usak", "Van", "Yalova", "Yozgat", "Zonguldak"],
        "Ukraine": ["Cherkasy", "Chernihiv", "Chernivtsi", "Crimea", "Dnipropetrovs'k", "Donets'k", "Ivano-Frankivs'k", "Kharkiv", "Kherson", "Khmel'nyts'kyy", "Kirovohrad", "Kiev", "Kiev City", "Kirovohrad", "Luhans'k", "L'viv", "Mykolayiv", "Odessa", "Poltava", "Rivne", "Sevastopol'", "Sumy", "Ternopil'", "Vinnytsya", "Volyn'", "Zakarpattya", "Zaporizhzhya", "Zhytomyr"],
        "United Arab Emirates": ["Abu Dhabi", "Ajman", "Dubai", "Fujairah", "Ras al-Khaimah", "Sharjah", "Umm al-Qaiwain"],
        "United Kingdom": ["England", "Northern Ireland", "Scotland", "Wales"],
        "United States": ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"],
        "Vietnam": ["An Giang", "Ba Ria-Vung Tau", "Bac Giang", "Bac Kan", "Bac Lieu", "Bac Ninh", "Ben Tre", "Binh Dinh", "Binh Duong", "Binh Phuoc", "Binh Thuan", "Ca Mau", "Can Tho", "Cao Bang", "Da Nang", "Dak Lak", "Dak Nong", "Dien Bien", "Dong Nai", "Dong Thap", "Gia Lai", "Ha Giang", "Ha Nam", "Ha Noi", "Ha Tay", "Ha Tinh", "Hai Duong", "Hai Phong", "Ho Chi Minh", "Hoa Binh", "Hung Yen", "Khanh Hoa", "Kien Giang", "Kon Tum", "Lai Chau", "Lam Dong", "Lang Son", "Lao Cai", "Long An", "Nam Dinh", "Nghe An", "Ninh Binh", "Ninh Thuan", "Phu Tho", "Phu Yen", "Quang Binh", "Quang Nam", "Quang Ngai", "Quang Ninh", "Quang Tri", "Soc Trang", "Son La", "Tay Ninh", "Thai Binh", "Thai Nguyen", "Thanh Hoa", "Thua Thien-Hue", "Tien Giang", "Tra Vinh", "Tuyen Quang", "Vinh Long", "Vinh Phuc", "Yen Bai"]
    };
    const allCountries = Object.keys(countryStateData).sort();

    // --- Custom Dropdown Logic ---
    function closeAllDropdowns(except) {
        document.querySelectorAll('.custom-dropdown.open').forEach(dd => {
            if (dd !== except) dd.classList.remove('open');
        });
    }

    function setupCustomDropdown(dropdown, options, placeholder) {
        const selected = dropdown.querySelector('.custom-dropdown-selected');
        const list = dropdown.querySelector('.custom-dropdown-list');
        const hiddenInput = dropdown.querySelector('input[type="hidden"]');
        // Populate options
        list.innerHTML = '';
        options.forEach(opt => {
            const div = document.createElement('div');
            div.className = 'custom-dropdown-option';
            div.textContent = opt;
            div.tabIndex = 0;
            div.addEventListener('click', () => {
                selected.textContent = opt;
                hiddenInput.value = opt === placeholder ? '' : opt;
                list.querySelectorAll('.active').forEach(a => a.classList.remove('active'));
                div.classList.add('active');
                dropdown.classList.remove('open');
            });
            div.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    div.click();
                }
            });
            list.appendChild(div);
        });
        // Placeholder
        selected.textContent = placeholder;
        hiddenInput.value = '';
        // Open/close logic
        selected.onclick = () => {
            const isOpen = dropdown.classList.contains('open');
            closeAllDropdowns(dropdown);
            dropdown.classList.toggle('open', !isOpen);
        };
        dropdown.addEventListener('blur', () => {
            setTimeout(() => dropdown.classList.remove('open'), 100);
        });
    }

    // Custom dropdowns for state/country
    const stateDropdown = document.getElementById('state-dropdown');
    const countryDropdown = document.getElementById('country-dropdown');
    const industryDropdown = document.getElementById('industry-dropdown');
    const applicationTypeDropdown = document.getElementById('applicationType-dropdown');

    // Populate country dropdown
    setupCustomDropdown(
        countryDropdown,
        ["Select your Country", ...allCountries],
        "Select your Country"
    );
    // Populate state dropdown (default empty)
    setupCustomDropdown(
        stateDropdown,
        ["Select your State/Region"],
        "Select your State/Region"
    );
    // Populate industry and application type (already static in HTML)
    // Add open/close logic for those
    [industryDropdown, applicationTypeDropdown].forEach(dropdown => {
        const selected = dropdown.querySelector('.custom-dropdown-selected');
        const list = dropdown.querySelector('.custom-dropdown-list');
        const hiddenInput = dropdown.querySelector('input[type="hidden"]');
        list.querySelectorAll('.custom-dropdown-option').forEach(opt => {
            opt.addEventListener('click', () => {
                selected.textContent = opt.textContent;
                hiddenInput.value = opt.textContent;
                list.querySelectorAll('.active').forEach(a => a.classList.remove('active'));
                opt.classList.add('active');
                dropdown.classList.remove('open');
            });
            opt.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    opt.click();
                }
            });
        });
        selected.onclick = () => {
            const isOpen = dropdown.classList.contains('open');
            closeAllDropdowns(dropdown);
            dropdown.classList.toggle('open', !isOpen);
        };
        dropdown.addEventListener('blur', () => {
            setTimeout(() => dropdown.classList.remove('open'), 100);
        });
    });
    // Country/state linkage
    countryDropdown.querySelector('.custom-dropdown-list').addEventListener('click', function(e) {
        const val = countryDropdown.querySelector('input[type="hidden"]').value;
        if (countryStateData[val]) {
            setupCustomDropdown(
                stateDropdown,
                ["Select your State/Region", ...countryStateData[val]],
                "Select your State/Region"
            );
        } else {
            setupCustomDropdown(
                stateDropdown,
                ["Select your State/Region"],
                "Select your State/Region"
            );
        }
    });
    // Close dropdowns on outside click
    document.addEventListener('mousedown', function(e) {
        if (!e.target.closest('.custom-dropdown')) {
            closeAllDropdowns();
        }
    });
}); 