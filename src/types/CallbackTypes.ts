export interface onDropProps {
   el: Element | null;
   target: Element | null;
   source: Element | null;
   sibling: Element | null;

   sourceId: string;
   targetId: string;
   fromIndex: number;
   toIndex: number;
}

export interface onDragProps {
   el: Element | null;
   source: Element | null;

   sourceId: string;
   fromIndex: number;
}