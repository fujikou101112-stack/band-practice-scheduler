// menus.ts
export type PlanKey = "A" | "B" | "C";

export const menus = [
  {
    id: "bandwidth",
    title: "帯域調整",
    plans: {
      A: {
        description: "基礎帯域の把握と不要帯域の削減",
      },
      B: {
        description: "アンサンブル内での住み分け最適化",
      },
      C: {
        description: "ライブ音量想定での帯域再確認",
      },
    },
  },
  {
    id: "rhythm",
    title: "リズム・グルーヴ練習",
    plans: {
      A: {
        description: "クリック基準のリズム安定化",
      },
      B: {
        description: "ドラム・ベースとのタイム共有",
      },
      C: {
        description: "グルーヴの揺れ幅コントロール",
      },
    },
  },
];
