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


  // const hanldeChange = (event: any) => {
  //   const { name, value } = event.target;
  //   setValues((preValue) => ({
  //     ...preValue,
  //     [name]: value,
  //   }));
  // };

  const hanldeSubmit = (data: any, prop: any, resetForm: any) => {
    // let data = {
    //   Name: values.Name,
    //   Age: values.Age,
    // };
    // let Editdata = {
    //   _id: values._id,
    //   Name: values.Name,
    //   Age: values.Age,
    // };
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
      <header className="App-header">FORM</header>
      <div>
        <Formik
          enableReinitialize={true}
          initialValues={{
            _id: values._id || "",
            Name: values.Name || "",
            Age: values.Age || "",
            Addr: values.Addr || "",
          }}
          // validationSchema={ValidationSchema(t, videoSourceData)}
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
                type="text"
                name="Name"
                onChange={formik.handleChange}
                // defaultValue={values.Name}
                value={formik.values.Name}
              />
              {/* <label>Age</label> */}
              <TextField
                type="number"
                name="Age"
                onChange={formik.handleChange}
                // defaultValue={values.Age}
                value={formik.values.Age}
              />
              {/* <label>Addr</label> */}
              <TextField
                type="text"
                name="Addr"
                onChange={formik.handleChange}
                // defaultValue={values.Addr}
                value={formik.values.Addr}
              />
              <button type="submit">OK</button>
            </form>
          )}
        </Formik>
        <div>
          <ul>
            {finalData?.length > 0 &&
              finalData?.map((x: any) => (
                <li key={x._id} style={{ marginRight: "100px" }}>
                  {x.Name + "      " + x.Age}
                  <button onClick={() => handleEdit(x)}>Edit</button>
                  <button onClick={() => handleDelete(x._id)}>x</button>
                </li>
              ))}{" "}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
