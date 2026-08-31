export interface LightboxItem {
  src: string;
  title: string;
  desc: string;
  tag: string;
}

export interface LightboxProps {
  images: readonly LightboxItem[];
  initialIndex: number;
  onClose: () => void;
}
