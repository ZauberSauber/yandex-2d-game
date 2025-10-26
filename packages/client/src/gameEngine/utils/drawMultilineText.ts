type TProps = {
  ctx: CanvasRenderingContext2D;
  text: string;
  posX: number;
  posY: number;
  maxWidth: number;
  lineHeight: number;
};

export const drawMultilineText = ({ ctx, text, posX, posY, maxWidth, lineHeight }: TProps) => {
  const words = text.split(' ');
  let line = '';
  let currentY = posY;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, posX, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, posX, currentY);
};
