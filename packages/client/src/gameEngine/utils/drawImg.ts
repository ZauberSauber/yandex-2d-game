type TDrawImgProps = {
  ctx: CanvasRenderingContext2D;
  posX: number;
  posY: number;
  width?: number;
  height?: number;
  src?: string;
};

const imageCache = new Map<string, { img: HTMLImageElement; status: 'pending' | 'loaded' }>();

const drawPlaceholder = (
  ctx: CanvasRenderingContext2D,
  posX: number,
  posY: number,
  width: number,
  height: number
) => {
  ctx.save();
  ctx.fillStyle = 'white';
  ctx.fillRect(posX, posY, width, height);
  ctx.font = '14px Arial';
  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  ctx.fillText('no img', posX + width / 2, posY + height / 2 + 3, width);
  ctx.restore();
};

export const drawImg = ({
  ctx,
  posX,
  posY,
  width = 40,
  height = 40,
  src = '',
}: TDrawImgProps): void => {
  if (src) {
    const cachedData = imageCache.get(src);

    if (cachedData?.status === 'loaded') {
      ctx.drawImage(cachedData.img, posX, posY, width, height);
      return;
    }

    if (cachedData?.status === 'pending') {
      drawPlaceholder(ctx, posX, posY, width, height);
      return;
    }

    // Если изображение еще не загружалось - начинаем загрузку
    const img = new Image();

    img.src = src;
    imageCache.set(src, { img, status: 'pending' });

    img.onload = () => {
      imageCache.set(src, { img, status: 'loaded' });
      ctx.drawImage(img, posX, posY, width, height);
    };

    // Показываем заглушку во время загрузки
    drawPlaceholder(ctx, posX, posY, width, height);
    return;
  }

  // Если нет src - сразу показываем заглушку
  drawPlaceholder(ctx, posX, posY, width, height);
};
