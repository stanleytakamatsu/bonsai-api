interface IRabbitmqConfiguration {
  hostname: string;
  port: number;
  vhost: string;
  username: string;
  password: string;
}

const IRabbitmqConfiguration = Symbol.for("IRabbitmqConfiguration");

export { IRabbitmqConfiguration };
