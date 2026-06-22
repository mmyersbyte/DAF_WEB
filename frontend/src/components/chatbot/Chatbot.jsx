import {
  AssistantRuntimeProvider,
  useLocalRuntime,
  ThreadPrimitive,
  ComposerPrimitive,
  MessagePrimitive,
} from '@assistant-ui/react';
import { useRef } from 'react';
import axios from 'axios';

const apiBase =
  import.meta.env.VITE_API_URL?.replace(/\/$/, '') ?? 'http://localhost:3000';

function formatRunError(detail) {
  const s = String(detail);

  if (
    /\b401\b/.test(s) ||
    /Token não informado/i.test(s) ||
    /Token expirado/i.test(s) ||
    /Token inválido/i.test(s)
  ) {
    return 'Você precisa estar logado para usar o chat.';
  }

  if (
    /\b429\b/.test(s) ||
    /Too Many Requests/i.test(s) ||
    /quota exceeded/i.test(s) ||
    /rate limit/i.test(s)
  ) {
    return 'Limite de uso da API atingido. Aguarde um momento e tente de novo.';
  }

  const tail = s.length > 350 ? `${s.slice(0, 350)}…` : s;

  return `Não foi possível obter resposta: ${tail}`;
}

function getMessageText(message) {
  if (!message) {
    return '';
  }

  if (typeof message.content === 'string') {
    return message.content;
  }

  if (Array.isArray(message.content)) {
    return message.content
      .map((item) => {
        if (typeof item === 'string') {
          return item;
        }

        return item?.text ?? '';
      })
      .join('');
  }

  return '';
}

function MessageBubble({ align, className: bubbleClass }) {
  return (
    <div className={`mb-3 flex ${align}`}>
      <MessagePrimitive.Root className={bubbleClass}>
        <MessagePrimitive.Content />
      </MessagePrimitive.Root>
    </div>
  );
}

function UserMessage() {
  return (
    <MessageBubble
      align='justify-end'
      className='max-w-[88%] rounded-2xl bg-primary-light/90 px-3 py-2 text-sm text-[var(--color-primary-dark)]'
    />
  );
}

function AssistantMessage() {
  return (
    <MessageBubble
      align='justify-start'
      className='max-w-[88%] rounded-2xl bg-gray-100 px-3 py-2 text-sm text-gray-900'
    />
  );
}

export default function Chatbot({ onClose }) {
  const conversationIdRef = useRef(null);

  const runtime = useLocalRuntime({
    async run({ messages }) {
      try {
        const token = localStorage.getItem('@daf_web:token');

        if (!token) {
          return {
            content: [
              {
                type: 'text',
                text: 'Você precisa estar logado para usar o chat.',
              },
            ],
            status: {
              type: 'incomplete',
              reason: 'error',
              error: 'Token não encontrado.',
            },
          };
        }

        const lastMessage = messages[messages.length - 1];
        const content = getMessageText(lastMessage).trim();

        if (!content) {
          return {
            content: [
              {
                type: 'text',
                text: 'Digite uma mensagem antes de enviar.',
              },
            ],
          };
        }

        const payload = {
          content,
        };

        if (conversationIdRef.current) {
          payload.conversationId = conversationIdRef.current;
        }

        const { data } = await axios.post(`${apiBase}/chat/message`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (data?.conversationId) {
          conversationIdRef.current = data.conversationId;
        }

        const text = data?.content != null ? String(data.content) : '';

        return {
          content: [
            {
              type: 'text',
              text,
            },
          ],
        };
      } catch (err) {
        const detail =
          err.response?.data?.error ??
          err.response?.data?.message ??
          err.message ??
          'Erro desconhecido';

        return {
          content: [
            {
              type: 'text',
              text: formatRunError(detail),
            },
          ],
          status: {
            type: 'incomplete',
            reason: 'error',
            error: String(detail),
          },
        };
      }
    },
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className='flex h-full min-h-0 flex-col bg-white'>
        <div className='flex shrink-0 items-center justify-between border-b border-[var(--color-border)] bg-primary-light/40 px-4 py-3'>
          <span className='font-semibold text-[var(--color-primary-dark)]'>
            Robô Mauricio Neto
          </span>

          {onClose ? (
            <button
              type='button'
              onClick={onClose}
              className='rounded-full p-1.5 text-gray-600 transition-colors hover:bg-white/80 hover:text-gray-900'
              aria-label='Fechar chat'
            >
              <span
                aria-hidden
                className='text-lg leading-none'
              >
                ×
              </span>
            </button>
          ) : null}
        </div>

        <div className='min-h-0 flex-1 overflow-hidden p-2'>
          <ThreadPrimitive.Root className='flex h-full min-h-0 flex-col'>
            <ThreadPrimitive.Viewport
              autoScroll
              className='flex-1 min-h-0 overflow-y-auto px-1 py-1'
            >
              <ThreadPrimitive.Empty>
                <p className='py-10 text-center text-sm text-gray-500'>
                  Envie uma mensagem para começar.
                </p>
              </ThreadPrimitive.Empty>

              <ThreadPrimitive.Messages
                components={{
                  UserMessage,
                  AssistantMessage,
                }}
              />
            </ThreadPrimitive.Viewport>

            <ComposerPrimitive.Root className='flex shrink-0 gap-2 border-t border-[var(--color-border)] bg-white pt-2'>
              <ComposerPrimitive.Input
                placeholder='Digite sua mensagem…'
                className='min-h-[44px] flex-1 resize-none rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none ring-[var(--color-primary)] focus:border-[var(--color-primary)] focus:ring-1'
              />

              <ComposerPrimitive.Send className='shrink-0 self-end rounded-xl bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white disabled:opacity-40'>
                Enviar
              </ComposerPrimitive.Send>
            </ComposerPrimitive.Root>
          </ThreadPrimitive.Root>
        </div>
      </div>
    </AssistantRuntimeProvider>
  );
}
