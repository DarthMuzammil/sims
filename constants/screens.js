import SplashScreen from "@/components/screens/SplashScreen";
import CharacterCreation from "@/components/screens/CharacterCreation";
import Tutorial from "@/components/screens/Tutorial";

export const SCREENS = {
  SPLASH: {
    id: 'SPLASH',
    component: SplashScreen,
    next: 'CHARACTER_CREATION',
    autoProgress: true,
    autoProgressDelay: 3000,
  },
  CHARACTER_CREATION: {
    id: 'CHARACTER_CREATION',
    component: CharacterCreation,
    next: 'TUTORIAL',
    autoProgress: false,
  },
  TUTORIAL: {
    id: 'TUTORIAL',
    component: Tutorial,
    next: 'GAME',
    autoProgress: false,
  },
  GAME: {
    id: 'GAME',
    next: null,
    autoProgress: false,
  }
};

export const SCREEN_TRANSITIONS = {
  FADE: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren"
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        when: "afterChildren"
      }
    }
  },
  SCALE_FADE: {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  }
}; 