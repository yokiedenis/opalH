// ========================================
// ROOM IMAGES
// ========================================
import singleRoom from "./bed1.png";
import doubleRoom from "./bed2.png";
import conferenceHall from "./conferenceHall.png";
import rooftopGarden from "./pooltable.png";
import restaurant from "./dinnerParty.png";

// ========================================
// BREAKFAST ITEMS
// ========================================
import englishBreakfast from "./wakeupandgorolex.jpg";
import wakeUpAndGo from "./matookekatogo.jpg";

// ========================================
// MEAL ITEMS
// ========================================
import tilapia from "./fish.jpg";
import mulokoni from "./mulo.jfif";
import boiledChicken from "./grilledduarterchicken.jpg";
import beefSteak from "./matookeBeef.jpg";
import lusaniya from "./wholeChicken.jpg";

// ========================================
// PIZZA ITEMS
// ========================================
import chickenPizza from "./pizza2.jpg";
import vegetablePizza from "./pizza.png";

// ========================================
// DRINKS
// ========================================
import freshJuice from "./juice.png";

// ========================================
// DESSERTS
// ========================================
import chocolateCake from "./fruits2.jpg";

// ========================================
// HOTEL & PROMO VIDEOS
// ========================================
const videos = {
  // Breakfast & Food Preparation
  breakfast: {
    bigBreakfast: "/src/assets/videos/bigbreakfast.mp4",
    bigBreakfastServing: "/src/assets/videos/bigbreakfastserving.mp4",
    breakfastPrep: "/src/assets/videos/breakfast prep.mp4",
    breakfastPrep2: "/src/assets/videos/breakfastprep2.mp4",
    breakfastPrep3: "/src/assets/videos/breakfastprep3.mp4",
  },
  // Meal Preparation & Serving
  meals: {
    chapatiBeef: "/src/assets/videos/chapatibeef.mp4",
    chipsBeef: "/src/assets/videos/chipsbeef.mp4",
    poshoBeef: "/src/assets/videos/poshobeef.mp4",
  },
  // Restaurant & Service
  restaurant: {
    pizzaPackaging: "/src/assets/videos/pizzapackaging.mp4",
    waiterServingTea: "/src/assets/videos/waiterservingtea.mp4",
    afterMeal: "/src/assets/videos/aftermeal.mp4",
  },
  // Staff & Customer Experience
  testimonials: {
    cuteWaiter: "/src/assets/videos/cutewaiter.mp4",
    cuteWaiterServingLunch: "/src/assets/videos/cutewaiterservinglunch.mp4",
    satisfiedCustomer: "/src/assets/videos/satifiedcustomer.mp4",
  },
};

// ========================================
// EXPORT BY CATEGORY
// ========================================

// Room Images
export const roomImages = {
  singleRoom,
  doubleRoom,
  conferenceHall,
  rooftopGarden,
  restaurant,
};

// Food Images - Breakfast
export const breakfastImages = {
  englishBreakfast,
  wakeUpAndGo,
};

// Food Images - Meals
export const mealImages = {
  tilapia,
  mulokoni,
  boiledChicken,
  beefSteak,
  lusaniya,
};

// Food Images - Pizza
export const pizzaImages = {
  chickenPizza,
  vegetablePizza,
};

// Food Images - Drinks
export const drinkImages = {
  freshJuice,
};

// Food Images - Desserts
export const dessertImages = {
  chocolateCake,
};

// All food images by category
export const foodImages = {
  breakfast: breakfastImages,
  meal: mealImages,
  pizza: pizzaImages,
  drink: drinkImages,
  dessert: dessertImages,
};

// All videos by category
export const allVideos = videos;

// All images
export default {
  rooms: roomImages,
  food: foodImages,
  breakfast: breakfastImages,
  meals: mealImages,
  pizza: pizzaImages,
  drinks: drinkImages,
  desserts: dessertImages,
  videos,
};
