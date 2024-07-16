import Board from "@/components/Board";
import Menu from "@/components/Menu";
import Toolbox from "@/components/Toolbar";
import Share from "@/components/Share";

export default function Home() {
  return (
    <>
      <Menu />
      <Toolbox />
      <Share />
      <Board />
    </>
  );
}
