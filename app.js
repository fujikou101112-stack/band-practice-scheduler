const MENU_DATA = [
  { name: "準備（セッティング）", detail: "" },
  { name: "リズム隊だけでクリック確認", detail:
`手順：
・BPM固定
・ドラムは8分を基準
・ベースはルートのみ
・ズレたら即止める

判定：
・クリックが一瞬消える感覚がある

NG：
・キックとクリックが二重に聞こえる
・フィル後にズレる

修正：
・ドラムは音数を減らす
・ベースはアタックのみ合わせる`
  },
  { name: "ベース主導グルーヴ固定", detail:
`手順：
・ベースのフレーズを基準に全員合わせる
・ドラムは追従、ギターは最小限

判定：
・ベースを止めた瞬間、全員も止まれる

NG：
・ドラムが主導してしまう
・ギターがリズムを作りに行く

修正：
・ベース以外の音量を一段下げる`
  },
  { name: "ドラム＋ベース パターン練習", detail:
`手順：
・A/Bメロなどを分解
・同一パターンを2分反復
・クリックなし

判定：
・2分後も同じノリで続いている

NG：
・途中でノリが変わる
・無意識に走る／溜める

修正：
・テンポ感を言語化
・主導をどちらかに決め直す`
  },
  { name: "全体リズム合わせ", detail:
`手順：
・全員8分ストローク
・裏拍を意識

判定：
・手拍子してもズレを感じない

NG：
・ギターが前ノリ
・裏拍が弱い

修正：
・ハイハットを基準に聴く`
  },
  { name: "ギター ノリを壊さない確認", detail:
`手順：
・ミュート多用
・アタックを揃える

判定：
・歌を聴きながら弾ける余裕がある

NG：
・ギターが前に出すぎる
・歌詞が聞き取りにくい

修正：
・ピッキングを浅く
・サステインを短く`
  },
  { name: "帯域チェック（クリーン）", detail:
`手順：
・全員クリーン
・ボーカル基準で演奏

判定：
・歌詞の子音がはっきり聞こえる

NG：
・母音だけ聞こえる
・ハモりが主旋律と被る

修正：
・ギターの低域を削る
・ベースの動きを減らす`
  },
  { name: "帯域チェック（本番音）", detail:
`手順：
・本番音量
・歌いながら確認

判定：
・意識すれば全パート聴き取れる

NG：
・特定の音だけ無意識に耳に来る

修正：
・音量ではなく演奏密度を下げる`
  },
  { name: "ツインボーカル定位確認", detail:
`手順：
・主旋律を明確化
・ハモりは控えめ

判定：
・どちらが主旋律か即答できる

NG：
・両方が主張している
・語尾が揃わない

修正：
・ハモりの子音を弱める`
  },
  { name: "アレンジ確認", detail:
`手順：
・不要な音を削る
・役割分担を明確にする

判定：
・各セクションで役割が被っていない

NG：
・全員が常に鳴らしている

修正：
・誰か1人が休む前提で再構築`
  },
  { name: "曲通し", detail:
`手順：
・止めずに最後まで
・ミスしても継続

判定：
・全員が次の展開を把握している

NG：
・目線で確認し合う
・焦って音数が増える

修正：
・音量を下げて継続`
  },
  { name: "休憩", detail: "" },
  { name: "片付け", detail: "" }
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

renderMenu();
renderSchedule();
