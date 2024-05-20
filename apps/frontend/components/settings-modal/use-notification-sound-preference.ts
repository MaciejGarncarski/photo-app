import { useNotificationSoundAtom } from "@/components/settings-modal/use-notification-sound-atom";

export const useNotificationSoundPreference = () => {
  const { notificationSound, setNotificationSound } =
    useNotificationSoundAtom();

  const isSoundEnabled = notificationSound === "ON";

  const toggleNotificationSound = () => {
    setNotificationSound((sound) => (sound === "ON" ? "OFF" : "ON"));
  };

  return {
    isSoundEnabled,
    toggleNotificationSound,
  };
};
