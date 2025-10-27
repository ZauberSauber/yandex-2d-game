type TDrawImgProps = {
  ctx: CanvasRenderingContext2D;
  posX: number;
  posY: number;
  width?: number;
  height?: number;
  src?: string;
};

export const drawImg = ({
  ctx,
  posX,
  posY,
  width = 40,
  height = 40,
  src = '',
}: TDrawImgProps): void => {
  if (src.length) {
    const img = new Image();

    img.src = src;
    img.onload = () => {
      ctx.drawImage(img, posX, posY, width, height);
    };

    return;
  }

  ctx.save();

  ctx.fillStyle = 'white';
  ctx.fillRect(posX, posY, width, height);

  ctx.font = '14px Arial';
  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  ctx.fillText('no img', posX + width / 2, posY + height / 2 + 3, width);

  ctx.restore();
};
