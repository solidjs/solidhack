import { createSignal } from "solid-js";
import { Box } from "~/components/Box";
import { Hero } from "~/components/Hero";
import { TextField, TextFieldInput } from "~/components/ui/text-field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Button } from "~/components/ui/button";
import { action } from "@solidjs/router";

export default function Home() {
  const sendSubmission = action(async (data: FormData) => {
    console.log("hello", data.get("author"));
    console.log("hello", data.get("email"));
    console.log("hello", data.get("github_url"));
    console.log("hello", data.get("category"));
  }, "form-submission");
  return (
    <>
      <Hero small={true} />
      <div class="max-w-2xl text-lg leading-7 mx-auto text-gray-500">
        <Box>
          <form action={sendSubmission} method="post" class="space-y-3">
            <h2 class="text-3xl text-primary font-bold">Enter A Submission</h2>
            <div>
              <label for="author" class="text-neutral-400 font-semibold">
                Your Name
              </label>
              <TextField>
                <TextFieldInput name="author" type="text" />
              </TextField>
            </div>
            <div>
              <label for="email" class="text-neutral-400 font-semibold">
                Your Email
              </label>
              <TextField>
                <TextFieldInput name="email" type="email" />
              </TextField>
            </div>
            <div>
              <label for="github_url" class="text-neutral-400 font-semibold">
                Github URL
              </label>
              <TextField>
                <TextFieldInput name="github_url" type="text" />
              </TextField>
            </div>
            <div>
              <label for="category" class="text-neutral-400 font-semibold">
                Submission Challenge
              </label>
              <Select
                name="category"
                options={[
                  "Write a SolidStart tutorial",
                  "Contribute to a UI library",
                  "Contribute a new Solid Primitive",
                  "Create an animation library for Solid",
                ]}
                placeholder="Select challenge"
                itemComponent={(props) => (
                  <SelectItem item={props.item}>
                    {props.item.rawValue}
                  </SelectItem>
                )}
              >
                <SelectTrigger aria-label="Fruit" class="w-[180px]">
                  <SelectValue<string>>
                    {(state) => state.selectedOption()}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent />
              </Select>
            </div>
            <div class="pt-3 space-x-2">
              <Button type="submit">Send Submission</Button>
              <Button type="clear" variant="secondary">
                Clear
              </Button>
            </div>
          </form>
        </Box>
      </div>
    </>
  );
}
