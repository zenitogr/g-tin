export interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

export interface ChatState {
  messages: Message[];
  inputMessage: string;
  isLoading: boolean;
  error: string | null;
}

export interface Marker {
  id: number;
  messageIds: number[];
  scrollPosition: number;
}

export interface MarkersState {
  markers: Marker[];
  currentMarkerIndex: number | null;
}

export interface ScrollState {
  isScrolledToBottom: boolean;
  canScrollUp: boolean;
  canScrollDown: boolean;
  isButtonScroll: boolean;
  isMarkerScrolling: boolean;
}