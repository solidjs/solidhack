import { Component } from "solid-js";
import { Link } from "solid-app-router";

const Submit: Component = () => {
  const json = `{
  "name": "my-solidhack-submission",
  "version": "1.0",
  "description": "A short maximum 100 character description for your SolidHack submission goes here.",
  "info": "This is a long format description of the project with a maximum of 750 characters.",
  "homepage": "https://www.my-solidhack-submission.com",
  "contributors": [
    {
      "name": "Hari",
      "email": "hari@seldon.com",
      "url": "https://www.seldon.com"
    }
  ],
  "keywords": ["solidhack", "best_app"],
  "license": "MIT"
}`;
  return (
    <div class="w-full flex flex-col items-center py-10 gap-6 md:gap-8 lg:gap-12 bg-hack bg-no-repeat bg-top bg-contain">
      <div class="max-w-4xl w-full p-20 rounded-xl leading-7 shadow-2xl">
        <h2 class="mb-5 text-xl font-semibold text-solid-medium">
          Start Your Submission
        </h2>
        <p class="mb-5">
          Submitting to SolidHack is easy! Follow these 3 steps to prepare and
          submit your project. The following process allows us to make sure that
          your project abides by the rules and requirements of the competition.
          All submissions are manually vetted to ensure that they comply.
        </p>
        <div class="flex border-b pb-3 items-center space-x-3 my-5 font-semibold ">
          <figure class="flex justify-center items-center rounded-full bg-solid-medium w-10 h-10 text-white">
            1
          </figure>
          <span>Step 1</span>
        </div>
        Double-check the{" "}
        <Link class="text-solid-medium hover:text-solid-dark" href="/rules">
          Rules and Regulations
        </Link>{" "}
        and make sure your project complies. Most importantly:
        <ol class="list-decimal ml-10 my-5">
          <li>Your project is hosted on Github and publicly available.</li>
          <li>
            The first commit for your project is after January 7th. Only
            projects started after that date are eligible.
          </li>
          <li>Your package.json is configured properly as described below.</li>
          <li>Ensure your submission resides on the main/master branch.</li>
        </ol>
        <p>
          Please feel free to ask directly on the #solidhack channel of our{" "}
          <a
            class="text-solid-medium"
            href="https://discord.com/invite/solidjs"
          >
            Discord
          </a>{" "}
          if you have any questions or need clarification on the rules.
        </p>
        <div class="flex border-b pb-3  items-center space-x-3 my-5 font-semibold ">
          <figure class="flex justify-center items-center rounded-full bg-solid-medium w-10 h-10 text-white">
            2
          </figure>
          <span>Step 2</span>
        </div>
        Make sure that your repository contains a package.json that resembles
        the following:
        <pre
          class="my-5 border overflow-x-scroll rounded-xl p-5 border-gray-300"
          innerHTML={json}
        />
        This gives us the information we need to include your project in the
        competition. Critically, the <em>solidhack</em> keyword must be present
        along with the category you're entering. You must also provide a link to
        a working demo or landing page for the project in the{" "}
        <code>homepage</code> entry. Check to make sure you've included all of
        these fields:
        <table class="border p-10 my-5">
          <tbody>
            <tr class="bg-gray-100">
              <th class="font-semibold p-3">Field</th>
              <th class="font-semibold p-3">Description</th>
            </tr>
            <tr class="border-b">
              <th class="text-solid-medium w-40 font-normal text-left p-5">
                name
              </th>
              <td class="p-5">Name of your project</td>
            </tr>
            <tr class="border-b">
              <th class="text-solid-medium font-normal text-left p-5">
                version
              </th>
              <td class="p-5">Final release version for public use</td>
            </tr>
            <tr class="border-b">
              <th class="text-solid-medium font-normal text-left p-5">
                description
              </th>
              <td class="p-5">
                A short description of your project with a maximum of 100
                characters.
              </td>
            </tr>
            <tr class="border-b">
              <th class="text-solid-medium font-normal text-left p-5">info</th>
              <td class="p-5">
                A long description of your project with a maximum of 750
                characters.
              </td>
            </tr>
            <tr class="border-b">
              <th class="text-solid-medium font-normal text-left p-5">
                homepage
              </th>
              <td class="p-5">
                URL to the demo or landing page for your project.
              </td>
            </tr>
            <tr class="border-b">
              <th class="text-solid-medium font-normal text-left p-5">
                contributors
              </th>
              <td class="p-5">
                List all team members. Full name or Github handles should be
                supplied in the name field.
              </td>
            </tr>
            <tr class="border-b">
              <th class="text-solid-medium font-normal text-left p-5">
                license
              </th>
              <td class="p-5">
                Please include a valid{" "}
                <a
                  class="text-solid-medium"
                  target="_blank"
                  href="https://opensource.org/licenses"
                >
                  open-source license
                </a>
                .
              </td>
            </tr>
            <tr>
              <th class="text-solid-medium font-normal text-left p-3">
                keywords
              </th>
              <td class="p-5">
                The value "solidhack" must be present as well an identifier for
                the prize category which should be one of:
                <ul class="mt-3 list-disc pl-5">
                  <li>
                    <span class="font-semibold">best_app</span>: Best App Award
                  </li>
                  <li>
                    <span class="font-semibold">best_ecosystem</span>: Best
                    Ecosystem Award
                  </li>
                  <li>
                    <span class="font-semibold">best_student_project</span>:
                    Best Student Project Award
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="flex border-b pb-3  items-center space-x-3 my-5 font-semibold ">
          <figure class="flex justify-center items-center rounded-full bg-solid-medium w-10 h-10 text-white">
            3
          </figure>
          <span>Step 3</span>
        </div>
        Visit{" "}
        <a
          class="text-solid-medium"
          target="_blank"
          href="https://github.com/solidjs/solidhack-submissions"
        >
          https://github.com/solidjs/solidhack-submissions
        </a>{" "}
        and submit a pull request with your package listed in the correct
        category. Once your PR is reviewed, it will be merged, indicating your
        submission was accepted.
        <p class="mt-5">
          Remember that you can continue working on your submission even after
          submitting it. You'll be able to do so until April 7th, when
          submissions close and voting begins. Feel free to improve, iterate,
          and share your project with the world!
        </p>
      </div>
    </div>
  );
};

export default Submit;
