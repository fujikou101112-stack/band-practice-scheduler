// PracticePage.tsx
import { menus } from "./menus";
import { PracticeMenu } from "./PracticeMenu";

export default function PracticePage() {
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: 24 }}>
      <h1>バンド練習メニュー</h1>

      {menus.map((menu) => (
        <PracticeMenu
          key={menu.id}
          title={menu.title}
          plans={menu.plans}
        />
      ))}
    </main>
  );
}
