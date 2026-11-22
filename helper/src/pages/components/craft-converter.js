import { Form, FormControl } from "react-bootstrap";

import crafting from "../../data/crafting.json";

export default function CraftConverter() {
  const convert = () => {
    return crafting.map((craft) => {
      let keys = Object.keys(craft.reqs);

      return {
        id: craft.id,
        name: craft.Label.replace("Craft: ", ""),
        req: keys.length == 3 ? null : keys[2],
        principle: keys.length == 3 ? keys[2] : keys[3],
      };
    });
  };

  return (
    <Form>
      <FormControl
        as="textarea"
        rows={50}
        value={JSON.stringify(convert(), null, 2)}
      />
    </Form>
  );
}
