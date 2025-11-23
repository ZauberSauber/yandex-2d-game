import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeftOutlined, SendOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message, Select, Typography } from 'antd';
import type { FC } from 'react';

import { ForumBreadcrumb } from '@components';
import { PATHS } from '@src/routes/constants';

import styles from './CreateTopicPage.module.scss';

const { Title, Text: TextComponent } = Typography;
const { TextArea } = Input;

interface CreateTopicForm {
  title: string;
  category: string;
  content: string;
  tags: string[];
}

const CreateTopicPage: FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const categories = [
    { value: 'cybersecurity', label: 'Кибербезопасность' },
    { value: 'ai', label: 'Нейронные сети и ИИ' },
    { value: 'implants', label: 'Кибернетические импланты' },
    { value: 'vr', label: 'Виртуальная реальность' },
  ];

  const handleSubmit = async (_values: CreateTopicForm) => {
    setLoading(true);
    try {
      // Здесь будет логика отправки данных на сервер
      // console.log('Creating topic:', values);

      // Имитация задержки
      await new Promise((resolve) => setTimeout(resolve, 1000));

      message.success('Тема успешно создана!');
      navigate(PATHS.FORUM);
    } catch (error) {
      message.error('Ошибка при создании темы');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(PATHS.FORUM);
  };

  return (
    <div className={styles['create-topic-page']}>
      <ForumBreadcrumb />

      <div className={styles.header}>
        <Button icon={<ArrowLeftOutlined />} onClick={handleBack} className={styles['back-button']}>
          Назад к форуму
        </Button>

        <Title level={1} className={styles.title}>
          Создание новой темы
        </Title>
      </div>

      <Card className={styles['form-card']}>
        <Form form={form} layout="vertical" onFinish={handleSubmit} className={styles.form}>
          <Form.Item
            name="title"
            label={<TextComponent className={styles.label}>Заголовок темы</TextComponent>}
            rules={[
              { required: true, message: 'Введите заголовок темы' },
              { min: 5, message: 'Заголовок должен содержать минимум 5 символов' },
              { max: 200, message: 'Заголовок не должен превышать 200 символов' },
            ]}>
            <Input placeholder="Введите заголовок темы..." className={styles.input} />
          </Form.Item>

          <Form.Item
            name="category"
            label={<TextComponent className={styles.label}>Категория</TextComponent>}
            rules={[{ required: true, message: 'Выберите категорию' }]}>
            <Select
              placeholder="Выберите категорию"
              options={categories}
              className={styles.select}
            />
          </Form.Item>

          <Form.Item
            name="content"
            label={<TextComponent className={styles.label}>Содержание</TextComponent>}
            rules={[
              { required: true, message: 'Введите содержание темы' },
              { min: 10, message: 'Содержание должно содержать минимум 10 символов' },
            ]}>
            <TextArea
              placeholder="Опишите вашу тему подробно..."
              rows={8}
              className={styles.textarea}
            />
          </Form.Item>

          <Form.Item
            name="tags"
            label={<TextComponent className={styles.label}>Теги (необязательно)</TextComponent>}>
            <Select
              mode="tags"
              placeholder="Добавьте теги для лучшей категоризации"
              className={styles['tags-select']}
            />
          </Form.Item>

          <Form.Item className={styles['submit-section']}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              icon={<SendOutlined />}
              className={styles['submit-button']}>
              Создать тему
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export { CreateTopicPage };
