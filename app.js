const MENU_DATA = {
  A: [
    { name: "準備（セッティング）", detail: "・全員で機材を展開\n・チューニング\n・音量の仮合わせ\n・クリック準備" },
    { name: "帯域調整プランA", detail: "・クリーン音でボーカル基準\n・他楽器との干渉チェック\n・被っていたらEQ調整" },
    { name: "リズム・グルーヴ練習プランA", detail: "・ベースルート基準\n・ドラムとギターでテンポ確認\n・ズレたら即停止し修正" },
    { name: "休憩", detail: "・耳を休める\n・水分補給\n・機材触らない" },
    { name: "片付け", detail: "・配線から順に撤収\n・忘れ物確認\n・次回課題を一言共有" }
  ],
  B: [
    { name: "準備（セッティング）", detail: "・全員で機材を展開\n・チューニング\n・音量の仮合わせ\n・クリック準備" },
    { name: "帯域調整プランB", detail: "・全員クリーンで演奏\n・個別EQ確認\n・ハモリと主旋律バランス調整" },
    { name: "リズム・グルーヴ練習プランB", detail: "・A/Bメロを分解して反復\n・リズムキープ優先\n・タイミングずれは録音で確認" },
    { name: "休憩", detail: "・耳を休める\n・水分補給\n・機材触らない" },
    { name: "片付け", detail: "・配線から順に撤収\n・忘れ物確認\n・次回課題を一言共有" }
  ],
  C: [
    { name: "準備（セッティング）", detail: "・全員で機材を展開\n・チューニング\n・音量の仮合わせ\n・クリック準備" },
    { name: "帯域調整プランC", detail: "・本番音量で演奏\n・歌いながらバランス調整\n・前に出す/引くを意識" },
    { name: "リズム・グルーヴ練習プランC", detail: "・曲通しをテンポ固定で\n・リズム乱れ箇所は個別リピート\n・最終確認後録音" },
    { name: "休憩", detail: "・耳を休める\n・水分補給\n・機材触らない" },
    { name: "片付け", detail: "・配線から順に撤収\n・忘れ物確認\n・次回課題を一言共有" }
  ]
};

let schedules = JSON.parse(localStorage.getItem("schedules")) || [[]];
let current = 0;
let currentPlan = "B";

const menuEl = document.getElementById("menu");
const btnA = document.getElementById("btnA");
const btnB = document.getElementById("btnB");
const btnC = document.getElementById("btnC");

function save() {
  localStorage.setItem("schedules", JSON.stringify(schedules));
}

function renderMenu() {
  menuEl.innerHTML = "";
  // 準備・休憩・片付けは常に表示
  const fixedItems = ["準備（セッティング）", "休憩", "片付け"];
  fixedItems.forEach(name => {
    const item = MENU_DATA["A"].find(i => i.name === name);
    appendMenuItem(item);
  });

  // 帯域調整とリズム練習はプラン切替
  ["帯域調整", "リズム・グルーヴ練習"].forEach(prefix => {
    const item = MENU_DATA[currentPlan].find(i => i.name.startsWith(prefix));
    appendMenuItem(item);
  });
}

function appendMenuItem(item) {
  const div = document.createElement("div");
  div.className = "menu-item";
  div.innerHTML = `
    <h2>${item.name}</h2>
    <ul>${item.detail.split("\n").map(s => `<li>${s}</li>`).join("")}</ul>
  `;
  menuEl.appendChild(div);
}

function setActiveButton(planKey) {
  [btnA, btnB, btnC].forEach(btn => btn.classList.remove("active"));
  if (planKey === "A") btnA.classList.add("active");
  if (planKey === "B") btnB.classList.add("active");
  if (planKey === "C") btnC.classList.add("active");
}

btnA.onclick = () => { currentPlan = "A"; setActiveButton("A"); renderMenu(); };
btnB.onclick = () => { currentPlan = "B"; setActiveButton("B"); renderMenu(); };
btnC.onclick = () => { currentPlan = "C"; setActiveButton("C"); renderMenu(); };

// 初期表示
renderMenu();
