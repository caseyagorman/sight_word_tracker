export default function validateInput(data) {
  let errors = {};
  if (data.username === null) {
    errors.username = "This field is required";
  }
  if (data.email === null) {
    errors.email = "This field is required";
  }
  if (!data.isEmail) {
    errors.email = "Email is invalid";
  }
  if (data.password === null) {
    errors.password = "This field is required";
  }
  if (data.confirmPassword === null) {
    errors.confirmPassword = "This field is required";
  }
  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }
}
