import { CONTROLS_TEXT } from "../../constants/ui";

export const ControlsOverlay = () => {
  return (
    <div className="absolute bottom-4 left-4 bg-black/70 text-white p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-2">{CONTROLS_TEXT.TITLE}</h2>
      <p>{CONTROLS_TEXT.MOVEMENT}</p>
      <p>{CONTROLS_TEXT.INTERACTION}</p>
      <p>{CONTROLS_TEXT.CHAT}</p>
      <p>{CONTROLS_TEXT.CAMERA}</p>
    </div>
  );
}; 