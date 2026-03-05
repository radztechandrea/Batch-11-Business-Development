import Hero from "./components/Hero/Hero";
import Questionnaire from "./components/Questionnaire/Questionnaire";
import Result from "./components/Result/Result";
import Checkout from "./components/Checkout/Checkout";
import Reciept from "./components/Reciept/Reciept";
import PaymentComplete from "./components/PaymentComplete/PaymentComplete";
import ContactUs from "./components/ContactUs/ContactUs";
import DefaultLayout from "./layouts/DefaultLayout";

const routes = [
  {
    path: "/",
    element: DefaultLayout,
    children: [
      {
        index: true,
        element: Hero,
      },
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
      {
        path: "contact-us",
        element: ContactUs,
      },
    ],
  },
];

export default routes;
