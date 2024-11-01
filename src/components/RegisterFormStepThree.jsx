import { Input, Button } from "@nextui-org/react";
import LockIcon from "@mui/icons-material/Lock";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function RegisterFormStepThree({ userInformation, updateUserInformation }) {
  // Define Formik with initial values and validation schema
  const formik = useFormik({
    initialValues: {
      bankNumber: userInformation?.bankNumber || "",
    },
    validationSchema: Yup.object({
      bankNumber: Yup.string()
        .required("Bank verification number is required")
        .matches(/^\d+$/, "Only numbers are allowed")
        .min(11, "BVN must be exactly 11 digits")
        .max(11, "BVN must be exactly 11 digits"),
    }),
    onSubmit: (values) => {
      updateUserInformation(values, "03");
    },
  });

  return (
    <div className="w-[70%] space-y-6 mx-auto p-6 mt-4">
      <div>
        <h2 className="text-black text-3xl font-bold">Complete Your Profile!</h2>
        <div className="text-gray-500 mt-2 flex-1 flex-row">
          <div>For the purpose of industry regulation, your</div>
          <div className="text-gray-500">details are required.</div>
        </div>
        <div className="flex-1 border-b border-gray-200 mt-4"></div>
        <form className="space-y-4 mt-8" onSubmit={formik.handleSubmit}>
          <div style={{ marginTop: "10%" }}>
            <label
              htmlFor="bankNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Bank verification number (BVN)
            </label>
            <Input
              id="bankNumber"
              name="bankNumber"
              fullWidth
              type="text"
              placeholder="Enter bank number"
              aria-label="Bank number"
              radius="sm"
              size="lg"
              className={`mt-2 border border-gray-300 rounded-md hover:border-blue-400 ${formik.errors.bankNumber ? 'border-red-600' : ''}`}
              value={formik.values.bankNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.bankNumber && formik.errors.bankNumber ? (
              <div className="text-red-500 mt-1">{formik.errors.bankNumber}</div>
            ) : null}
          </div>

          <div>
            <Button color="primary" className="w-full mt-[15%]" size="lg" type="submit">
              Save & Continue
            </Button>
          </div>
        </form>

        <div className="flex items-center justify-center my-4">
          <span className="mx-4 text-gray-400">
            <LockIcon fontSize="small" className="mb-1 mr-2" />
            Your Info is safely secured
          </span>
        </div>
      </div>
    </div>
  );
}
