import ChangePasswordForm from "../forms/ChangePasswordForm";
import classes from "./ChangePasswordPage.module.css";

const ChangePasswordPage = () => {
  return (
    <div className={classes.form}>
      <ChangePasswordForm />
    </div>
  );
};

export default ChangePasswordPage;
