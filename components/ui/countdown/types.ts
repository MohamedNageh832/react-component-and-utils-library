interface CountDownProps {
  stop?: boolean;
  reset?: boolean;
  controls?: boolean;
  className?: string;
  value: any;
  onChange?: (valueInMillis: number) => void;
  onFinish?: () => void;
  onStop?: () => void;
  onResume?: () => void;
}

export type { CountDownProps };
