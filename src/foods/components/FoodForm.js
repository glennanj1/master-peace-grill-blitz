import { Form } from "src/core/components/Form";
import { LabeledTextField } from "src/core/components/LabeledTextField";
export { FORM_ERROR } from "src/core/components/Form";
export function FoodForm(props) {
  return (
    <Form {...props}>
      <LabeledTextField name="name" label="Name" placeholder="Name" />
    </Form>
  );
}
