import { Chapter } from './types';
import { intermediateChapters } from './curriculum-intermediate';

export const basicsChapters: Chapter[] = [
  {
    id: 'ch01',
    number: 1,
    level: 'Basics',
    levelNum: 1,
    title: 'Introduction to React & JSX',
    intro: `React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small, isolated pieces called "components."\n\nJSX is a syntax extension for JavaScript that looks similar to HTML. It makes describing your UI structure intuitive and readable. Behind the scenes, JSX compiles down to plain JavaScript function calls.`,
    examples: [
      {
        title: 'Your First JSX',
        explanation: 'JSX looks like HTML but is actually JavaScript. You can assign it to variables and pass it around like any other value.',
        code: `const element = <h1>Hello, React!</h1>;`,
      },
      {
        title: 'Expressions in JSX',
        explanation: 'Use curly braces {} to embed any JavaScript expression inside your JSX.',
        code: `const name = "Ada";
const element = <h1>Hello, {name}!</h1>;`,
      },
      {
        title: 'JSX Compiles to JavaScript',
        explanation: 'JSX is not magic — it compiles to React.createElement() calls. These two snippets are equivalent.',
        code: `// JSX — clean and readable
const el = <h1 className="title">Hi</h1>;

// What it compiles to
const el = React.createElement(
  "h1",
  { className: "title" },
  "Hi"
);`,
      },
    ],
    exercise: {
      instructions: 'Create a component called App that renders a <div> containing an <h1> with the text "My First React App" and a <p> with any welcome message of your choice.',
      starterCode: `function App() {
  return (
    <div>
      <h1>My First React App</h1>
      <p>Welcome to learning React!</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
      hint: 'A component is just a function that returns JSX. Wrap multiple elements in a single parent <div>.',
    },
    quiz: [
      {
        question: 'What is JSX?',
        type: 'mc',
        options: [
          'A JavaScript library for building UIs',
          'A syntax extension for JavaScript that resembles HTML',
          'A CSS framework for React',
          'A backend templating engine',
        ],
        correctIndex: 1,
        explanation: 'JSX is a syntax extension for JavaScript that looks like HTML but compiles to React.createElement() calls.',
      },
      {
        question: 'How do you embed a JavaScript expression inside JSX?',
        type: 'mc',
        options: ['With double quotes ""', 'With square brackets []', 'With curly braces {}', 'With parentheses ()'],
        correctIndex: 2,
        explanation: 'Curly braces {} allow you to embed any valid JavaScript expression inside JSX.',
      },
      {
        question: 'Which attribute replaces "class" in JSX?',
        type: 'mc',
        options: ['style', 'className', 'class', 'classes'],
        correctIndex: 1,
        explanation: 'Since JSX is JavaScript, "class" is a reserved keyword. React uses "className" instead.',
      },
      {
        question: 'What does this JSX render?',
        type: 'predict',
        code: `const x = 5;
const el = <p>{x > 3 ? "Big" : "Small"}</p>;`,
        options: ['<p>Big</p>', '<p>Small</p>', '<p>{x > 3 ? "Big" : "Small"}</p>', 'Error'],
        correctIndex: 0,
        explanation: 'The ternary expression inside {} evaluates at runtime. Since 5 > 3 is true, it renders "Big".',
      },
      {
        question: 'Why must you wrap multiple JSX elements in a single parent?',
        type: 'mc',
        options: [
          'For styling purposes only',
          'Because a component function can only return one root element',
          'It is optional and never required',
          'Because HTML requires it',
        ],
        correctIndex: 1,
        explanation: 'A component must return a single root element. You can also use <Fragment> or the shorthand <>...</>.',
      },
    ],
  },
  {
    id: 'ch02',
    number: 2,
    level: 'Basics',
    levelNum: 1,
    title: 'Components & Props',
    intro: `Components are the building blocks of any React app. A component is simply a JavaScript function that returns JSX.\n\nProps (short for "properties") let you pass data from a parent component down to a child. They make components reusable and configurable.`,
    examples: [
      {
        title: 'A Function Component',
        explanation: 'The simplest component is a function that returns JSX. Component names must start with a capital letter.',
        code: `function Welcome() {
  return <h1>Hello there!</h1>;
}

// Usage
<Welcome />`,
      },
      {
        title: 'Passing Props',
        explanation: 'Props are passed as attributes, like HTML attributes. They arrive as a single object argument.',
        code: `function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Usage
<Greeting name="Grace" />
<Greeting name="Linus" />`,
      },
      {
        title: 'Destructuring Props',
        explanation: 'Destructuring makes your code cleaner by pulling values directly out of the props object.',
        code: `function Avatar({ name, image }) {
  return (
    <div>
      <img src={image} alt={name} />
      <p>{name}</p>
    </div>
  );
}`,
      },
    ],
    exercise: {
      instructions: 'Create a ProfileCard component that accepts name and role as props. Render an <h2> with the name and a <p> with the role. Then render it twice with different props.',
      starterCode: `function ProfileCard({ name, role }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{role}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <ProfileCard name="Ada Lovelace" role="Mathematician" />
      <ProfileCard name="Alan Turing" role="Computer Scientist" />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
      hint: 'Destructure the props in the function parameter: ({ name, role }). Render multiple components inside a parent <div>.',
    },
    quiz: [
      {
        question: 'What must a component name start with?',
        type: 'mc',
        options: ['A lowercase letter', 'A capital letter', 'An underscore', 'A number'],
        correctIndex: 1,
        explanation: 'Component names must start with a capital letter so React can distinguish them from HTML tags.',
      },
      {
        question: 'How are props passed to a component?',
        type: 'mc',
        options: [
          'As a second argument to the function',
          'As attributes on the component tag',
          'Through a global variable',
          'They are not — components read from context',
        ],
        correctIndex: 1,
        explanation: 'Props are passed like HTML attributes: <MyComp name="Ada" />. They arrive as a single object.',
      },
      {
        question: 'What is the output?',
        type: 'predict',
        code: `function B({ x }) {
  return <p>{x}</p>;
}
function App() {
  return <B x={10 + 5} />;
}`,
        options: ['<p>10 + 5</p>', '<p>15</p>', '<p>{x}</p>', 'Error'],
        correctIndex: 1,
        explanation: 'The expression 10 + 5 inside {} evaluates to 15, which is passed as the x prop and rendered.',
      },
      {
        question: 'Props are ____ inside the child component.',
        type: 'mc',
        options: ['Mutable (can be changed)', 'Immutable (read-only)', 'Global', 'Deleted after render'],
        correctIndex: 1,
        explanation: 'Props are read-only inside a component. A component must never modify its own props.',
      },
      {
        question: 'Why destructure props?',
        type: 'mc',
        options: [
          'It is required by React',
          'It makes code cleaner and props easier to access',
          'It improves performance',
          'It makes props mutable',
        ],
        correctIndex: 1,
        explanation: 'Destructuring ({ name, role }) pulls values directly from the props object, making code cleaner and easier to read.',
      },
    ],
  },
  {
    id: 'ch03',
    number: 3,
    level: 'Basics',
    levelNum: 1,
    title: 'State with useState',
    intro: `State is data that changes over time — like a counter value, a text input, or a toggle switch. React keeps your UI in sync with that data.\n\nThe useState hook is the simplest way to add state to a function component. It returns a pair: the current value and a function to update it.`,
    examples: [
      {
        title: 'A Simple Counter',
        explanation: 'useState returns an array with two items: the current state and a setter function. We destructure them immediately.',
        code: `function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}`,
      },
      {
        title: 'Multiple State Values',
        explanation: 'You can call useState as many times as you need, each for an independent piece of state.',
        code: `function Form() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  return (
    <p>{name} is {age} years old</p>
  );
}`,
      },
      {
        title: 'Updating State with Objects',
        explanation: 'When state is an object, you must spread the previous values — React replaces state entirely, it does not merge.',
        code: `const [user, setUser] = useState({ name: "", age: 0 });

// Correct — spread first
setUser({ ...user, name: "Ada" });

// Wrong — loses the age property
setUser({ name: "Ada" });`,
      },
    ],
    exercise: {
      instructions: 'Build a LikeButton component with a count that starts at 0. Each click increments the count and displays "❤️ Liked N times".',
      starterCode: `function LikeButton() {
  const [likes, setLikes] = useState(0);

  return (
    <button onClick={() => setLikes(likes + 1)}>
      ❤️ Liked {likes} times
    </button>
  );
}

function App() {
  return <LikeButton />;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
      hint: 'Use useState(0) to initialize the count. In the onClick handler, call setLikes(likes + 1).',
    },
    quiz: [
      {
        question: 'What does useState return?',
        type: 'mc',
        options: [
          'A single value',
          'An array with the current state and a setter function',
          'An object with properties',
          'A Promise',
        ],
        correctIndex: 1,
        explanation: 'useState returns [currentState, setStateFunction]. We typically destructure it with array destructuring.',
      },
      {
        question: 'What is the argument to useState?',
        type: 'mc',
        options: [
          'The previous state value',
          'The initial state value',
          'A function to update state',
          'The component name',
        ],
        correctIndex: 1,
        explanation: 'You pass the initial state value to useState, e.g. useState(0) starts the state at 0.',
      },
      {
        question: 'What is wrong with this code?',
        type: 'predict',
        code: `const [user, setUser] = useState({ name: "A", age: 25 });
setUser({ name: "B" });
console.log(user.age);`,
        options: ['25', 'undefined', 'Error', '"A"'],
        correctIndex: 1,
        explanation: 'setUser replaces the entire object. Since we did not spread the old state, age is lost and becomes undefined.',
      },
      {
        question: 'How do you update state based on the previous state?',
        type: 'mc',
        options: [
          'setCount(count + 1) — using the current count value',
          'count = count + 1 — direct assignment',
          'count++ — increment in place',
          'state.count++ — mutating the state object',
        ],
        correctIndex: 0,
        explanation: 'Call the setter function with the new value: setCount(count + 1). You can also use the callback form setCount(c => c + 1).',
      },
      {
        question: 'Why must you never mutate state directly?',
        type: 'mc',
        options: [
          'It causes syntax errors',
          'React would not detect the change and would not re-render',
          'It is slower',
          'It is fine — React handles it',
        ],
        correctIndex: 1,
        explanation: 'Direct mutation (count++) does not trigger a re-render. Always use the setter function so React knows state changed.',
      },
    ],
  },
  {
    id: 'ch04',
    number: 4,
    level: 'Basics',
    levelNum: 1,
    title: 'Handling Events',
    intro: `React events are very similar to native DOM events — onClick, onChange, onSubmit, and so on. The key difference: you pass a function (an event handler) rather than a string.\n\nEvent handlers receive a synthetic event object that works the same way across all browsers.`,
    examples: [
      {
        title: 'Click Events',
        explanation: 'Pass a function to the onClick prop. It runs whenever the user clicks the element.',
        code: `function Button() {
  const handleClick = () => {
    console.log("Button was clicked!");
  };
  return <button onClick={handleClick}>Click me</button>;
}`,
      },
      {
        title: 'Passing Arguments',
        explanation: 'To pass custom arguments, wrap the call in an arrow function. This avoids invoking the handler immediately.',
        code: `function List() {
  const handleClick = (id) => {
    console.log("Clicked item " + id);
  };
  return (
    <button onClick={() => handleClick(42)}>
      Item 42
    </button>
  );
}`,
      },
      {
        title: 'The Event Object',
        explanation: 'Every handler receives a synthetic event. You can prevent default behavior, read the target value, and more.',
        code: `function Form() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!");
  };
  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}`,
      },
    ],
    exercise: {
      instructions: 'Build a ToggleButton component that switches between "ON" and "OFF" text on each click. Use useState to track the boolean state.',
      starterCode: `function ToggleButton() {
  const [isOn, setIsOn] = useState(false);

  return (
    <button onClick={() => setIsOn(!isOn)}>
      {isOn ? "ON" : "OFF"}
    </button>
  );
}

function App() {
  return <ToggleButton />;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
      hint: 'Use useState(false) for the initial state. In the click handler, flip the value: setIsOn(!isOn). Use a ternary for the button label.',
    },
    quiz: [
      {
        question: 'How do you attach a click handler in React?',
        type: 'mc',
        options: [
          '<button click="handler">',
          '<button onClick={handler}>',
          '<button onclick={handler()}>',
          '<button addEventListener="click">',
        ],
        correctIndex: 1,
        explanation: 'React uses camelCase event names (onClick, not onclick) and passes a function reference, not a string.',
      },
      {
        question: 'What does e.preventDefault() do?',
        type: 'mc',
        options: [
          'Stops the component from re-rendering',
          'Prevents the default browser behavior (like page reload)',
          'Deletes the event object',
          'Pauses event propagation only',
        ],
        correctIndex: 1,
        explanation: 'e.preventDefault() stops the browser default — for example, preventing a form from reloading the page on submit.',
      },
      {
        question: 'What is wrong here?',
        type: 'predict',
        code: `function App() {
  const sayHi = () => alert("Hi");
  return <button onClick={sayHi()}>Go</button>;
}`,
        options: [
          'Nothing — it works fine',
          'sayHi() is called immediately during render, not on click',
          'onClick does not accept functions',
          'alert is not available in React',
        ],
        correctIndex: 1,
        explanation: 'Writing onClick={sayHi()} calls the function during render. Pass the reference instead: onClick={sayHi}.',
      },
      {
        question: 'How do you pass extra arguments to an event handler?',
        type: 'mc',
        options: [
          'onClick={handleClick(42)}',
          'onClick={handleClick} args={[42]}',
          'onClick={() => handleClick(42)}',
          'onClick={handleClick.bind(null, 42)} only',
        ],
        correctIndex: 2,
        explanation: 'Wrap it in an arrow function: onClick={() => handleClick(42)}. This defers the call until click time.',
      },
      {
        question: 'What is the synthetic event?',
        type: 'mc',
        options: [
          'A fake event for testing only',
          'A cross-browser wrapper around the native event',
          'A CSS animation event',
          'A React component lifecycle event',
        ],
        correctIndex: 1,
        explanation: 'React creates a SyntheticEvent that wraps the native event, ensuring consistent behavior across all browsers.',
      },
    ],
  },
  {
    id: 'ch05',
    number: 5,
    level: 'Basics',
    levelNum: 1,
    title: 'Conditional Rendering',
    intro: `Conditional rendering means showing different UI based on conditions — like showing a login form for guests or a dashboard for logged-in users.\n\nReact gives you several patterns: the ternary operator, logical AND, and extracting into variables. All of them use plain JavaScript — there is no special template syntax.`,
    examples: [
      {
        title: 'The Ternary Operator',
        explanation: 'The ternary (condition ? a : b) is the most common way to conditionally render. It always returns one of two options.',
        code: `function Greeting({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn
        ? <h1>Welcome back!</h1>
        : <h1>Please sign in.</h1>}
    </div>
  );
}`,
      },
      {
        title: 'Logical AND (&&)',
        explanation: 'Use && when you want to show something or nothing at all. If the condition is true, the right side renders; if false, nothing shows.',
        code: `function Inbox({ messages }) {
  return (
    <div>
      <h1>Inbox</h1>
      {messages.length > 0 && (
        <p>You have {messages.length} unread messages.</p>
      )}
    </div>
  );
}`,
      },
      {
        title: 'Early Return',
        explanation: 'For more complex logic, return early from the component. This keeps your JSX clean and readable.',
        code: `function Warning({ error }) {
  if (!error) return null;
  return <p className="error">{error}</p>;
}`,
      },
    ],
    exercise: {
      instructions: 'Build a component that shows "✅ You are logged in" when isLoggedIn is true, and "🔒 Please log in" when false. Use the ternary operator.',
      starterCode: `function Status({ isLoggedIn }) {
  return (
    <p>
      {isLoggedIn ? "✅ You are logged in" : "🔒 Please log in"}
    </p>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div>
      <Status isLoggedIn={loggedIn} />
      <button onClick={() => setLoggedIn(!loggedIn)}>
        Toggle
      </button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
      hint: 'Use the ternary operator inside JSX: {condition ? "A" : "B"}.',
    },
    quiz: [
      {
        question: 'Which operator is best for rendering one of two different elements?',
        type: 'mc',
        options: ['Logical AND (&&)', 'Ternary (? :)', 'Bitwise OR (|)', 'Nullish coalescing (??)'],
        correctIndex: 1,
        explanation: 'The ternary operator (condition ? a : b) is perfect when you want to render one of two options.',
      },
      {
        question: 'What does {count > 0 && <Badge />} render when count is 0?',
        type: 'mc',
        options: ['<Badge />', 'The number 0', 'null (nothing)', 'false'],
        correctIndex: 1,
        explanation: 'When count is 0, the && evaluates to 0 itself, which React renders as "0". To avoid this, use count > 0 && ... explicitly.',
      },
      {
        question: 'What does this render?',
        type: 'predict',
        code: `function App({ show }) {
  return (
    <div>
      {show ? <p>Yes</p> : <p>No</p>}
    </div>
  );
}
// <App show={false} />`,
        options: ['<p>Yes</p>', '<p>No</p>', 'Both', 'Nothing'],
        correctIndex: 1,
        explanation: 'show is false, so the ternary returns the second option: <p>No</p>.',
      },
      {
        question: 'When is an early return pattern useful?',
        type: 'mc',
        options: [
          'When you need to render multiple elements',
          'When the component should render nothing or a simplified version',
          'Never — it causes errors',
          'Only inside useEffect',
        ],
        correctIndex: 1,
        explanation: 'Early returns (if (!x) return null;) are great for guard clauses and keeping JSX clean when rendering nothing or a simple fallback.',
      },
      {
        question: 'What is a common pitfall with && and the number 0?',
        type: 'mc',
        options: [
          'It throws an error',
          'React renders "0" to the screen instead of nothing',
          'It always shows the element',
          'It causes an infinite loop',
        ],
        correctIndex: 1,
        explanation: 'If the left side of && is 0, the expression evaluates to 0, which React renders as the text "0". Use an explicit comparison: count > 0 && ...',
      },
    ],
  },
  {
    id: 'ch06',
    number: 6,
    level: 'Basics',
    levelNum: 1,
    title: 'Rendering Lists & Keys',
    intro: `Rendering lists is one of the most common tasks in React. You use the JavaScript .map() method to transform an array of data into an array of JSX elements.\n\nEvery item in a list needs a unique "key" prop. Keys help React identify which items change, are added, or are removed — making updates efficient and bug-free.`,
    examples: [
      {
        title: 'Basic List Rendering',
        explanation: 'Map over your data array and return JSX for each item. Each element needs a unique key.',
        code: `const fruits = ["Apple", "Banana", "Cherry"];

function FruitList() {
  return (
    <ul>
      {fruits.map((fruit) => (
        <li key={fruit}>{fruit}</li>
      ))}
    </ul>
  );
}`,
      },
      {
        title: 'Keys from IDs',
        explanation: 'The best keys are stable, unique IDs from your data. Avoid using array indices as keys when the list can reorder.',
        code: `const users = [
  { id: 1, name: "Ada" },
  { id: 2, name: "Grace" },
  { id: 3, name: "Linus" },
];

function UserList() {
  return users.map((u) => (
    <div key={u.id}>{u.name}</div>
  ));
}`,
      },
      {
        title: 'Filtering Then Rendering',
        explanation: 'You can chain array methods like filter() before map() to show only items that match a condition.',
        code: `const numbers = [1, 2, 3, 4, 5, 6];

function EvenNumbers() {
  return numbers
    .filter((n) => n % 2 === 0)
    .map((n) => <li key={n}>{n}</li>);
}`,
      },
    ],
    exercise: {
      instructions: 'Render a list of todo items from an array. Each item has id, text, and done properties. Show the text and a ✓ if done.',
      starterCode: `const todos = [
  { id: 1, text: "Learn React", done: true },
  { id: 2, text: "Build an app", done: false },
  { id: 3, text: "Ship it!", done: false },
];

function TodoList() {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.done ? "✓ " : ""}{todo.text}
        </li>
      ))}
    </ul>
  );
}

function App() {
  return <TodoList />;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
      hint: 'Use todos.map(item => <li key={item.id}>...</li>). Use a ternary to show "✓ " only when done is true.',
    },
    quiz: [
      {
        question: 'Which array method is used to render a list of elements in React?',
        type: 'mc',
        options: ['.forEach()', '.map()', '.filter()', '.reduce()'],
        correctIndex: 1,
        explanation: '.map() transforms each item in the array into a JSX element. forEach returns undefined and cannot be rendered.',
      },
      {
        question: 'Why does React require a "key" prop on list items?',
        type: 'mc',
        options: [
          'For styling list items',
          'To help React identify which items changed, were added, or removed',
          'It is required by HTML',
          'To sort the list automatically',
        ],
        correctIndex: 1,
        explanation: 'Keys give elements a stable identity, so React can efficiently update the list without re-rendering everything.',
      },
      {
        question: 'What is the best value for a key?',
        type: 'mc',
        options: [
          'The array index',
          'A random number generated each render',
          'A stable, unique ID from your data',
          'The string "key"',
        ],
        correctIndex: 2,
        explanation: 'Stable, unique IDs from your data make the best keys. Index-based keys can cause bugs if the list reorders.',
      },
      {
        question: 'What does this render?',
        type: 'predict',
        code: `const nums = [10, 20, 30];
const el = nums.map((n, i) => (
  <li key={i}>{n * 2}</li>
));`,
        options: [
          '<li>10</li><li>20</li><li>30</li>',
          '<li>20</li><li>40</li><li>60</li>',
          '<li>102030</li>',
          'Error: keys are missing',
        ],
        correctIndex: 1,
        explanation: '.map() multiplies each value by 2: 10→20, 20→40, 30→60. The key is the index i.',
      },
      {
        question: 'What happens if you forget the key prop?',
        type: 'mc',
        options: [
          'The app crashes',
          'React renders nothing',
          'React shows a warning and may have performance/behavior issues',
          'Nothing — it is optional and has no effect',
        ],
        correctIndex: 2,
        explanation: 'React logs a warning and uses array indices as fallback keys, which can cause subtle bugs when the list changes.',
      },
    ],
  },
  {
    id: 'ch07',
    number: 7,
    level: 'Basics',
    levelNum: 1,
    title: 'Forms & Controlled Inputs',
    intro: `In React, form inputs are typically "controlled" — meaning their value is driven by React state. Every keystroke updates state, and state determines what the input displays.\n\nThis creates a single source of truth. The data always lives in React, and the input is just a view of that data.`,
    examples: [
      {
        title: 'A Controlled Text Input',
        explanation: 'The input value is tied to state. The onChange handler updates state on every keystroke.',
        code: `function NameInput() {
  const [name, setName] = useState("");
  return (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
}`,
      },
      {
        title: 'Handling Form Submission',
        explanation: 'Use onSubmit on the form, call e.preventDefault() to stop the page reload, then read state values.',
        code: `function Signup() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
}`,
      },
      {
        title: 'Multiple Inputs with One Handler',
        explanation: 'You can handle multiple inputs with a single change handler by using the input name as the state key.',
        code: `function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <input name="name" value={form.name} onChange={handleChange} />
      <input name="email" value={form.email} onChange={handleChange} />
    </>
  );
}`,
      },
    ],
    exercise: {
      instructions: 'Build a controlled text input that displays what the user types below it in real time. Show the text in a <p> tag.',
      starterCode: `function LivePreview() {
  const [text, setText] = useState("");

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
      />
      <p>You typed: {text}</p>
    </div>
  );
}

