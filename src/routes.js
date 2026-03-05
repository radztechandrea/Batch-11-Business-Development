import Hero from "./components/Hero/Hero";
import Questionnaire from "./components/Questionnaire/Questionnaire";
import Result from "./components/Result/Result";
import Checkout from "./components/Checkout/Checkout";

const routes = [
  {
    path: "/",
    element: Hero,
    children: [
      {
        path: "questionnaire",
        element: Questionnaire,
      },
      {
        path: "result",
        element: Result,
      },
      {
        path: "checkout",
        element: Checkout,
      },
    ],
  },
];

export default routes;
