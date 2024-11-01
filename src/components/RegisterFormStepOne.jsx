import { Input, Button, Checkbox } from "@nextui-org/react";
import GoogleIcon from "./GoogleIcon";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from "react";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

export default function RegisterFormStepOne({ onNext, userInformation, updateUserInformation }) {
  const [isVisible, setIsVisible] = useState(false);
  const [checked, setChecked] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  // Ensure userInformation is an object with default values
  const initialValues = {
    fullName: userInformation?.fullName || '',
    email: userInformation?.email || '',
    password: userInformation?.password || '',
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required('Your full name is required.'),
    email: Yup.string().email('Invalid email format').required('Email address is required.'),
    password: Yup.string().required('Password is required.').min(6, 'Password must be at least 6 characters.'),
  });

  const handleSubmit = (values) => {
    // Here you can handle the values, e.g., call a backend API or update userInformation
    updateUserInformation(values, "01");
    //console.log(values);
    // Call onNext after successfully handling the values
    if(checked) {
      onNext();
    }
  };

  return (
    <div className="w-[70%] space-y-6 mx-auto p-6 mt-4">
      <div>
        <div>
          <h2 className="text-black text-3xl font-bold">
            Register Individual Account!
          </h2>
          <div className="text-gray-500 mt-2 flex-1 flex-row">
            <div>For the purpose of industry regulation, your</div>
            <div className="text-gray-500">details are required.</div>
          </div>
        </div>
        <div className="flex-1 border-b border-gray-200 mt-4"></div>
        
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4 mt-3">
              <div style={{ marginTop: "25px" }}>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Your fullname
                </label>
                <Field
                  as={Input}
                  id="fullName"
                  name="fullName" // Add name prop for Formik
                  fullWidth
                  placeholder="Enter full name"
                  aria-label="Your fullname"
                  bordered
                  size="lg"
                  className={`mt-2 border border-gray-300 rounded-md hover:border-blue-400 ${errors.fullName ? 'border-red-600' : ''}`}
                />
                {errors.fullName && touched.fullName && <div className="text-red-500">{errors.fullName}</div>}
              </div>

              <div style={{ marginTop: "25px" }}>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <Field
                  as={Input}
                  id="email"
                  name="email" // Add name prop for Formik
                  fullWidth
                  type="email"
                  placeholder="Enter email address"
                  aria-label="Email address"
                  bordered
                  size="lg"
                  className={`mt-2 border border-gray-300 rounded-md hover:border-blue-400 ${errors.email ? 'border-red-600' : ''}`}
                />
                {errors.email && touched.email && <div className="text-red-500">{errors.email}</div>}
              </div>

              <div style={{ marginTop: "25px" }}>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Create password
                </label>
                <Field
                  as={Input}
                  id="password"
                  name="password" // Add name prop for Formik
                  fullWidth
                  placeholder="Enter password"
                  aria-label="toggle password visibility"
                  type={isVisible ? "text" : "password"}
                  bordered
                  size="lg"
                  className={`mt-2 border border-gray-300 rounded-md hover:border-blue-400 ${errors.password ? 'border-red-600' : ''}`}
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                      {isVisible ? (
                        <VisibilityOffIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <VisibilityIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                />
                {errors.password && touched.password && <div className="text-red-500">{errors.password}</div>}
              </div>

              <div>
                <div className="flex items-center mt-7">
                  <Checkbox aria-label="Agree to terms" required isSelected={checked} onChange={() => setChecked(!checked)}>
                    I agree to terms & conditions
                  </Checkbox>
                </div>

                <Button 
                  type="submit" // Change to submit for Formik
                  color="primary" 
                  className="w-full mt-5"
                  size="lg"
                >
                  Register Account
                </Button>
              </div>
            </Form>
          )}
        </Formik>

        <div className="flex items-center justify-center my-4">
          <div className="flex-1 border-b border-gray-300"></div>{" "}
          {/* Left Line */}
          <span className="mx-4 text-gray-400">Or</span>
          <div className="flex-1 border-b border-gray-300"></div>{" "}
          {/* Right Line */}
        </div>

        <Button
          bordered
          color="white"
          className="w-full rounded-md shadow-md mt-3"
          size="lg"
          startContent={<GoogleIcon />}
        >
          Register with Google
        </Button>
      </div>
    </div>
  );
}
