import { createSignal, For, Show, type Component } from "solid-js";
import {
  action,
  useNavigate,
  useAction,
  A,
  useParams,
  useSearchParams,
} from "@solidjs/router";
import { createForm, setValue, valiForm } from "@modular-forms/solid";
import { ConfettiExplosion } from "solid-confetti-explosion";
import { v7 as uuidv7 } from "uuid";
import { formatDateForSQLite, getCurrentESTDate } from "~/utils/date";
import { db } from "~/utils/db";
import { CHALLENGES } from "~/utils";
import {
  type InferInput,
  regex,
  object,
  email,
  parse,
  url,
  pipe,
  boolean,
  string,
  picklist,
  literal,
  minLength,
} from "valibot";
import { Box } from "~/components/Box";
import { Hero } from "~/components/Hero";
import { Button } from "~/components/ui/button";
import { TextField, TextFieldInput } from "~/components/ui/text-field";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemLabel,
} from "~/components/ui/radio-group";

const SubmissionSchema = object({
  name: pipe(string(), minLength(3, "Your name must not be empty.")),
  email: pipe(string(), email("Please enter a valid email address.")),
  github_url: pipe(
    string(),
    url("Please enter a valid URL."),
    regex(
      /^https:\/\/github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+(?:\/pull\/\d+)?$/,
      "Please enter a valid Github repo URL.",
    ),
  ),
  challenge_id: pipe(
    string("Please specify a category for your submission."),
    picklist(Object.keys(CHALLENGES), "Select a defined category."),
  ),
  agreement: pipe(
    boolean("You cannot proceed without agreeing to the rules."),
    literal(true, "You cannot proceed without agreeing to the rules."),
  ),
  instructions: pipe(
    boolean("You cannot proceed without confirming the instructions."),
    literal(true, "You cannot proceed without confirming the instructions."),
  ),
});

type SubmissionForm = InferInput<typeof SubmissionSchema>;
type SubmissionResponse = { id: string; success: true };

const sendSubmissionAction = action(
  async (data: SubmissionForm): Promise<SubmissionResponse> => {
    "use server";
    try {
      parse(SubmissionSchema, data);
      const id = uuidv7();
      const date = getCurrentESTDate();
      const created_at = formatDateForSQLite(date);
      await db.execute({
        sql:
          "INSERT INTO submissions " +
          "(name, email, github_url, challenge_id, guid, status, created_at) " +
          "VALUES (?, ?, ?, ?, ?, 'active', ?)",
        args: [
          data.name,
          data.email,
          data.github_url,
          data.challenge_id,
          id,
          created_at,
        ],
      });
      return {
        id,
        success: true,
      };
    } catch (err) {
      console.log(err);
      throw new Error("Could not create submission");
    }
  },
  "form-submission",
);

const FieldError: Component<{ error: string }> = (props) => (
  <Show when={props.error}>
    <div class="px-3 py-2 border border-red-500 bg-red-100 text-sm mt-2 rounded">
      {props.error}
    </div>
  </Show>
);

