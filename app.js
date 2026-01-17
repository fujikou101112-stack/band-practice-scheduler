const MENU_DATA = [
  {
    name: "準備（セッティング）",
    detail: "・全員で機材を展開\n・チューニング\n・音量の仮合わせ\n・クリック準備"
  },
  {
    name: "リズム隊だけでクリック確認",
    detail: "・BPM固定\n・ドラムは8分を基準\n・ベースはルートのみ\n・ズレたら即止める"
  },
  {
    name: "ベース主導グルーヴ固定",
    detail: "・ベースのフレーズを基準に全員が合わせる\n・ドラムはキックを追従\n・ギターは最小限"
  },
  {
    name: "ドラム＋ベース パターン練習",
    detail: "・A/Bメロごとに分解\n・同じパターンを2分反復\n・クリックなし"
  },
  {
    name: "全体リズム合わせ",
    detail: "・全員で8分ストローク\n・裏拍の位置を意識\n・走ったらドラム基準で戻す"
  },
  {
    name: "ギター ノリを壊さない確認",
    detail: "・ミュート多用\n・アタックを揃える\n・歌を邪魔しない帯域確認"
  },
  {
    name: "帯域チェック（クリーン）",
    detail: "・全員クリーン\n・ボーカル基準\n・被ったら即EQ調整"
  },
  {
    name: "帯域チェック（本番音）",
    detail: "・本番音量\n・歌いながら確認\n・前に出過ぎない"
  },
  {
    name: "ツインボーカル定位確認",
    detail: "・主旋律を明確化\n・ハモりは音量控えめ\n・語尾を揃える"
  },
  {
    name: "アレンジ確認",
    detail: "・不要な音を削る\n・展開を簡潔に\n・役割分担を明確化"
  },
  {
    name: "曲通し",
    detail: "・止めずに通す\n・ミスしても継続\n・最後に一度だけ振り返り"
  },
  {
    name: "休憩",
    detail: "・耳を休める\n・水分補給\n・機材触らない"
  },
  {
    name: "片付け",
    detail: "・配線から順に撤収\n・忘れ物確認\n・次回課題を一言共有"
  }
];

let schedules = JSON.parse(localStorage.getItem("schedules")) || [[]];
let current = 0;

function save() {
  localStorage.setItem("schedules", JSON.stringify(schedules));
}

function renderMenu() {
  const ul = document.getElementById("menuList");
  ul.innerHTML = "";

  MENU_DATA.forEach(item => {
    const li = document.createElement("li");
    li.className = "menu-item";
    li.innerHTML = `
      <div class="menu-item-title">${item.name}</div>
      <div class="menu-item-details">${item.detail}</div>
      <button>追加</button>
    `;

    li.querySelector("button").onclick = () => {
      schedules[current].push({
        name: item.name,
        detail: item.detail,
        time: 10
      });
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

    const buttons = li.querySelectorAll("button");
    const up = buttons[0];
    const down = buttons[1];
    const del = buttons[2];

    up.onclick = () => {
      if (i > 0) {
        const temp = schedules[current][i - 1];
        schedules[current][i - 1] = schedules[current][i];
        schedules[current][i] = temp;
        save();
        renderSchedule();
      }
    };

    down.onclick = () => {
      if (i < schedules[current].length - 1) {
        const temp = schedules[current][i + 1];
        schedules[current][i + 1] = schedules[current][i];
        schedules[current][i] = temp;
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

renderMenu();
renderSchedule();
