const MENU_DATA = [
  {
    name: "準備（セッティング）",
    plan: "ALL",
    detail: "・全員で機材を展開\n・チューニング\n・音量の仮合わせ\n・クリック準備"
  },

  {
    name: "帯域調整プランA",
    plan: "A",
    detail: "・全員クリーン\n・ボーカル基準で音量決定\n・被る帯域を1人ずつミュートして確認"
  },
  {
    name: "帯域調整プランB",
    plan: "B",
    detail: "・本番音量で演奏\n・1人ずつ音を足していく\n・抜けない音はEQで調整"
  },
  {
    name: "帯域調整プランC",
    plan: "C",
    detail: "・録音しながら確認\n・再生して客観的に判断\n・不要な帯域を削る"
  },

  {
    name: "リズム・グルーヴ練習プランA",
    plan: "A",
    detail: "・ドラム＋ベースのみ\n・クリックあり\n・ズレたら即停止"
  },
  {
    name: "リズム・グルーヴ練習プランB",
    plan: "B",
    detail: "・全員参加\n・8分基準\n・裏拍を意識"
  },
  {
    name: "リズム・グルーヴ練習プランC",
    plan: "C",
    detail: "・クリックなし\n・ドラム基準\n・走ったら戻す"
  },

  {
    name: "曲通し",
    plan: "ALL",
    detail: "・止めずに通す\n・ミスしても継続\n・最後に一度だけ振り返り"
  },

  {
    name: "休憩",
    plan: "ALL",
    detail: "・耳を休める\n・水分補給\n・機材触らない"
  },

  {
    name: "片付け",
    plan: "ALL",
    detail: "・配線から順に撤収\n・忘れ物確認\n・次回課題を一言共有"
  }
];

let schedules = JSON.parse(localStorage.getItem("schedules")) || [[]];
let current = 0;
let currentPlan = "A";

function save() {
  localStorage.setItem("schedules", JSON.stringify(schedules));
}

function renderMenu() {
  const ul = document.getElementById("menuList");
  ul.innerHTML = "";

  MENU_DATA
    .filter(item => item.plan === currentPlan || item.plan === "ALL")
    .forEach(item => {
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

document.querySelectorAll(".plan-switch button").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".plan-switch button")
      .forEach(b => b.classList.remove("active"));

    btn.classList.add("active");
    currentPlan = btn.dataset.plan;
    renderMenu();
  };
});

renderMenu();
renderSchedule();
