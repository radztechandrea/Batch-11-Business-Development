import React, { useState, useEffect, useRef } from "react";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";
import Md1 from "../Payroll/Payroll.md";
import Md2 from "./Payroll2.md";
import Md3 from "./Payroll3.md";
import Md4 from "./Payroll4.md";
import Md42 from "./Payroll4-2.md";
import Md5 from "./Payroll5.md";
import Md6 from "./Payroll6.md";
import Md7 from "./Payroll7.md";
import Md8 from "./Payroll8.md";
import Md82 from "./Payroll8-2.md";
import Md9 from "./Payroll9.md";
import { Container, Typography, makeStyles } from "@material-ui/core";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const useStyles = makeStyles((theme) => ({
  "@keyframes fadeIn": {
    "0%,40%": { opacity: 0 },
    "50%": { opacity: 1 },
    "100%": { opacity: 0 },
  },
  textFade: {
    position: "fixed",
    top: "calc(50% - 20px)",
    left: "calc(50% - 80px)",
    zIndex: 10,
    animation: "$fadeIn 5s ease-in-out infinite",
    backgroundColor: "#333",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "5px",
    fontSize: "1.2rem",
    textAlign: "center",
  },
  arrowButton: {
    position: "fixed",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "50%",
    width: "5vw",
    height: "5vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    zIndex: 10,
    "&:hover": {
      backgroundColor: "#f0f0f0",
    },
  },
  nextButton: {
    right: "10px",
  },
  prevButton: {
    left: "10px",
  },
  thumbnailContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(2),
  },
  thumbnail: {
    width: "10vw",
    height: "10vw",
    margin: "0 5px",
    cursor: "pointer",
    border: "2px solid transparent",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1rem",
    backgroundColor: "#fff",
    "&.active": {
      border: "2px solid #333",
    },
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
  },
}));

function Payroll() {
  const [contents, setContents] = useState([]);
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchContent = async (url) => {
      const response = await fetch(url);
      const text = await response.text();
      setContents((prevContents) => [...prevContents, text]);
    };

    fetchContent(Md1);
    fetchContent(Md2);
    fetchContent(Md3);
    fetchContent(Md4);
    fetchContent(Md42);
    fetchContent(Md5);
    fetchContent(Md6);
    fetchContent(Md7);
    fetchContent(Md8);
    fetchContent(Md82);
    fetchContent(Md9);
  }, []);

  const NextArrow = ({ onClick }) => {
    const classes = useStyles();
    return (
      <div
        className={`${classes.arrowButton} ${classes.nextButton}`}
        onClick={onClick}
      >
        Next
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    const classes = useStyles();
    return (
      <div
        className={`${classes.arrowButton} ${classes.prevButton}`}
        onClick={onClick}
      >
        Prev
      </div>
    );
  };

  const capabilityBackgrounds = [
    "url(https://static.vecteezy.com/system/resources/previews/000/163/010/original/payroll-vector-illustration.jpg)",
    "url(https://static.vecteezy.com/system/resources/previews/000/163/035/non_2x/payroll-vector-set.jpg)",
    "url(https://media.istockphoto.com/id/1389255223/vector/salary-payroll-system-online-income-calculate-and-automatic-payment-office-accounting.jpg?s=612x612&w=0&k=20&c=j92zqhGbDc6GefnZZJVCBV-vutq_CNOAVttWKvw3DM0=)",
    "url(https://img.freepik.com/free-vector/accountant-office-manager-professional-bookkeeper-concept-tax-calculating-reporting-business-character-making-money-transfer-vector-illustration_613284-1042.jpg)",
    "url(https://static.vecteezy.com/system/resources/previews/024/033/884/original/payroll-fill-outline-icon-design-illustration-taxes-symbol-on-white-background-eps-10-file-vector.jpg)",
    "url(https://media.istockphoto.com/id/1296186887/vector/male-and-female-characters-working-on-payroll-administrative.jpg?s=612x612&w=0&k=20&c=dShouN-Qow8OIuQmPOaPNGScgfmTEin79WQXQWCGMsk=)",
    "url(https://media.istockphoto.com/id/1347949900/vector/paycheck-salary-and-payroll-concept-boss-pay-salaries-to-employees-payday-calendar-money.jpg?s=612x612&w=0&k=20&c=SHCYfn8s5JTO-OshykQSTysziN380gjRB8gIKbJ22ho=)",
    "url(https://st2.depositphotos.com/5240153/9193/v/450/depositphotos_91938290-stock-illustration-payroll-wages-money-salary.jpg)",
    "url(https://www.svgrepo.com/show/300997/salary.svg)",
    "url(https://as1.ftcdn.net/v2/jpg/03/07/81/42/1000_F_307814220_QC9CZbcbCcisexD1E0x5lkFQfJzIwxTC.jpg)",
    "url(https://static.vecteezy.com/system/resources/previews/030/997/717/non_2x/payroll-icon-vector.jpg)",
  ];

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    afterChange: (current) => {
      setCurrentSlide(current);
      window.scrollTo(0, 0);
    },
  };

  const classes = useStyles();

  return (
    <Container maxWidth="xl">
      <Typography align="center" style={{ fontSize: "2rem", fontWeight: 700 }}>
        Ulap Payroll Process
      </Typography>
      <div className={classes.textFade}>Slide Left or Right</div>
      <Slider ref={sliderRef} {...sliderSettings} style={{ flex: 1 }}>
        {contents.map((content, index) => (
          <Typography key={index} component="div" style={{ height: "50vh" }}>
            <ReactMarkdown key={index} rehypePlugins={[rehypeRaw]}>
              {content}
            </ReactMarkdown>
          </Typography>
        ))}
      </Slider>
      <div className={classes.thumbnailContainer}>
        {contents.map((_, index) => (
          <div
            key={index}
            className={`${classes.thumbnail} ${
              index === currentSlide ? "active" : ""
            }`}
            onClick={() => sliderRef.current.slickGoTo(index)}
            style={{
              backgroundImage: capabilityBackgrounds[index],
            }}
          >
            <Typography align="center" style={{ fontWeight: 600 }}>
              Capability{" "}
              {index === 4
                ? "4.2"
                : index === 9
                ? "8.2"
                : index < 4
                ? index + 1
                : index < 10
                ? index
                : index - 1}
            </Typography>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default Payroll;
