import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
// import { size } from 'lodash';

const useStyles = makeStyles({
  root: {
    maxWidth: 305,
    margin: '16px',
    textAlign: 'justify',
    boxShadow:'6px 6px 10px rgb(212, 24, 24, 0.1)',
    padding: '20px'
  },
  media: {
    height: 170,
    padding:'14px',
    
  },
});

const data = [
  {
    title: 'React',
    description:
      'React is a free and open-source front-end JavaScript library that aims to make building user interfaces based on components more seamless. It is maintained by Meta and a community of individual developers and companies.',
    link: 'https://react.dev/',
    image: 'https://legacy.reactjs.org/favicon.ico',
  },
  {
    title: 'Material-UI',
    description:
      'Material-UI is an open-source project that features React components that implement Google’s Material Design. It is maintained by the company Call-Em-All and other individual contributors.',
    link: 'https://v4.mui.com/',
    image: 'null',
  },
];

export default function CardniJuliana() {
  const classes = useStyles();

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {data.map((data, index) => (
        <Card key={index} className={classes.root}>
        
          <CardActionArea>
            <CardMedia className={classes.media} image={data.image} title={data.title} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {data.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {data.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <IconButton href={data.link} target="_blank" rel="noopener noreferrer">
              <LinkIcon />
            </IconButton>
            <Button size="small" color="primary" href={data.link} target="_blank">
              Learn More
            </Button>
            
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
