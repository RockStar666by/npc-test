import { CopyOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Button, Input, Modal } from 'antd';
import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CopyLinkInput } from './Modal.styles';

export const ShareLinkModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState('');
  const [copied, setCopied] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button size='large' type='primary' onClick={showModal}>
        <ShareAltOutlined />
        Поделиться
      </Button>
      <Modal
        title='Ссылка на страницу'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText={'Отмена'}
      >
        <CopyLinkInput>
          <Input
            value={window.location.href}
            onChange={({ target: { value } }) => {
              setValue(value);
              setCopied(false);
            }}
          />
          <CopyToClipboard
            text={window.location.href}
            onCopy={() => setCopied(true)}
          >
            <Button type='primary'>
              <CopyOutlined />
              Скопировать
            </Button>
          </CopyToClipboard>
        </CopyLinkInput>
        {copied ? <span style={{ color: 'red' }}>Скопировано.</span> : null}
      </Modal>
    </>
  );
};
