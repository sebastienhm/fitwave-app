import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Toolbar,
  Typography,
  FormControl,
  Select,
  MenuItem
} from "@material-ui/core";

const styles = theme => ({
  root: {
    flexGrow: 1,
    minHeight: 5,
    backgroundColor: theme.palette.primary.main,
    borderRadius: `${theme.shape.borderRadius}px ${
      theme.shape.borderRadius
    }px 0px 0px`
  },
  title: {
    flex: "0 0 auto"
  },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  }
});

const TableToolbar = props => {
  const { classes, cat, SelectInputEvent, title, allCategories } = props;

  return (
    <Toolbar className={classes.root}>
      <div className={classes.title}>
        <Typography variant="title" id="tableTitle" color="default">
          {title}
        </Typography>
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        <FormControl>
          <Select
            value={cat}
            onChange={SelectInputEvent}
            inputProps={{
              name: "currentCategory",
              id: "currentCategory-id"
            }}
          >
            {allCategories.map(category => (
              <MenuItem value={category.name} key={category.name}>
                <Typography variant="body1">{category.name}</Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </Toolbar>
  );
};

export default withStyles(styles)(TableToolbar);
