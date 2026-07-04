import { Chapter } from './types';

export const intermediateChapters: Chapter[] = [
  {
    id: 'ch08',
    number: 8,
    level: 'Intermediate',
    levelNum: 2,
    title: 'useEffect & Side Effects',
    intro: `Some things in a React component don't belong in the render — fetching data, subscribing to events, setting timers, manually changing the DOM. These are called "side effects."\n\nThe useEffect hook lets you perform side effects after the component renders. Think of it as telling React: "after you paint the screen, also do this."`,
    examples: [
      {
        title: 'Basic useEffect',
        explanation: 'A useEffect with no dependency array runs after every render.',
        code: `function Logger() {
  useEffect(() => {
    console.log("Component rendered!");
  });
  return <p>Check the console</p>;
}`,
      },
      {
        title: 'Dependencies Array',
        explanation: 'Pass a dependencies array to control when the effect runs. With [count], it only runs when count changes.',
        code: `function Counter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = "Count: " + count;
  }, [count]);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}`,
      },
      {
        title: 'Empty Dependencies (Run Once)',
        explanation: 'An empty array [] means the effect runs only once, after the first render.',
        code: `function App() {
  useEffect(() => {
    console.log("Mounted! Runs once.");
  }, []);
  return <h1>Hello</h1>;
}`,
      },
    ],
    exercise: {
      instructions: 'Use useEffect to update the document title to "Welcome!" when the component mounts. Use an empty dependency array.',
      starterCode: `function App() {
  useEffect(() => {
    document.title = "Welcome!";
  }, []);

  return (
    <div>
      <h1>Check the browser tab title!</h1>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
      hint: 'Pass [] as the second argument to useEffect.',
    },
    quiz: [
      { question: 'What is the purpose of useEffect?', type: 'mc', options: ['To render JSX', 'To perform side effects after render', 'To define state', 'To handle clicks'], correctIndex: 1, explanation: 'useEffect runs side effects — data fetching, subscriptions, timers, DOM manipulation — after render.' },
      { question: 'When does useEffect with NO dependency array run?', type: 'mc', options: ['Only once on mount', 'After every render', 'Never', 'Only on unmount'], correctIndex: 1, explanation: 'Without a dependency array, the effect runs after every render.' },
      { question: 'What does useEffect with [] (empty array) do?', type: 'mc', options: ['Runs after every render', 'Runs only once after first render', 'Never runs', 'Runs on every state change'], correctIndex: 1, explanation: 'An empty array means no dependencies — the effect runs once on mount.' },
      { question: 'What does this log?', type: 'predict', code: `function App() {\n  const [n, setN] = useState(0);\n  useEffect(() => {\n    console.log("effect", n);\n  }, [n]);\n  return <button onClick={() => setN(n + 1)}>+</button>;\n}\n// User clicks button once`, options: ['"effect 0" once', '"effect 0" then "effect 1"', '"effect 1" only', 'Nothing'], correctIndex: 1, explanation: 'Runs on mount (effect 0), then when n changes to 1 (effect 1).' },
      { question: 'Which is NOT a typical side effect?', type: 'mc', options: ['Fetching data from an API', 'Setting a timer', 'Updating component state directly', 'Subscribing to an event'], correctIndex: 2, explanation: 'Updating state is normal React behavior, not a side effect. Side effects reach outside the component.' },
    ],
  },
  {
    id: 'ch09',
    number: 9,
    level: 'Intermediate',
    levelNum: 2,
    title: 'Component Lifecycle & Cleanup',
    intro: `Every effect can return a cleanup function. React calls it before the component unmounts, and also before re-running the effect if dependencies changed.\n\nThis is essential for removing event listeners, clearing timers, and closing subscriptions.`,
    examples: [
      {
        title: 'Cleanup Function',
        explanation: 'Return a function from useEffect. React calls it before unmount or re-run.',
        code: `function WindowSize() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return <p>Width: {width}px</p>;
}`,
      },
      {
        title: 'Timer with Cleanup',
        explanation: 'Always clear intervals in cleanup to prevent them running after unmount.',
        code: `function Timer() {
  const [s, setS] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setS(s => s + 1), 1000);
    return () => clearInterval(id);
  }, []);
  return <p>{s}s</p>;
}`,
      },
      {
        title: 'Cleanup on Re-run',
        explanation: 'When dependencies change, React cleans up the previous effect before running the new one.',
        code: `function Chat({ roomId }) {
  useEffect(() => {
    const conn = connect(roomId);
    return () => conn.disconnect();
  }, [roomId]);
}`,
      },
    ],
    exercise: {
      instructions: 'Build a component that increments a counter every second. Clean up the interval on unmount.',
      starterCode: `function Stopwatch() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <h1>Seconds: {count}</h1>;
}

function App() {
  const [show, setShow] = useState(true);
  return (
    <div>
      {show && <Stopwatch />}
      <button onClick={() => setShow(!show)}>
        {show ? "Unmount" : "Mount"}
      </button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
      hint: 'Use setInterval inside useEffect. Return () => clearInterval(id) as cleanup.',
    },
    quiz: [
      { question: 'When does the cleanup function run?', type: 'mc', options: ['Only on unmount', 'Before every re-run of the effect and on unmount', 'After every render', 'Never'], correctIndex: 1, explanation: 'Cleanup runs before re-runs (when deps change) and on unmount.' },
      { question: 'Why must you clear intervals in cleanup?', type: 'mc', options: ['To improve styling', 'To prevent running after unmount (memory leaks)', 'Not necessary', 'To make it faster'], correctIndex: 1, explanation: 'Without clearInterval, it keeps running and tries to update unmounted state.' },
      { question: 'What happens here?', type: 'predict', code: `function App({ id }) {\n  useEffect(() => {\n    const sub = subscribe(id);\n    // no cleanup returned\n  }, [id]);\n}`, options: ['Works fine', 'Old subscriptions leak, causing stale data', 'Syntax error', 'Only first subscription works'], correctIndex: 1, explanation: 'Without cleanup, old subscriptions stack up and are never removed.' },
      { question: 'What should cleanup functions do?', type: 'mc', options: ['Render new JSX', 'Undo the side effect: remove listeners, clear timers', 'Update state', 'Trigger re-render'], correctIndex: 1, explanation: 'Cleanup reverses what the effect did — removeEventListener, clearInterval, disconnect.' },
      { question: 'Empty array with cleanup does what?', type: 'mc', options: ['Effect on mount, cleanup on unmount — once each', 'Effect and cleanup on every render', 'Never runs', 'Cleanup only on mount'], correctIndex: 0, explanation: 'With [], effect runs once on mount, cleanup once on unmount.' },
    ],
  },
  {
    id: 'ch10',
    number: 10,
    level: 'Intermediate',
    levelNum: 2,
    title: 'Custom Hooks',
    intro: `Custom hooks let you extract and reuse stateful logic across components. A custom hook is a function starting with "use" that can call other hooks inside.\n\nInstead of repeating useState and useEffect code everywhere, move it into a reusable hook.`,
    examples: [
      {
        title: 'A useToggle Hook',
        explanation: 'Boolean state with a toggle function — a common pattern extracted into a hook.',
        code: `function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = () => setValue(v => !v);
  return [value, toggle];
}`,
      },
      {
        title: 'A useWindowWidth Hook',
        explanation: 'Hooks can combine multiple built-in hooks with proper cleanup.',
        code: `function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return width;
}`,
      },
      {
        title: 'A useLocalStorage Hook',
        explanation: 'Hooks can persist data to localStorage, surviving page reloads.',
        code: `function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initial;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}`,
      },
    ],
    exercise: {
      instructions: 'Create a useCounter hook that accepts initial value and step (default 1). Return count, increment, and decrement. Use it in a component.',
      starterCode: `function useCounter(initial = 0, step = 1) {
  const [count, setCount] = useState(initial);
  const increment = () => setCount((c) => c + step);
  const decrement = () => setCount((c) => c - step);
  return { count, increment, decrement };
}

function App() {
  const { count, increment, decrement } = useCounter(0, 5);
  return (
    <div>
      <button onClick={decrement}>-</button>
      <span style={{ margin: "0 12px" }}>{count}</span>
      <button onClick={increment}>+</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
      hint: 'Inside useCounter, use useState(initial) and return an object with count, increment, decrement.',
    },
    quiz: [
      { question: 'What naming convention must a custom hook follow?', type: 'mc', options: ['Must start with "hook"', 'Must start with "use"', 'Must be PascalCase', 'No convention'], correctIndex: 1, explanation: 'Custom hooks must start with "use" so React can enforce rules of hooks.' },
      { question: 'What can a custom hook do that a regular function cannot?', type: 'mc', options: ['Render JSX', 'Call other React hooks', 'Accept arguments', 'Return a value'], correctIndex: 1, explanation: 'Custom hooks can call other hooks — this is what makes them special.' },
      { question: 'What does this return?', type: 'predict', code: `function useCount() {\n  const [n, setN] = useState(0);\n  return [n, setN];\n}\nconst [count, setCount] = useCount();`, options: ['An object', 'An array [count, setCount]', 'A number', 'A function'], correctIndex: 1, explanation: 'The hook returns useState array [n, setN], destructured into count and setCount.' },
      { question: 'Why extract logic into a custom hook?', type: 'mc', options: ['Required for complex apps', 'To reuse stateful logic across components', 'To improve performance', 'To avoid useState'], correctIndex: 1, explanation: 'Custom hooks DRY up shared stateful logic across multiple components.' },
      { question: 'Can a custom hook use other custom hooks?', type: 'mc', options: ['No', 'Yes — hooks can compose other hooks', 'Only inside classes', 'Only if they return state'], correctIndex: 1, explanation: 'Hooks can compose other hooks — build small hooks and combine them.' },
    ],
  },
  {
    id: 'ch11',
    number: 11,
    level: 'Intermediate',
    levelNum: 2,
    title: 'Context API (Global State)',
    intro: `When you need to share data across many components at different nesting levels, passing props through every layer ("prop drilling") gets painful.\n\nThe Context API lets you broadcast data to any component in the tree without manual prop passing.`,
    examples: [
      {
        title: 'Creating Context',
        explanation: 'Create a context with a default value, then export it.',
        code: `const ThemeContext = createContext("light");`,
      },
      {
        title: 'Providing a Value',
        explanation: 'Wrap your tree in the Provider and pass a value. All descendants can access it.',
        code: `function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}`,
      },
      {
        title: 'Consuming Context',
        explanation: 'Use the useContext hook to read the value in any descendant.',
        code: `function Toolbar() {
  const theme = useContext(ThemeContext);
  return <p>Current theme: {theme}</p>;
}`,
      },
    ],
    exercise: {
      instructions: 'Create a UserContext providing a username. Consume it in a Profile component to display "Hello, [username]!".',
      starterCode: `const UserContext = createContext("Guest");

function Profile() {
  const name = useContext(UserContext);
  return <h2>Hello, {name}!</h2>;
}

function App() {
  return (
    <UserContext.Provider value="Ada">
      <Profile />
    </UserContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
      hint: 'Create context with createContext(). Wrap in Provider with a value. Read with useContext().',
    },
    quiz: [
      { question: 'What problem does Context solve?', type: 'mc', options: ['Slow rendering', 'Prop drilling — passing props through many layers', 'State management for forms', 'CSS styling'], correctIndex: 1, explanation: 'Context avoids prop drilling by broadcasting data to any descendant.' },
      { question: 'What does createContext() return?', type: 'mc', options: ['A component', 'A context object with a Provider', 'A hook', 'A state value'], correctIndex: 1, explanation: 'createContext returns a context object with a .Provider component.' },
      { question: 'How do you read a context value?', type: 'mc', options: ['context.read()', 'useContext(Context)', 'Context.getValue()', 'this.context'], correctIndex: 1, explanation: 'The useContext hook reads the current context value from the nearest Provider.' },
      { question: 'What does this render?', type: 'predict', code: `const C = createContext("default");\nfunction Child() {\n  const v = useContext(C);\n  return <p>{v}</p>;\n}\n// <C.Provider value="hi"><Child /></C.Provider>`, options: ['<p>default</p>', '<p>hi</p>', '<p>{v}</p>', 'Error'], correctIndex: 1, explanation: 'The Provider value "hi" overrides the default "default".' },
      { question: 'What if no Provider wraps the consumer?', type: 'mc', options: ['Error', 'The default value from createContext() is used', 'null is rendered', 'Undefined'], correctIndex: 1, explanation: 'Without a Provider, useContext returns the default value passed to createContext.' },
    ],
  },
  {
    id: 'ch12',
    number: 12,
    level: 'Intermediate',
    levelNum: 2,
    title: 'React Router (Multi-Page Navigation)',
    intro: `React apps are single-page by default, but React Router lets you create multi-page navigation with distinct URLs — all without full page reloads.\n\nYou define routes that map URL paths to components, and use Link instead of <a> tags to navigate.`,
    examples: [
      {
        title: 'Basic Routing',
        explanation: 'Define Routes that map paths to components. The Router wraps everything.',
        code: `function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}`,
      },
      {
        title: 'Navigation with Link',
        explanation: 'Use Link instead of <a> to navigate without a full page reload.',
        code: `function Nav() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </nav>
  );
}`,
      },
      {
        title: 'Route Parameters',
        explanation: 'Dynamic segments like :id let you match URLs with parameters. Read them with useParams.',
        code: `function UserProfile() {
  const { id } = useParams();
  return <p>User ID: {id}</p>;
}
// Route: <Route path="/users/:id" element={<UserProfile />} />`,
      },
    ],
    exercise: {
      instructions: 'Create a simple app with Home and About pages. Add navigation links between them using BrowserRouter, Routes, Route, and Link.',
      starterCode: `const { BrowserRouter, Routes, Route, Link } = ReactRouterDOM;

function Home() {
  return <h1>Home Page</h1>;
}

function About() {
  return <h1>About Page</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
      hint: 'Use BrowserRouter, Routes, Route, and Link. Map paths to components in Routes.',
    },
    quiz: [
      { question: 'What does React Router do?', type: 'mc', options: ['Styles components', 'Enables multi-page navigation without full reloads', 'Manages state', 'Fetches data'], correctIndex: 1, explanation: 'React Router maps URLs to components, enabling client-side navigation.' },
      { question: 'What replaces <a> tags for internal navigation?', type: 'mc', options: ['<button>', '<Link>', '<Navigate>', '<Route>'], correctIndex: 1, explanation: 'The Link component navigates without a full page reload.' },
      { question: 'How do you read a URL parameter like :id?', type: 'mc', options: ['window.location', 'useParams()', 'useLocation()', 'props.match'], correctIndex: 1, explanation: 'The useParams hook extracts dynamic route parameters.' },
      { question: 'What renders at /users/42?', type: 'predict', code: `function Page() {\n  const { id } = useParams();\n  return <p>{id}</p>;\n}\n// Route: path="/users/:id"`, options: ['<p>users/42</p>', '<p>42</p>', '<p>{id}</p>', 'Error'], correctIndex: 1, explanation: 'useParams extracts id="42" from the URL, so it renders <p>42</p>.' },
      { question: 'Which wraps the entire app for routing?', type: 'mc', options: ['<Routes>', '<BrowserRouter>', '<Link>', '<Route>'], correctIndex: 1, explanation: 'BrowserRouter wraps the app and enables routing. Routes defines the route table inside.' },
    ],
  },
  {
    id: 'ch13',
    number: 13,
    level: 'Intermediate',
    levelNum: 2,
    title: 'Advanced Forms (Validation, Multi-Step)',
    intro: `Real-world forms need validation, error messages, and sometimes multiple steps. You can build all of this with controlled inputs and a bit of state management.\n\nThe pattern: store form data and errors in state, validate on submit (or on change), and only proceed when valid.`,
    examples: [
      {
        title: 'Form Validation',
        explanation: 'Check each field on submit and store error messages in state.',
        code: `function Signup() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Enter a valid email");
      return;
    }
    setError("");
    console.log("Valid!", email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={e => setEmail(e.target.value)} />
      {error && <p style={{color: "red"}}>{error}</p>}
      <button type="submit">Sign Up</button>
    </form>
  );
}`,
      },
      {
        title: 'Validating on Change',
        explanation: 'Give instant feedback by validating as the user types.',
        code: `function PasswordField() {
  const [pw, setPw] = useState("");
  const valid = pw.length >= 8;
  return (
    <div>
      <input value={pw} onChange={e => setPw(e.target.value)} type="password" />
      {!valid && pw.length > 0 && <p>Too short (min 8)</p>}
    </div>
  );
}`,
      },
      {
        title: 'Multi-Step Form',
        explanation: 'Track which step the user is on with state. Each step renders different fields.',
        code: `function Wizard() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({});
  return (
    <div>
      {step === 1 && <Step1 onNext={d => { setData({...data, ...d}); setStep(2); }} />}
      {step === 2 && <Step2 onBack={() => setStep(1)} onSubmit={() => console.log(data)} />}
    </div>
  );
}`,
      },
    ],
    exercise: {
      instructions: 'Build a signup form with email and password. Validate that email contains "@" and password is at least 6 characters. Show error messages if invalid.',
      starterCode: `function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!email.includes("@")) errs.email = "Invalid email";
    if (password.length < 6) errs.password = "Min 6 characters";
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      alert("Form is valid!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
      <button type="submit">Sign Up</button>
    </form>
  );
}

function App() {
  return <SignupForm />;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
      hint: 'Store errors object in state. Validate on submit, set errors, conditionally render messages.',
    },
    quiz: [
      { question: 'Where should you store form validation errors?', type: 'mc', options: ['In a global variable', 'In component state', 'In the DOM directly', 'In localStorage only'], correctIndex: 1, explanation: 'Store errors in state so React re-renders when they change.' },
      { question: 'When should you validate?', type: 'mc', options: ['Only on submit', 'Only on change', 'Either or both — depends on UX', 'Never validate'], correctIndex: 2, explanation: 'Submit validation is essential; on-change gives instant feedback. Many forms use both.' },
      { question: 'What does this do?', type: 'predict', code: `const errs = {};\nif (!email.includes("@")) errs.email = "bad";\nif (password.length < 6) errs.password = "short";\nif (Object.keys(errs).length === 0) submit();`, options: ['Submits always', 'Submits only if no errors', 'Throws error', 'Submits only if email valid'], correctIndex: 1, explanation: 'Errors collected in errs. If no keys added (all valid), it submits.' },
      { question: 'How do you manage a multi-step form?', type: 'mc', options: ['Multiple components with separate state', 'Track current step in state and render different fields per step', 'URL parameters only', 'Context for everything'], correctIndex: 1, explanation: 'A step counter in state controls which fields render. Accumulate data as user advances.' },
      { question: 'Benefit of on-change validation?', type: 'mc', options: ['Faster page load', 'Better UX — users see issues as they type', 'Smaller bundle', 'Required by React'], correctIndex: 1, explanation: 'On-change validation gives immediate feedback, improving UX.' },
    ],
  },
  {
    id: 'ch14',
    number: 14,
    level: 'Intermediate',
    levelNum: 2,
    title: 'Lifting State Up & Component Composition',
    intro: `When two sibling components need to share data, you move ("lift") the shared state to their common parent. The parent passes data down via props and receives updates via callbacks.\n\nThis is the fundamental React pattern for sharing state. Combined with composition — passing components as children — you build flexible, reusable UIs.`,
    examples: [
      {
        title: 'Lifting State Up',
        explanation: 'Two child components share state by moving it to the parent.',
        code: `function Parent() {
  const [text, setText] = useState("");
  return (
    <div>
      <Input value={text} onChange={setText} />
      <Display value={text} />
    </div>
  );
}

function Input({ value, onChange }) {
  return <input value={value} onChange={e => onChange(e.target.value)} />;
}

function Display({ value }) {
  return <p>You typed: {value}</p>;
}`,
      },
      {
        title: 'Controlled Components',
        explanation: 'When a child receives its value and onChange from a parent, it is "controlled."',
        code: `function Temperature({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
}`,
      },
      {
        title: 'Composition with children',
        explanation: 'The children prop lets you pass JSX into a component, enabling flexible layouts.',
        code: `function Card({ children }) {
  return <div className="card">{children}</div>;
}

// Usage
<Card>
  <h2>Title</h2>
  <p>Any content here</p>
</Card>`,
      },
    ],
    exercise: {
      instructions: 'Build a temperature converter: two inputs (Celsius and Fahrenheit) that update each other. Lift the shared state (celsius) to the parent.',
      starterCode: `function TemperatureInput({ value, onChange, scale }) {
  return (
    <fieldset>
      <legend>Enter temperature in {scale}:</legend>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </fieldset>
  );
}

function App() {
  const [celsius, setCelsius] = useState("");

  const fahrenheit = celsius === "" ? "" : (celsius * 9 / 5 + 32).toFixed(2);

  return (
    <div>
      <TemperatureInput
        scale="Celsius"
        value={celsius}
        onChange={setCelsius}
      />
      <TemperatureInput
        scale="Fahrenheit"
        value={fahrenheit}
        onChange={(f) => setCelsius(f === "" ? "" : (f - 32) * 5 / 9)}
      />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
      hint: 'Store celsius in the parent. Derive fahrenheit from it. Pass value and onChange to both inputs.',
    },
    quiz: [
      { question: 'What does "lifting state up" mean?', type: 'mc', options: ['Moving state to a child', 'Moving shared state to the nearest common parent', 'Deleting state', 'Using context instead'], correctIndex: 1, explanation: 'When siblings share data, lift state to their common parent. The parent passes it via props.' },
      { question: 'Why lift state up?', type: 'mc', options: ['To improve performance', 'So sibling components can share and sync data', 'To remove useState', 'Required by React'], correctIndex: 1, explanation: 'Lifting state lets siblings stay in sync through their shared parent.' },
      { question: 'What is a controlled component?', type: 'mc', options: ['CSS only', 'A component whose value and onChange come from a parent', 'A component using context', 'A class component'], correctIndex: 1, explanation: 'A controlled component receives value and change handler from a parent, making the parent the source of truth.' },
      { question: 'What renders?', type: 'predict', code: `function Card({ children }) {\n  return <div>{children}</div>;\n}\n// <Card><p>Hi</p></Card>`, options: ['<div><p>Hi</p></div>', '<div></div>', '<p>Hi</p>', 'Error'], correctIndex: 0, explanation: 'children passes <p>Hi</p> inside Card, rendering <div><p>Hi</p></div>.' },
      { question: 'What does the children prop do?', type: 'mc', options: ['Passes child IDs', 'Lets you pass arbitrary JSX into a component', 'Counts children', 'Styles children'], correctIndex: 1, explanation: 'children lets you nest any JSX inside a component, enabling composition.' },
    ],
  },
  {
    id: 'ch15',
    number: 15,
    level: 'Intermediate',
    levelNum: 2,
    title: 'Fetching Data from an API',
    intro: `Fetching data from an API is the most common side effect in real apps. The pattern: use useEffect to fetch on mount, store the data in state, and handle loading and error states.\n\nAlways clean up in-flight requests and show feedback while waiting.`,
    examples: [
      {
        title: 'Basic Fetch in useEffect',
        explanation: 'Fetch data when the component mounts and store the result in state.',
        code: `function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://api.example.com/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return users.map(u => <p key={u.id}>{u.name}</p>);
}`,
      },
      {
        title: 'Loading & Error States',
        explanation: 'Always show a loading indicator and handle errors gracefully.',
        code: `function UserList() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.example.com/users")
      .then(res => {
        if (!res.ok) throw new Error("Failed");
        return res.json();
      })
      .then(data => { setUsers(data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return users.map(u => <p key={u.id}>{u.name}</p>);
}`,
      },
      {
        title: 'Cleanup with AbortController',
        explanation: 'Cancel in-flight requests on unmount to avoid updating unmounted state.',
        code: `useEffect(() => {
  const controller = new AbortController();
  fetch("/api/data", { signal: controller.signal })
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => {
      if (err.name !== "AbortError") console.error(err);
    });
  return () => controller.abort();
}, []);`,
      },
    ],
    exercise: {
      instructions: 'Fetch data from a public API (JSONPlaceholder) and display a list of posts. Show "Loading..." while fetching and the post titles when done.',
      starterCode: `function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

function App() {
  return <PostList />;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
      hint: 'Use useEffect with [] to fetch on mount. Store data and loading in state. Conditionally render loading or the list.',
    },
    quiz: [
      { question: 'Where should you make API fetch calls?', type: 'mc', options: ['In the render function', 'Inside useEffect', 'In useState', 'In event handlers only'], correctIndex: 1, explanation: 'API calls are side effects — put them in useEffect, typically with [] for one-time fetch.' },
      { question: 'What states should you handle when fetching?', type: 'mc', options: ['Only success', 'Only loading', 'Loading, success, and error', 'Only error'], correctIndex: 2, explanation: 'Always handle loading (spinner), success (data), and error (message).' },
      { question: 'Why use AbortController in fetch effects?', type: 'mc', options: ['To speed up the request', 'To cancel in-flight requests on unmount', 'To cache data', 'To retry failures'], correctIndex: 1, explanation: 'AbortController cancels the request on cleanup, preventing state updates on unmounted components.' },
      { question: 'What happens if you fetch without useEffect?', type: 'predict', code: `function App() {\n  fetch("/api/data").then(r => r.json()).then(setData);\n  return <div>{data}</div>;\n}`, options: ['Works fine', 'Triggers fetch on every render, causing infinite loop', 'Syntax error', 'Fetches once'], correctIndex: 1, explanation: 'Fetching in render runs on every render. If setData triggers re-render, you get an infinite loop.' },
      { question: 'What should the dependency array be for a one-time fetch?', type: 'mc', options: ['No array', '[] (empty array)', '[data]', '[fetch]'], correctIndex: 1, explanation: 'An empty [] runs the effect once on mount — what you want for initial data fetch.' },
    ],
  },
];