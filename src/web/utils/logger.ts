export function log(...logs: any) {
  const style =
    "display: flex; flex-direction: row; align-items: center; padding: 5px 10px; background: linear-gradient(44.81deg, #008CFF 0%, #3F55FF 118.08%); border: 1px solid #343330; border-radius: 60px;";
  const style2 =
    "display: flex; flex-direction: row; align-items: center; padding: 5px 10px; background: #15171B; border: 1px solid #343330; border-radius: 60px;";

  console.log("%cPandora%c%s", style, style2, ...logs);
}
