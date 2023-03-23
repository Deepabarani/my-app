import * as yup from "yup";

export const ValidationSchema = () => {
  return yup.object({
    Name: yup.string().trim().required("Please enter name"),
    Age: yup.number().required("Please enter age"),
    Addr: yup.string().trim().required("Please enter Address"),
  });
};
