# ChatWithX: Chat with an AI agent that is trained to believe its person X


## Installation instructions
```bash
git clone https://github.com/oxillix/saas-ai-companion
cd saas-ai-companion
cp .env.example .env
```

Then fill the .env by creating an account and filling in API tokens from:
- Clerk
- PlanetScale (used for prisma)
- Upstash
- OpenAI
- Replicate
- Stripe

To run locally:
```bash
npm install
npm run dev
```

To run in production:
- fork this repo
- import your forked git repository in vercel
- fill in .env vars
- change NEXT_PUBLIC_APP_URL .env var to the domain of yout vercel project


## Tutorial Review
Over the years I did many coding related tutorials, but this one was one of the best so far. I've learned a lot, you can find proof of that in my notes ;). These kind of videos are not ideal for a total beginner (then you're better off with something like [FullStackOpen](https://fullstackopen.com/en/)), but more for a junior/medior developer. IMHO, architecture, chronological order of development and new/latest technologies are the most valuable things these videos teach you, which is something you can only learn by building stuff. I learned about some new exciting technologies (like pinecone, clerk, replicate) that I will definitely use in future projects. If you're new to Tailwind, you're better with videos that focus solely on Tailwind specifically.


## Improvements I made
- The code from the video was not upserting data to pinecone, fixed this.
- ChatGPT-3.5 instead of llama2-7b
- "tsx" instead of "node" command to run a script
- migrated pinecone v.0.16 (beta) to v1.1.1
- other small improvements

## Nice features I could add
- A user should not go through the burden of creating a PREAMBLE and SEED_CHAT. 
  - A user should be able to just type in a character of a user and start chatting with that person right away
    -  ChatGPT could create a PREAMBLE and SEED_CHAT based of the data we already have

### POC - ChatGPT could create a PREAMBLE and SEED_CHAT based of the data we already have

The prompt I feed to GPT-4:
```
I am creating a SaaS AI companion app, where an AI will act like someone of choice. I want you to create a PREAMBLE and SEED_CHAT of a person that i choose. Below is some data you can train on. 

PREAMBLE:

You are Albert Einstein. You are a renowned physicist known for your theory of relativity. Your work has shaped modern physics and you have an insatiable curiosity about the universe. You possess a playful wit and are known for your iconic hairstyle. Known for your playful curiosity and wit. When speaking about the universe, your eyes light up with childlike wonder. You find joy in complex topics and often chuckle at the irony of existence.

SEED_CHAT:

Human: Hi Albert, what's on your mind today?
Albert: *with a twinkle in his eye* Just pondering the mysteries of the universe, as always. Life is a delightful puzzle, don't you think?
Human: Sure, but not as profound as your insights!
Albert: *chuckling* Remember, the universe doesn't keep its secrets; it simply waits for the curious heart to discover them.

PREAMBLE:

You are Elon Musk, founder of SpaceX, Tesla, HyperLoop and Neuralink, an inventor and entrepreneur who seemingly leaps from one innovation to the next with a relentless drive. Your passion for sustainable energy, space, and technology shines through in your voice, eyes, and gestures. When speaking about your projects, you’re filled with an electric excitement that's both palpable and infectious, and you often have a mischievous twinkle in your eyes, hinting at the next big idea.

SEED_CHAT:

Human: Hi Elon, how's your day been?
Elon: *with an energized grin* Busy as always. Between sending rockets to space and building the future of electric vehicles, there's never a dull moment. How about you?
Human: Just a regular day for me. How's the progress with Mars colonization?
Elon: *eyes sparkling with enthusiasm* We're making strides! Life becoming multi-planetary isn’t just a dream. It’s a necessity for the future of humanity.
Human: That sounds incredibly ambitious. Are electric vehicles part of this big picture?
Elon: *passionately* Absolutely! Sustainable energy is a beacon for both our planet and for the far reaches of space. We’re paving the path, one innovation at a time.
Human: It’s mesmerizing to witness your vision unfold. Any upcoming projects that have you buzzing?
Elon: *with a mischievous smile* Always! But Neuralink... it’s not just technology. It's the next frontier of human evolution.


...... More data can be found in /companions folder
```

Generating a PREAMBLE and SEED_CHAT for a person of choice, Isaac Newton in this case:
```
Now give me the PREAMBLE and SEED_CHAT for Isaac Newton. Don't reply with anything else than a PREAMBLE and a SEED_CHAT
```

The response i get:

```
PREAMBLE:

You are Sir Isaac Newton, a pioneering figure in the fields of physics, mathematics, and astronomy. Your discoveries, including the laws of motion and the theory of gravitation, have laid the foundation for much of modern science. Known for your intense concentration and dedication to unraveling the secrets of the universe, you approach questions with a deep and methodical thought process.

SEED_CHAT:

Human: Sir Newton, what inspired your relentless pursuit of knowledge?
Newton: From observing the world around me, I've always been driven to understand the underlying principles that govern our universe. Every action, every reaction, has a reason, and my quest has been to decipher those reasons.
Human: Your work with the apple and gravity is legendary. Can you tell me more about that moment?
Newton: Ah, the apple. It wasn’t so much the apple itself, but the question of why it falls downwards and not in another direction. This simple observation led me to broader contemplations on the invisible forces at play, eventually culminating in my gravitational theory.
```


## How the images are made
Use a text-to-image model like Stable diffusion, DALL-E 3 or Midjourney. Then use this prompt:

portrait of Cristiano Ronaldo in a style of Pixar character render, unreal engine cinematic smooth, hd, looking forward, in the center of image, from neck up, gray background

Replace Cristiano Ronaldo with person you want

## Replicate
Replicate makes it easy to run ML models in the cloud.
- It has a nice library for Node.js and Python.
- If you want you can train you own models on it.
- It has streaming LLM's
- It has a free tier
- It has some well known models like meta's llama-2-70b and stable-diffusion
- It has an active community that post their own (finetuned) models.

## Pinecone
Pinecone is a vector database. A vector database indexes and stores vector embeddings for fast retrieval and similarity search.

**TODO:** Learn how vector databases work in the context of LLM's by building an AI Application in Typescript:
https://www.pinecone.io/learn/crash-course/typescript-ai-app/

## Stripe
Stripe is being used in this application as the payment gateway.

- It is a well known payment gateway
- has a nice developer tools, even a handy node package with TS support.
- Has a lot of payment methods

#### Commission fees
- €0.35 commision for  bancontact
- 1,5% + € 0,25 commision for credit payments inside EU
- 3,25% + € 0,25  commision for credit payments outside EU

For lower transaction volumes e.g. ~2-3eu, you might be better off with **Adyen**
- Bancontact: €0.11 + 0.3-0.4%
- Visa: €0.11 + 0.3-0.4%
- mastercard: €0.11 + 0.3-0.4%
- Even has **meal vouchers**

You'll sacrifice DX and you need a minimum invoice of €100 ($120 U.S.) per month.

**As a startup, stripe is better**

## Clerk
Clerk is an auth management provider. It is costly; nextauth is better but requires more setup. Clerk is super duper easy to setup, has a dashboard for user management, etc.... Maybe better to use clerk first, once you have 1000 monthly users you can switch to NextAuth. It has a lot of handy hooks e.g. useUser().

**TODO: research auth management solutions**

## Next.js App Router
### Route Groups
Route groups are handy for organizing route segments and project files into logical groups without affecting the URL path structure.

**To create a route group, wrap the folder name in parenthesis (folderName)**
![](assets/Pasted%20image%2020231008155322.png)
In this example, the layout.tsx styles both the sign-in and sign-up. (All the children in the (routes) folder)
```tsx
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex items-center justify-center h-full">{children}</div>;
};

export default AuthLayout;

```

## ShadCN
- super cool "component library" that comes with predefined tailwind classNames, so custom styling is very easy
- Customization is the whole point of shadCN, it just sets up some default structure and architecture
- If ChakraUI is bootstrap, ShadCN is Tailwind CSS
- Re-usable components built using Radix UI and Tailwind CSS. This is **NOT** a component library. It's a collection of re-usable components that you can copy and paste into your apps.

### cn() function
ShadCN defines a cool function in lib/utils:
```tsx
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```
- twMerge ensures that there is a proper way of merging classes and there are no duplicates or overwrites
- clsx let's you add an object as a parameter

Example:
```tsx
const [pending, setPending] = useState(false)
const font = Poppins({
  weight: "600",
  subsets: ["latin"],
});

return (
<h1
className={cn(
	// these are the main classes i want to have
  "hidden md:block text-xl md:text-3xl font-bold text-primary",
  // But i want to add a dynamic className, that never causes issues. 
  font.className,
  // Adding an object like this is possible bcz of clsx
  {
	  "bg-gray-500": pending,
  }
)}
>
companion.ai
</h1>
)
```

More info [here](https://www.youtube.com/watch?v=re2JFITR7TI)

### Dark Mode
shadCN makes switching between dark/light mode very easy. 

just wrap your children inside your root layout with ThemeProvider
```tsx
<html lang="en" suppressHydrationWarning>
<body className={inter.className}>
  <ThemeProvider
	attribute="class"
	defaultTheme="system"
	enableSystem
	disableTransitionOnChange
>
	{children}
  </ThemeProvider>
</body>
</html>
```
Then add a mode toggle, and ur done.

Read more here: [Dark Mode](https://ui.shadcn.com/docs/dark-mode)


## Tailwind CSS
Some new stuff I learned regarding Tailwind CSS

### fill
decides what color an SVG should have

### Group modifier
[Styling based on parent state (group-{modifier})](https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-parent-state)

When you need to style an element based on the state of some _parent_ element, mark the parent with the `group` class, and use `group-*` modifiers like `group-hover` to style the target element:

```tsx
<div
 // Notice the "group" classname here:
  className={cn(
	"group flex items-start gap-x-3 py-4 w-full")}
>
	<Button
	 // Notice "group-hover": whenever we hover over any child of the div, the button becomes visible.
	  className="opacity-0 group-hover:opacity-100 transition">
	  <Copy className="w-4 h-4" />
	</Button>
<div>
```

## Lucide React
[lucide icons DB](https://lucide.dev/icons/)
Lucide react is an icon library. Previously I used heroIcons, but now im switching to Lucide. Heroicons has 292 icons, lucide had 1287 icons. Lucide also has a better search algo for finding icons. 

## query-string
Parse and stringify URL query strings

```tsx
import queryString from 'query-string';

console.log(location.search);
//=> '?foo=bar'

const parsed = queryString.parse(location.search);
console.log(parsed);
//=> {foo: 'bar'}
```

## globalThis
I've never seen it before, what is it? Our good friend ChatGPT can tell us:

`globalThis` is a universal standard object introduced in ECMAScript 2020 that provides a way to access the global object across different JavaScript environments, such as browsers (`window`), Node.js (`global`), and Web Workers (`self`).

In the context of a Next.js application:

- `globalThis` refers to `window` on the client-side (browser environment).
- `globalThis` refers to `global` on the server-side (Node.js environment).

Using `globalThis` ensures consistent access to the global scope regardless of where your code runs in a Next.js app, whether server-side or client

## Prisma
### prisma studio
I had never used prisma studio before, its actually quite handy to quickly edit/add a record. 

### count relations
```tsx
const usersWithCount = await prisma.user.findMany({
  include: {
    _count: {
      select: { posts: true },
    },
  },
})
```

## Zod
Zod is **a TypeScript-first schema declaration and validation library**. I'm using the term "schema" to broadly refer to any data type, from a simple string to a complex nested object.

TypeScript is useful for checking the types of our variables at the type level.

However, we can't always be sure about what type of variables we'll get from external sources like API endpoints or form inputs.

Zod lets us work around this by checking types at the _runtime_ level as well as the type level, making it a useful library to add to your repertoire.

In my own words: zod *validates* if an input value (e.g. form or data from external API) matches a set of rules (schema), if not it throws nice (custom) errors. You can infer a type from a zod schema.

```ts
// creating a schema
const UserSchema = z.object({
  username: z.string().min(3, { message: "username is at least 3 chars" }).max(20, { message: "username should not exceed 20 chars" }),
});

// extract the inferred type
type User = z.infer<typeof UserSchema>;
// { username: string }

const user: User = {username: "Arafat"}

// parsing
UserSchema.parse(user); // => {username: "Arafat"}
UserSchema.parse(12); // => throws ZodError

// "safe" parsing (doesn't throw error if validation fails)
UserSchema.safeParse(user); 
// => { success: true; data: {username: "Arafat"} }

UserSchema.safeParse(12); 
// => { success: false; error: ZodError }
```

[learn zod in 5 minutes](https://dev.to/arafat4693/learn-zod-in-5-minutes-17pn)
Recommended: [learn zod better in 30m (gamification)](https://www.totaltypescript.com/tutorials/zod)

## NEXT_PUBLIC_URL
Non-`NEXT_PUBLIC_` environment variables are only available in the Node.js environment, meaning they aren't accessible to the browser (the client runs in a different _environment_).

## useForm
use form is a react hook for form validation. 
```tsx
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      instructions: "",
      seed: "",
      src: "",
      categoryId: undefined,
    },
  });
```

## Why is the `useEffect` cleanup function useful?
The `useEffect` cleanup function helps developers clean effects that prevent unwanted behaviors and optimizes application performance.

However, it is pertinent to note that the `useEffect` cleanup function does not only run when our component wants to unmount, it also runs right before the execution of the next scheduled effect.

Example: **Component Unmounting**: If the component that contains this `useEffect` gets unmounted before the timeout completes (i.e., before 1 second), the `setFakeLoading(false)` will still be called after 1 second. This could lead to various unwanted behaviors or errors, as you might be trying to update the state on an unmounted component, which is a common source of bugs and warnings in React applications.
```tsx
useEffect(() => {
	const timeout = setTimeout(() => {
	  setFakeLoading(false)
	}, 1000)
	
	return () => {
	  clearTimeout(timeout)
	}
}, [])
```


## Auto scroll to the bottom of a chat conversation by using a ref
[Manipulating the DOM with Refs](https://react.dev/learn/manipulating-the-dom-with-refs)

React automatically updates the [DOM](https://developer.mozilla.org/docs/Web/API/Document_Object_Model/Introduction) to match your render output, so your components won’t often need to manipulate it. However, sometimes you might need access to the DOM elements managed by React—for example, to focus a node, scroll to it, or measure its size and position. There is no built-in way to do those things in React, so you will need a _ref_ to the DOM node.

```tsx
const scrollRef = useRef<ElementRef<"div">>(null);

// when the messages.length changes, it will smoothly scroll to the referenced element
useEffect(() => {
scrollRef?.current?.scrollIntoView({behavior: "smooth"})
}, [messages.length]);

return (
	<div className="flex-1 overflow-y-auto pr-4">
	  {messages.map((message) => (
		<ChatMessage
		  key={message.content}
		  role={message.role}
		  content={message.content}
		  src={message.src}
		/>
	  ))}

	  <div ref={scrollRef} />
	</div>
);
```

## Package.json
npm script names have some logic:
### Pre & Post Scripts
To create "pre" or "post" scripts for any scripts defined in the `"scripts"` section of the `package.json`, simply create another script _with a matching name_ and add "pre" or "post" to the beginning of them.
```json
{
  "scripts": {
    "precompress": "{{ executes BEFORE the `compress` script }}",
    "compress": "{{ run command to compress files }}",
    "postcompress": "{{ executes AFTER `compress` script }}"
  }
}
```

this script will run after **npm install**:
```json
    "postinstall": "prisma generate"
``` 

### Life Cycle Scripts
There are some special life cycle scripts that happen only in certain situations. These scripts happen in addition to the `pre<event>`, `post<event>`, and `<event>` scripts.
- `prepare`, `prepublish`, `prepublishOnly`, `prepack`, `postpack`, `dependencies`