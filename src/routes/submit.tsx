import { onMount, Show } from "solid-js";
import { action, useAction, redirect, useNavigate } from "@solidjs/router";
import { createForm, valiForm } from "@modular-forms/solid";
import * as v from "valibot";
import { Box } from "~/components/Box";
import { Hero } from "~/components/Hero";
import { Button } from "~/components/ui/button";
import { TextField, TextFieldInput } from "~/components/ui/text-field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

const SubmissionSchema = v.object({
  name: v.string(),
  email: v.pipe(v.string(), v.email()),
  github_url: v.pipe(
    v.string(),
    v.url(),
    v.regex(/^https:\/\/github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/),
  ),
  category: v.string(),
});
type SubmissionForm = v.InferInput<typeof SubmissionSchema>;

const sendSubmissionAction = action(async (data: SubmissionForm) => {
  console.log("name", data.name);
  console.log("email", data.email);
  console.log("url", data.github_url);
  console.log("category", data.category);
}, "form-submission");

export default function Home() {
  const navigate = useNavigate();

  onMount(() => {
    // navigate("https://forms.gle/vgMPAcjxJUTxz9Aa9", { replace: true });
    window.location.href = "https://forms.gle/vgMPAcjxJUTxz9Aa9";
  });
  const sendSubmission = useAction(sendSubmissionAction);
  const [submissionForm, { Form, Field }] = createForm<SubmissionForm>({
    validate: valiForm(SubmissionSchema),
  });
  return (
    <>
      <Hero small={true} />
      <div class="max-w-2xl mb-20 text-lg leading-7 mx-auto text-gray-500">
        <Box>
          Redirecting to{" "}
          <a href="https://forms.gle/vgMPAcjxJUTxz9Aa9">submission form</a>...
          {/* <Form onSubmit={sendSubmission} class="space-y-3">
            <Show when={submissionForm.response.message}>
              <div class="border border-red-500 bg-red-100 p-5 mb-5 rounded">
                {submissionForm.response.message}
              </div>
            </Show>
            <h2 class="text-3xl text-primary font-bold">Enter A Submission</h2>
            <div>
              <Field name="name">
                {(field, props) => (
                  <>
                    <label for="author" class="text-neutral-400 font-semibold">
                      Your Name
                    </label>
                    <TextField>
                      <TextFieldInput
                        {...props}
                        value={field.value}
                        error={field.error}
                        name="author"
                        type="text"
                      />
                    </TextField>
                  </>
                )}
              </Field>
            </div>
            <div>
              <Field name="email">
                {(field, props) => (
                  <>
                    <label for="email" class="text-neutral-400 font-semibold">
                      Your Email
                    </label>
                    <TextField>
                      <TextFieldInput
                        {...props}
                        value={field.value}
                        error={field.error}
                        name="email"
                        type="email"
                      />
                    </TextField>
                  </>
                )}
              </Field>
            </div>
            <div>
              <Field name="github_url">
                {(field, props) => (
                  <>
                    <label
                      for="github_url"
                      class="text-neutral-400 font-semibold"
                    >
                      Github URL
                    </label>
                    <TextField>
                      <TextFieldInput
                        {...props}
                        value={field.value}
                        error={field.error}
                        name="github_url"
                        type="text"
                      />
                    </TextField>
                  </>
                )}
              </Field>
            </div>
            <div>
              <Field name="category">
                {(field, props) => (
                  <>
                    <label
                      for="category"
                      class="text-neutral-400 font-semibold"
                    >
                      Submission Challenge
                    </label>
                    <Select
                      {...props}
                      name="category"
                      options={[
                        "Write a SolidStart tutorial",
                        "Contribute to a UI library",
                        "Contribute a new Solid Primitive",
                        "Create an animation library for Solid",
                      ]}
                      placeholder="Select challenge"
                      itemComponent={(itemProps) => (
                        <SelectItem item={itemProps.item}>
                          {itemProps.item.rawValue}
                        </SelectItem>
                      )}
                    >
                      <SelectTrigger
                        value={field.value}
                        aria-label="Fruit"
                        class="w-[180px]"
                      >
                        <SelectValue<string>>
                          {(state) => state.selectedOption()}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent />
                    </Select>
                  </>
                )}
              </Field>
            </div>
            <div class="pt-3 space-x-2">
              <Button type="submit">Send Submission</Button>
              <Button type="clear" variant="secondary">
                Clear
              </Button>
            </div>
          </Form> */}
        </Box>
      </div>
    </>
  );
}
