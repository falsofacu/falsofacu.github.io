import { useEffect, useState, useRef } from "react";
import "./SnakeGame.css";

const SnakeGame = () => {

  const initializeCanvas = () => {
    const canvas = document.getElementById("snake-game");
    /** @type {CanvasRenderingContext2D} */
    const c = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 400;
  }

  useEffect(() => {
    initializeCanvas();
  }, [])

  return (
    <canvas id="snake-game">
    </canvas>
  )
}

export default SnakeGame;