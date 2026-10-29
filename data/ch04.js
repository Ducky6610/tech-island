window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTERS[4] = {
  id: 4,
  title: "系統平台的組成架構－軟體與網路",
  icon: "☁️",
  summary: "認識系統軟體與應用軟體的分類與常見作業系統，了解區域網路、廣域網路與網際網路，並掌握雲端服務 IaaS、PaaS、SaaS 三層架構。",
  sections: [
    {
      code: "4-1.1",
      title: "系統軟體：作業系統、公用程式、語言翻譯程式",
      points: [
        "軟體（software）是以程式語言撰寫而成的程式，依用途分為「系統軟體」與「應用軟體」兩大類。",
        "作業系統（OS）負責協調及管理電腦軟、硬體資源的運作，作為使用者與電腦硬體之間的溝通橋樑。",
        "常見作業系統：Windows（微軟，跨平台）、UNIX（貝爾實驗室以C語言開發，可攜性佳，多用於大型電腦）、Linux（Linus Torvalds以UNIX為基礎發展，開放原始碼，衍生版有Red Hat、Fedora、Ubuntu）、macOS（蘋果電腦專用，率先使用GUI、色彩校正完善）、Android（Google基於Linux核心開發的開放原始碼系統，若要用Play商店等Google服務須取得授權）、iOS（蘋果行動裝置專用，僅能從App Store下載，屬封閉系統）。",
        "作業系統依人數與工作數分為：單人單工（MS-DOS）、單人多工（Windows、macOS、Android、iOS）、多人多工（Unix、Linux、Windows Server）。",
        "公用程式（工具程式）用來維護及支援電腦運作：磁碟清理、磁碟檢查錯誤、修復磁碟機、重組並最佳化磁碟機（將分散各磁區的資料存於連續磁區以加快存取）、磁碟格式化、磁碟備份、系統還原、驅動程式（讓作業系統能辨識、管理與操控硬體設備）。",
        "語言翻譯程式（如直譯器、編譯器，Linux內建的GCC）：將人撰寫的程式轉換成電腦能識別的機器語言（machine language）。"
      ]
    },
    {
      code: "4-1.2",
      title: "應用軟體：套裝、專案開發與手機 App",
      points: [
        "應用軟體（application software）是為了處理或解決特定問題而開發的軟體，市售軟體概分為套裝軟體與專案開發軟體。",
        "套裝軟體：針對大多數使用者的需求而設計，如威力導演（影片剪輯）、Photoshop（影像處理）、CorelDRAW（圖形設計）、Microsoft Office 與 OpenOffice（辦公室軟體）。",
        "專案開發軟體：針對特定機構或使用者的個別需求而設計，如校務行政系統、銀行存提款系統、餐廳點菜系統、台灣高鐵網路訂位系統。",
        "手機應用軟體泛稱 App（Application Software 簡稱），可從 Play 商店或 App Store 下載；雲端應用軟體（如 Pixlr、Google 文件、Google 地圖）則安裝在遠端伺服器，透過網路即可使用。"
      ]
    },
    {
      code: "4-2",
      title: "網路：LAN、WAN 與 Internet",
      points: [
        "傳播資訊除了硬體與軟體外，還需要「網路」連結傳輸；網路上負責提供各項服務的電腦稱為伺服器（server）或網路主機。",
        "區域網路（LAN，Local Area Network）：在限定範圍內（如公司行號、學校電腦教室、同一棟大樓辦公室）連接電腦、行動裝置與週邊設備，互相傳遞訊息並共用資訊設備。",
        "廣域網路（WAN，Wide Area Network）：在廣闊地理區域範圍內連接資訊設備，例如連結各地戶政機關的網路、跨國企業連結各地分公司的網路。",
        "網際網路（Internet）：由全球各地的網路連結而成、橫跨全世界的超大型廣域網路。"
      ]
    },
    {
      code: "4-3",
      title: "雲端服務與 IaaS、PaaS、SaaS 架構",
      points: [
        "系統平台可分為「使用者端」（使用者與其資訊設備）與「雲端」（網路中提供運算、儲存、資源分享、資料交換等資源的軟硬體及網路設備；工程師繪圖常用雲朵代表網路而得名）。",
        "基礎建設即服務（IaaS，Infrastructure as a Service）：提供儲存設備、伺服器、網路建設、資安設備等基礎建設租借服務，透過虛擬化（Virtualization）技術打造專屬虛擬環境，可彈性加退租。例：Google、Amazon、中華電信、AT&T。",
        "平台即服務（PaaS，Platform as a Service）：提供軟體開發環境與工具（作業系統、軟體開發程式、資料庫系統等），可彈性租用系統資源進行開發、測試與執行。例：Oracle Cloud、Microsoft Azure、Amazon Web Services、Google App Engine。",
        "軟體即服務（SaaS，Software as a Service）：在雲端提供應用軟體服務，使用者透過瀏覽器或 App 連上雲端使用；大部分運算與資料儲存都在雲端伺服器完成，使用者設備硬體規格不高也能運行。例：Google 地圖、YouTube、Gmail、LINE。",
        "大型網路公司（如 Google）常同時提供 IaaS（全球機房）、PaaS（開發平台）與 SaaS（Gmail、Google 地圖等應用軟體）。"
      ]
    }
  ],
  terms: [
    { term: "作業系統（OS）", desc: "協調及管理電腦軟、硬體資源運作，作為使用者與電腦硬體間溝通橋樑的系統軟體。" },
    { term: "開放原始碼（Open Source）", desc: "開放軟體程式碼授權供他人複製、修改、使用，且修改後的程式碼也須公開；如 Linux、Android。" },
    { term: "驅動程式", desc: "屬於公用程式，用來讓作業系統能辨識、管理與操控硬體設備運作的程式。" },
    { term: "重組並最佳化磁碟機", desc: "將分散各磁區的檔案資料儲存於連續磁區，以加快磁碟存取速度的公用程式。" },
    { term: "區域網路（LAN）", desc: "在限定範圍內（如電腦教室、同棟大樓）連接資訊設備以傳遞訊息與共用設備的網路。" },
    { term: "廣域網路（WAN）", desc: "在廣闊地理區域範圍內連接資訊設備的網路；網際網路（Internet）是橫跨全球的超大型廣域網路。" },
    { term: "IaaS（基礎建設即服務）", desc: "Infrastructure as a Service，提供租借儲存、伺服器、網路、資安等雲端基礎設備的服務。" },
    { term: "PaaS（平台即服務）", desc: "Platform as a Service，提供租借包含作業系統、開發工具、資料庫等開發與執行程式平台的服務。" },
    { term: "SaaS（軟體即服務）", desc: "Software as a Service，提供使用者透過瀏覽器或 App 線上使用雲端應用程式的服務。" }
  ],
  keywords: ["系統軟體", "應用軟體", "作業系統", "Windows", "UNIX", "Linux", "macOS", "Android", "iOS", "開放原始碼", "單人單工", "單人多工", "多人多工", "公用程式", "磁碟重組", "驅動程式", "語言翻譯程式", "套裝軟體", "專案開發軟體", "區域網路", "LAN", "廣域網路", "WAN", "網際網路", "雲端服務", "虛擬化", "IaaS", "PaaS", "SaaS"],
  quiz: [
    {
      q: "下列關於常見作業系統的敘述，何者正確？",
      options: [
        "macOS 是單人單工作業系統，可安裝於一般個人電腦",
        "UNIX 是由 C 語言開發，系統可攜性佳；Linux 與 Android 皆屬於開放原始碼作業系統",
        "iOS 屬於開放原始碼系統，允許安裝任何來源的軟體",
        "MS-DOS 是多人多工作業系統"
      ],
      answer: 1,
      explain: "UNIX 由貝爾實驗室以 C 語言開發；Linux 與基於 Linux 核心的 Android 皆開放原始碼；MS-DOS 為單人單工，Windows/macOS/Android/iOS 為單人多工，Unix/Linux 為多人多工。"
    },
    {
      q: "個人電腦使用 Windows 作業系統一段時間後，儲存大檔案的效率漸漸變差。為改善存取效率，適合針對原磁碟機做下列何種處理？",
      options: ["磁碟清理", "重組並最佳化磁碟機", "磁碟檢查錯誤", "修復磁碟機"],
      answer: 1,
      explain: "「重組並最佳化磁碟機」可將分散在各磁區的資料儲存於連續磁區，加快磁碟存取速度。"
    },
    {
      q: "台灣高鐵的網路訂位系統、學校的校務行政系統，是針對特定機構需求而設計的軟體，屬於下列何種類型？",
      options: ["專案開發軟體", "套裝軟體", "公用程式", "語言翻譯程式"],
      answer: 0,
      explain: "針對特定機構或使用者的個別需求而設計的應用軟體稱為「專案開發軟體」；為大多數使用者設計的（如 Office、Photoshop）則為套裝軟體。"
    },
    {
      q: "Google 地圖（Google Maps）、YouTube、Gmail 等讓使用者透過瀏覽器或 App 直接連線使用的服務，屬於下列何種雲端服務模式？",
      options: ["IaaS（基礎建設即服務）", "PaaS（平台即服務）", "SaaS（軟體即服務）", "DaaS（桌面即服務）"],
      answer: 2,
      explain: "提供使用者線上使用應用程式的服務屬於 SaaS（Software as a Service）。"
    },
    {
      q: "方先生想自行開發 App 遊戲軟體，但沒有足夠經費建置伺服器作業系統、資料庫與軟體開發環境，他最適合租用哪一種雲端服務架構？",
      options: ["IaaS", "PaaS", "SaaS", "LAN"],
      answer: 1,
      explain: "PaaS（平台即服務，如 Oracle Cloud、Microsoft Azure）提供作業系統、軟體開發程式、資料庫系統等開發環境供開發者租用。"
    }
  ]
};
