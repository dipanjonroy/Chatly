import Button from "../ui/Button";
import FormInput from "../ui/FormInput";
import FormLabel from "../ui/FormLabel";

function SignupForm() {
  return (
    <form>
      <div className="flex flex-col sm:flex-row sm:gap-5">
        <div>
          <FormLabel name="Firstname" htmlFor="fName" required={true} />
          <FormInput type="text" id="fName" />
        </div>

        <div>
          <FormLabel name="Lastname" htmlFor="lName" required={true} />
          <FormInput type="text" id="lName" />
        </div>
      </div>

      <div className="mt-4">
        <FormLabel name="Email" htmlFor="email" required={true} />
        <FormInput type="text" id="email" />
      </div>

      <div className="mt-4">
        <FormLabel name="Password" htmlFor="password" required={true} />
        <FormInput type="password" id="password" />
      </div>

      <div className="mt-4">
        <FormLabel name="Confirm Password" htmlFor="cPassword" required={true} />
        <FormInput type="password" id="cPassword" />
      </div>

      <div className="mt-4">
        <Button type="submit" text="Signup"/>
      </div>
    </form>
  );
}

export default SignupForm;
