import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import "./Table.css";

const Table = (props) => {
  const useStyles = makeStyles((theme) => ({
    avatar: {
      height: "100px",
      width: "100px",
    },
  }));
  const classes = useStyles();
  return (
    <div className="container">
      {props.data.map((elem) => {
        return (
          <div className="cards" key={elem.id}>
            <Card className={classes.root}>
              <CardHeader
                avatar={
                  <Avatar className={classes.avatar}>
                    <img src={elem.avatar} alt="avatar" />
                  </Avatar>
                }
                title={`${elem.first_name} ${elem.last_name}`}
                subheader={elem.email}
              />
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default Table;
