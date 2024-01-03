export interface CancelDrawProps {
  drawId: string;
}

export interface ICancelDraw {
  execute: (props: CancelDrawProps) => Promise<void>;
}
