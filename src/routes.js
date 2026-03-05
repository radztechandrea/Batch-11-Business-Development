import Hero from "./components/Hero/Hero";
import Questionnaire from "./components/Questionnaire/Questionnaire";
import Result from "./components/Result/Result";
import Checkout from "./components/Checkout/Checkout";
import Reciept from "./components/Reciept/Reciept";
import PaymentComplete from "./components/PaymentComplete/PaymentComplete";

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
      {
        path: "reciept",
        element: Reciept,
      },
      {
        path: "payment-complete",
        element: PaymentComplete,
      },
    ],
  },
];

export default routes;
