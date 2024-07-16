import { useRouter } from "next/router";
import Menu from "@/components/Menu";
import Toolbox from "@/components/Toolbar";
import Board from "@/components/Board";

const DrawingRoom = () => {
  const router = useRouter();
  const { roomId } = router.query;
  if (!roomId) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Menu />
      <Toolbox />
      <Board roomId={roomId} />
    </>
  );
};

export default DrawingRoom;
