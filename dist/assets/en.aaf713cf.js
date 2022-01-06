const e="English",t="SolidJS \xB7 Reactive Javascript Library",o="en-US",i=[{title:"Guides",path:"/guides"},{title:"Docs",path:"/docs/latest/api"},{title:"Resources",path:"/resources"},{title:"Tutorial",path:"/tutorial"},{title:"Examples",path:"/examples"},{title:"Playground",path:"https://playground.solidjs.com",external:!0},{title:"About",path:"/contributors",links:[{title:"SolidHack",description:"Learn about our 2022 public hackathon.",path:"https://www.solidjs.com/hack",external:!0},{title:"Blog",description:"News and updates from our community",path:"/blog"},{title:"Team & Contributions",description:"Solid team members and supporters",path:"/contributors"},{title:"Media",description:"Brand elements for media use",path:"/media"},{title:"OpenCollective",description:"Support us with a donation and help us continue our activities",path:"https://opencollective.com/solid"}]}],r={title:"Sign up for Solid News",email:"Email address",success:"You are successfully registered!",error:"Registration could not be completed",register:"Register",sending:"Sending"},s={declaration:`Solid is an open-source project supported by a team of public contributors. It's distributed under <a target="_blank" class="underline hover:text-gray-500" href="{{license}}" rel="noopener">an MIT license</a>. This library and community are made possible by a <a class="underline hover:text-gray-500" href="{{contributors}}">core team and dedicated contributors</a>.`,license:"https://github.com/solidjs/solid/blob/master/LICENSE",contributors:"/contributors",sponsored_by:"Sponsored by",updated:"Last updated {{date}} on Solid v{{version}}"};var a={"404":{header:"Oops. Four oh four.",body:"believes this page definitely doesn't exist."},name:e,title:t,locale:o,nav:i,newsletter:r,footer:s};const n="Simple and performant reactivity for building user interfaces.",l=`<span class="font-semibold">Solid is a purely reactive library.</span> It was designed from the ground up with a reactive core. It's influenced by reactive principles developed by previous libraries.`,c=[{icon:"performant",label:"Performant",description:"Consistently tops recognized UI speed and memory utilization benchmarks."},{icon:"powerful",label:"Powerful",description:"Composable reactive primitives married with the flexibility of JSX."},{icon:"pragmatic",label:"Pragmatic",description:"A sensible and tailored API makes developing fun and simple."},{icon:"productive",label:"Productive",description:"Ergonomics and familiarity make building simple or complex things a breeze."}],d=[{label:"6.4kb",detail:"Minified + Gzipped",link:"https://bundlephobia.com/package/solid-js@1.2.1"},{label:"13k+",detail:"Github stars",link:"https://star-history.t9t.io/#solidjs/solid"},{label:"5+ years",detail:"In development"},{label:"TypeScript",detail:"Support"},{label:"Top Rated",detail:"In performance"},{label:"Astro & Vite",detail:"Support"}],p={headline:"It's familiar and modern",copy:["Solid stands on the shoulders of giants, particularly React and Knockout. If you've developed with React Hooks before, Solid should seem very natural. In fact, more natural as Solid's model is much simpler with no Hook rules. Every Component executes once and it is the Hooks and bindings that execute many times as their dependencies update.","Solid follows the same philosophy as React with unidirectional data flow, read/write segregation, and immutable interfaces. It however has a completely different implementation that forgoes using a Virtual DOM."],link_label:"View Docs",link:"https://www.solidjs.com/docs/latest#component-apis"},u={headline:"Fine-grained reactivity means you do more with less.",subheadline:"Solid is built with efficient reactive primitives from your userland code to your JSX views.",copy:"This unlocks complete control over what gets updated and when, even at the DOM binding level. With no Virtual DOM or extensive diffing the framework never does more work than you want it to.",link_label:"See it in action",link:"https://playground.solidjs.com/?version=1.0.0#NobwRAdghgtgpmAXGGUCWEwBowBcCeADgsrgM4Ae2YZA9gK4BOAxiWGjIbY7gAQi9GcCABM4jXgF9eAM0a0YvAOR0ANmhEBaAFZkA9AHc4AIyUBuADoQOXHv17MhUXHADKaAObRVU2fMUqtOpauuZWVjL0EMy4aLQQvACChIQAFACU-Fa8DvFkfMBQMWgAbnBYvGRwuInFZQC6vAC8Dk4u7l5Qqqm4jPRw6ZYQ2YLVTAkAPCKlDqpQZGRNIEWxZRm8APy8FmArpXA7vIjbYDuSAHwAEmgTetMl51aS4RBCouKp603nvBPJhLw9OcKiJaMx6PAILgAHQeaoAUVUcEhuAAQvgAJIiVJKKApJTpdJWMCSepAA"},m={headline:["Performance focused","on both client and server"],copy:"The strength of fine-grained reactivity as an approach shines on all notable benchmarks. Even if performance is not your focus, it's virtually effortless and without the cost of complicated/involved DX. Think of Solid's performance gain as a free win. Solid is about being fast without trying.",link_label:"Read full article",link:"https://ryansolid.medium.com/solidjs-the-tesla-of-javascript-ui-frameworks-6a1d379bc05e"},h={headline:"Fully loaded with all features.",copy:"Solid supports all common and expected library features and expands on aspects to increase DX.",list:["Fragments","Portals","Context","Suspense","Error Boundaries","Lazy Components","Async & Concurrent Rendering","Implicit Delegation","SSR & Hydration","Directives"]},b={time:"Time",view:"View the benchmark",show_more:"Show more client + server benchmarks",link_label:"The JS Framework Benchmark compares browser performance across a wide range of tests. Lower is better.",js_benchmark:{title:"JS Framework Benchmark",description:"The JS Framework Benchmark compares browser performance across a wide range of tests. Lower is better."},isomorophic_benchmark:{title:"Isomorphic UI Benchmarks (Search Results)",description:"This benchmark tests raw Server Rendering speeds. Higher is better."}};var g={hero:n,info:l,strengths:c,facts:d,example:p,reactivity:u,performance:m,features:h,benchmarks:b};const y="Resources",f='To have your SolidJS related project listed here reach out to us on <a href="https://discord.com/invite/solidjs">Discord</a>.',v="Search resources",w="Types",k={article:"Article",video:"Video",library:"Library",package:"Package"},S="Published",A="{{amount}} days ago",_="{{amount}} hours ago",C="Categories",x="Translations",I={primitive:"Primitives",router:"Routers",data:"Data",ui:"UI",plugin:"Plugins",starters:"Starters",build_utility:"Build Utilities",add_on:"Add On",testing:"Testing",educational:"Educational"},R="Official",T="By {{author}}";var D={title:y,cta:f,search:v,types:w,types_list:k,published:S,days_ago:A,hours_ago:_,categories:C,translations:x,categories_list:I,official:R,by:T};const B="Solve",j="Reset",E={result:"Result",output:"Output",clear:"Clear",add_tab:"Add new tab",refresh:"Refresh the page",format:"Format source code",copy:"Copy source code",mode:"Compile mode",client_render:"Client-side rendering",server_render:"Server-side rendering",client_hydration_render:"Client-side rendering with hydration",dark_mode:"Toggle dark mode",import_json:"Import JSON",export_json:"Export JSON",export_codesandbox:"Export to CodeSandBox",share:"Share with a minified link",scale:"Scale editor to make text larger or smaller"};var O={solve:B,reset:j,playground:E};const M="Media Assets",P="The following are assets that represent the Solid brand. All assets are considered open-source contributions and should be used according to open standards and licensing rules. For additional assets or questions pertaining to brand alignment, feel free to join our Discord for support and guidance.",F="Brand Font",W="Primary Color",J="Secondary Color",L="Light Color",U="Accent Color",Q="Click the color to copy the hex.",H={with_wordmark:"With Wordmark",without_wordmark:"Without Wordmark",only_wordmark:"Only Wordmark",dark_with_wordmark:"Dark With Wordmark",dark_without_wordmark:"Dark Without Wordmark",dark_only_wordmark:"Only Dark Wordmark"};var V={title:M,copy:P,brand_font:F,primary:W,secondary:J,light:L,accent:U,copy_hex:Q,resources:H};const G="Example Library",X="Basic",K="Complex";var N={title:G,basic:X,complex:K};const Y="Team & Contributions",$="Core Team",Z="Acknowledgments",q="Ecosystem Team",z="Solid wouldn't be possible without the help of other talented individuals. As we grow we hope others will find ways to give their time either in the form of bug reporting, pull requests, design suggestions, writing and many other ways.",ee="The following individuals have graciously given their time and effort to ensure Solid goes international:",te="Contributors",oe="Open Collective",ie="Support us with a donation and help us continue our activities:";var re={title:Y,core_team:$,acknowledgments:Z,ecosystem_team:q,copy:z,translators_copy:ee,contributors:te,open_collective:oe,support_copy:ie};const se="Documentation";var ae={title:se};const ne=()=>({global:a,home:g,docs:ae,media:V,resources:D,tutorial:O,examples:N,contributors:re});export{ne as default};
