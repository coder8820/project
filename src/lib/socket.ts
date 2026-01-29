export type PricePoint = {
  time: number; // unix ms
  price: number;
  volume: number;
};

export type SocketMessage =
  | { type: "price"; symbol: string; point: PricePoint }
  | { type: "status"; message: string };

type Listener = (msg: SocketMessage) => void;

class MockSocket {
  private listeners = new Set<Listener>();
  private intervalId: NodeJS.Timeout | null = null;
  private basePrice = 420.5;

  connect() {
    if (this.intervalId) return;
    this.intervalId = setInterval(() => {
      const now = Date.now();
      const drift = (Math.random() - 0.5) * 0.8;
      const volume = 50 + Math.random() * 200;
      this.basePrice = Math.max(5, this.basePrice + drift);

      const msg: SocketMessage = {
        type: "price",
        symbol: "AAPL",
        point: { time: now, price: Number(this.basePrice.toFixed(2)), volume },
      };

      this.listeners.forEach((fn) => fn(msg));
    }, 1_000);

    const status: SocketMessage = {
      type: "status",
      message: "Connected to mock price stream",
    };
    this.listeners.forEach((fn) => fn(status));
  }

  disconnect() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
      if (this.listeners.size === 0) {
        this.disconnect();
      }
    };
  }
}

const socket = new MockSocket();

export function subscribeToPrices(listener: Listener) {
  const unsub = socket.subscribe(listener);
  socket.connect();
  return unsub;
}

