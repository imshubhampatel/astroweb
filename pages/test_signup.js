import RegistrationForm from "../components/RegistrationForm2";

const Page = () => {
 
  return <RegistrationForm
  registerFormHandler={this.registerformhandler}
  questions={this.state.questions}
  data = {this.state.formOptionData}
  user={this.state.user}
/>;
};

export default Page;
