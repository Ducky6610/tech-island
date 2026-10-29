window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTERS[8] = {
  id: 8,
  title: "工具程式與軟體開發程式",
  icon: "🧰",
  summary: "介紹PDF瀏覽、壓縮、檔案備份、筆記整理、語言翻譯、檔案救援等工具程式，以及軟體開發流程、程式語言與常見軟體開發程式。",
  sections: [
    {
      code: "8-1",
      title: "工具程式：PDF瀏覽軟體與壓縮軟體",
      points: [
        "工具程式（或稱工具軟體）包含PDF瀏覽、壓縮、檔案備份、筆記整理、語言翻譯、檔案救援等軟體。",
        "PDF（Portable Document Format）為可攜式文件格式，能精確保留電子文件原貌，常用於政府公文、大考試題等正式文件。",
        "常見免費PDF瀏覽軟體：Adobe Reader（最早開發的PDF瀏覽軟體）、Foxit Reader（軟體檔案小）；瀏覽軟體只能加註解，編輯PDF文字須用PDF編輯軟體（如Adobe Acrobat）。",
        "壓縮軟體將檔案中重複出現的資料以特定規則簡化表示，以節省儲存空間與傳輸時間；壓縮後的檔案須先「解壓縮」才能正常開啟。",
        "常見壓縮軟體及預設副檔名：WinRAR（.rar，具分片壓縮功能）、WinZip（.zip）、7-Zip（.7z，免費且開放原始碼，可加密）。",
        "壓縮軟體可建立「自我解壓縮檔」（副檔名.exe），對方不需安裝壓縮軟體即可解壓縮。"
      ]
    },
    {
      code: "8-1",
      title: "工具程式：備份、筆記、翻譯與救援",
      points: [
        "檔案備份軟體可將資料備份至硬碟、USB隨身碟、CD、DVD，或Google雲端硬碟、Dropbox等雲端空間，部分具同步更新功能，如SyncBack、FreeFileSync（有比對及同步更新功能）。",
        "筆記整理軟體可有系統地紀錄文字與多媒體訊息，具整合筆記、建立目錄、標籤等功能並可分享，如Evernote、OneNote。",
        "語言翻譯軟體可翻譯外文單字、查詢音標與發音、建立單字本，如Lingoes（檔案小，需下載辭典）、Dr.eye雲端版（須連網，支援即時翻譯）。",
        "檔案救援軟體可救回誤刪的檔案，如Wise Data Recovery（可救回從資源回收筒刪除的檔案）、Recuva File Recovery（可依檔案類型、存放位置救回檔案）。",
        "可利用『Online-convert』等線上轉檔網站轉換文件、音樂、影片、圖片等檔案格式（如PDF轉.docx）。"
      ]
    },
    {
      code: "8-2",
      title: "軟體開發流程與程式語言",
      points: [
        "軟體專案開發流程：專案規劃 → 設計程式 → 功能測試 → 更新及維護。",
        "程式語言（programming language）是用來指揮電腦運作、具有特定格式的語言。",
        "開發工具包含只能輸入程式碼的「編輯器」（如NotePad++），以及具完整功能的軟體開發程式（如Visual Studio、Xcode、Eclipse）。",
        "完整的軟體開發程式通常支援多種程式語言、可設計圖形化使用者介面，並具編輯程式、檔案管理、程式編譯、程式除錯、執行程式等功能，可開發桌上型應用程式與行動App。",
        "應用系統開發平台（如訊光科技EEP）可縮短程式設計師開發應用軟體的時間與成本。"
      ]
    },
    {
      code: "8-2",
      title: "常見軟體開發程式",
      points: [
        "Microsoft Visual Studio（VS）：微軟推出，支援C#、C++、Visual Basic、Managed C++、Ruby等，提供函式庫，適合在Windows環境撰寫，程式適用於微軟支援的所有平台。",
        "Xcode：蘋果推出，支援Swift、C∕C++、Objective-C∕C++、Java等，須在macOS環境撰寫，程式適用於macOS、iOS等蘋果平台。",
        "Eclipse：主要以Java開發程式，安裝外掛程式後可支援C∕C++、PHP、Python，為跨平台開發環境（Linux、macOS、Windows）。",
        "Code::Blocks：免費且開放原始碼（open source），跨平台（Windows、Linux、macOS、FreeBSD），支援C∕C++、Fortran。"
      ]
    }
  ],
  terms: [
    { term: "工具程式", desc: "又稱工具軟體，協助使用者更方便使用電腦的軟體，如壓縮、備份、檔案救援軟體。" },
    { term: "PDF", desc: "Portable Document Format，可攜式文件格式，能精確保留電子文件原貌。" },
    { term: "壓縮軟體", desc: "以特定規則簡化重複資料以縮減檔案大小的軟體，如WinRAR、WinZip、7-Zip。" },
    { term: "自我解壓縮檔", desc: "副檔名為.exe的壓縮檔，對方不需安裝壓縮軟體即可解壓縮。" },
    { term: "檔案救援軟體", desc: "可將已刪除的檔案救回的軟體，如Wise Data Recovery、Recuva。" },
    { term: "程式語言", desc: "programming language，用來指揮電腦運作並具有特定格式的語言。" },
    { term: "軟體開發程式", desc: "專門用來開發軟體系統的工具，如Visual Studio、Xcode、Eclipse、Code::Blocks。" },
    { term: "開放原始碼", desc: "open source，公開軟體原始程式碼，如7-Zip、Code::Blocks。" },
    { term: "EEP", desc: "Electronic Enterprise Platform，訊光科技推出的應用軟體開發平台，可快速開發應用軟體。" }
  ],
  keywords: ["工具程式", "PDF", "Adobe Reader", "Foxit Reader", "壓縮", "解壓縮", "WinRAR", "WinZip", "7-Zip", "檔案備份", "SyncBack", "FreeFileSync", "Evernote", "OneNote", "Lingoes", "Dr.eye", "檔案救援", "Recuva", "程式語言", "Visual Studio", "Xcode", "Eclipse", "Code::Blocks"],
  quiz: [
    {
      q: "有關壓縮軟體的敘述，何者錯誤？",
      options: ["WinRAR具有分片壓縮功能", "7-Zip能提供加密解密服務", "壓縮軟體只能對執行檔案進行壓縮", "WinZip能解壓縮RAR及ZIP等格式的檔案"],
      answer: 2,
      explain: "壓縮軟體可壓縮各類檔案，並非只能壓縮執行檔。"
    },
    {
      q: "有關軟體開發程式的敘述，下列何者正確？",
      options: ["Eclipse主要用來開發Java應用程式", "程式的編輯都須用記事本來處理", "Xcode適合在Windows環境下撰寫程式", "Visual Studio適合在macOS環境下以Swift開發應用程式"],
      answer: 0,
      explain: "Eclipse主要以Java開發；Xcode須在macOS環境撰寫，Visual Studio適合Windows環境，軟體開發程式本身即具編輯功能。"
    },
    {
      q: "下列何者為軟體開發的正確流程？",
      options: ["設計程式→專案規劃→更新及維護→功能測試", "功能測試→專案規劃→設計程式→更新及維護", "專案規劃→功能測試→設計程式→更新及維護", "專案規劃→設計程式→功能測試→更新及維護"],
      answer: 3,
      explain: "先規劃軟體功能，再設計程式，接著進行功能測試，最後定期更新及維護。"
    },
    {
      q: "美穗不小心刪除了電腦中的心得報告，可利用下列哪一款軟體救回？",
      options: ["WinRAR", "Wise Data Recovery", "Adobe Reader", "Lingoes"],
      answer: 1,
      explain: "Wise Data Recovery為檔案救援軟體；WinRAR為壓縮、Adobe Reader為PDF瀏覽、Lingoes為語言翻譯軟體。"
    },
    {
      q: "下列哪一套軟體開發程式為免費且開放原始碼，並可跨平台使用C∕C++、Fortran開發程式？",
      options: ["Xcode", "Microsoft Visual Studio", "Code::Blocks", "NotePad++"],
      answer: 2,
      explain: "Code::Blocks為免費開放原始碼的跨平台軟體開發程式，支援C∕C++、Fortran；NotePad++僅為編輯器。"
    }
  ]
};
