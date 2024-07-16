import { useLayoutEffect, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { actionItemClick } from "@/slice/menuSlice";
import { MENU_ITEMS } from "@/constants";

import { socket } from "@/socket";

const Board = ({ roomId }) => {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const shouldDraw = useRef(false);
  const drawings = useRef([]);
  const historyPointer = useRef(0);
  const { activeMenuItem, actionMenuItem } = useSelector((state) => state.menu);
  const { color, size } = useSelector((state) => state.toolbar[activeMenuItem]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
      const URL = canvas.toDataURL();
      const anchor = document.createElement("a");
      anchor.href = URL;
      anchor.download = `sketch.png`;
      anchor.click();
    } else if (
      actionMenuItem === MENU_ITEMS.UNDO ||
      actionMenuItem === MENU_ITEMS.REDO
    ) {
      if (historyPointer.current > 0 && actionMenuItem === MENU_ITEMS.UNDO)
        historyPointer.current -= 1;
      if (
        historyPointer.current < drawings.current.length - 1 &&
        actionMenuItem === MENU_ITEMS.REDO
      )
        historyPointer.current += 1;
      const imageData = drawings.current[historyPointer.current];
      context.putImageData(imageData, 0, 0);
    } else if (actionMenuItem === MENU_ITEMS.CLEAR) {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }

    dispatch(actionItemClick(null));
  }, [actionMenuItem, dispatch]);
  //update canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const changeConfig = (color, size) => {
      context.strokeStyle = color;
      context.lineWidth = size;
    };
    const handleChangeConfig = (config) => {
      changeConfig(config.color, config.size);
    };
    changeConfig(color, size);
    socket.on("changeConfig", handleChangeConfig);
    return () => {
      socket.off("changeConfig", handleChangeConfig);
    };
  }, [color, size]);

  //Before paint happens
  useLayoutEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    //when compontent mounted
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const beginPath = (x, y) => {
      context.beginPath();
      context.moveTo(x, y);
    };
    const drawLine = (x, y) => {
      context.lineTo(x, y);
      context.stroke();
    };
    const handleMouseDown = (e) => {
      shouldDraw.current = true;
      const rect = canvas.getBoundingClientRect();
      beginPath(e.clientX-rect.left, e.clientY-rect.top);
      socket.emit("beginPath", { x: e.clientX, y: e.clientY ,roomId});
      console.log("beginPath", { x: e.clientX, y: e.clientY });
    };
    const handleMouseMove = (e) => {
      if (!shouldDraw.current) return;
      const rect = canvas.getBoundingClientRect();
      drawLine(e.clientX-rect.left, e.clientY-rect.top);
      socket.emit("drawLine", { x: e.clientX, y: e.clientY,roomId });
    };
    const handleMouseUp = (e) => {
      shouldDraw.current = false;
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      drawings.current.push(imageData);
      historyPointer.current = drawings.current.length - 1;
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    const handleRemoteBegin = (path) => {
      if (path.roomId === roomId) {
        console.log("beginPath received", path);
        beginPath(path.x, path.y);
      }
    };
    const handleRemoteDraw = (path) => {
      if (path.roomId === roomId) drawLine(path.x, path.y);
    };
    const handleRemoteChangeConfig = (config) => {
      if (config.roomId === roomId) {
        context.strokeStyle = config.color;
        context.lineWidth = config.size;
      }
    };

    socket.emit("join-room", roomId);
    socket.on("beginPath", handleRemoteBegin);
    socket.on("drawLine", handleRemoteDraw);
    socket.on("changeConfig", handleRemoteChangeConfig);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);

      socket.off("beginPath", handleRemoteBegin);
      socket.off("drawLine", handleRemoteDraw);
      socket.off("changeConfig", handleRemoteChangeConfig);
    };
  }, [roomId]);
  // console.log(activeMenuItem, color, size);
  return <canvas ref={canvasRef}></canvas>;
};

export default Board;
