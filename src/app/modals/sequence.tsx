import { TransactionList } from '../components/transaction';
import { PageShell } from '../components/pageShell';
import { useContext, useEffect } from 'react';
import { AppContext } from '../utils/appContext';

const Sequence = ({ onDismiss }: { onDismiss?: () => void }) => {
  const { tipHeader, requestBlockByHeight, currentBlock, genesisBlock } =
    useContext(AppContext);

  const tipHeight = tipHeader?.header.height ?? 0;

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      requestBlockByHeight(tipHeight);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [tipHeight, requestBlockByHeight]);

  return (
    <PageShell
      onDismissModal={onDismiss}
      renderBody={() => (
        <>
          <TransactionList
            heading="First Block"
            transactions={genesisBlock?.transactions ?? []}
          />
          {!!tipHeight && (
            <TransactionList
              heading={`Current Block: #${tipHeight}`}
              transactions={currentBlock?.transactions ?? []}
            />
          )}
        </>
      )}
    />
  );
};

export default Sequence;
