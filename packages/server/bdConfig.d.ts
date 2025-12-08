declare module 'src/config/bdConfig.js' {
  interface DbConfig {
    username: string;
    password: string;
    database: string;
    host: string;
    port: number;
  }

  const bdConfig: DbConfig;

  export default bdConfig;
}
