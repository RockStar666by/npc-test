import React, { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Button, Input, Space } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { CurrenciesDataType } from '../../types';
import { StyledTable } from './Table.styles';
import { flags } from '../../assets/country-flags';

export const Table = ({
  currencies,
  loading
}: {
  currencies: CurrenciesDataType[];
  loading: boolean;
}) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  type DataIndex = keyof CurrenciesDataType;

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex,
    title: string
  ): ColumnType<any> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Искать по ${title}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
          >
            Найти
          </Button>
          <Button
            onClick={() => {
              clearFilters && handleReset(clearFilters);
              confirm({ closeDropdown: false });
            }}
            size='small'
            style={{ width: 90 }}
          >
            Очистить
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text, record) =>
      searchedColumn === dataIndex ? (
        <>
          <img src={flags[record.Cur_Abbreviation as keyof typeof flags]} />{' '}
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        </>
      ) : (
        <>
          <img src={flags[record.Cur_Abbreviation as keyof typeof flags]} />{' '}
          {text}
        </>
      )
  });

  const columns: ColumnsType<any> = [
    {
      title: 'Валюта',
      dataIndex: 'Cur_Name',
      key: 'Cur_Name',
      render: (value, record: CurrenciesDataType, index) => {
        return (
          <>
            <img src={flags[record.Cur_Abbreviation as keyof typeof flags]} />{' '}
            {value}
          </>
        );
      },
      ...getColumnSearchProps('Cur_Name', 'названию')
    },
    {
      title: 'Единиц валюты',
      dataIndex: 'Cur_Scale',
      key: 'Cur_Scale',
      width: 150,
      align: 'right'
    },
    {
      title: 'Код',
      dataIndex: 'Cur_Abbreviation',
      key: 'Cur_Abbreviation',
      width: 60
    },
    {
      title: 'Курс',
      dataIndex: 'Cur_OfficialRate',
      key: 'Cur_OfficialRate',
      width: 100,
      render: (value, record: CurrenciesDataType, index) => {
        return (
          <>
            {value}
            {' BYN'}
          </>
        );
      }
    }
  ];

  return (
    <StyledTable
      // @ts-ignore
      rowKey={(row: CurrenciesDataType) => row.Cur_ID}
      size='small'
      columns={columns}
      dataSource={currencies}
      pagination={{ position: ['bottomRight'], defaultPageSize: 20 }}
      defaultExpandAllRows
      loading={loading}
    />
  );
};
