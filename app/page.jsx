import GameRoot from "@/components/GameRoot";
import { AudioProvider } from "@/contexts/AudioContext";

export default function Home() {
  return (
    <AudioProvider>
      <GameRoot />
    </AudioProvider>
  );
}
