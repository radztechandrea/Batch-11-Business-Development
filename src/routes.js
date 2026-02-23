import Test from "./components/Test";
import UlapTax from "./components/UlapTax";
import DefaultLayout from "./layouts/DefaultLayout";
import DataTableUsage from "./components/DataTableUsage";
import Test3 from "./components/DataRestructure/Test";
import FlowChart from "./components/FlowChart/FlowChart";
import App from "./components/OrgChart/App1";
import SearchBar from "./components/SearchBar/SearchBar";
// import MapComponent from "./components/MapComp/Map";
import Payroll from "./components/Payroll/Payroll";
import Upload from "./components/TerminalMap/Upload";
import Entry from "./components/Journal/Entry";
import MapMarker from "./components/MapTerminal/MapMarker";
// import MapComponent from "./components/MapComp/Map";
import Setting from "./components/Setting/Setting";
import RaquelIntern from "./components/RaquelIntern/RaquelIntern";
import EmailComponent from "./components/RaquelIntern/EmailComponent";
import JSONValidate from "./components/RaquelIntern/JSONValidate";
import DebounceMemo from "./components/RaquelIntern/DebounceMemo";
import DebounceTextField from "./components/RaquelIntern/DebounceTextField";
import CardniJuliana from "./components/Juls/CardniJuliana";
import TechCard from "./components/kyle/TechCard";



const routes = [
  {
    path: "/",
    element: DefaultLayout,
    children: [
      {
        path: "test",
        element: Test,
      },
      {
        path: "ulaptax",
        element: UlapTax,
      },
      {
        path: "TableRestruct",
        element: Test3,
      },
      {
        path: "datatable",
        element: DataTableUsage,
      },
      // {
      //   path: "mapcomponent",
      //   element: MapComponent,
      // },
      {
        path: "flowchart",
        element: FlowChart,
      },
      {
        path: "orgchart",
        element: App,
      },
      {
        path: "searchbar",
        element: SearchBar,
      },
      {
        path: "PayrollMd",
        element: Payroll,
      },
      {
        path: "terminal",
        element: Upload,
      },
      {
        path: "data",
        element: Entry,
      },
      {
        path: "marker",
        element: MapMarker,
      },
      {
        path: "set",
        element: Setting,
      },
      {
        path: "YIE",
        element: RaquelIntern,
      },
      {
        path:"YEY",
        element: EmailComponent,
      },
      {
        path:"YAY",
        element: JSONValidate, 
      },
      {
        path:"HIHI",
        element: DebounceMemo, 
      },
      {
        path: "HAHA", 
        element: DebounceTextField,
      },
      {
        path: "card_juliana",
        element: CardniJuliana,
      },
      {
        path: "kyle",
        element: TechCard,
      },
    ],
  },
];

export default routes;
