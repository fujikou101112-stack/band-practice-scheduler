const MENU_DATA = [
  {
    name: "準備（セッティング）",
    plan: "ALL",
    detail: `【手順】
・全員で機材を展開
・チューニング
・音量の仮合わせ
・クリック準備

【OK判定】
・全員チューニング済み
・クリックが鳴る

【NG】
・機材不備
・チューニング狂い

【修正】
・不足機材を追加
・チューニング再確認`
  },
  {
    name: "帯域調整プランA",
    plan: "A",
    detail: `【手順】
・全員クリーンで演奏
・ボーカル基準で音量調整
・被る帯域を1人ずつミュートして確認

【OK判定】
・ボーカルが埋もれない
・各楽器の音が明瞭

【NG】
・帯域が被っている
・音が濁る

【修正】
・EQで微調整
・ピッキング位置やアンプ設定を調整`
  },
  {
    name: "帯域調整プランB",
    plan: "B",
    detail: `【手順】
・本番音量で演奏
・1人ずつ音を足していく
・抜けない音はEQで調整

【OK判定】
・全員の音がバランス良く聴こえる

【NG】
・特定楽器が埋もれる
・不協和音が目立つ

【修正】
・EQや音量を微調整
・演奏タイミングを確認`
  },
  {
    name: "帯域調整プランC",
    plan: "C",
    detail: `【手順】
・録音しながら確認
・再生して客観的に判断
・不要な帯域を削る

【OK判定】
・録音再生でバランス良し
・ノイズや濁りが少ない

【NG】
・録音で特定帯域が強すぎる
・音が重なる

【修正】
・EQで削る
・必要に応じて楽器パート修正`
  },
  {
    name: "リズム・グルーヴ練習プランA",
    plan: "A",
    detail: `【手順】
・ドラム＋ベースのみ
・クリックあり
・ズレたら即停止

【OK判定】
・テンポ安定
・音の粒立ち揃う

【NG】
・リズムがバラつく
・クリックが外れる

【修正】
・停止して再度やり直す
・テンポ確認`
  },
  {
    name: "リズム・グルーヴ練習プランB",
    plan: "B",
    detail: `【手順】
・全員参加
・8分基準
・裏拍を意識

【OK判定】
・全員のタイミング揃う
・グルーヴ感あり

【NG】
・走る/遅れる
・裏拍が揃わない

【修正】
・部分反復
・クリックで確認`
  },
  {
    name: "リズム・グルーヴ練習プランC",
    plan: "C",
    detail: `【手順】
・クリックなし
・ドラム基準
・走ったら戻す

【OK判定】
・自然なノリ
・タイミング安定

【NG】
・走る/遅れる
・グルーヴ感失う

【修正】
・録音してチェック
・個別リピート`
  },
  {
    name: "曲通し",
    plan: "ALL",
    detail: `【手順】
・止めずに通す
・ミスしても継続
・最後に一度だけ振り返り

【OK判定】
・最後まで止まらず演奏できる

【NG】
・途中で止まる
・リズムが崩れる

【修正】
・問題箇所を部分練習
・テンポを確認`
  },
  {
    name: "休憩",
    plan: "ALL",
    detail: `【手順】
・耳を休める
・水分補給
・機材触らない

【OK判定】
・リフレッシュできる
・集中力回復

【NG】
・疲労が残る
・集中力低下

【修正】
・休憩時間延長
・深呼吸`
  },
  {
    name: "片付け",
    plan: "ALL",
    detail: `【手順】
・配線から順に撤収
・忘れ物確認
・次回課題を一言共有

【OK判定】
・全ての機材撤収済み
・忘れ物なし

【NG】
・忘れ物発生
・配線が残る

【修正】
・確認作業
・再配置`
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

  MENU_DATA.filter(item => item.plan === currentPlan || item.plan === "ALL")
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