export default function Submit() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [result, setResult] = createSignal({ success: false });
  const sendSubmission = useAction(sendSubmissionAction);
  const [submissionForm, { Form, Field }] = createForm<SubmissionForm>({
    validate: valiForm(SubmissionSchema),
    initialValues: {
      challenge_id: params.challenge_id,
    },
  });
  return (
    <>
      <Hero small={true} />
      <div class="max-w-2xl mb-20 text-lg leading-7 mx-auto text-gray-500">
        <Box>
          {import.meta.env.DB_URL}
          <h2 class="text-3xl mb-5 text-primary font-bold">
            Challenge Submission
          </h2>
          <Show
            when={!result().success}
            fallback={
              <div class="py-10">
                <div class="flex justify-center">
                  <ConfettiExplosion
                    class="absolute"
                    particleCount={350}
                    force={0.3}
                  />
                </div>
                <strong class="text-2xl">Thank you!</strong>
                <p>
                  Your Challenge Submission has been successfully received.
                  Winners are reviewed and announced on Mondays. You will
                  receive an email from community@solidjs.com if your submission
                  has achieved a challenge. 😊
                </p>
                <br />
                <Button onClick={() => navigate("/")}>Continue</Button>
              </div>
            }
          >
            <Form
              class="space-y-3"
              onSubmit={async (data) => setResult(await sendSubmission(data))}
            >
              <Show when={submissionForm.response.message}>
                <div class="border border-red-500 bg-red-100 p-5 mb-5 rounded">
                  {submissionForm.response.message}
                </div>
              </Show>
              <div>
                <Field name="name">
                  {(field, props) => (
                    <>
                      <Label
                        for="author"
                        class="text-neutral-400 font-semibold"
                      >
                        Your Name
                      </Label>
                      <TextField>
                        <TextFieldInput
                          {...props}
                          disabled={submissionForm.submitting}
                          value={field.value}
                          error={field.error}
                          name="author"
                          type="text"
                        />
                        <FieldError error={field.error} />
                      </TextField>
                    </>
                  )}
                </Field>
              </div>
              <div>
                <Field name="email">
                  {(field, props) => (
                    <>
                      <Label for="email" class="text-neutral-400 font-semibold">
                        Your Email
                      </Label>
                      <TextField>
                        <TextFieldInput
                          {...props}
                          disabled={submissionForm.submitting}
                          value={field.value}
                          error={field.error}
                          name="email"
                          type="email"
                        />
                        <FieldError error={field.error} />
                      </TextField>
                    </>
                  )}
                </Field>
              </div>
              <div>
                <Field name="github_url">
                  {(field, props) => (
                    <>
                      <Label
                        for="github_url"
                        class="text-neutral-400 font-semibold"
                      >
                        Github URL
                      </Label>
                      <TextField disabled={submissionForm.submitting}>
                        <TextFieldInput
                          {...props}
                          value={field.value}
                          error={field.error}
                          name="github_url"
                          type="text"
                        />
                        <FieldError error={field.error} />
                      </TextField>
                    </>
                  )}
                </Field>
              </div>
              <div>
                <Field name="challenge_id">
                  {(field, props) => (
                    <>
                      <Label
                        for="challenge_id"
                        class="text-neutral-400 font-semibold"
                      >
                        Submission Challenge
                      </Label>
                      <RadioGroup
                        class="my-3"
                        name={props.name}
                        value={field.value}
                        disabled={submissionForm.submitting}
                        onChange={(selection) =>
                          setValue(submissionForm, "challenge_id", selection)
                        }
                      >
                        <For each={Object.entries(CHALLENGES)}>
                          {([id, category]) => (
                            <RadioGroupItem value={id}>
                              <RadioGroupItemLabel>
                                {category}
                              </RadioGroupItemLabel>
                            </RadioGroupItem>
                          )}
                        </For>
                        <FieldError error={field.error} />
                      </RadioGroup>
                    </>
                  )}
                </Field>
              </div>
              <div class="space-y-3">
                <Label
                  for="instructions"
                  class="text-neutral-400 font-semibold"
                >
                  Instructions
                </Label>
                <Field name="instructions" type="boolean">
                  {(field, props) => (
                    <>
                      <div class="items-top flex space-x-2">
                        <Checkbox
                          id="instructions"
                          name={props.name}
                          disabled={submissionForm.submitting}
                          checked={field.value}
                          onChange={(checked) =>
                            setValue(submissionForm, "instructions", checked)
                          }
                        />
                        <div class="grid gap-1.5 leading-none">
                          <Label for="instructions-input">
                            My submission's package.json contains a proper{" "}
                            <A
                              class="text-primary"
                              target="_blank"
                              href="https://docs.npmjs.com/cli/v10/configuring-npm/package-json#description-1"
                            >
                              description
                            </A>{" "}
                            and list of{" "}
                            <A
                              class="text-primary"
                              target="_blank"
                              href="https://docs.npmjs.com/cli/v10/configuring-npm/package-json#people-fields-author-contributors"
                            >
                              contributors.
                            </A>
                          </Label>
                        </div>
                      </div>
                      <FieldError error={field.error} />
                    </>
                  )}
                </Field>
                <Field name="agreement" type="boolean">
                  {(field, props) => (
                    <>
                      <div class="items-top flex space-x-2">
                        <Checkbox
                          id="agreement"
                          name={props.name}
                          disabled={submissionForm.submitting}
                          checked={field.value}
                          onChange={(checked) =>
                            setValue(submissionForm, "agreement", checked)
                          }
                        />
                        <div class="grid gap-1.5 leading-none">
                          <Label for="agreement-input" class="leading-5">
                            All the submission contributors agree to the{" "}
                            <A
                              target="_blank"
                              class="text-primary"
                              href="/rules"
                            >
                              Rules and Regulations
                            </A>{" "}
                            in order to participate in SolidHack2024.
                          </Label>
                        </div>
                      </div>
                      <FieldError error={field.error} />
                    </>
                  )}
                </Field>
              </div>
              <div class="pt-3 space-x-2">
                <Button
                  type="submit"
                  class="w-44"
                  disabled={submissionForm.invalid || submissionForm.submitting}
                >
                  <Show
                    fallback={<div class="loader" />}
                    when={!submissionForm.submitting}
                  >
                    Send Submission
                  </Show>
                </Button>
                <Button type="reset" variant="secondary">
                  Clear
                </Button>
              </div>
            </Form>
          </Show>
        </Box>
      </div>
    </>
  );
}
