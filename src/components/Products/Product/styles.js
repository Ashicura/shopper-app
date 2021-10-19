import { makeStyles } from "@material-ui/core/styles";
import { findByLabelText } from "@testing-library/dom";

export default makeStyles(() => ({
    root: {
        maxWidth: '100%',
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    CardContent: {
        display: 'flex',
        justifyContent: 'space-between',
    },
}));