import AccountButton from '@components/AccountButton';
import ActionButton from '@components/ActionButton';
import ContentLoader from '@components/ContentLoader';
import Flex from '@components/Flex';
import { Title } from '@components/Title';
import { SetState } from '@type/common';
import { Item, ClassItem, AuditoryItem } from '@type/studyPlan';
import { FC, useState } from 'react';

interface AccountModuleProps {
  accounts: Item[];
  setAccounts: SetState<Item[]>;
  setClasses: SetState<ClassItem[]>;
  setAuditories: SetState<AuditoryItem[]>;
}

export const AccountModule: FC<AccountModuleProps> = ({
  accounts,
  setAccounts,
  setClasses,
  setAuditories,
}) => {
  const [areAccountsLoading] = useState(true);
  return (
    <Flex flex="1" direction="column">
      <Title>Профили {accounts.length ? `(${accounts.length})` : ''}</Title>
      {areAccountsLoading && <ContentLoader size={32} />}
      {!areAccountsLoading && (
        <>
          <Flex
            style={{
              marginBottom: 11,
              display: 'flex',
              flexDirection: 'column',
              maxHeight: 'calc(2.5 * 42px + 2 * 11px)',
              overflowY: 'auto',
              alignContent: 'start',
            }}
            justify="start"
            basis="100%"
            gap="11px"
          >
            {accounts
              .sort((a, b) => a.id - b.id)
              .map((item) => (
                <AccountButton
                  handleDelete={() => {
                    setAccounts((prev) =>
                      prev.filter((el) => el.id !== item.id),
                    );
                    setClasses((prev) =>
                      prev.map((el) => ({
                        ...el,
                        account: el.account?.id === item.id ? null : el.account,
                      })),
                    );
                    setAuditories((prev) =>
                      prev.map((el) => ({
                        ...el,
                        accounts: el.accounts
                          .map((acc) => (acc.id === item.id ? null : acc))
                          .filter((el) => !!el),
                      })),
                    );
                  }}
                  key={item.id}
                  text={item.name}
                  size="large"
                  setText={(newText) =>
                    setAccounts((prev) => [
                      ...prev.filter((el) => el.id !== item.id),
                      { ...item, name: newText },
                    ])
                  }
                />
              ))}
          </Flex>
          <ActionButton
            size="large"
            handleClick={() =>
              setAccounts((prev) => [
                ...prev,
                { name: 'Название', id: new Date().getTime() },
              ])
            }
          />
        </>
      )}
    </Flex>
  );
};
