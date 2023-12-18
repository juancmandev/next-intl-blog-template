'use client';

import { useEffect, useState } from 'react';
import { Copy, CopyCheck } from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {
  atomOneDark,
  atomOneLight,
} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useTheme } from 'next-themes';
import { Button } from './ui/button';

type TCodeBlock = {
  title: string;
  code: string;
  language: string;
};

export default function CodeBlock(props: TCodeBlock) {
  const [isCopied, setIsCopied] = useState(false);
  const [codeBlcokTheme, setCodeBlockTheme] = useState(atomOneDark);

  const { theme, systemTheme } = useTheme();

  function syntaxTheme() {
    if (!theme || !systemTheme) return atomOneDark;

    if (theme === 'system') {
      if (systemTheme === 'light') {
        return atomOneLight;
      }
      if (systemTheme === 'dark') {
        return atomOneDark;
      }
    } else {
      if (theme === 'light') {
        return atomOneLight;
      }
      if (theme === 'dark') {
        return atomOneDark;
      }
    }
  }

  useEffect(() => {
    setCodeBlockTheme(syntaxTheme() as any);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, systemTheme]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(props.code);

    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 5000);
  };

  return (
    <div className='p-0 bg-secondary rounded-md shadow-lg'>
      <header className='px-4 py-3 flex justify-between items-center border-b'>
        <span>{props.title}</span>
        <Button asChild variant='ghost' size='icon'>
          <button
            onClick={copyToClipboard}
            title={isCopied ? 'Copied!' : 'Copy to clipboard'}
          >
            {isCopied ? <CopyCheck size='1.6rem' /> : <Copy size='1.6rem' />}
          </button>
        </Button>
      </header>
      <SyntaxHighlighter
        customStyle={{
          margin: '0',
          padding: '16px 20px',
          background: 'none',
        }}
        language={props.language}
        style={codeBlcokTheme}
      >
        {props.code}
      </SyntaxHighlighter>
    </div>
  );
}
