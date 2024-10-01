import { FlowComponent } from "solid-js";

interface ChallengeProps {
  image: string;
  title: string;
  amount: number;
}

export const Challenge: FlowComponent<ChallengeProps> = (props) => (
  <div class="bg-neutral-100 my-5 rounded-2xl divide-y-2 divide-white">
    <div class="md:flex space-x-10 p-3 md:p-10">
      <div class="mx-auto m-5 md:m-0 bg-neutral-400/60 shadow-xl min-w-28 h-28 p-2 aspect-square rounded-full">
        <img src={props.image} alt={props.title} />
      </div>
      <div>
        <div class="font-semibold text-2xl">{props.title}</div>
        {props.children}
        <div class="text-center mt-2 md:text-right p-5 md:p-0">
          <strong>Prize:</strong> US${props.amount}
        </div>
      </div>
    </div>
  </div>
);
