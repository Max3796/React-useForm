import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";

export default function FormUse() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const FormSubmitHandler = (data) => {
    if (Object.keys(errors).length !== 0) {
      toast.error("Please fix all errors before submitting the form.");
      return;
    }
    toast.success("Form submitted successfully!");
    console.log("Submitting form with data:", data);
  };

  return (
    <div id="form">
      <ToastContainer />
      <fieldset>
        <legend>Fill This Form</legend>

        <form onSubmit={handleSubmit(FormSubmitHandler)}>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              {...register("firstName", {
                required: "Fill First Name",
                minLength: {
                  value: 4,
                  message: "Minimum 4 characters required"
                }
              })}
            />
            <p className="err">{errors.firstName?.message}</p>
          </div>

          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              {...register("lastName", {
                required: "Fill the Last Name",
                minLength: {
                  value: 4,
                  message: "Minimum 4 characters required"
                },
                maxLength: { value: 15, message: "Only 15 characters allowed" }
              })}
            />
            <p className="err">{errors.lastName?.message}</p>
          </div>

          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              {...register("email", {
                required: "Email Required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid Email"
                }
              })}
            />
            <p className="err">{errors.email?.message}</p>
          </div>

          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              {...register("password", {
                required: "Password Required",
                minLength: {
                  value: 8,
                  message: "Minimum 8 characters required"
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                  message: "Password Not Valid (Use Special Characters & Numbers)"
                }
              })}
            />
            <p className="err">{errors.password?.message}</p>
          </div>

          <div>
            <input type="submit" value="Register" />
          </div>
        </form>
      </fieldset>
    </div>
  );
}
