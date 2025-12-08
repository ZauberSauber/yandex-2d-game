import { bdConfig } from './bdConfig';

module.exports = {
  development: { ...bdConfig, logging: console.info },
  test: { ...bdConfig, logging: false },
  production: { ...bdConfig, logging: false },
};
