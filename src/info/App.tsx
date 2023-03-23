import React from "react";
import {
  getData,
  updateData,
  postData,
  deleteData,
} from "../services/api-service";
import { Field, Formik } from "formik";
import { LoadingButton } from "@mui/lab";
import { Box, TextField, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { ValidationSchema } from "./validation-schema";

interface Props {
  _id: string;
  Name: string;
  Age: string;
  Addr: string;
}

function App() {
  const [values, setValues] = React.useState<Props>({
    _id: "",
    Name: "",
    Age: "",
    Addr: "",
  });

  const [finalData, setFinalData] = React.useState([]);
  const [isEdit, setIsEdit] = React.useState(false);

  const getData1 = () => {
    getData("/info").then((res: any) => {
      console.log(res.data);
      setFinalData(res.data);
    });
  };

  React.useEffect(() => {
    getData1();
  }, []);

  React.useEffect(() => {
    if(!isEdit){
      setValues({
        _id: "",
        Name: "",
        Age: "",
        Addr: "",
      });
    }
  }, [isEdit]);

  const hanldeSubmit = (data: any, prop: any, resetForm: any) => {
    if (isEdit && prop === "edit") {
      updateData("/info/update", data).then((res: any) => {
        console.log(res);
        getData1();
        setIsEdit(false);
      });
    } else {
      postData("/info", data).then((res: any) => {
        console.log(res);
        getData1();
        setIsEdit(false);
      });
    }
    resetForm({values:{
      Name: "",
      Age: "",
      Addr: "",
    }});
  };

  const handleEdit = (values: any) => {
    console.log(values);
    if (values.id !== null) {
      setValues({
        _id: values._id,
        Name: values.Name,
        Age: values.Age,
        Addr: values.Addr,
      });
    }
    setIsEdit(true);
  };

  const handleDelete = (id: any) => {
    console.log(id);
    deleteData("/info/del", id).then((res: any) => {
      console.log(res);
      getData1();
    });
  };

  return (
    <div className="App">
       <Box sx={{ padding: "16px 25px" }}>
      <Typography variant="h6">
       FORM
      </Typography>
      <Box sx={{ width: "50%", marginTop: "26px", "& .MuiTextField-root": { mb: 2 } }}>
        <Formik
          enableReinitialize={true}
          initialValues={{
            _id: values._id || "",
            Name: values.Name || "",
            Age: values.Age || "",
            Addr: values.Addr || "",
          }}
          validationSchema={ValidationSchema()}
          onSubmit={(data, {resetForm}) => {
            if (data._id) {
              const updateRequest = {
                _id: data._id,
                Name: data.Name,
                Age: data.Age,
                Addr: data.Addr,
              };
              hanldeSubmit(updateRequest, "edit", resetForm);
              
            } else {
              const createRequest = {
                Name: data.Name,
                Age: data.Age,
                Addr: data.Addr,
              };
              hanldeSubmit(createRequest, "Add",  resetForm);
            }
          }}
        >
          {(formik) => (
            <form noValidate onSubmit={formik.handleSubmit}>
              {/* <label>Name</label> */}
              <TextField
                name="Name"
                onChange={formik.handleChange}
                placeholder="Name"
                // defaultValue={values.Name}
                value={formik.values.Name}
                variant="outlined"
                size="medium"
                fullWidth
                required
                error={formik.touched.Name && Boolean(formik.errors.Name)}
                helperText={formik.touched.Name && formik.errors.Name}
              />
              <TextField
                name="Age"
                placeholder="Age"
                onChange={formik.handleChange}
                // defaultValue={values.Age}
                variant="outlined"
                size="medium"
                fullWidth
                required
                value={formik.values.Age}
                error={formik.touched.Age && Boolean(formik.errors.Age)}
                helperText={formik.touched.Age && formik.errors.Age}
              />
              <TextField
                name="Addr"
                placeholder="Address"
                onChange={formik.handleChange}
                // defaultValue={values.Addr}
                variant="outlined"
                size="medium"
                fullWidth
                required
                value={formik.values.Addr}
                error={formik.touched.Addr && Boolean(formik.errors.Addr)}
                helperText={formik.touched.Addr && formik.errors.Addr}
              />
              <button type="submit">OK</button>
            </form>
          )}
        </Formik>
        </Box>
        <Box sx={{width: "30%", backgroundColor: "#E0E0E0", }}>
          <ul style={{}}>
            {finalData?.length > 0 &&
              finalData?.map((x: any) => (
                <li key={x._id} style={{ marginRight: "50px" , paddingRight: "10px"}}>
                  {x.Name + "      " + x.Age}
                  <Box>
                  <button onClick={() => handleEdit(x)}>Edit</button>
                  <button onClick={() => handleDelete(x._id)}>x</button>
                  </Box>
                </li>
              ))}{" "}
          </ul>
        </Box>
      </Box>
    </div>
  );
}

export default App;
