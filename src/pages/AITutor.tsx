import { useEffect, useRef, useState } from 'react';
import { Bot, Send, Sparkles, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { sendChatMessage } from '@/services/chatApi';

const starterPrompts = [
  'Explain useState with a small example',
  'Quiz me on React props',
  'Why do keys matter in lists?',
  'Help me debug a component',
];

const initialMessages = [
  {
    role: 'assistant',
    content: 'Hi, I am your React AI Tutor. Ask me about a concept, paste code you are stuck on, or request a quick quiz.',
  },
];

function MarkdownMessage({ content }) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ children }) => <h1 className="mb-3 text-xl font-bold leading-tight">{children}</h1>,
        h2: ({ children }) => <h2 className="mb-2 mt-4 text-lg font-semibold leading-tight first:mt-0">{children}</h2>,
        h3: ({ children }) => <h3 className="mb-2 mt-3 text-base font-semibold leading-tight first:mt-0">{children}</h3>,
        p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
        ul: ({ children }) => <ul className="mb-3 ml-5 list-disc space-y-1 last:mb-0">{children}</ul>,
        ol: ({ children }) => <ol className="mb-3 ml-5 list-decimal space-y-1 last:mb-0">{children}</ol>,
        li: ({ children }) => <li className="pl-1">{children}</li>,
        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
        code: ({ className, children }) => {
          const isBlock = className?.startsWith('language-');

          return isBlock ? (
            <code className="block overflow-x-auto whitespace-pre rounded-lg bg-muted px-3 py-2 font-mono text-xs leading-relaxed text-foreground">
              {children}
            </code>
          ) : (
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
              {children}
            </code>
          );
        },
        pre: ({ children }) => <pre className="mb-3 overflow-x-auto last:mb-0">{children}</pre>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

export default function AITutor() {
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState('');
  const [isSending, setIsSending] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = '48px';
    textarea.style.height = `${Math.min(Math.max(textarea.scrollHeight, 48), 128)}px`;
    textarea.style.overflowY = textarea.scrollHeight > 128 ? 'auto' : 'hidden';
  }, [draft]);

  const sendMessage = async (content = draft) => {
    const trimmed = content.trim();

    if (!trimmed || isSending) return;

    setMessages(currentMessages => [
      ...currentMessages,
      { role: 'user', content: trimmed },
    ]);
    setDraft('');
    setIsSending(true);

    try {
      const data = await sendChatMessage(trimmed);

      setMessages(currentMessages => [
        ...currentMessages,
        {
          role: 'assistant',
          content: data.answer || 'I received a response, but it did not include an answer.',
        },
      ]);
    } catch (error) {
      setMessages(currentMessages => [
        ...currentMessages,
        {
          role: 'assistant',
          content: error instanceof Error ? error.message : 'Unable to reach the AI Tutor right now.',
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </span>
            <h1 className="text-3xl font-bold font-heading">AI Tutor</h1>
          </div>
          <p className="text-muted-foreground">Chat with a React tutor while you work through the curriculum.</p>
        </div>
      </div>

      <section className="grid gap-5 lg:grid-cols-[1fr_16rem]">
        <div className="min-h-[32rem] rounded-2xl border border-border bg-card/50 flex flex-col overflow-hidden">
          <div className="border-b border-border px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </span>
              <div>
                <h2 className="font-semibold">React Tutor</h2>
                <p className="text-xs text-muted-foreground">Ready for concepts, code help, and quick practice.</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
            {messages.map((message, index) => {
              const isUser = message.role === 'user';

              return (
                <div key={`${message.role}-${index}`} className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
                  {!isUser && (
                    <span className="mt-1 w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-primary" />
                    </span>
                  )}
                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      isUser
                        ? 'bg-primary text-primary-foreground'
                        : 'border border-border bg-background'
                    }`}
                  >
                    {isUser ? (
                      <span className="whitespace-pre-wrap">{message.content}</span>
                    ) : (
                      <MarkdownMessage content={message.content} />
                    )}
                  </div>
                  {isUser && (
                    <span className="mt-1 w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4" />
                    </span>
                  )}
                </div>
              );
            })}
            {isSending && (
              <div className="flex gap-3 justify-start">
                <span className="mt-1 w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </span>
                <div className="max-w-[82%] rounded-2xl border border-border bg-background px-4 py-3 text-sm text-muted-foreground">
                  Thinking...
                </div>
              </div>
            )}
          </div>

          <form
            className="border-t border-border p-4"
            onSubmit={event => {
              event.preventDefault();
              sendMessage();
            }}
          >
            <div className="flex items-end gap-3">
              <Textarea
                ref={textareaRef}
                value={draft}
                onChange={event => setDraft(event.target.value)}
                placeholder="Ask about hooks, components, props, state..."
                className="!min-h-12 max-h-32 resize-none overflow-hidden"
                disabled={isSending}
              />
              <Button type="submit" size="icon" className="h-12 w-12 flex-shrink-0" aria-label="Send message" disabled={isSending}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>

        <aside className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground">Try asking</h2>
          <div className="grid gap-2">
            {starterPrompts.map(prompt => (
              <button
                key={prompt}
                type="button"
                onClick={() => sendMessage(prompt)}
                disabled={isSending}
                className="rounded-xl border border-border bg-card/50 p-3 text-left text-sm hover:border-primary/40 hover:bg-card transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}
