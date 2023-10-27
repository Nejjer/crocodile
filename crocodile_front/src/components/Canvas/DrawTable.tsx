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
        canvasAPI.joinCanvasHub({ connectionId, roomId: roomStore.id });
    });
  }, [canvasStore, roomStore.id]);

  /** Инициализируем канвас */
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

  return (
    <div className={classes.canvasWrapper}>
      <canvas
        className={clsx(classes.canvas, classes.unselectable)}
        ref={canvasRef}
        onMouseDown={(e) => canvasStore.startDraw(getCurrentPoint(e))}
        onMouseMove={(e) => canvasStore.draw(getCurrentPoint(e))}
        /** Обязательно создается функция, иначе в сторе нет контекста this */
        onMouseUp={() => canvasStore.endDraw()}
        onMouseLeave={() => canvasStore.endDraw()}
      />
    </div>
  );
};

const connected = observer(DrawTable);
export { connected as DrawTable };
