import { atomOneLight, CopyBlock } from 'react-code-blocks';

const CodeBlock = ({
  language = 'powershell',
  code = '',
  theme = atomOneLight,
  showLineNumbers = false,
  wrapLongLines = false,
  codeBlock = true,
}) => {
  return (
    <div style={{ fontFamily: 'monospace', borderRadius: '5px'}}>
      <CopyBlock
        text={code}
        language={language}
        theme={theme}
        wrapLongLines={wrapLongLines}
        showLineNumbers={showLineNumbers}
        codeBlock={codeBlock}
      />
    </div>
  );
};

export default CodeBlock;
