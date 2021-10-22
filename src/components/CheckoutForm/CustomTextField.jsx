import React from 'react';
import { TextField, Grid } from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form';

const FormInput = ({ name, label }) => {
    const { control } = useFormContext();

    /*return (
        <Grid item xs={12} sm={6}>
            <Controller 
                as={TextField} 
                control={control}
                fullWidth
                name={name}
                label={label}
                required
            />
        </Grid>
    );
};*/

return (
    <>
          <Controller
             control={control}
             name={name}
             render = {({ field})=> (
                 <TextField
                     fullWidth
                     label={label}
                     required
                 />
             )}
          />
    </>
  );
  }

/*const {control} = useForm()
<Controller
        render={
            ({ field }) => {<TextField {...field} fullWidth label={label} required={required} />}
        }
        control={control}
        name={name}
        defaultValue=""
        />
    
}*/
export default FormInput;