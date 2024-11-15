import {
  createSignal,
  For,
  Match,
  Show,
  Switch,
  type Component,
} from "solid-js";
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
import isGithubUrl from "is-github-url";
import { formatDateForSQLite, getCurrentESTDate } from "~/utils/date";
import { db } from "~/utils/db";
import { CATEGORIES, CHALLENGES } from "~/utils";
import {
  type InferInput,
  regex,
  object,
  custom,
  email,
  parse,
  url,
  pipe,
  optional,
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
    url("Please enter a valid GitHub URL."),
    custom(isGithubUrl, "Please enter a valid GitHub repo URL."),
  ),
  demo_url: optional(string()),
  category_id: pipe(
    string("Please specify a category/challenge for your submission."),
    picklist(
      [...Object.keys(CHALLENGES), ...Object.keys(CATEGORIES)],
      "Select a defined category.",
    ),
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
      if (
        data.category_id === "best-app" ||
        data.category_id === "best-ecosystem"
      ) {
        throw new Error("Submission to these categories is closed.");
      }
      parse(SubmissionSchema, data);
      const id = uuidv7();
      const date = getCurrentESTDate();
      const created_at = formatDateForSQLite(date);
      await db.execute({
        sql:
          "INSERT INTO submissions " +
          "(name, email, github_url, demo_url, category_id, guid, status, created_at) " +
          "VALUES (?, ?, ?, ?, ?, ?, 'active', ?)",
        args: [
          data.name,
          data.email,
          data.github_url,
          data.demo_url,
          data.category_id,
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
  const [params, setParams] = useSearchParams();
  const [result, setResult] = createSignal({ success: false });
  const sendSubmission = useAction(sendSubmissionAction);
  const [submissionForm, { Form, Field }] = createForm<SubmissionForm>({
    validate: valiForm(SubmissionSchema),
    initialValues: {
      category_id: params.id as string,
    },
  });
  return (
    <>
      <Hero small={true} />
      <div class="max-w-2xl mb-20 text-lg leading-7 mx-auto text-gray-500">
        <Box>
          {import.meta.env.DB_URL}
          <h2 class="text-3xl mb-5 text-primary font-bold">Submission Form</h2>
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
                  <Switch>
                    <Match
                      when={["best-app", "best-ecosystem"].includes(
                        params.id as string,
                      )}
                    >
                      Your 2024 Submission has been successfully received. Note
                      that you may continue working on your submission until the
                      competition closing date (November 14th). If your
                      submission requires adjustments or does not abide by the
                      Rules & Regulations, you may receive an email from
                      community@solidjs.com. Thank you for participating! 😊
                    </Match>
                    <Match when={true}>
                      Your Challenge Submission has been successfully received.
                      Winners are reviewed and announced on Mondays. You will
                      receive an email from community@solidjs.com if your
                      submission has achieved a challenge. Thank you for
                      participating! 😊
                    </Match>
                  </Switch>
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
                        GitHub URL
                      </Label>
                      <TextField disabled={submissionForm.submitting}>
                        <TextFieldInput
                          {...props}
                          value={field.value}
                          error={field.error}
                          name="github_url"
                          placeholder="Please use a proper fully formed GitHub repo URL"
                          type="text"
                        />
                        <FieldError error={field.error} />
                      </TextField>
                    </>
                  )}
                </Field>
              </div>
              <div>
                <Field name="demo_url">
                  {(field, props) => (
                    <>
                      <Label
                        for="demo_url"
                        class="text-neutral-400 font-semibold"
                      >
                        Demo URL{" "}
                        <span class="text-neutral-300">(optional)</span>
                      </Label>
                      <TextField disabled={submissionForm.submitting}>
                        <TextFieldInput
                          {...props}
                          value={field.value}
                          error={field.error}
                          name="demo_url"
                          type="text"
                        />
                        <FieldError error={field.error} />
                      </TextField>
                    </>
                  )}
                </Field>
              </div>
              <div>
                <Field name="category_id">
                  {(field, props) => (
                    <>
                      <RadioGroup
                        class="my-3"
                        name={props.name}
                        value={field.value}
                        disabled={submissionForm.submitting}
                        onChange={(selection) => {
                          setValue(submissionForm, "category_id", selection);
                          setParams({ id: selection });
                        }}
                      >
                        {/* <Label
                          for="category_id"
                          class="mt-3 text-neutral-400 font-semibold"
                        >
                          Award Categories
                        </Label>
                        <div class="my-3 space-y-3">
                          <RadioGroupItem value="best-app">
                            <RadioGroupItemLabel>
                              Best SolidStart App
                            </RadioGroupItemLabel>
                          </RadioGroupItem>
                          <RadioGroupItem value="best-ecosystem">
                            <RadioGroupItemLabel>
                              Best Solid/SolidStart Ecosystem Utility
                            </RadioGroupItemLabel>
                          </RadioGroupItem>
                        </div>
                        <div class="text-xs border border-red-100 p-4 rounded-md text-red-500">
                          Submissions for Award Categories received after{" "}
                          <b>November 14 @ 23:59 EST</b> will not be accepted.
                        </div> */}
                        <Label
                          for="category_id"
                          class="mt-3 text-neutral-400 font-semibold"
                        >
                          Challenges
                        </Label>
                        <div class="my-3 space-y-3">
                          <For each={Object.entries(CHALLENGES)}>
                            {([id, category]) => (
                              <RadioGroupItem value={id}>
                                <RadioGroupItemLabel>
                                  {category}
                                </RadioGroupItemLabel>
                              </RadioGroupItem>
                            )}
                          </For>
                        </div>
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
                    Send submission
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
