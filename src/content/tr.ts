import type { HomeContent } from "./types";

/** Turkish copy, adapted from https://tahsilet.ai/ and focused on AI-driven collections. */
export const tr: HomeContent = {
  locale: "tr",
  meta: {
    title: "Tahsilet.AI — Yapay Zeka Destekli Tahsilat Platformu",
    description:
      "Tahsilet.AI, orta ölçekli Türk ihracatçı ve imalatçı şirketler için e-Fatura'yla doğrudan konuşan, KVKK ve İYS'ye uygun yapay zeka tahsilat platformudur.",
  },
  brand: { name: "Tahsilet", suffix: ".AI", homeLabel: "Tahsilet.AI ana sayfa" },
  contactEmail: "nalbantogluhuseyin@gmail.com",
  announcement: { label: "Erken erişim programımız başladı — Tahsilet.AI'ı işletmenizle tanıştırın", href: "#contact" },
  nav: {
    label: "Ana menü",
    items: [
      {
        label: "Ürün",
        columns: [
          [
            {
              label: "Tahsilat Motoru",
              description: "Alacaklarınızı sizin adınıza takip eden AI ajanı.",
              icon: "/assets/icons/nav/collections.svg",
              href: "#product",
            },
            {
              label: "e-Fatura Entegrasyonu",
              description: "Fatura ve vade bilgisi doğrudan GİB altyapısından.",
              icon: "/assets/icons/nav/payments.svg",
              href: "#why-tahsilet",
            },
          ],
          [
            {
              label: "Güven & Kontrol",
              description: "Ödeme bilgisine dokunmaz, her adımı kaydeder.",
              icon: "/assets/icons/nav/security.svg",
              href: "#trust",
            },
            {
              label: "Denetim İzi",
              description: "Her mesaj, arama ve yanıt kayıt altında.",
              icon: "/assets/icons/nav/disputes.svg",
              href: "#trust",
            },
          ],
        ],
      },
      { label: "Nasıl Çalışır", href: "#how-it-works" },
      { label: "Neden Tahsilet", href: "#why-tahsilet" },
      { label: "Güven & Kontrol", href: "#trust" },
      { label: "İletişim", href: "#contact" },
    ],
    demo: { label: "Demo İste", href: "#contact" },
    languageSwitch: { label: "EN", href: "/en", ariaLabel: "Switch to English" },
    openMenu: "Menüyü aç",
    closeMenu: "Menüyü kapat",
  },
  hero: {
    eyebrow: "Yapay zeka destekli tahsilat platformu",
    title: "İşletme sermayenizi serbest bırakın.",
    titleAccent: "Alacaklarınız zamanında tahsil edilsin.",
    body: "Tahsilet.AI, orta ölçekli Türk ihracatçı ve imalatçı şirketleri için tasarlanmış, e-Fatura'yla doğrudan konuşan bir yapay zeka tahsilat platformudur. Alacaklarınızı e-posta, WhatsApp ve sesli aramayla — sizin markanız adına, sizin kurallarınızla — takip eder.",
    secondaryCta: { label: "Nasıl Çalıştığını Gör", href: "#how-it-works" },
    emailPlaceholder: "İş e-postanız",
    emailLabel: "İş e-posta adresi",
    submitLabel: "Demo İste",
    formLabel: "Demo talebi",
    blockedEmailMessage: "Lütfen şirket e-posta adresinizi kullanın.",
    mailtoOpened: "E-posta uygulamanız açıldı — mesajı göndermeniz yeterli. Açılmadıysa bize şu adresten yazın:",
    badges: ["e-Fatura / e-Arşiv uyumlu", "KVKK & İYS'ye göre tasarlandı", "Türkiye için tasarlandı"],
    bubbleLines: [
      "Siz uyurken vadesi geçen 47 faturanın peşine düştüm!",
      "Bugün ABC firması ödeme gönderdi.",
      "WhatsApp hatırlatması gitti, yanıt bekleniyor.",
      "Vade +7 gün: kanal değiştirdim, WhatsApp'tan yazdım.",
    ],
  },
  references: {
    eyebrow: "Referanslarımız",
    title: "Bize güvenen şirketler",
    companies: ["Nalbantoğlu Metal", "Apesan", "Teknik Mukavva", "Özkuruşlar Market", "NewInn"],
  },
  metrics: {
    eyebrow: "Neden şimdi",
    stats: [
      {
        value: "%33",
        label: "Türkiye'deki işletmelerin yaklaşık üçte biri, finansmana erişimi en büyük engel olarak görüyor.",
        source: "Kaynak: Dünya Bankası verileri",
      },
      {
        value: "↑",
        label: "Tahsilat vadeleri uzuyor, işletme sermayesi üzerindeki baskı artıyor — özellikle ihracatçı ve imalatçı firmalarda.",
        source: "Kaynak: Sektör gözlemleri, 2026",
      },
      {
        value: "0",
        label: "Araştırdığımız uluslararası rakiplerin hiçbiri Türkiye'ye özel — e-Fatura, TL ya da Türk ERP'lerine göre çalışmıyor.",
        source: "Kaynak: Tahsilet.AI rekabet araştırması, Ağustos 2026",
      },
    ],
    callout: "Türkiye'nin kurallarına göre inşa ediyoruz.",
  },
  howItWorks: {
    id: "how-it-works",
    eyebrow: "Nasıl çalışır",
    title: "Sizin belirlediğiniz akış, yapay zekanın yürüttüğü tahsilat",
    body: "Tahsilat Motoru; alacaklarınızı e-posta, WhatsApp ve sesli arama ile, sizin markanız adına ve sizin belirlediğiniz kurallar çerçevesinde otomatik olarak takip eder.",
    steps: [
      {
        title: "Akışı siz tasarlarsınız",
        body: "Hangi hatırlatmanın hangi kanalda, kaç gün arayla gideceğine siz karar verirsiniz. E-posta, WhatsApp ve sesli aramayı istediğiniz sırayla kurgulayın.",
      },
      {
        title: "e-Fatura'dan doğrudan beslenir",
        body: "Fatura, vade ve ödeme durumu bilgisi doğrudan e-Fatura/e-Arşiv altyapısından gelir — hangi muhasebe yazılımını kullandığınız fark etmeksizin.",
      },
      {
        title: "Sınırlar sizin elinizde değil, sistemde",
        body: "Ne kadar agresif bir akış kurgularsanız kurgulayın, iletişim sıklığı için platform seviyesinde bir üst sınır vardır — KVKK'nın \"ölçülülük\" ilkesine uygun şekilde.",
      },
    ],
    flow: {
      title: "Örnek akış",
      badge: "Yapılandırılabilir",
      steps: [
        { when: "Vade -3 gün", channel: "E-posta" },
        { when: "Vade +3 gün", channel: "E-posta" },
        { when: "Vade +7 gün", channel: "WhatsApp" },
        { when: "Vade +10 gün", channel: "E-posta + WhatsApp" },
        { when: "Vade +14 gün", channel: "Sesli Arama" },
      ],
      caption: "Her adım, bir önceki adıma yanıt gelmezse devreye girer.",
    },
  },
  capabilities: {
    id: "product",
    eyebrow: "Tahsilat Motoru — her kanalda, sizin kurallarınızla",
    items: [
      {
        title: "E-posta",
        description: "Vade öncesinde ve sonrasında, sizin markanız ve tonunuzla kişiselleştirilmiş hatırlatmalar gönderir.",
      },
      {
        title: "WhatsApp",
        description: "Türkiye'de B2B iletişimin en doğal kanalını akışa dahil eder — rakiplerimizin göz ardı ettiği kanal.",
      },
      {
        title: "Sesli Arama",
        description: "AI ajanı, lisanslı yerel operatörler üzerinden müşterinizi arar; ödeme bilgisi almaz, hassas adımları ekibinize yönlendirir.",
      },
      {
        title: "e-Fatura",
        description: "Fatura, vade ve ödeme durumu GİB'in e-Fatura/e-Arşiv altyapısından gelir; ekstra bir IT projesi gerekmez.",
      },
      {
        title: "Denetim İzi",
        description: "Gönderilen her mesaj, yapılan her arama ve alınan her yanıt kayıt altında — gerektiğinde ispat edebilirsiniz.",
      },
      {
        title: "İnsan Devrede",
        description: "Sistemin karar veremediği ya da itiraz edilen her durum, önceden belirlenen sürede ekibinize yönlendirilir.",
      },
    ],
  },
  why: {
    id: "why-tahsilet",
    eyebrow: "Neden Tahsilet",
    title: "Genel amaçlı değil, Türkiye için.",
    body: "İncelediğimiz uluslararası rakiplerin hiçbiri e-Fatura'ya, Türk ERP'lerine ya da KVKK/İYS mevzuatına göre tasarlanmadı. Biz sıfırdan Türkiye için inşa ediyoruz.",
    steps: [
      {
        title: "e-Fatura / e-Arşiv doğal entegrasyon",
        body: "Hangi muhasebe yazılımını (Logo, Netsis, Mikro, Paraşüt) kullanırsanız kullanın, veri temeliniz GİB'in e-Fatura/e-Arşiv altyapısı — genel amaçlı bir araç gibi değil.",
      },
      {
        title: "WhatsApp, göz ardı edilmeyen bir kanal",
        body: "İncelediğimiz rakiplerin hiçbiri WhatsApp kullanmıyor — hepsi e-posta/SMS/sesli arama odaklı. Türkiye'de B2B iletişimin en doğal kanalını biz de akışa dahil ediyoruz.",
      },
      {
        title: "Yerli altyapı, yerli güven",
        body: "Sesli arama ve mesajlaşma altyapımızı Netgsm gibi lisanslı yerel operatörler üzerinden kuruyoruz — çağrılarınız güvenilir, yerel bir hat üzerinden gider.",
      },
    ],
    mocks: {
      einvoice: {
        title: "e-Fatura senkronu",
        source: "GİB e-Fatura / e-Arşiv",
        rows: [
          { company: "Demir Makina A.Ş.", invoice: "TSL2026000184", status: "Ödendi", tone: "ok" },
          { company: "ABC Ltd.", invoice: "TSL2026000191", status: "Vade +3", tone: "due" },
          { company: "Ege Tekstil", invoice: "TSL2026000207", status: "Vade +14", tone: "late" },
          { company: "Kuzey Ambalaj", invoice: "TSL2026000212", status: "Vade -3", tone: "due" },
        ],
      },
      whatsapp: {
        contact: "Muhasebe — ABC Ltd.",
        online: "çevrimiçi",
        outgoing:
          "Merhaba, 12.450 TL tutarındaki TSL2026000191 numaralı faturanızın vadesi 3 gün önce doldu. Ödeme planınızı paylaşabilir misiniz?",
        incoming: "Merhaba, ödeme bu hafta Cuma günü yapılacak. 👍",
        time: "10:42",
      },
      voice: {
        title: "Sesli arama",
        line: "Yerel hat · Netgsm",
        status: "Görüşme sürüyor",
        transcript: [
          "AI ajanı: Vadesi geçen faturanız için arıyorum.",
          "Müşteri: İtirazımız var, yöneticinizle konuşmak istiyorum.",
        ],
        handoff: "İtiraz algılandı → ekibinize yönlendirildi",
      },
    },
  },
  eat: { label: "Tahsilet faturaları sizin için takip ediyor" },
  trust: {
    id: "trust",
    eyebrow: "Güven & kontrol",
    title: "Yapay zeka, paranıza dokunmadan çalışır",
    body: "Bir AI ajanının müşterilerinizle sizin adınıza konuşması büyük bir güven adımı. Bu yüzden sistemi en baştan kontrol edilebilir ve denetlenebilir tasarlıyoruz.",
    cards: [
      {
        title: "Ödeme bilgisine dokunmaz",
        body: "Sesli ajan, hiçbir koşulda ödeme bilgisi almaz ya da bağlayıcı bir taahhütte bulunmaz — her hassas adım bir insana yönlendirilir.",
        icon: "/assets/icons/nav/security.svg",
        tag: "Güvenlik",
      },
      {
        title: "Her adım kayıt altında",
        body: "Gönderilen her mesaj, yapılan her arama ve alınan her yanıt tam bir denetim izinde tutulur — siz de görebilirsiniz, gerektiğinde ispat da edebilirsiniz.",
        icon: "/assets/icons/nav/disputes.svg",
        tag: "Denetim",
      },
      {
        title: "Sıklık her zaman sınırlı",
        body: "Platform, iletişim sıklığına sabit bir üst sınır koyar — hiçbir akış yapılandırması bu sınırı aşamaz. KVKK'nın ölçülülük ilkesi ürün seviyesinde uygulanır.",
        icon: "/assets/icons/nav/credit.svg",
        tag: "KVKK & İYS",
      },
      {
        title: "İnsan her zaman devrede",
        body: "Sistemin karar veremediği ya da itiraz edilen her durum, önceden belirlenmiş bir süre içinde sizin ekibinize yönlendirilir — hiçbir istisna sessizce kaybolmaz.",
        icon: "/assets/icons/nav/collections.svg",
        tag: "Kontrol",
      },
    ],
    prev: "Önceki",
    next: "Sonraki",
    carouselLabel: "Güven ve kontrol ilkeleri",
  },
  audience: {
    eyebrow: "Kimler için",
    title: "Orta ölçekli ihracatçı ve imalatçı şirketler için",
    body: "Tahsilet.AI, ilk olarak kendi sektöründe benzer sorunları yaşayan şirketler için tasarlanıyor.",
    items: [
      { value: "200M+ TL", label: "Yıllık ciro" },
      { value: "İhracat / İmalat", label: "Ağırlıklı B2B müşteri tabanı" },
      { value: "Düzenli Faturalama", label: "e-Fatura / e-Arşiv kullanan" },
      { value: "Manuel Süreç", label: "Bugün tahsilatı Excel/telefonla takip eden" },
    ],
  },
  integrations: {
    eyebrow: "Entegrasyonlar",
    title: "ERP / Muhasebe sistemleriyle entegre",
    body: "Hangi muhasebe ya da ERP yazılımını kullanıyorsanız kullanın, Tahsilet.AI faturalarınızı ve tahsilat verilerinizi tek tıkla senkronize eder — ekstra bir IT projesine ya da veri aktarımına gerek kalmadan.",
    systems: ["SAP", "Logo", "Mikro", "Uyumsoft", "Netsis", "Luca", "Dia", "Canias", "Rota", "Nebim"],
  },
  faq: {
    eyebrow: "Sık sorulanlar",
    title: "Tahsilet.AI'a geçmeden önce sorulanlar",
    body: "Yapay zekanın müşterilerinizle sizin adınıza konuşmasına dair bilmeniz gerekenler.",
    items: [
      {
        question: "Hangi ERP ve muhasebe yazılımlarıyla çalışıyor?",
        answer:
          "SAP, Logo, Mikro, Uyumsoft, Netsis, Luca, Dia, Canias, Rota ve Nebim dahil kullandığınız sistemle çalışır. Veri temeli GİB'in e-Fatura/e-Arşiv altyapısı olduğu için ekstra bir IT projesi gerekmez.",
      },
      {
        question: "Müşterilerimle hangi kanallardan iletişim kuruyor?",
        answer:
          "E-posta, WhatsApp ve sesli arama. Hangi hatırlatmanın hangi kanalda, kaç gün arayla gideceğine siz karar verirsiniz.",
      },
      {
        question: "AI ajanı ödeme bilgisi alıyor mu?",
        answer:
          "Hayır. Sesli ajan hiçbir koşulda ödeme bilgisi almaz ya da bağlayıcı bir taahhütte bulunmaz; her hassas adım bir insana yönlendirilir.",
      },
      {
        question: "KVKK ve İYS'ye uygun mu?",
        answer:
          "Evet, sistem KVKK ve İYS mevzuatına göre tasarlandı. İletişim sıklığına platform seviyesinde sabit bir üst sınır konur; hiçbir akış bu sınırı aşamaz.",
      },
      {
        question: "Sistem karar veremezse ne oluyor?",
        answer:
          "Karar verilemeyen ya da itiraz edilen her durum, önceden belirlenmiş bir süre içinde ekibinize yönlendirilir. Hiçbir istisna sessizce kaybolmaz.",
      },
    ],
  },
  cta: {
    id: "contact",
    eyebrow: "Erken erişim",
    title: "Tahsilet.AI'ı işletmenizle tanıştırın",
    body: "Süreçlerinizi birlikte inceleyelim ve Tahsilet.AI'ın tahsilatınıza nasıl değer katacağını gösterelim. Bize ulaşın, birlikte konuşalım.",
    button: "E-posta ile ulaşın",
  },
  footer: {
    navLabel: "Alt menü",
    languageTitle: "Dil",
    tagline: "Türkiye'deki orta ölçekli ihracatçı ve imalatçı şirketler için yapay zeka destekli tahsilat.",
    columns: [
      {
        title: "Ürün",
        links: [
          { label: "Tahsilat Motoru", href: "#product" },
          { label: "Nasıl Çalışır", href: "#how-it-works" },
          { label: "Entegrasyonlar", href: "#integrations" },
        ],
      },
      {
        title: "Şirket",
        links: [
          { label: "Neden Tahsilet", href: "#why-tahsilet" },
          { label: "Güven & Kontrol", href: "#trust" },
          { label: "İletişim", href: "#contact" },
        ],
      },
    ],
    rights: "Tahsilet.AI — Tüm hakları saklıdır.",
    madeIn: "Türkiye için, Türkiye'de yapıldı.",
  },
  aiLabel: { label: "Tahsilet'i yapay zekayla keşfedin", ask: "{name} ile Tahsilet'i sorun" },
};
