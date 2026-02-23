import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, makeStyles } from '@material-ui/core';


const data = [
  {
    title: 'React',
    description:
      'React is a free and open-source front-end JavaScript library that aims to make building user interfaces based on components more "seamless". It is maintained by Meta and a community of individual developers and companies.',
    url: 'https://react.dev/',
    logo: 'https://reactjs.org/favicon.ico'
  },
  {
    title: 'Material-UI',
    description:
      'Material-UI is an open-source project that features React components that implement Google’s Material Design. It is maintained by the company Call-Em-All and other individual contributors.',
    url: 'https://v4.mui.com/',
    logo: 'null' 
  }
];

const useStyles = makeStyles({
  card: {
    maxWidth: 350,
    margin: '30px',
    boxShadow: '8px 8px 10px rgba(43, 7, 7, 0.1)'
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px'
  },
  logo: {
    width: 60,
    height: 100,
    objectFit: 'contain'
  },
  buttonContainer: {
    textAlign: 'center',
    padding: '45px'
  }
});

const TechCard = ({ title, description, url, logo }) => {
  const classes = useStyles();

  return (

    <Card className={classes.card}>
      <Box className={classes.logoContainer}>
        <CardMedia
          component="img" image={logo} alt={title} className={classes.logo}
        />
      </Box>

      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
      </CardContent>

      <Box className={classes.buttonContainer}>

        <Button variant="contained" color="primary" href={url}>
            Learn More
            </Button>

      </Box>
      
    </Card>
  );
};

const RaquelIntern = () => {
  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center">
      {data.map((raquelintern, index) => (
        <TechCard key={index} {...raquelintern} /> ///the variable raquelintern po is hawak nya po yung code ng json po, instead of copying po ulit yung code na nandun, i just put it like this po for cleaner and maintainable code po kasi kapag madadagadan po ulit ung data dun atleast di na po ito babaguhin 
      ))}
    </Box>
  );
};

export default RaquelIntern;
