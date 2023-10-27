import React, { FC, useContext, useEffect, useRef } from 'react';
import { observer } from 'mobx-react';

import classes from './styles.module.scss';
import { clsx } from 'clsx';
import { AppStoreContext, StoreCtx } from '../../stores/WithStore.tsx';
import { Point } from '../../stores/canvasStore.ts';
import { canvasAPI } from '../../api/canvasAPI.ts';

const scale = 10;

const DrawTable: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
      canvasStore.setCanvasContext(ctx);
    }
    document.addEventListener('keydown', handleUndoKeyDown, false);
    return () => {
      document.removeEventListener('keydown', handleUndoKeyDown);
    };
  }, []);

  const handleStartDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    canvasStore.startDraw(getCurrentPoint(e));
  };

  const handleEndDraw = () => {
    canvasStore.endDraw();
  };

  const handleUndoKeyDown = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.code === 'KeyZ') {
      canvasStore.undo();
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

  const handleChangeMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    canvasStore.draw(getCurrentPoint(e));
  };

  return (
    <div className={classes.canvasWrapper}>
      <canvas
        className={clsx(classes.canvas, classes.unselectable)}
        ref={canvasRef}
        onMouseDown={handleStartDraw}
        onMouseMove={handleChangeMousePos}
        onMouseUp={handleEndDraw}
        onMouseLeave={handleEndDraw}
      />
    </div>
  );
};

const connected = observer(DrawTable);
export { connected as DrawTable };
