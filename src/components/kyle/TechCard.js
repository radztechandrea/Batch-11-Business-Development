import React from "react";
import { Box, Paper, Typography, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    display: '  ',
    flexDirection: 'column',
    alignItems: 'center'
  },
  image: {
    width: 200, 
    height: 200,
    marginBottom: theme.spacing(2)
  }
}));

const TechCard = () => {
  const classes = useStyles();
  const data = [
    {
      title: 'React',
      description: 'React is a free and open-source front-end JavaScript library that aims to make building user interfaces based on components more "seamless". It is maintained by Meta and a community of individual developers and companies.',
      url: 'https://react.dev/',
      logo: 'https://reactjs.org/favicon.ico'
    },
    {
      title: 'Material-UI',
      description: 'Material-UI is an open-source project that features React components that implement Google’s Material Design. It is maintained by the company Call-Em-All and other individual contributors.',
      url: 'https://v4.mui.com/',
      logo: 'https://w7.pngwing.com/pngs/761/513/png-transparent-material-ui-logo-thumbnail.png'
    }
  ];

  const DEFAULT_LOGO = 'https://via.placeholder.com/150';

  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        {data.map((item, index) => (
          <Grid item xs={120} sm={60} md={40} key={index}>
            <Paper className={classes.paper}>
              <img src={item.logo || DEFAULT_LOGO} alt={`${item.title} logo`} className={classes.image} />
              <Typography variant="h5">{item.title}</Typography>
              <Typography variant="body1">{item.description}</Typography>
              <Button color="primary" href={item.url} target="_blank">Learn More</Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TechCard;
