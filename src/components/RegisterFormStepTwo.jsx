import { Input, Button, Avatar, Select, SelectItem } from "@nextui-org/react";
import LockIcon from "@mui/icons-material/Lock";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string().required("Phone number is required"),
  address: Yup.string().required("Address is required"),
  countryResidence: Yup.string().required("Country of residence is required"),
});

export default function RegisterFormStepTwo({ onNext, updateUserInformation, userInformation }) {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({
    code: userInformation?.phoneNumber === "" ? "+213" : userInformation?.phoneNumber.split(" ")[0].trim(),
    flag: "https://flagcdn.com/dz.svg",
  }); // Default to Algeria
  const [open, setOpen] = useState(false); // To control dropdown visibility

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      phoneNumber: userInformation?.phoneNumber === "" ? userInformation?.phoneNumber : userInformation?.phoneNumber.split(" ")[1].trim() || "",
      address: userInformation?.address || "", // Changed to address
      countryResidence: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      updateUserInformation({
        phoneNumber: `${selectedCountry.code} ${values.phoneNumber}`,
        address: values.address,
        countryResidence: values.countryResidence,
      }, "02")
      onNext();
    },
  });

  useEffect(() => {
    // Fetch country data with flags and codes
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countryData = data
          .map((country) => ({
            name: country.name.common,
            code: country.idd.root
              ? `${country.idd.root}${
                  country.idd.suffixes ? country.idd.suffixes[0] : ""
                }`
              : "",
            flag: country.flags.svg,
          }))
          .filter((country) => country.code); // Filter out countries without codes
        setCountries(countryData);

        if(userInformation?.phoneNumber){
          const findedCountryName = countryData.find((country) => country.code === userInformation?.phoneNumber.split(" ")[0].trim())
          setSelectedCountry({...selectedCountry, flag: findedCountryName.flag})
        }

        if (userInformation?.countryResidence) {
          const findedCountryName = countryData.find((country) => country.name === userInformation?.countryResidence)
          formik.setFieldValue("countryResidence", findedCountryName.name); // Set to first country or any valid one
        }
      })
      .catch((error) => console.error("Error fetching country data:", error));
  }, []);

  // Handle country selection change
  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setOpen(false); // Close the dropdown after selecting
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
        <form onSubmit={formik.handleSubmit} className="space-y-4 mt-3">
          <div style={{ marginTop: "30px" }}>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <div style={{ position: "relative", width: "100%" }}>
              <Input
                fullWidth
                name="phoneNumber"
                placeholder="Enter phone number"
                aria-label="Your phone number"
                bordered
                size="lg"
                radius="sm"
                style={{ backgroundColor: "white"}}
                className={`mt-2 border border-gray-300 rounded-md hover:border-blue-400 ${formik.errors.phoneNumber ? 'border-red-600' : ''}`}
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                error={
                  formik.touched.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
                startContent={
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => setOpen(!open)}
                  >
                    <Avatar
                      src={selectedCountry.flag}
                      squared="true"
                      size="sm"
                    />
                    <span>{selectedCountry.code}</span>
                    <KeyboardArrowDownIcon />
                  </div>
                }
              />

              {/* Dropdown for selecting a country code */}
              {open && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: "0",
                    width: "100%",
                    maxHeight: "200px",
                    overflowY: "auto",
                    zIndex: 10,
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                  }}
                >
                  {countries.map((country) => (
                    <div
                      key={country.name}
                      onClick={() => handleCountryChange(country)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "10px",
                        cursor: "pointer",
                      }}
                    >
                      <Avatar
                        src={country.flag}
                        alt={country.name}
                        squared="true"
                        size="sm"
                      />
                      <span style={{ marginLeft: "8px" }}>
                        {country.name} ({country.code})
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <div className="text-red-600 text-sm">
                {formik.errors.phoneNumber}
              </div>
            )}
          </div>

          <div style={{ marginTop: "30px" }}>
            <label
              htmlFor="address" // Updated to address
              className="block text-sm font-medium text-gray-700"
            >
              Your Address
            </label>
            <Input
              id="address" // Updated to address
              name="address" // Updated to address
              fullWidth
              placeholder="Enter your address"
              aria-label="Your address"
              bordered
              required
              radius="sm"
              size="lg"
              className={`mt-2 border border-gray-300 rounded-md hover:border-blue-400 ${formik.errors.address ? 'border-red-600' : ''}`}
              onChange={formik.handleChange}
              value={formik.values.address}
              error={formik.touched.address && Boolean(formik.errors.address)}
            />
            {formik.touched.address && formik.errors.address && (
              <div className="text-red-600 text-sm">
                {formik.errors.address}
              </div>
            )}
          </div>

          <div style={{ marginTop: "30px" }}>
            <label
              htmlFor="countryResidence"
              className="block text-sm font-medium text-gray-700"
            >
              Country of residence
            </label>
            <Select
              name="countryResidence"
              className={`mt-2 border border-gray-300 rounded-md hover:border-blue-400 ${formik.errors.countryResidence ? 'border-red-600' : ''}`}
              size="lg"
              radius="sm"
              aria-label="Select country residence"
              onSelectionChange={(e) =>
                formik.setFieldValue("countryResidence", e.currentKey)
              }
              selectedKeys={[formik.values.countryResidence]}
            >
              {countries.map((country) => (
                <SelectItem
                  key={country.name}
                  value={country.name}
                  textValue={country.name} // Added textValue prop
                >
                  <div className="flex flex-row">
                    <Avatar
                      alt={country.name}
                      className="w-6 h-6 mr-2"
                      src={country.flag}
                    />
                    {country.name}
                  </div>
                </SelectItem>
              ))}
            </Select>
            {formik.touched.countryResidence &&
              formik.errors.countryResidence && (
                <div className="text-red-600 text-sm">
                  {formik.errors.countryResidence}
                </div>
              )}
          </div>

          <div>
            <Button
              color="primary"
              className="w-full mt-5"
              size="lg"
              type="submit"
            >
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
