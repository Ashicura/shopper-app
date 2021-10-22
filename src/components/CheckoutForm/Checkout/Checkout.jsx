import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { commerce } from '../../../lib/commerce';
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';



const steps = ['Shipping address', 'Payment details'];

const Checkout = ({ cart, order, onCaptureCheckOut, error }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const [isFinished, setIsFinished] = useState(false);
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });

                setCheckoutToken(token);

            } catch (error) {
                history.pushState('/');
            }
        }

        generateToken();
    }, [cart]);

    // useing callback to modify state preventing mutation
    const nextStep = () => setActiveStep((previousActiveStep) => previousActiveStep + 1);
    const backStep = () => setActiveStep((previousActiveStep) => previousActiveStep - 1);


    const next = (data) => {
        setShippingData(data);

        nextStep();
    }

    // this is for mock confirmation with no creditcard details
    const timeout = () => {
        setTimeout(() => {
            setIsFinished(true)
        }, 3000)
    }

    let Confirmation = () => order.customer ? (
        // if customers order exists
        <>
            <div>
                <Typography varient="h5">Thank you for shopping with us, {order.customer.firstname} {order.customer.lastname}</Typography>
                <Divider className={classes.divider} />
                <Typography variant="subtitle2"> Order ref: {order.customer_reference}</Typography>
            </div>
            <br />
            <Button component={Link} to="/" variant="outlined">Back to Home</Button>
        </>
        // logic for handeling mock completion
        ) : isFinished ? (
            <>
            <div>
                <Typography varient="h5">Thank you for shopping with us</Typography>
                <Divider className={classes.divider} />
            </div>
            <br />
            <Button component={Link} to="/" variant="outlined">Back to Home</Button>
        </>
        ) : (
            <div className={classes.spinner}>
                <CircularProgress />
            </div>
        );

        if(error) {
            <>
                <Typography varient="h5"> Error: {error} </Typography>
                <br/>
                <Button component={Link} to="/" variant="outlined">Back to Home</Button>
            </>
        }

    const Form = () => activeStep === 0
        ? <AddressForm checkoutToken={checkoutToken} next={next} />
        : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} onCaptureCheckOut={onCaptureCheckOut} timeout={timeout} />

    

    return (
        <>
        <CssBaseline />
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography varient="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    { activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form /> }
                </Paper>

            </main>
        </>
    )
}

export default Checkout
