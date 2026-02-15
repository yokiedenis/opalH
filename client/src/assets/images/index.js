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
import chapatiVeggies from "./thumbfour.png";
import wages from "./wages.png";
import matookeBF from "./matookeBF.png";

// ========================================
// MEAL ITEMS
// ========================================
import tilapia from "./fish.jpg";
import mulokoni from "./mulo.jfif";
import boiledChicken from "./grilledduarterchicken.jpg";
import beefSteak from "./matookeBeef.jpg";
import lusaniya from "./wholeChicken.jpg";
import mashedPotatoes from "./mashed.png";
import goatMeat from "./chips.png";

// ========================================
// PIZZA ITEMS
// ========================================
import chickenPizza from "./pizza2.jpg";
import vegetablePizza from "./pizza.png";
import pizza from "./pizza.png";
import vegpizza from "./pizza.png";

// ========================================
// DRINKS
// ========================================
import freshJuice from "./juice.png";
import juice from "./juice.png";

// ========================================
// DESSERTS
// ========================================
import chocolateCake from "./fruits.jpg";
import cake from "./cake.jfif";
import mangoes from "./thumbfive.png";

// ========================================
// ADDITIONAL FOOD ITEMS
// ========================================
import posho from "./mulo.jfif";
import rolex from "./wakeupandgorolex.jpg";
import samosa from "./pizza.png";
import steak from "./matookeBeef.jpg";
import matoke from "./matookekatogo.jpg";

// ========================================
// HOTEL & PROMO VIDEOS
// ========================================
const videos = {
  // Breakfast & Food Preparation
  breakfast: {
    bigBreakfast: "bigbreakfast.mp4",
    bigBreakfastServing: "bigbreakfastserving.mp4",
    breakfastPrep: "breakfast prep.mp4",
    breakfastPrep2: "breakfastprep2.mp4",
    breakfastPrep3: "breakfastprep3.mp4",
  },
  // Meal Preparation & Serving
  meals: {
    chapatiBeef: "chapatibeef.mp4",
    chipsBeef: "chipsbeef.mp4",
    poshoBeef: "poshobeef.mp4",
  },
  // Restaurant & Service
  restaurant: {
    pizzaPackaging: "pizzapackaging.mp4",
    waiterServingTea: "waiterservingtea.mp4",
    afterMeal: "aftermeal.mp4",
  },
  // Staff & Customer Experience
  testimonials: {
    cuteWaiter: "cutewaiter.mp4",
    cuteWaiterServingLunch: "cutewaiterservinglunch.mp4",
    satisfiedCustomer: "satifiedcustomer.mp4",
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
  chapatiVeggies,
  wages,
  matookeBF,
};

// Food Images - Meals
export const mealImages = {
  tilapia,
  mulokoni,
  boiledChicken,
  beefSteak,
  lusaniya,
  mashedPotatoes,
  goatMeat,
};

// Food Images - Pizza
export const pizzaImages = {
  chickenPizza,
  vegetablePizza,
  pizza,
  vegpizza,
};

// Food Images - Drinks
export const drinkImages = {
  freshJuice,
  juice,
};

// Food Images - Desserts
export const dessertImages = {
  chocolateCake,
  cake,
  mangoes,
};

// Additional Exports - Room Images
export { singleRoom, doubleRoom, conferenceHall, rooftopGarden, restaurant };

// Additional Exports - Food Images
export {
  posho,
  rolex,
  samosa,
  steak,
  matoke,
  pizza,
  vegpizza,
  juice,
  cake,
  tilapia,
  vegetablePizza,
  lusaniya,
  mulokoni,
  boiledChicken,
  beefSteak,
  chickenPizza,
  englishBreakfast,
  wakeUpAndGo,
  mashedPotatoes,
  goatMeat,
  chapatiVeggies,
  wages,
  matookeBF,
  mangoes,
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
