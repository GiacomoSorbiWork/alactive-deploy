export type Media = {
  id: string;
  video: string;
  alt?: string;
};

export interface MediaViewProps {
  items: Array<{
    id: string;
    video: string;
    alt?: string;
  }>;
  handleIndexChange?: (index: number) => void; // Optional function
}
