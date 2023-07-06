import {
    Grid,
    Paper,
    Typography,
    TextField,
    Button,
    Alert,
  } from "@mui/material";
  import { useFormik } from "formik";
  import { paperStyle } from "./AuthStyles";
  import { forgotpasvalidation} from "./validations";
  import axios from "axios";
  
  export const ForgotPas = () => {
    const { handleSubmit, handleChange, touched, values, errors } = useFormik({
        initialValues: {
          email: "",
        },
        validationSchema: forgotpasvalidation,
        onSubmit: async ({ email }) => {
          try {
            const res = await axios.post("/api/webuser/forgotpassword", { email });
            console.log(res.data);
            alert("Password reset email sent successfully.");
          } catch (error) {
            console.error(error);
            alert("An error occurred. Please try again later.");
          }
        },
      });
    return (
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid textAlign="center" marginBottom={2}>
            <Typography variant="h5" fontWeight="bold">
              Forgot Password
            </Typography>
          </Grid>
          <Grid>
            {errors.general && <Alert severity="error">{errors.general}</Alert>}
          </Grid>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              name="email"
              label="Email"
              variant="standard"
              placeholder="Enter you email"
              onChange={handleChange}
              value={values.email}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <Grid marginTop={3}>
              <Button
                fullWidth
                textAlign="center"
                type="submit"
                variant="contained"
                color="primary"
              >
               Send reset code
              </Button>
            </Grid>
          </form>
        </Paper>
      </Grid>
    );
  }
  