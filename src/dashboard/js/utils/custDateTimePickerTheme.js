import { createTheme } from "@material-ui/core/styles";

const CustMaterialTheme = createTheme({
  overrides: {
    MuiPickersCalendarHeader: {
      switchHeader: {
        color: "#006976",
        textTransform: "uppercase",
      },
      dayLabel: {
        textTransform: "uppercase",
      },
    },
    MuiPickersDay: {
      day: {
        color: "#000000",
      },
      daySelected: {
        backgroundColor: "#006976",
        "&:hover": {
          backgroundColor: "#006976",
        },
      },
      current: {
        color: "#006976",
      },
    },
    MuiSvgIcon: {
      root: {
        fill: "#006976",
      },
    },
  },
});

export default CustMaterialTheme;
