import React, { FC, useContext, useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import { AppStoreContext, StoreCtx } from '../../stores/WithStore.tsx';
import { canvasAPI } from '../../api/canvasAPI.ts';

interface Point {
  x: number;
  y: number;
}
const scale = 10;

const DrawTable: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const prevPointRef = useRef<Point>({ x: 0, y: 0 });
  const stackImageRef = useRef<Array<ImageData>>([]);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  //const [penSize, setPenSize] = useState(10);
  //const [penColor, setPenColor] = useState('#000');

  const {
    appStore: { roomStore, canvasStore },
  } = useContext<AppStoreContext>(StoreCtx);

  /** Инициализируем стор */
  useEffect(() => {
    canvasStore.init().then((connectionId) => {
      connectionId &&
        canvasAPI.joinChatHub({ connectionId, roomId: roomStore.id });
    });
  }, [canvasStore, roomStore.id]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas?.getContext('2d') as CanvasRenderingContext2D;
      canvas.width = canvas.width * scale;
      canvas.height = canvas.height * scale;
      const startImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
      stackImageRef.current = [startImage];
      ctxRef.current = ctx;
      ctxRef.current.lineCap = 'round';
    }
    document.addEventListener('keydown', onKeyDown, false);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const point = getCurrentPoint(e);
    if (point && ctxRef.current) {
      prevPointRef.current = point;
      ctxRef.current.lineWidth = 10;
      ctxRef.current.strokeStyle = '#000';
    }
  };

  const endDraw = () => {
    isDrawing.current = false;
    if (canvasRef.current && ctxRef.current) {
      const imageData = ctxRef.current.getImageData(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height,
      );
      stackImageRef.current.push(imageData);
    }
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (
      (e.ctrlKey || e.metaKey) &&
      e.code === 'KeyZ' &&
      stackImageRef.current.length > 1
    ) {
      stackImageRef.current.pop();
      ctxRef.current?.putImageData(
        stackImageRef.current[stackImageRef.current.length - 1],
        0,
        0,
      );
    }
  };

  const getCurrentPoint = (
    e: React.MouseEvent<HTMLCanvasElement>,
  ): Point | undefined => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      return {
        x:
          ((e.clientX - rect.left) / (rect.right - rect.left)) *
          canvasRef.current.width,
        y:
          ((e.clientY - rect.top) / (rect.bottom - rect.top)) *
          canvasRef.current.height,
      };
    }
  };

  const getMousePose = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDrawing.current) {
      const point = getCurrentPoint(e);
      if (ctxRef.current && point) {
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(prevPointRef.current.x, prevPointRef.current.y);
        ctxRef.current.lineTo(point.x, point.y);
        ctxRef.current.stroke();
        prevPointRef.current = point;
      }
    }
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDraw}
        onMouseMove={(e) => getMousePose(e)}
        onMouseUp={endDraw}
        onMouseLeave={endDraw}
      />
    </div>
  );
};

const connected = observer(DrawTable);
export { connected as DrawTable };
