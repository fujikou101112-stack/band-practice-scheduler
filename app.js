const PLAN_DATA = {
  A: {
    "帯域調整": `目的：
各パートの基礎的な居場所を決め、音量に頼らず全体が聴こえる状態を作る。

手順：
1. 全員クリーン、仮音量
2. ドラム→ベース→ギター→ボーカルの順で単音
3. 他メンバーは聴く専念
4. 強い帯域を言語化
5. EQは削る方向のみ

OK判定：
・同時に鳴っても誰も消えない
・目を閉じてもパート判別可能
・小声でも歌詞が聞き取れる

NG判定：
・音量を上げないと存在感が出ない
・誰かが鳴ると他が消える

修正：
・低域／低中域から削る
・音量ではなくEQで調整`,
    "リズム・グルーヴ練習": `目的：
テンポ基準を全員で共有する。

手順：
1. クリックON
2. ドラム8分、ベースルート
3. ギター最小限
4. 2分間継続

OK判定：
・クリックOFFでも安定
・ズレた人が全員一致で分かる

NG判定：
・周期的にズレる

修正：
・ドラム単体に戻る
・BPMを落とす`
  },
  B: {
    "帯域調整": `目的：
実際のフレーズ内で帯域衝突を解消する。

手順：
1. 本番音量
2. 情報量の少ないセクションをループ
3. 違和感が出たら即停止
4. 被った帯域を特定
5. 被っている側が削る

OK判定：
・フレーズが濁らない
・歌いながらでも把握できる

NG判定：
・コードで歌が埋もれる
・ベースとキックが判別不能

修正：
・役割分担を明確化
・音数を減らす`,
    "リズム・グルーヴ練習": `目的：
クリックなしでも揺れないグルーヴを作る。

手順：
1. クリックOFF
2. ドラム＋ベースのみ
3. 同一パターン反復
4. 後から全員参加

OK判定：
・演奏後のBPMが変わらない
・途中参加しても迷わない

NG判定：
・徐々に走る／遅れる

修正：
・リズム隊だけに戻す`
  },
  C: {
    "帯域調整": `目的：
大音量でも破綻しない帯域バランスを作る。

手順：
1. 本番想定音量
2. サビなど最大情報量部分
3. 録音して全員で確認
4. 問題箇所を秒単位で特定

OK判定：
・音量を上げても輪郭が残る
・録音と体感が一致

NG判定：
・団子になる
・耳が痛い

修正：
・中域整理を優先
・コンプ過多を疑う`,
    "リズム・グルーヴ練習": `目的：
曲ごとの正解ノリを固定する。

手順：
1. 1曲に絞る
2. セクション分解
3. 録音して比較
4. 良いテイクを基準化

OK判定：
・毎回同じノリで演奏できる
・全員が同意するテイクがある

NG判定：
・日によってノリが変わる

修正：
・良いテイクを再確認`
  }
};

const OTHER_MENU = [
  { name: "準備（セッティング）", detail: "" },
  { name: "リズム隊だけでクリック確認", detail: `手順：
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
・ベースはアタックのみ合わせる` },
  { name: "ベース主導グルーヴ固定", detail: `手順：
・ベースのフレーズを基準に全員合わせる
・ドラムは追従、ギターは最小限

判定：
・ベースを止めた瞬間、全員も止まれる

NG：
・ドラムが主導してしまう
・ギターがリズムを作りに行く

修正：
・ベース以外の音量を一段下げる` },
  { name: "ドラム＋ベース パターン練習", detail: `手順：
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
・主導をどちらかに決め直す` },
  { name: "全体リズム合わせ", detail: `手順：
・全員8分ストローク
・裏拍を意識

判定：
・手拍子してもズレを感じない

NG：
・ギターが前ノリ
・裏拍が弱い

修正：
・ハイハットを基準に聴く` },
  { name: "ギター ノリを壊さない確認", detail: `手順：
・ミュート多用
・アタックを揃える

判定：
・歌を聴きながら弾ける余裕がある

NG：
・ギターが前に出すぎる
・歌詞が聞き取りにくい

修正：
・ピッキングを浅く
・サステインを短く` },
  { name: "曲通し", detail: "" },
  { name: "休憩", detail: "" },
  { name: "片付け", detail: "" }
];

let schedules = JSON.parse(localStorage.getItem("schedules")) || [[]];
let current = 0;

let activePlan = "A";

function save() {
  localStorage.setItem("schedules", JSON.stringify(schedules));
}

function renderMenu() {
  const ul = document.getElementById("menuList");
  ul.innerHTML = "";

  // プランABCに応じて先頭に帯域調整・リズム・グルーヴ練習を追加
  ["帯域調整", "リズム・グルーヴ練習"].forEach(name => {
    const li = document.createElement("li");
    li.className = "menu-item";

    li.innerHTML = `
      <div class="menu-item-title">${name}</div>
      <div class="menu-item-details">${PLAN_DATA[activePlan][name]}</div>
      <button>追加</button>
    `;

    const title = li.querySelector(".menu-item-title");
    const details = li.querySelector(".menu-item-details");
    const button = li.querySelector("button");

    title.onclick = () => { details.classList.toggle("open"); };

    button.onclick = (e) => {
      e.stopPropagation();
      schedules[current].push({
        name: name,
        detail: PLAN_DATA[activePlan][name],
        time: 10
      });
      save();
      renderSchedule();
    };

    ul.appendChild(li);
  });

  // 残りのメニュー
  OTHER_MENU.forEach(item => {
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

    title.onclick = () => { details.classList.toggle("open"); };

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

// スケジュール操作
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

// プラン切替ボタン
document.getElementById("planA").onclick = () => { activePlan = "A"; renderMenu(); };
document.getElementById("planB").onclick = () => { activePlan = "B"; renderMenu(); };
document.getElementById("planC").onclick = () => { activePlan = "C"; renderMenu(); };

// 初期描画
renderMenu();
renderSchedule();
