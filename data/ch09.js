window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTERS[9] = {
  id: 9,
  title: "行動裝置軟體簡介",
  icon: "📱",
  summary: "認識行動裝置App及其應用（交通動態資訊、VR、AR、輔助醫療、美妝造型）與背後的GPS、GIS、AI等技術，並介紹App Inventor、Android Studio等App開發軟體。",
  sections: [
    {
      code: "9-1",
      title: "認識App與交通動態資訊App",
      points: [
        "在手機、平板等行動裝置中安裝的應用程式泛稱App（Application software），可結合陀螺儀、GPS等感測器，應用於生活、教育、娛樂、醫療等領域。",
        "可透過Google Play商店、App Store等網站免費或付費下載App；安裝時應檢查權限，不合理的權限要求（如手電筒App要求電話號碼）應避免下載。",
        "交通動態資訊App（如「台灣等公車」）結合GPS，提供路況、公車到站、路線規劃、周邊服務等資訊。",
        "GPS（全球衛星定位系統）由數個衛星傳送訊號給接收器以測量位置；AGPS利用電信業者手機基地台輔助定位，耗電量低、定位快且能在室內定位。",
        "GIS（地理資訊系統）用來儲存地理資料並分析地理區域特性；航位推算導航（DR）以目前位置、移動距離與時間推算到站時間；最短路徑計算可規劃最快路線。"
      ]
    },
    {
      code: "9-1",
      title: "虛擬實境與擴增實境App",
      points: [
        "虛擬實境（VR）是透過電腦模擬真實環境的技術，搭配頭戴式裝置可感覺身處立體環境，設備如PlayStation VR2、Apple Vision Pro、Meta Quest 2、Google Cardboard。",
        "立體視覺（stereopsis）：VR畫面分割為左右兩邊，模擬左右眼影像差異，使大腦產生立體感；「VR Thrills雲霄飛車」App即為例子。",
        "陀螺儀可偵測行動裝置旋轉角度，用來模擬玩家視角，營造身歷其境的感覺。",
        "擴增實境（AR）是在實體環境中加入虛擬影像的技術，如寶可夢（Pokémon GO）、「AR導航及測速照相偵測」App。",
        "3D彩現（render，又稱算圖、渲染、算繪）為3D模型上色、加漸層、陰影以形成圖像；電腦視覺（computer vision）讓電腦分析大量圖片以辨識特定物體（如馬路、標線）。"
      ]
    },
    {
      code: "9-1",
      title: "輔助醫療與美妝造型App",
      points: [
        "輔助醫療App提供醫療紀錄與諮詢服務，如「Babylon Mobile Health人工智慧醫生」，運用AI結合疾病資料庫提供線上醫療諮詢。",
        "人工智慧（AI）研究讓電腦模仿人類思考，具有學習、記憶、推理及處理問題等能力。",
        "專家系統儲存事實與規則，透過知識庫（Knowledge Base）比對∕推論以解決問題、作出判斷。",
        "美妝造型App（如「玩美彩妝」）可偵測人像五官並為臉部上妝。",
        "智慧臉部偵測常用「樣板比對法」比對臉部樣板；五官追蹤技術常用「人臉特徵點追蹤」找出五官特徵點以精確上妝。"
      ]
    },
    {
      code: "9-2",
      title: "行動裝置App開發軟體",
      points: [
        "App以特定程式語言（如Java、Swift、JavaScript）撰寫，再壓縮成安裝檔：Android為.apk，蘋果iOS為.ipa。",
        "App Inventor：由Google實驗室開發，現交由美國麻省理工學院（MIT）管理；不須安裝，透過瀏覽器線上使用，以拖曳及拼接程式方塊撰寫程式。",
        "Android Studio：由Google實驗室開發，可跨Windows、macOS、Linux執行，能撰寫較專業的App，須具備基本Java程式設計概念。",
        "PowerApps：微軟推出，可線上開發應用程式，並搭配Office 365、OneDrive等微軟雲端服務使用。",
        "React Native：Facebook推出，以單一程式語言JavaScript即可開發App、製作網頁及後端應用程式，且可跨iOS、Android平台。",
        "Android是行動裝置作業系統，不是App開發工具；Swift是開發App可用的程式語言。"
      ]
    }
  ],
  terms: [
    { term: "App", desc: "Application software，安裝於行動裝置的應用程式。" },
    { term: "GPS", desc: "Global Positioning System，全球衛星定位系統，用來測量標的物位置。" },
    { term: "AGPS", desc: "Assisted GPS，利用手機基地台輔助定位，耗電低、速度快且可室內定位。" },
    { term: "GIS", desc: "Geographic Information System，地理資訊系統，儲存地理資料並分析地理區域特性。" },
    { term: "VR", desc: "Virtual Reality，虛擬實境，透過電腦模擬真實環境的技術。" },
    { term: "AR", desc: "Augmented Reality，擴增實境，在實體環境中加入虛擬影像的技術。" },
    { term: "3D彩現", desc: "render，為3D模型上色、加入漸層與陰影以形成圖像的技術，又稱算圖、渲染。" },
    { term: "電腦視覺", desc: "computer vision，使電腦能辨識圖像中特定物體的技術。" },
    { term: "人工智慧", desc: "AI，研究讓電腦模仿人類思考，具學習、記憶、推理與處理問題能力。" },
    { term: "專家系統", desc: "儲存事實與規則並以知識庫推理、判斷以解決問題的系統。" }
  ],
  keywords: ["App", "Google Play", "App Store", "權限", "GPS", "AGPS", "GIS", "航位推算", "VR", "虛擬實境", "立體視覺", "陀螺儀", "AR", "擴增實境", "3D彩現", "電腦視覺", "人工智慧", "專家系統", "App Inventor", "Android Studio", "PowerApps", "React Native", ".apk", ".ipa"],
  quiz: [
    {
      q: "GPS在室內定位效果不佳，常使用手機基地台提供的位址資訊加以輔助，這樣的技術稱為？",
      options: ["RFID", "AGPS", "GIS", "NFC"],
      answer: 1,
      explain: "AGPS（Assisted GPS）利用電信業者手機基地台輔助GPS定位，可在室內定位。"
    },
    {
      q: "下列有關虛擬實境（VR）及擴增實境（AR）的敘述，何者錯誤？",
      options: ["VR是電腦模擬真實環境的技術", "AR是在實體環境中加入虛擬影像的技術", "VR是Virtual Reality的縮寫，AR是Augmented Reality的縮寫", "在實際街景中顯示寶可夢精靈讓玩家抓寶，是運用VR技術的手機遊戲"],
      answer: 3,
      explain: "在實際街景中顯示虛擬圖像屬於AR（擴增實境）的應用。"
    },
    {
      q: "有關App Inventor的敘述，下列何者正確？",
      options: ["操作方式是透過拖放組件或程式方塊來完成撰寫", "必須在電腦安裝後才可以使用", "由Google開發後，交由哈佛大學繼續維護", "可以開發Windows下的應用程式"],
      answer: 0,
      explain: "App Inventor透過瀏覽器線上使用、不須安裝，由Google開發後交由MIT管理，用來開發行動裝置App。"
    },
    {
      q: "義品配戴VR眼鏡玩遊戲時，畫面會隨眼鏡旋轉角度改變視角，最可能應用下列哪一項技術？",
      options: ["GPS的定位功能", "專家系統判斷應呈現的畫面", "藉由陀螺儀偵測VR眼鏡的旋轉角度", "人工智慧運算場景角度"],
      answer: 2,
      explain: "陀螺儀可偵測行動裝置的旋轉角度，用來模擬玩家視角。"
    },
    {
      q: "下列何者不是App的開發工具或程式？",
      options: ["App Inventor", "React Native", "Swift", "Android"],
      answer: 3,
      explain: "Android為行動裝置作業系統；App Inventor、React Native為App開發工具，Swift為開發App可用的程式語言。"
    }
  ]
};
