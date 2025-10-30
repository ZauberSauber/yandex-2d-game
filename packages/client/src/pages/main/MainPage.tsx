import { useNavigate } from 'react-router-dom';
import { Card, Col, Divider, Flex, Layout, List, Row, Space, Typography } from 'antd';

import { Button } from '@components/Button';
import { PATHS } from '@src/routes/constants';

import { FEATURES } from './constants';

import styles from './MainPage.module.scss';

export const MainPage = () => {
  const { Header, Content } = Layout;
  const { Title, Paragraph, Text } = Typography;

  const navigate = useNavigate();

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <Flex
          vertical
          align="center"
          justify="center"
          gap="large"
          style={{
            minHeight: '350px',
          }}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div>
              <Title level={1} className={styles['main-title']}>
                NEO-TOKYO NETWORK
              </Title>
              <Title level={3} className={styles['sub-title']}>
                Киберпространство будущего уже здесь
              </Title>
            </div>

            <Space direction="vertical" size="large" style={{ width: '100%' }} />
            <Button className={styles['start-button']} onClick={() => navigate(PATHS.START)}>
              НАЧАТЬ ИГРУ
            </Button>
          </Space>
        </Flex>
      </Header>

      <Divider className={styles.divider} />

      <Content className={styles.content}>
        <Row justify="center">
          <Col xs={24} lg={20} xl={18}>
            <Card className={styles.card}>
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Title level={2} className={styles['card-title']}>
                  История мира Neo-Tokyo
                </Title>

                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <Paragraph className={styles.paragraph}>
                    2077 год. Технологии достигли невероятных высот, но общество раскололось.
                    Киберпространство стало новой реальностью, где информация - это власть, а хакеры
                    - новые правители.
                  </Paragraph>

                  <Paragraph className={styles.paragraph}>
                    После Великого Сбоя 2065 года, когда глобальная сеть рухнула на 72 часа, мир
                    изменился навсегда. Корпорации захватили контроль над остатками инфраструктуры,
                    создав собственные закрытые сети. Neo-Tokyo стал центром технологического
                    возрождения, но за блеском неоновых огней скрывается тёмная паутина заговоров и
                    киберпреступности.
                  </Paragraph>

                  <Paragraph className={styles.paragraph}>
                    Вы - новый игрок в этом опасном мире. Ваша цель - пробиться через уровни
                    корпоративной безопасности, раскрыть тайны глубинной сети и стать легендой
                    киберпространства. Но будьте осторожны - за каждым углом вас поджидают
                    конкуренты, корпоративные агенты и искусственный интеллект, охраняющий самые
                    ценные данные.
                  </Paragraph>
                </Space>

                <div className={styles['list-container']}>
                  <Paragraph className={styles.paragraph}>Вам предстоит:</Paragraph>
                  <List
                    size="small"
                    dataSource={FEATURES}
                    renderItem={(item) => (
                      <List.Item className={styles['list-item']}>
                        <Text className={styles['list-text']}>{item.text}</Text>
                      </List.Item>
                    )}
                    style={{ margin: 0 }}
                  />
                </div>

                <Paragraph className={styles.paragraph}>
                  Готовы ли вы погрузиться в цифровую пучину Neo-Tokyo?
                </Paragraph>
              </Space>
            </Card>
          </Col>
        </Row>

        <Row justify="center" className={styles['action-row']}>
          <Col>
            <Button>НАЧАТЬ ПОГРУЖЕНИЕ</Button>
          </Col>
        </Row>
      </Content>

      <div className={styles.background} />
    </Layout>
  );
};
