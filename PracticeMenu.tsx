// PracticeMenu.tsx
import { useState } from "react";
import type { PlanKey } from "./menus";

type Props = {
  title: string;
  plans: Record<PlanKey, { description: string }>;
};

export const PracticeMenu = ({ title, plans }: Props) => {
  const [currentPlan, setCurrentPlan] = useState<PlanKey>("A");

  return (
    <div style={{ border: "1px solid #ddd", padding: 16, marginBottom: 24 }}>
      <h2>{title}</h2>

      {/* プラン切り替え */}
      <div style={{ marginBottom: 12 }}>
        {(["A", "B", "C"] as PlanKey[]).map((plan) => (
          <button
            key={plan}
            onClick={() => setCurrentPlan(plan)}
            style={{
              marginRight: 8,
              padding: "4px 10px",
              background: currentPlan === plan ? "#111" : "#eee",
              color: currentPlan === plan ? "#fff" : "#000",
              borderRadius: 4,
            }}
          >
            {plan}
          </button>
        ))}
      </div>

      {/* プラン内容表示 */}
      <p>{plans[currentPlan].description}</p>
    </div>
  );
};
