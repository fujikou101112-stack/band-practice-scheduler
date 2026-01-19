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
let currentPlan = "A";

function save() {
  localStorage.setItem("schedules", JSON.stringify(schedules));
}

function renderMenu() {
  const ul = document.getElementById("menuList");
  ul.innerHTML = "";

  MENU_DATA[currentPlan].forEach(item => {
    const li = document.createElement("li");
    li.className = "menu-item";

    li.innerHTML = `
      <div class="menu-item-title">${item.name}</div>
      <div class="menu-item-details">${item.detail}</div>
      <button>追加</button>
    `;

    const title = li.querySelector(".menu-item-title");
    const details = li.querySelector(".menu-item-details");
    const button = li.querySelector("button");

    title.onclick = () => {
      details.classList.toggle("open");
    };

    button.onclick = (e) => {
      e.stopPropagation();
      schedules[current].push({ name: item.name, detail: item.detail, time: 10 });
      save();
      renderSchedule();
    };

    ul.appendChild(li);
  });
}

function renderSchedule() {
  const ul = document.getElementById("scheduleList");
  ul.innerHTML = "";

  let total = 0;

  schedules[current].forEach((item, i) => {
    total += Number(item.time) || 0;

    const li = document.createElement("li");
    li.className = "schedule-item";

    li.innerHTML = `
      <div class="schedule-item-title">${item.name}</div>
      <div class="schedule-item-controls">
        <input type="number" min="0" value="${item.time}">
        <button>↑</button>
        <button>↓</button>
        <button>削除</button>
      </div>
      <div class="schedule-item-details">${item.detail}</div>
    `;

    const input = li.querySelector("input");
    input.oninput = () => {
      item.time = input.value;
      save();
      updateTotal();
    };

    const [up, down, del] = li.querySelectorAll("button");

    up.onclick = () => {
      if (i > 0) {
        [schedules[current][i - 1], schedules[current][i]] =
        [schedules[current][i], schedules[current][i - 1]];
        save();
        renderSchedule();
      }
    };

    down.onclick = () => {
      if (i < schedules[current].length - 1) {
        [schedules[current][i + 1], schedules[current][i]] =
        [schedules[current][i], schedules[current][i + 1]];
        save();
        renderSchedule();
      }
    };

    del.onclick = () => {
      schedules[current].splice(i, 1);
      save();
      renderSchedule();
    };

    ul.appendChild(li);
  });

  document.getElementById("totalTime").textContent = total;
}

function updateTotal() {
  const total = schedules[current].reduce(
    (sum, item) => sum + Number(item.time || 0),
    0
  );
  document.getElementById("totalTime").textContent = total;
}

document.getElementById("newSchedule").onclick = () => {
  schedules.push([]);
  current = schedules.length - 1;
  save();
  renderSchedule();
};

document.getElementById("prevSchedule").onclick = () => {
  if (current > 0) {
    current--;
    renderSchedule();
  }
};

document.getElementById("nextSchedule").onclick = () => {
  if (current < schedules.length - 1) {
    current++;
    renderSchedule();
  }
};

document.getElementById("planA").onclick = () => { currentPlan = "A"; renderMenu(); };
document.getElementById("planB").onclick = () => { currentPlan = "B"; renderMenu(); };
document.getElementById("planC").onclick = () => { currentPlan = "C"; renderMenu(); };

renderMenu();
renderSchedule();