function App() {
  return <LivePreview />;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
      hint: 'Use useState("") for the initial text. Set the input value={text} and onChange={(e) => setText(e.target.value)}.',
    },
    quiz: [
      {
        question: 'What is a controlled input?',
        type: 'mc',
        options: [
          'An input that cannot be changed by the user',
          'An input whose value is controlled by React state',
          'An input with CSS styling',
          'An input that only accepts numbers',
        ],
        correctIndex: 1,
        explanation: 'In a controlled input, the value prop is driven by state and onChange updates that state. React is the single source of truth.',
      },
      {
        question: 'How do you read the current value of an input in the onChange handler?',
        type: 'mc',
        options: ['e.target.name', 'e.target.id', 'e.target.value', 'e.input.value'],
        correctIndex: 2,
        explanation: 'The synthetic event target has a value property: e.target.value gives you the current input text.',
      },
      {
        question: 'What does e.target.name do in the multi-input handler?',
        type: 'predict',
        code: `const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};
// input: <input name="email" />`,
        options: [
          'Sets the entire form to the input name',
          'Updates only the email field in the form state',
          'Throws an error',
          'Resets the form',
        ],
        correctIndex: 1,
        explanation: 'The computed property [e.target.name] uses the input name attribute ("email") as the key, updating only that field while spreading the rest.',
      },
      {
        question: 'Why call e.preventDefault() in a form submit handler?',
        type: 'mc',
        options: [
          'To prevent the form from clearing',
          'To stop the browser from reloading the page',
          'To prevent the input from updating',
          'It is required by React',
        ],
        correctIndex: 1,
        explanation: 'By default, form submission causes a full page reload. e.preventDefault() stops that so React can handle it instead.',
      },
      {
        question: 'What happens if you set value but no onChange?',
        type: 'mc',
        options: [
          'The input works normally',
          'The input becomes read-only — React warns it should be readOnly or have onChange',
          'The input is automatically uncontrolled',
          'Nothing — it is fine',
        ],
        correctIndex: 1,
        explanation: 'A controlled input with value but no onChange is read-only. React expects either an onChange handler or a readOnly attribute.',
      },
    ],
  },
];

export const curriculum: Chapter[] = [...basicsChapters, ...intermediateChapters];