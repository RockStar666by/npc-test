import React, { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Button, Input, Space } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { Link } from 'react-router-dom';
import { CurrenciesDataType } from '../../types';
import { StyledTable } from './Table.styles';

export const Table = ({ currencies }: { currencies: CurrenciesDataType[] }) => {
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
        <Link to={'/currencies/' + record.Cur_ID}>
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        </Link>
      ) : (
        <Link to={'/currencies/' + record.Cur_ID}>{text}</Link>
      )
  });

  const columns: ColumnsType<any> = [
    {
      title: 'Валюта',
      dataIndex: 'Cur_Name',
      key: 'Cur_Name',
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
      width: 100
    }
  ];

  console.log(currencies);

  return (
    <StyledTable
      size='small'
      columns={columns}
      dataSource={currencies}
      pagination={{ position: ['bottomRight'], defaultPageSize: 20 }}
      defaultExpandAllRows
    />
  );
};

// const columns: ColumnsType<any> = [];

// const data: CurrenciesDataType[] = [
//   {
//     key: '1',
//     Cur_Name: 'John Brown',
//     Cur_Scale: 32,
//     Cur_Abbreviation: 'USD',
//     Cur_Exchange: ''
//   },
//   {
//     key: '2',
//     Cur_Name: 'Jim Green',
//     Cur_Scale: 42,
//     Cur_Abbreviation: 'AUS',
//     Cur_Exchange: ''
//   },
//   {
//     key: '3',
//     Cur_Name: 'Joe Black',
//     Cur_Scale: 32,
//     Cur_Abbreviation: 'GBP',
//     Cur_Exchange: ''
//   }
// ];

// export const Table = ({ currencies }: { currencies: CurrenciesDataType[] }) => {
//   const [loading, setLoading] = useState(false);

//   const handleLoadingChange = (enable: boolean) => {
//     setLoading(enable);
//   };

//   return (
//     <StyledTable
//       loading={loading}
//       size='small'
//       columns={columns}
//       dataSource={currencies}
//       pagination={{ position: ['bottomRight'], defaultPageSize: 20 }}
//       defaultExpandAllRows
//     />
//   );
// };
