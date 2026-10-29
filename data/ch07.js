window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTERS[7] = {
  id: 7,
  title: "網際網路軟體與休閒娛樂軟體",
  icon: "🌐",
  summary: "介紹瀏覽器、入口網站與搜尋語法、網路監控軟體、遠端遙控軟體等網際網路軟體，以及遊戲、寓教於樂軟體與電子競技等休閒娛樂軟體。",
  sections: [
    {
      code: "7-1",
      title: "瀏覽器",
      points: [
        "全球資訊網（WWW）是網際網路最主要的服務之一，使用瀏覽器（browser）即可瀏覽網頁內容。",
        "瀏覽器是用來瀏覽網頁的應用軟體，輸入網址即可連上網站；常見的有Google Chrome、Microsoft Edge、Safari、Mozilla Firefox。",
        "瀏覽器可依需求額外安裝應用程式（常稱外掛程式），如「廣告過濾程式」（AdBlock）過濾網頁廣告、「Google Keep」將網頁內容存到線上記事本。",
        "Chrome可額外安裝應用程式（Chrome線上應用程式商店）；Microsoft Edge可用手寫方式在網頁上做標記。",
        "TeamViewer是遠端遙控軟體，不是瀏覽器，無法用來開啟網頁。"
      ]
    },
    {
      code: "7-1",
      title: "入口網站與搜尋語法",
      points: [
        "入口網站（web portal）分類蒐集大量網頁資料方便查詢，如Yahoo!奇摩、PChome Online網路家庭、Google。",
        "入口網站通常提供搜尋引擎（search engine），輸入關鍵字（keyword）即可快速找到相關資料。",
        "NOT用減號「-」：搜尋結果不含某關鍵字，如「資訊展 -高雄」；AND用空白：同時包含多個關鍵字，如「台北資訊展 時間」。",
        "OR：符合任一關鍵字即可，如「台北資訊展 OR 台北資訊月」，搜尋結果數量通常最多；\" \"（雙引號）：搜尋結果必須完全符合字串。",
        "filetype:指定檔案類型，如「考古題 filetype:PDF」；site:指定網域，如「site:gov 資訊展」只在政府網站搜尋。"
      ]
    },
    {
      code: "7-1",
      title: "網路監控軟體與遠端遙控軟體",
      points: [
        "網路監控軟體可監控各軟體消耗的網路流量及網路使用狀況，部分具資安防護、檢視網路異常等功能，如GlassWire；手機可用SpeedTest測試網速。",
        "網路監控軟體用於觀察流量，防止電腦病毒入侵則較適合使用防毒軟體。",
        "遠端遙控軟體可透過網際網路控制遠端電腦，用於遠端協助解決問題、軟體操作教學，或公出時遙控公司電腦處理公事。",
        "常見遠端遙控軟體有AnyDesk、TeamViewer；兩台電腦都安裝後，輸入對方的位址（或ID）即可遠端操控。"
      ]
    },
    {
      code: "7-2",
      title: "休閒娛樂軟體",
      points: [
        "休閒娛樂軟體大多結合聲音、影像等多媒體技術，種類包含益智遊戲、角色扮演遊戲等（如『傳說對決』）。",
        "網路遊戲具酷炫聲光效果並可多人線上對戰，趣味性與挑戰性高，普遍受到喜愛。",
        "寓教於樂的軟體如Code.org、Blockly遊戲，可藉由玩遊戲（拖曳程式方塊）學習邏輯思考與程式設計基礎。",
        "遊戲機（如PS、Xbox、Switch）也有專用的遊戲軟體。",
        "電子競技（eSports，簡稱電競）是透過電子設備與遊戲軟體進行的競賽，考驗反應速度、戰術思維、團隊合作與戰略規劃，已成為全球性活動。"
      ]
    }
  ],
  terms: [
    { term: "WWW", desc: "全球資訊網（World Wide Web），網際網路最主要的服務項目之一，以瀏覽器瀏覽。" },
    { term: "瀏覽器", desc: "用來瀏覽網頁的應用軟體，如Chrome、Edge、Safari、Firefox。" },
    { term: "外掛程式", desc: "瀏覽器依需求額外安裝的應用程式，如廣告過濾程式AdBlock。" },
    { term: "入口網站", desc: "web portal，分類蒐集許多網頁資料以方便查詢的網站，如Yahoo!奇摩。" },
    { term: "搜尋引擎", desc: "search engine，輸入關鍵字即可快速找到相關資料的服務。" },
    { term: "網路監控軟體", desc: "監控網路流量與使用狀況的軟體，如GlassWire。" },
    { term: "遠端遙控軟體", desc: "透過網際網路控制遠端電腦的軟體，如AnyDesk、TeamViewer。" },
    { term: "電子競技", desc: "eSports，透過電子設備與遊戲軟體進行的競賽，簡稱電競。" }
  ],
  keywords: ["瀏覽器", "Chrome", "Edge", "Safari", "Firefox", "外掛程式", "AdBlock", "入口網站", "搜尋引擎", "搜尋語法", "filetype", "site", "GlassWire", "SpeedTest", "AnyDesk", "TeamViewer", "Code.org", "Blockly", "電子競技", "eSports"],
  quiz: [
    {
      q: "使用Google搜尋具完全相符字串的網頁，下列何種搜尋技巧最相關？",
      options: ["*", "-", "\"\"", ".."],
      answer: 2,
      explain: "以雙引號 \"\" 括住關鍵字，搜尋結果必須完全符合該字串。"
    },
    {
      q: "想找含有「數位科技概論考古題」但不含「解答」的PDF文件，下列哪一個搜尋字串最適合？",
      options: ["數位科技概論考古題 -解答 filetype:pdf", "(數位科技概論考古題-解答) in:pdf", "數位科技概論考古題 NO 解答 filein:pdf", "數位科技概論考古題 without:解答 typein:pdf"],
      answer: 0,
      explain: "排除關鍵字用「空白加減號 -」，指定檔案類型用「filetype:」。"
    },
    {
      q: "在Google中輸入下列哪一個字串，會得到數目最多的搜尋結果？",
      options: ["\"紅樓夢背景\"", "\"紅樓夢\" AND \"背景\"", "\"紅樓夢\" \"背景\"", "\"紅樓夢\" OR \"背景\""],
      answer: 3,
      explain: "OR只需符合任一關鍵字，因此結果最多；完全相符字串條件最嚴格。"
    },
    {
      q: "住在台中的曉明想為住在台北的小美解決電腦問題，最適合使用哪一種軟體？",
      options: ["網路監控軟體", "遠端遙控軟體", "瀏覽器", "電子郵件軟體"],
      answer: 1,
      explain: "遠端遙控軟體（如AnyDesk、TeamViewer）可透過網際網路控制遠端電腦。"
    },
    {
      q: "下列軟體與類別的配對，何者正確？",
      options: ["GlassWire－遠端遙控軟體", "TeamViewer－瀏覽器", "SpeedTest－網路監控（網速測試）", "Safari－網路監控軟體"],
      answer: 2,
      explain: "SpeedTest為手機網速測試App；GlassWire為網路監控軟體，TeamViewer為遠端遙控軟體，Safari為瀏覽器。"
    }
  ]
};
