import GameRoot from "@/components/GameRoot";
import { AudioProvider } from "@/contexts/AudioContext";
import ClientSwordScene from '@/components/ClientSwordScene';

export default function Home() {
  return (
    <AudioProvider>
      <GameRoot />

    </AudioProvider>
  );
}
